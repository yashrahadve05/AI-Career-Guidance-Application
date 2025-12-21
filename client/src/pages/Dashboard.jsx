import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CareerCard from '../components/CareerCard'
import Roadmap from '../components/Roadmap'

function Dashboard() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState([])
  const [selectedCareer, setSelectedCareer] = useState(null)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      const token = await getToken()
      const response = await axios.get('/api/careers/recommendations', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRecommendations(response.data.recommendations)
      if (response.data.recommendations.length > 0) {
        setSelectedCareer(response.data.recommendations[0])
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      if (error.response?.status === 400 || error.response?.status === 404) {
        alert(error.response.data.error || 'Please complete your profile and assessment first.')
        navigate('/profile')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading recommendations...</div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Recommendations Yet</h1>
          <p className="text-gray-600 mb-6">
            Please complete your profile and assessment to get personalized career recommendations.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            Go to Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Career Recommendations</h1>
        <p className="text-gray-600">
          Based on your profile, here are the top career paths that match your skills, interests, and experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {recommendations.map((rec, index) => (
            <div
              key={rec.career._id}
              onClick={() => setSelectedCareer(rec)}
              className={`cursor-pointer transition-transform ${
                selectedCareer?.career._id === rec.career._id
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
            >
              <CareerCard
                career={rec.career}
                score={rec.score}
                breakdown={rec.breakdown}
              />
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          {selectedCareer && (
            <div className="sticky top-4">
              <Roadmap roadmap={selectedCareer.career.roadmap} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

