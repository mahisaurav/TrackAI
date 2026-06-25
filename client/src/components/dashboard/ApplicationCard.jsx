import { FaPen, FaTrash } from "react-icons/fa";
import Button from "../ui/Button";

function ApplicationCard({
  company,
  role,
  location,
  status,
  match,
  onDelete,
  onEdit,
  onStatusChange,
}) {
  const initial = company?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-4 transition hover:border-zinc-700/80 hover:bg-zinc-900/50 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 text-sm font-bold text-white ring-1 ring-white/10">
          {initial}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">{role}</h3>
          <p className="truncate text-sm text-zinc-500">
            {company} · {location}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
        <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30 ring-inset">
          {match}% match
        </span>
        {onStatusChange ? (
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-white outline-none"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        ) : (
          <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm text-blue-400">
            {status}
          </span>
        )}
        <Button variant="ghost" size="sm" onClick={onEdit} aria-label="Edit">
          <FaPen className="text-xs" />
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onDelete}
          aria-label="Delete"
        >
          <FaTrash className="text-xs" />
        </Button>
      </div>
    </div>
  );
}

export default ApplicationCard;
