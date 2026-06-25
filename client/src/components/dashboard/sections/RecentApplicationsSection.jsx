import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Card, { CardHeader } from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import ApplicationCard from "../ApplicationCard";

import { APPLICATION_STATUSES } from "../../../config/applications";

function RecentApplicationsSection({
  items,
  loading,
  query,
  onQueryChange,
  selectedStatus,
  onStatusFilterChange,
  onApplicationStatusChange,
  onDelete,
  onEdit,
}) {
  return (
    <div className="lg:col-span-2 min-w-0">
    <Card>
      <CardHeader
        title="Recent Applications"
        subtitle="Track and manage your job pipeline"
        action={
          <Link to="/applications">
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Link>
        }
      />

      <div className="relative mb-4">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
        <Input
          className="pl-11"
          placeholder="Search company or role…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {APPLICATION_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusFilterChange(status)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium border transition
              ${
                selectedStatus === status
                  ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20"
                  : "border-zinc-700/80 text-zinc-400 hover:bg-zinc-800/80 hover:text-white"
              }
            `}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-zinc-500">Loading applications…</div>
        ) : items.length > 0 ? (
          items.map((job) => (
            <ApplicationCard
              key={job.id}
              company={job.company}
              role={job.role}
              location={job.location}
              status={job.status}
              match={job.match}
              onStatusChange={(newStatus) =>
                onApplicationStatusChange(job.id, newStatus)
              }
              onDelete={() => onDelete(job.id)}
              onEdit={() => onEdit(job)}
            />
          ))
        ) : (
          <div className="py-12 text-center rounded-xl border border-dashed border-zinc-800">
            <p className="text-zinc-400">No applications found</p>
            <p className="text-zinc-600 text-sm mt-1">
              Add one above or change your filters
            </p>
          </div>
        )}
      </div>
    </Card>
    </div>
  );
}

export default RecentApplicationsSection;
