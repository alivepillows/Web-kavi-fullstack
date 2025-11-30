import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function SmartMoney() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) { console.error(error) }
  }

  const addCategory = async () => {
    const name = prompt('Masukkan nama kategori baru:')
    if (name && name.trim()) {
      try {
        await api.post('/categories', { name: name.trim() })
        loadCategories()
      } catch (error) { console.error(error) }
    }
  }

  const deleteCategory = async (id, name) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kategori "${name}"?`)) {
      try {
        await api.delete(`/categories/${id}`)
        loadCategories()
      } catch (error) { console.error(error) }
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
      <h3 className="text-xl font-bold text-dark-blue mb-6 flex-shrink-0">Kategori</h3>
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {categories.length > 0 ? (
          categories.map(cat => (
            <div key={cat.id} className="flex justify-between items-center">
              <span className="flex-grow text-center py-3 px-6 bg-blue text-white text-lg rounded-full mr-4">
                {cat.name}
              </span>
              <button 
                onClick={() => deleteCategory(cat.id, cat.name)}
                className="px-8 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-10">Belum ada kategori. Klik tombol di bawah untuk menambah.</p>
        )}
      </div>
      <button 
        onClick={addCategory}
        className="bg-dark-blue text-white py-3 px-6 rounded-full font-semibold mt-4 hover:bg-blue"
      >
        + Tambah Kategori
      </button>
    </div>
  )
}
