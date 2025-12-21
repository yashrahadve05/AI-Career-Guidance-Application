function Roadmap({ roadmap }) {
  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No roadmap available for this career.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Learning Roadmap</h3>
      <div className="space-y-6">
        {roadmap.map((step, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.step}
              </div>
              {index < roadmap.length - 1 && (
                <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
              )}
            </div>
            <div className="flex-1 pb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h4>
              <p className="text-gray-600 mb-2">{step.description}</p>
              {step.duration && (
                <span className="text-sm text-blue-600 font-medium">
                  Duration: {step.duration}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Roadmap

