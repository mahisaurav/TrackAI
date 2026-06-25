import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBolt } from "react-icons/fa";

const DEFAULT_STATS = { total: 0, interviews: 0, offers: 0 };

function getInsightMessage({ total, interviews, offers }) {
  if (offers > 0) {
    return `You have ${offers} offer${offers > 1 ? "s" : ""} — great work! Review and respond while keeping other options open.`;
  }
  if (interviews > 0) {
    return `You have ${interviews} interview${interviews > 1 ? "s" : ""} in progress. Focus on company research and mock rounds this week.`;
  }
  if (total > 0) {
    return "Your pipeline is building. Tailor your resume for each role and follow up on pending applications.";
  }
  return "Start tracking applications to unlock AI insights, status charts, and interview prep recommendations.";
}

function DashboardHero({ stats = DEFAULT_STATS }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const firstName = user?.name?.split(" ")[0] || "there";

  const miniStats = [
    { label: "ATS Score", value: "92%", accent: "text-blue-400" },
    { label: "Interviews", value: stats.interviews ?? 0, accent: "text-amber-400" },
    { label: "Applications", value: stats.total ?? 0, accent: "text-white" },
    { label: "Offers", value: stats.offers ?? 0, accent: "text-emerald-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-blue-500/10 via-zinc-900/80 to-violet-500/10 p-6 sm:p-8 h-full"
    >
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-400 text-xs font-medium mb-4">
            <FaBolt className="text-[10px]" />
            AI placement insights
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white mb-4">
            Keep pushing,
            <span className="block mt-1 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              {firstName} 🚀
            </span>
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-5">
            {getInsightMessage(stats)}
          </p>

          {stats.total === 0 && (
            <Link
              to="/applications"
              className="inline-flex items-center rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 transition"
            >
              Add your first application
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto lg:min-w-[280px]">
          {miniStats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-zinc-700/50 bg-black/30 backdrop-blur-md p-4"
            >
              <p className="text-zinc-500 text-xs mb-1">{item.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${item.accent}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardHero;
