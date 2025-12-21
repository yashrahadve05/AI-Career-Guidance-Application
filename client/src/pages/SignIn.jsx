import { SignIn as ClerkSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to continue your career journey
          </p>
        </div>
        <div className="flex justify-center">
          <ClerkSignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/profile"
          />
        </div>
      </div>
    </div>
  )
}

export default SignIn

