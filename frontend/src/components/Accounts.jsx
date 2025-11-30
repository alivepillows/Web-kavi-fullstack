import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function Accounts({ user, setUser }) {
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [transactions, setTransactions] = useState([])
  const [savingsPercentage, setSavingsPercentage] = useState(0)
  const [profilePhoto, setProfilePhoto] = useState(null)

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

  const handlePhotoUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setProfilePhoto(e.target.result)
        }
        reader.readAsDataURL(file)
        alert('Foto profil berhasil diubah!')
      }
    }
    input.click()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-light-blue rounded-full flex items-center justify-center text-3xl text-white overflow-hidden">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <i className="ri-user-line" />
            )}
          </div>
          {savingsPercentage >= 100 ? (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow rounded-full flex items-center justify-center text-lg">
              🏆
            </div>
          ) : savingsPercentage >= 50 ? (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow rounded-full flex items-center justify-center text-lg">
              🥇
            </div>
          ) : savingsPercentage > 0 ? (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-lg">
              🥈
            </div>
          ) : null}
          <button 
            onClick={handlePhotoUpload}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-dark-blue rounded-full flex items-center justify-center text-white text-sm hover:bg-blue"
          >
            <i className="ri-camera-line" />
          </button>
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

      <div className="border-2 border-light-blue rounded-3xl flex-grow p-8">
        <h4 className="text-lg font-semibold text-dark-blue mb-6">Pengaturan Profil</h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-light-blue rounded-lg"
              placeholder="Masukkan nama Anda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-light-blue rounded-lg"
              placeholder="Masukkan email Anda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foto Profil</label>
            <button 
              onClick={handlePhotoUpload}
              className="w-full p-3 border-2 border-dashed border-light-blue rounded-lg text-light-blue hover:bg-light-blue hover:text-white transition-colors"
            >
              <i className="ri-upload-line mr-2" />
              Klik untuk mengubah foto profil
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-dark-blue text-white rounded-full font-semibold hover:bg-blue"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  )
}
