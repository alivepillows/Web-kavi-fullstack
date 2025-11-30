import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../utils/api'

export default function SignIn() {
  const [mode, setMode] = useState('signin')
  const location = useLocation()
  
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('mode') === 'signup') {
      setMode('signup')
    }
  }, [location])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address!')
      return
    }
    
    if (mode === 'signup') {
      if (!name || !email || !password) {
        setMessage('Please fill all fields!')
        return
      }
      try {
        await api.post('/auth/register', { name, email, password })
        setMessage('Account created! Please sign in.')
        setTimeout(() => setMode('signin'), 1000)
      } catch { setMessage('Email already exists') }
    } else if (mode === 'signin') {
      try {
        const { data } = await api.post('/auth/login', { email, password })
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } catch { setMessage('Invalid Email or password!') }
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-dark-blue mb-2">KAVI</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Welcome to Kavi!</h2>
          
          <div className="border-2 border-light-blue rounded-full p-1">
            <div className="flex justify-center bg-gray-200 rounded-full">
              <button 
                onClick={() => setMode('signin')}
                className={`w-1/2 p-2 text-center font-medium rounded-full ${mode === 'signin' ? 'bg-dark-blue text-white' : ''}`}
              >
                Sign in
              </button>
              <button 
                onClick={() => setMode('signup')}
                className={`w-1/2 p-2 text-center font-medium rounded-full ${mode === 'signup' ? 'bg-dark-blue text-white' : ''}`}
              >
                Sign up
              </button>
            </div>
          </div>

          <div className="mt-6">
            {mode === 'signup' && (
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border-2 border-light-blue rounded-full"
                />
              </div>
            )}
            
            <div className="mb-4">
              <input 
                type="email" 
                placeholder="Enter your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-light-blue rounded-full"
              />
            </div>

            <div className="mb-4">
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-light-blue rounded-full"
              />
            </div>

            {mode === 'signin' && (
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input type="checkbox" className="w-5 h-5 rounded-full mr-2" />
                  <label>Remember me</label>
                </div>
                <button onClick={() => navigate('/forgot-password')} className="text-light-blue hover:underline">Forgot Password?</button>
              </div>
            )}

            <button 
              onClick={handleSubmit}
              className="w-full mt-6 py-3 rounded-full bg-dark-blue text-white font-medium"
            >
              {mode === 'signin' ? 'Login' : 'Create Account'}
            </button>

            {message && <p className="mt-4 text-sm text-center text-red-500">{message}</p>}
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow" /><span className="px-4 text-gray-500">OR</span><hr className="flex-grow" />
          </div>

          <div className="flex gap-4">
            <button className="w-1/2 flex items-center justify-center gap-2 p-3 border-2 border-light-blue rounded-full hover:bg-gray-50">
              <i className="ri-apple-fill text-xl"></i><span>Apple</span>
            </button>
            <button className="w-1/2 flex items-center justify-center gap-2 p-3 border-2 border-light-blue rounded-full hover:bg-gray-50">
              <i className="ri-google-fill text-xl"></i><span>Google</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/SignInImage.jpeg')" }} />
    </div>
  )
}
