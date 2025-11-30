import { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import api from '../utils/api'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DashboardContent() {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ amount: '', type: '', date: '', note: '' })

  useEffect(() => {
    loadTransactions()
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) { console.error(error) }
  }

  const loadTransactions = async () => {
    try {
      const { data } = await api.get('/transactions')
      setTransactions(data)
    } catch (error) { console.error(error) }
  }

  const handleSubmit = async () => {
    if (!formData.amount || !formData.date) {
      alert('Nominal dan Tanggal wajib diisi!');
      return;
    }
    const [type, category] = formData.type.split('-')
    try {
      await api.post('/transactions', {
        amount: parseFloat(formData.amount),
        type,
        category,
        date: formData.date,
        note: formData.note || ''
      })
      setShowModal(false)
      setFormData({ amount: '', type: '', date: '', note: '' })
      loadTransactions()
    } catch (error) { 
      alert('Gagal menambah transaksi: ' + (error.response?.data?.error || error.message));
    }
  }

  const handleDeleteTransaction = async (id) => {
    if (confirm('Yakin ingin menghapus transaksi ini?')) {
      try {
        await api.delete(`/transactions/${id}`)
        loadTransactions()
      } catch (error) {
        alert('Gagal menghapus transaksi');
      }
    }
  }

  const income = transactions.filter(t => t.type === 'masuk').reduce((sum, t) => sum + t.amount, 0)
  const expense = transactions.filter(t => t.type === 'keluar').reduce((sum, t) => sum + t.amount, 0)
  
  const calculateHealthScore = () => {
    if (income === 0) return 0;
    
    let score = 0;
    const cashflow = income - expense;
    const savingRate = (cashflow / income) * 100;
    
    // Cashflow positif (40 poin)
    if (cashflow > 0) {
      score += 40;
    }
    
    // Saving minimal 10% (30 poin)
    if (savingRate >= 10) {
      score += 30;
    } else if (savingRate > 0) {
      score += (savingRate / 10) * 30;
    }
    
    // Rasio pengeluaran terhadap pemasukan (30 poin)
    const expenseRatio = expense / income;
    if (expenseRatio <= 0.5) {
      score += 30;
    } else if (expenseRatio < 0.9) {
      score += 30 - ((expenseRatio - 0.5) / 0.4) * 30;
    }
    
    return Math.min(Math.round(score), 100);
  }
  
  const score = calculateHealthScore()

  const categoryData = transactions.filter(t => t.type === 'keluar').reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})

  const chartData = {
    labels: Object.keys(categoryData).length > 0 ? Object.keys(categoryData) : ['Belum ada data'],
    datasets: [{
      data: Object.keys(categoryData).length > 0 ? Object.values(categoryData) : [1],
      backgroundColor: ['#ffd97a', '#113F67', '#34699A', '#58A0C8'],
      borderWidth: 0
    }]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div>
          <h3 className="font-bold text-xl text-dark-blue mb-2">Financial Health Score</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-light-blue flex flex-col justify-center text-center">
              <span className="font-bold text-7xl text-blue">{score}%</span>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div 
                  className={`h-4 rounded-full transition-all ${score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(score, 100)}%` }} 
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {score >= 70 ? '🎉 Kesehatan keuangan baik!' : score >= 40 ? '⚠️ Perlu perbaikan' : '❌ Perlu perhatian serius'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-center">
              {Object.keys(categoryData).length > 0 ? (
                <Pie data={chartData} options={{ plugins: { legend: { display: false } } }} />
              ) : (
                <p className="text-gray-400">Belum ada data pengeluaran</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl text-dark-blue mb-2">Ringkasan Bulanan</h3>
          <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-light-blue">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-2xl font-bold text-blue">Rp {income.toLocaleString('id-ID')},-</p>
                <p className="text-dark-blue">Pemasukan</p>
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-blue">Rp {expense.toLocaleString('id-ID')},-</p>
                <p className="text-dark-blue">Pengeluaran</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            setShowModal(true);
            const defaultType = categories.length > 0 ? `keluar-${categories[0].name}` : 'keluar-Lainnya';
            setFormData({ amount: '', type: defaultType, date: new Date().toISOString().split('T')[0], note: '' });
          }}
          className="w-full py-3 rounded-full bg-dark-blue text-white font-bold text-lg hover:bg-blue"
        >
          + Tambah Transaksi
        </button>

        <div>
          <h3 className="font-bold text-xl text-dark-blue mb-2">Riwayat Transaksi</h3>
          <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-light-blue">
            <div className="space-y-4 max-h-48 overflow-y-auto">
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map(tx => (
                  <div key={tx.id} className="flex justify-between items-center text-blue py-1 group">
                    <p>{tx.category} - {new Date(tx.date).toLocaleDateString('id-ID')}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{tx.type === 'masuk' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')},-</span>
                      <button 
                        onClick={() => handleDeleteTransaction(tx.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">Belum ada transaksi</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 flex flex-col">
        <h3 className="font-bold text-xl text-dark-blue mb-2">Tips Keuangan</h3>
        <div className="space-y-4 flex-grow">
          <a 
            href="https://skorcard.app/food/tips-makan-hemat-ala-anak-kost/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-xl shadow-md border border-light-blue block hover:shadow-lg transition-shadow"
          >
            <h4 className="font-semibold text-sm text-dark-blue hover:text-blue">Tips Makan Hemat Ala Anak Kost</h4>
            <p className="text-xs text-gray-500 mt-1">Cara cerdas nikmati hidup dengan budget minimal →</p>
          </a>
          <a 
            href="https://fip.unesa.ac.id/mahasiswa-rantau-wajib-cermat-kelola-keuangan-berikut-tipsnya/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-xl shadow-md border border-light-blue block hover:shadow-lg transition-shadow"
          >
            <h4 className="font-semibold text-sm text-dark-blue hover:text-blue">Tips Kelola Keuangan Mahasiswa</h4>
            <p className="text-xs text-gray-500 mt-1">Mahasiswa rantau wajib cermat kelola keuangan →</p>
          </a>
          <a 
            href="https://reku.id/campus/cara-mengatur-uang-1-juta-dalam-sebulan-anak-kos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-xl shadow-md border border-light-blue block hover:shadow-lg transition-shadow"
          >
            <h4 className="font-semibold text-sm text-dark-blue hover:text-blue">Mengatur Uang 1 Juta Sebulan</h4>
            <p className="text-xs text-gray-500 mt-1">Cara mengatur uang 1 juta dalam sebulan anak kos →</p>
          </a>
          <a 
            href="https://gopay.co.id/blog/cara-hemat-anak-kos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-xl shadow-md border border-light-blue block hover:shadow-lg transition-shadow"
          >
            <h4 className="font-semibold text-sm text-dark-blue hover:text-blue">10 Cara Hemat Anak Kos</h4>
            <p className="text-xs text-gray-500 mt-1">Biar tetap bisa nongkrong & liburan →</p>
          </a>
          <a 
            href="https://www.kompas.com/food/read/2025/10/01/100300875/12-resep-masakan-modal-rp-10.000-untuk-sehari-hari-gampang-bikinnya-" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-xl shadow-md border border-light-blue block hover:shadow-lg transition-shadow"
          >
            <h4 className="font-semibold text-sm text-dark-blue hover:text-blue">Resep Masakan Modal 10rb</h4>
            <p className="text-xs text-gray-500 mt-1">12 resep masakan untuk sehari-hari, gampang bikinnya →</p>
          </a>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border-2 border-light-blue" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-dark-blue">Tambah Transaksi</h3>
              <div className="flex gap-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-full border-2 border-gray-300 text-gray-600 font-semibold hover:bg-gray-100">
                  Batal
                </button>
                <button onClick={handleSubmit} className="px-8 py-2 rounded-full bg-dark-blue text-white font-semibold hover:bg-blue">
                  Simpan
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <input 
                type="number" 
                placeholder="Nominal" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full p-3 border-2 border-light-blue rounded-lg"
              />
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-3 border-2 border-light-blue rounded-lg"
              >
                <optgroup label="Pengeluaran">
                  {categories.map(cat => (
                    <option key={cat.id} value={`keluar-${cat.name}`}>Pengeluaran - {cat.name}</option>
                  ))}
                  <option value="keluar-Lainnya">Pengeluaran - Lainnya</option>
                </optgroup>
                <optgroup label="Pemasukan">
                  <option value="masuk-Gaji">Pemasukan - Gaji</option>
                  <option value="masuk-Bonus">Pemasukan - Bonus</option>
                  <option value="masuk-Lainnya">Pemasukan - Lainnya</option>
                </optgroup>
              </select>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-3 border-2 border-light-blue rounded-lg"
              />
              <textarea 
                placeholder="Catatan" 
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                className="w-full p-3 border-2 border-light-blue rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
