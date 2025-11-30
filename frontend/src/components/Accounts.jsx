import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function Accounts({ user, setUser }) {
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [transactions, setTransactions] = useState([])
  const [savingsPercentage, setSavingsPercentage] = useState(0)

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      const { data } = await api.get('/transactions')
      setTransactions(data)
      calculateSavings(data)
    } catch (error) { console.error(error) }
  }

  const calculateSavings = (txs) => {
    const income = txs.filter(t => t.type === 'masuk').reduce((sum, t) => sum + t.amount, 0)
    const expense = txs.filter(t => t.type === 'keluar').reduce((sum, t) => sum + t.amount, 0)
    if (income > 0) {
      const savings = income - expense
      const percentage = (savings / income) * 100
      setSavingsPercentage(Math.max(0, Math.min(100, percentage)).toFixed(1))
    }
  }

  const handleSave = async () => {
    try {
      const { data } = await api.put('/user', { name, email })
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      alert('Profil berhasil diperbarui!')
    } catch (error) {
      alert('Gagal memperbarui profil')
    }
  }

  const income = transactions.filter(t => t.type === 'masuk').reduce((sum, t) => sum + t.amount, 0)
  const expense = transactions.filter(t => t.type === 'keluar').reduce((sum, t) => sum + t.amount, 0)
  const savings = income - expense

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
      <div className="flex items-center gap-6 mb-6">
        <div className="text-5xl text-dark-blue bg-gray-100 rounded-full p-4">
          <i className="ri-user-line" />
        </div>
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-dark-blue mb-2">{user?.name}</h3>
          <div className="bg-gray-200 rounded-full h-3 w-full overflow-hidden">
            <div 
              className="bg-yellow h-full rounded-full transition-all duration-700"
              style={{ width: `${savingsPercentage}%` }}
            />
          </div>
          <p className="text-sm text-light-gray mt-2">*Anda berhasil hemat {savingsPercentage}%</p>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl flex-grow p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600">Total Pemasukan</p>
            <p className="text-xl font-bold text-green-600">Rp {income.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-gray-600">Total Pengeluaran</p>
            <p className="text-xl font-bold text-red-600">Rp {expense.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Saldo</p>
            <p className={`text-xl font-bold ${savings >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              Rp {savings.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border-2 border-light-blue rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-light-blue rounded-lg"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-dark-blue text-white rounded-full font-semibold"
        >
          Simpan
        </button>
      </div>
    </div>
  )
}
