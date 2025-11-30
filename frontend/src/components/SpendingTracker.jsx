import { useState, useEffect } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import api from '../utils/api'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function SpendingTracker() {
  const [view, setView] = useState('weekly')
  const [transactions, setTransactions] = useState([])
  const [categoryData, setCategoryData] = useState({})

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      const { data } = await api.get('/transactions')
      setTransactions(data)
      
      const categories = data.filter(t => t.type === 'keluar').reduce((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = { amount: 0, color: getRandomColor() }
        }
        acc[t.category].amount += t.amount
        return acc
      }, {})
      setCategoryData(categories)
    } catch (error) { console.error(error) }
  }

  const getRandomColor = () => {
    const colors = ['#ffd97a', '#113F67', '#34699A', '#58A0C8', '#FDEE68', '#A2D2FF']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    const user = JSON.parse(localStorage.getItem('user'));
    
    doc.setFontSize(20);
    doc.text('Laporan Pengeluaran KAVI', 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Nama: ${user?.name || 'User'}`, 14, 30);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 14, 35);
    
    const totalSpending = Object.values(categoryData).reduce((sum, d) => sum + d.amount, 0);
    doc.text(`Total Pengeluaran: Rp ${totalSpending.toLocaleString('id-ID')}`, 14, 40);
    
    doc.setFontSize(14);
    doc.text('Pengeluaran per Kategori', 14, 50);
    
    const categoryRows = Object.entries(categoryData).map(([name, data]) => [
      name,
      `Rp ${data.amount.toLocaleString('id-ID')}`,
      `${((data.amount / totalSpending) * 100).toFixed(1)}%`
    ]);
    
    doc.autoTable({
      startY: 55,
      head: [['Kategori', 'Jumlah', 'Persentase']],
      body: categoryRows,
    });
    
    const chartDataset = view === 'weekly' ? getWeeklyData() : getMonthlyData();
    const finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.text(`Pengeluaran ${view === 'weekly' ? 'Mingguan' : 'Bulanan'}`, 14, finalY);
    
    const chartRows = chartDataset.labels.map((label, i) => [
      label,
      `Rp ${chartDataset.data[i].toLocaleString('id-ID')}`
    ]);
    
    doc.autoTable({
      startY: finalY + 5,
      head: [['Periode', 'Jumlah']],
      body: chartRows,
    });
    
    doc.save(`Laporan-Pengeluaran-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  const pieData = {
    labels: Object.keys(categoryData).length > 0 ? Object.keys(categoryData) : ['Belum ada data'],
    datasets: [{
      data: Object.keys(categoryData).length > 0 ? Object.values(categoryData).map(v => v.amount) : [1],
      backgroundColor: Object.keys(categoryData).length > 0 ? Object.values(categoryData).map(v => v.color) : ['#e5e7eb'],
      borderWidth: 0
    }]
  }

  const getWeeklyData = () => {
    const today = new Date();
    const weekData = Array(7).fill(0);
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    transactions.filter(t => t.type === 'keluar').forEach(tx => {
      const txDate = new Date(tx.date);
      const diffTime = today - txDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 7) {
        const dayIndex = txDate.getDay();
        weekData[dayIndex] += tx.amount;
      }
    });
    
    return { labels: dayNames, data: weekData };
  };

  const getMonthlyData = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthData = Array(12).fill(0);
    
    transactions.filter(t => t.type === 'keluar').forEach(tx => {
      const txDate = new Date(tx.date);
      const month = txDate.getMonth();
      monthData[month] += tx.amount;
    });
    
    return { labels: monthNames, data: monthData };
  };

  const chartDataset = view === 'weekly' ? getWeeklyData() : getMonthlyData();

  const barData = {
    labels: chartDataset.labels,
    datasets: [{
      data: chartDataset.data,
      backgroundColor: '#34699A',
      borderRadius: 5
    }]
  }

  const totalSpending = Object.values(categoryData).reduce((sum, d) => sum + d.amount, 0)
  const maxCategory = Object.keys(categoryData).length > 0 ? Object.entries(categoryData).reduce((a, b) => a[1].amount > b[1].amount ? a : b) : null
  const percentage = maxCategory ? ((maxCategory[1].amount / totalSpending) * 100).toFixed(0) : 0

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center h-72">
          {Object.keys(categoryData).length > 0 ? (
            <Pie data={pieData} options={{ plugins: { legend: { display: false } } }} />
          ) : (
            <p className="text-gray-400">Belum ada data pengeluaran</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-light-blue flex flex-col justify-center">
          <h3 className="font-bold text-xl text-dark-blue mb-4">Kategori</h3>
          <div className="space-y-4">
            {Object.keys(categoryData).length > 0 ? (
              Object.entries(categoryData).map(([name, data]) => (
                <div key={name} className="flex items-center">
                  <span className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: data.color }} />
                  <span className="font-medium text-gray-700">{name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">Belum ada kategori</p>
            )}
          </div>
        </div>
      </div>

      {maxCategory && (
        <div className="text-white text-center py-3 px-6 rounded-full shadow-md text-lg bg-blue">
          Anda menghabiskan {percentage}% dari uang jajan untuk {maxCategory[0]}
        </div>
      )}

      <div className="flex justify-center">
        <div className="border-2 border-light-blue rounded-full p-1 bg-white shadow-md w-full max-w-2xl">
          <div className="flex justify-center">
            <button 
              onClick={() => setView('monthly')}
              className={`w-1/2 py-2 rounded-full font-semibold ${view === 'monthly' ? 'bg-dark-blue text-white' : ''}`}
            >
              Bulanan
            </button>
            <button 
              onClick={() => setView('weekly')}
              className={`w-1/2 py-2 rounded-full font-semibold ${view === 'weekly' ? 'bg-dark-blue text-white' : ''}`}
            >
              Mingguan
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md flex-grow flex flex-col">
        <div className="flex-grow relative h-64 mb-4">
          {transactions.length > 0 ? (
            <Bar data={barData} options={{ 
              responsive: true, 
              maintainAspectRatio: false, 
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => 'Rp ' + (value / 1000) + 'k'
                  }
                }
              }
            }} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Belum ada data pengeluaran</p>
            </div>
          )}
        </div>
        <button 
          onClick={downloadPDF}
          className="px-4 py-2 rounded-full bg-dark-blue text-white font-semibold flex items-center gap-2 text-sm hover:bg-blue"
        >
          Unduh laporan <i className="ri-download-line" />
        </button>
      </div>
    </div>
  )
}
