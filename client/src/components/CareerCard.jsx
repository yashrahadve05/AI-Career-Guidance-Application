function CareerCard({ career, score, breakdown }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{career.title}</h3>
          <div className="mt-1">
            <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${getScoreColor(score)}`}>
              {score}% Match
            </span>
          </div>
        </div>
        {career.jobOutlook && (
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            career.jobOutlook === 'Growing' ? 'bg-green-100 text-green-800' :
            career.jobOutlook === 'Stable' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {career.jobOutlook}
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4">{career.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Match Breakdown:</h4>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Skills</span>
              <span className="font-medium">{breakdown.skillMatch}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${breakdown.skillMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Interests</span>
              <span className="font-medium">{breakdown.interestMatch}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${breakdown.interestMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Education</span>
              <span className="font-medium">{breakdown.educationMatch}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${breakdown.educationMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Experience</span>
              <span className="font-medium">{breakdown.experienceMatch}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${breakdown.experienceMatch}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {career.requiredSkills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {career.averageSalary && career.averageSalary.min && career.averageSalary.max && (
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Salary Range: </span>
          ${career.averageSalary.min.toLocaleString()} - ${career.averageSalary.max.toLocaleString()}
        </div>
      )}
    </div>
  )
}

export default CareerCard

