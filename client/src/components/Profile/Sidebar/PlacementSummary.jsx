function PlacementSummary({
  totalApplications = 0,
  interviews = 0,
  offers = 0,
  resumesUploaded = 0,
  averageAtsScore = null,
}) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
      <h3 className="text-white font-semibold text-lg mb-6">
        Placement Summary
      </h3>

      <div className="space-y-5">
        <div className="flex justify-between">
          <span className="text-zinc-400">Total Applications</span>
          <span className="text-white font-semibold">{totalApplications}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Interviews</span>
          <span className="text-white font-semibold">{interviews}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Offers</span>
          <span className="text-green-400 font-semibold">{offers}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Resumes Uploaded</span>
          <span className="text-white font-semibold">{resumesUploaded}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Average ATS Score</span>
          <span className="text-blue-400 font-semibold">
            {averageAtsScore !== null ? `${averageAtsScore}%` : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlacementSummary;
