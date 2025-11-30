import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const [activeNav, setActiveNav] = useState(0)
  const navigate = useNavigate()

  const navItems = ['Home', 'About Us', 'Community', 'Helpdesk']

  return (
    <div className="bg-white text-dark-blue mt-4">
      <nav className="flex flex-wrap items-center justify-between px-20 md:px-10 py-5">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">KAVI</h1>
        </div>

        <div className="relative border-2 border-light-blue rounded-full flex overflow-hidden mt-4 md:mt-0">
          <div 
            className="absolute top-0 left-0 h-full bg-dark-blue rounded-full transition-all duration-300 ease-in-out"
            style={{ 
              width: `${100 / navItems.length}%`, 
              transform: `translateX(${activeNav * 100}%)` 
            }}
          />
          <ul className="flex relative z-10">
            {navItems.map((item, i) => (
              <li key={i}>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveNav(i) }}
                  className={`px-6 py-2 block font-medium text-base transition-colors ${
                    activeNav === i ? 'text-white' : 'text-light-blue'
                  } hover:text-white`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button onClick={() => navigate('/signin')} className="px-4 md:px-6 py-2 rounded-full border border-blue bg-dark-blue text-white text-lg md:text-base">
            Sign in
          </button>
          <button onClick={() => navigate('/signin?mode=signup')} className="px-4 md:px-6 py-2 rounded-full border border-blue text-dark-blue text-lg md:text-base">
            Sign up
          </button>
        </div>
      </nav>

      <main className="px-10 md:px-14 py-15 text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-6 mb-10">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug text-dark-blue max-w-3xl text-center">
            "Semua permasalahan anak kos dapat di atasi"
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch w-full max-w-10xl mb-16">
          <div className="border border-light-blue rounded-3xl overflow-hidden h-80">
            <img src="/images/landingPageImage.jpg" alt="Finance" className="w-full h-full object-cover object-center" />
          </div>
          <div className="border border-light-blue rounded-3xl px-10 py-8 flex items-center h-80">
            <p className="text-dark-blue text-base leading-relaxed text-justify">
              <span className="font-semibold text-4xl">Kavi</span> adalah sebuah solusi inovatif yang dirancang untuk
              mengatasi tantangan pengelolaan keuangan yang sering dihadapi oleh mahasiswa. Berangkat dari
              kurangnya literasi finansial dan aplikasi yang ada terlalu rumit, Kavi hadir sebagai asisten
              keuangan pribadi yang tidak hanya memfasilitasi pencatatan, tetapi juga mendidik dan memotivasi
              pengguna melalui pendekatan yang gamified dan sosial.
            </p>
          </div>
          <div className="border border-light-blue rounded-3xl overflow-hidden h-80">
            <img src="/images/SignInImage.jpeg" alt="Teamwork" className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </main>

      <footer className="bg-blue text-white py-8 px-10">
        <div className="flex justify-around items-start max-w-6xl mx-auto">
          <div>
            <h3 className="font-bold text-xl mb-3">Komunitas</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-200 transition-colors">Forum Diskusi</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors">Tips & Trik</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-200 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors">Spending Tracker</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors">Bill Buddy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3">Tentang Kami</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-200 transition-colors">Tentang KAVI</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors">Kontak</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm mt-8 border-t border-light-blue pt-6">
          © 2024 KAVI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
