function ResumeOverview({
  highestAtsScore = null,
  totalResumes = 0,
  lastUpdated = "N/A",
}) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
      <h3 className="text-white font-semibold text-lg mb-6">
        Resume Overview
      </h3>

      <div className="space-y-5">
        <div className="flex justify-between">
          <span className="text-zinc-400">Highest ATS Score</span>
          <span className="text-blue-400 font-bold">
            {highestAtsScore !== null ? `${highestAtsScore}%` : "N/A"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Total Resumes</span>
          <span className="text-white">{totalResumes}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Last Updated</span>
          <span className="text-white">{lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}

export default ResumeOverview;
