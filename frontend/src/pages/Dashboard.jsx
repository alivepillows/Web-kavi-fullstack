import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import Sidebar from '../components/Sidebar'
import DashboardContent from '../components/DashboardContent'
import SpendingTracker from '../components/SpendingTracker'
import SmartMoney from '../components/SmartMoney'
import BillBuddy from '../components/BillBuddy'
import Accounts from '../components/Accounts'

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/signin')
      return
    }
    
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/signin')
  }

  const menuTitles = {
    dashboard: 'Dashboard',
    spending: 'Spending Habit Tracker',
    smart: 'Smart Money',
    bill: 'Bill Buddy',
    accounts: 'Accounts'
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="flex-grow flex flex-col h-screen">
        <header className="h-20 flex justify-between items-center px-8 bg-dark-blue shadow-md z-10 border-b-2 border-light-blue flex-shrink-0">
          <h2 className="text-2xl font-semibold text-white">{menuTitles[activeMenu]}</h2>
          <button className="px-6 py-2 rounded-full bg-white text-dark-blue text-base font-semibold hover:bg-gray-100 transition-colors">
            Chatbot
          </button>
        </header>
        
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          {activeMenu === 'dashboard' && <DashboardContent />}
          {activeMenu === 'spending' && <SpendingTracker />}
          {activeMenu === 'smart' && <SmartMoney />}
          {activeMenu === 'bill' && <BillBuddy />}
          {activeMenu === 'accounts' && <Accounts user={user} setUser={setUser} />}
        </main>


      </div>
    </div>
  )
}
