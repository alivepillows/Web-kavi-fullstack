import { useNavigate } from 'react-router-dom'

export default function PasswordSuccess() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-dark-blue mb-2">KAVI</h1>
          <h2 className="text-xl text-blue mb-8">Kata Sandi Berhasil Diubah!</h2>
          
          <p className="text-gray-700 mb-8 leading-relaxed">
            Anda sekarang dapat masuk dengan kata sandi baru Anda.
          </p>
          
          <button 
            onClick={() => navigate('/signin')}
            className="w-full py-4 rounded-full bg-dark-blue text-white font-semibold text-lg hover:bg-blue transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/SignInImage.jpeg')" }} />
    </div>
  )
}