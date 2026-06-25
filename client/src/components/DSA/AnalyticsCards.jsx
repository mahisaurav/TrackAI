function AnalyticsCards({ analytics }) {
  const cards = [
    {
      title: "Total Questions",
      value: analytics.totalQuestions,
      subtitle: "In question bank",
    },
    {
      title: "Solved",
      value: analytics.solvedQuestions,
      subtitle: `${analytics.completionPercentage}% complete`,
    },
    {
      title: "Easy",
      value: `${analytics.easySolved}/${analytics.easyTotal}`,
      subtitle: "Solved / total",
    },
    {
      title: "Medium",
      value: `${analytics.mediumSolved}/${analytics.mediumTotal}`,
      subtitle: "Solved / total",
    },
    {
      title: "Hard",
      value: `${analytics.hardSolved}/${analytics.hardTotal}`,
      subtitle: "Solved / total",
    },
    {
      title: "Due for Revision",
      value: analytics.dueToday,
      subtitle: "Questions overdue",
    },
  ];

  return (
    <div>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
        Progress Overview
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3"
          >
            <p className="text-xs text-zinc-500">{item.title}</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {item.value}
            </p>
            <p className="mt-0.5 text-xs text-zinc-600">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsCards;
