export default function Sidebar({ activeMenu, setActiveMenu, user, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'spending', label: 'Spending Habit Tracker' },
    { id: 'smart', label: 'Smart Money' },
    { id: 'bill', label: 'Bill Buddy' },
    { id: 'accounts', label: 'Accounts' }
  ]

  return (
    <aside className="w-64 bg-dark-blue text-white flex flex-col">
      <div className="h-24 flex items-center justify-center border-b-2 border-light-blue">
        <h1 className="text-4xl font-bold">KAVI</h1>
      </div>
      
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveMenu(item.id) }}
                className={`flex items-center gap-3 py-3 px-6 rounded-xl ${
                  activeMenu === item.id ? 'bg-white text-dark-blue font-semibold' : 'hover:bg-blue'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onLogout() }}
              className="flex items-center gap-3 py-3 px-6 text-red-400 hover:bg-red-500 hover:text-white rounded-xl mt-4"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto p-4 border-t-2 border-light-blue">
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-xl">
            <i className="ri-user-line"></i>
          </div>
          <span>{user?.name || 'User'}</span>
        </div>
      </div>
    </aside>
  )
}
