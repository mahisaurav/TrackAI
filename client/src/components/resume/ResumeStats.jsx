function ResumeStats({ resumes = [] }) {
  const totalResumes = resumes.length;

  const analyzedResumes = resumes.filter(
    (resume) => resume.analyzed && resume.atsScore != null,
  );

  const averageAts =
    analyzedResumes.length > 0
      ? Math.round(
          analyzedResumes.reduce((sum, resume) => sum + resume.atsScore, 0) /
            analyzedResumes.length,
        )
      : null;

  const stats = [
    {
      title: "Total Resumes",
      value: totalResumes.toString(),
    },
    {
      title: "Average ATS",
      value: averageAts != null ? `${averageAts}%` : "—",
    },
    {
      title: "Analyzed Resumes",
      value: analyzedResumes.length.toString(),
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-5"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {stat.title}
          </p>

          <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default ResumeStats;
