import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSavePassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      setMessage('Please fill all fields!')
      return
    }
    
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address!')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!')
      return
    }
    
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters!')
      return
    }
    
    try {
      await api.post('/auth/reset-password', { email, newPassword })
      navigate('/password-success')
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to reset password')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-dark-blue mb-2">KAVI</h1>
          <h2 className="text-xl text-blue mb-8">Atur Kata Sandi Baru</h2>
          
          <div className="space-y-6">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-light-blue rounded-full text-gray-500 placeholder-gray-400"
            />
            
            <input 
              type="password" 
              placeholder="New Password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 border-2 border-light-blue rounded-full text-gray-500 placeholder-gray-400"
            />
            
            <input 
              type="password" 
              placeholder="Confirm New Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border-2 border-light-blue rounded-full text-gray-500 placeholder-gray-400"
            />
            
            <button 
              onClick={handleSavePassword}
              className="w-full py-4 rounded-full bg-dark-blue text-white font-semibold text-lg hover:bg-blue transition-colors"
            >
              Save Password
            </button>
            
            {message && (
              <p className="text-center text-sm text-red-500">
                {message}
              </p>
            )}
            
            <div className="text-center">
              <button 
                onClick={() => navigate('/signin')}
                className="text-light-blue hover:underline text-sm"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/SignInImage.jpeg')" }} />
    </div>
  )
}