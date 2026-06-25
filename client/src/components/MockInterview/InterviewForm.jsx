function InterviewForm({
  onGenerate,
  loading,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Mock Interview Generator
          </h1>

          <p className="text-gray-600 mt-2">
            Generate personalized interview questions based on your resume using AI.
          </p>
        </div>

        <button
          onClick={onGenerate}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all"
        >
          {loading
            ? "Generating..."
            : "Generate Interview"}
        </button>
      </div>
    </div>
  );
}

export default InterviewForm;