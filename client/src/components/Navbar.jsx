import { Link, useNavigate } from 'react-router-dom'
import { useAuth, UserButton } from '@clerk/clerk-react'

function Navbar() {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isSignedIn ? "/dashboard" : "/"} className="text-2xl font-bold text-blue-600">
              AI Career Guidance
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <Link
                  to="/assessment"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Assessment
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/sign-in" />
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

