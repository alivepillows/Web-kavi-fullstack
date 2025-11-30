import { useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function BillBuddy() {
  const [mode, setMode] = useState('even')
  const [totalBill, setTotalBill] = useState('')
  const [participants, setParticipants] = useState([])
  const [participantAmounts, setParticipantAmounts] = useState({})
  const [newName, setNewName] = useState('')

  const totalBillNum = parseFloat(totalBill) || 0
  const amountPerPerson = mode === 'even' && totalBillNum > 0 && participants.length > 0 ? totalBillNum / participants.length : 0
  
  const getParticipantAmount = (name) => {
    if (mode === 'even') return amountPerPerson
    return parseFloat(participantAmounts[name]) || 0
  }

  const addParticipant = () => {
    if (newName.trim()) {
      setParticipants([...participants, newName.trim()])
      setParticipantAmounts({...participantAmounts, [newName.trim()]: 0})
      setNewName('')
    }
  }
  
  const updateParticipantAmount = (name, amount) => {
    setParticipantAmounts({...participantAmounts, [name]: amount})
  }

  const downloadPDF = () => {
    if (participants.length === 0) {
      alert('Tambahkan peserta terlebih dahulu!');
      return;
    }
    const doc = new jsPDF();
    const user = JSON.parse(localStorage.getItem('user'));
    
    doc.setFontSize(20);
    doc.text('Laporan Bill Buddy - KAVI', 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Nama: ${user?.name || 'User'}`, 14, 30);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 14, 35);
    doc.text(`Total Tagihan: Rp ${totalBill.toLocaleString('id-ID')}`, 14, 40);
    doc.text(`Mode: ${mode === 'even' ? 'Dibagi Rata' : 'Manual'}`, 14, 45);
    
    doc.setFontSize(14);
    doc.text('Pembagian per Orang', 14, 55);
    
    const rows = participants.map(name => [
      name,
      `Rp ${getParticipantAmount(name).toLocaleString('id-ID')}`
    ]);
    
    doc.autoTable({
      startY: 60,
      head: [['Nama', 'Jumlah']],
      body: rows,
    });
    
    doc.save(`Bill-Buddy-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col space-y-4">
      <div className="flex justify-center">
        <div className="border border-light-blue rounded-full p-1">
          <button 
            onClick={() => setMode('even')}
            className={`px-6 py-2 rounded-full font-semibold ${mode === 'even' ? 'bg-dark-blue text-white' : ''}`}
          >
            Dibagi secara rata
          </button>
          <button 
            onClick={() => setMode('manual')}
            className={`px-6 py-2 rounded-full font-semibold ${mode === 'manual' ? 'bg-dark-blue text-white' : ''}`}
          >
            Dibagi secara manual
          </button>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex-grow flex flex-col space-y-4">
        <input 
          type="number" 
          placeholder="Masukkan nominal total" 
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
          className="w-full p-3 border border-light-blue rounded-full text-center text-lg"
        />

        <div className="grid grid-cols-2 gap-4 flex-grow">
          {participants.length > 0 ? (
            participants.map((name, i) => (
              <div key={i} className="flex items-center justify-between gap-3 bg-blue text-white px-4 py-2 rounded-full">
                <div className="flex items-center gap-2">
                  <i className="ri-user-line text-2xl" />
                  <div className="flex flex-col">
                    <span className="font-medium">{name}</span>
                    {mode === 'even' ? (
                      <span className="text-sm">Rp. {amountPerPerson.toLocaleString('id-ID')}</span>
                    ) : (
                      <input 
                        type="number"
                        value={participantAmounts[name] || ''}
                        onChange={(e) => updateParticipantAmount(name, e.target.value)}
                        placeholder="0"
                        className="text-sm bg-transparent border-b border-white w-24 outline-none"
                      />
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setParticipants(participants.filter((_, idx) => idx !== i))
                    const newAmounts = {...participantAmounts}
                    delete newAmounts[name]
                    setParticipantAmounts(newAmounts)
                  }}
                  className="text-white hover:text-red-300"
                >
                  <i className="ri-close-circle-line text-xl" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-400 py-10">
              Belum ada peserta. Tambahkan peserta di bawah.
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          <input 
            type="text" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
            placeholder="Nama peserta"
            className="flex-grow p-3 border-2 border-light-blue rounded-full"
          />
          <button 
            onClick={addParticipant}
            className="px-6 py-3 bg-dark-blue text-white rounded-full font-semibold hover:bg-blue"
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={downloadPDF}
          className="px-4 py-2 rounded-full bg-dark-blue text-white font-semibold flex items-center gap-2 hover:bg-blue"
        >
          <i className="ri-download-line" />
          <span>Unduh laporan</span>
        </button>
        <button 
          onClick={() => alert('Data tagihan tersimpan!')}
          className="px-8 py-3 bg-dark-blue text-white rounded-full font-semibold hover:bg-blue"
        >
          Simpan
        </button>
      </div>
    </div>
  )
}
