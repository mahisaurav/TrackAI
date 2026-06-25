import { STATUS_COLORS } from "../../config/applications";

function Badge({ status, className = "" }) {
  const styles =
    STATUS_COLORS[status] ||
    "bg-zinc-500/15 text-zinc-400 ring-zinc-500/30";

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
        ring-1 ring-inset ${styles} ${className}
      `}
    >
      {status || "Applied"}
    </span>
  );
}

export default Badge;
