import { motion } from "framer-motion";

function StatCard({ title, value, icon, color, change }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-sm"
    >
      <div
        className={`absolute -top-8 -right-8 h-24 w-24 rounded-full ${color} opacity-20 blur-2xl`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color} bg-opacity-20 text-lg text-white`}
        >
          {icon}
        </div>
      </div>

      <p className="relative mt-4 text-emerald-400/90 text-xs font-medium">
        ↑ {change}% this month
      </p>
    </motion.div>
  );
}

export default StatCard;
