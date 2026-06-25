import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../config/navigation";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-[260px] flex-col border-r border-zinc-800 bg-zinc-950 p-5 lg:flex">
      <div className="mb-8">
        <Link to="/dashboard" className="cursor-pointer">
          <h1 className="text-xl font-semibold text-white">TrackAI</h1>
        </Link>
        <p className="mt-0.5 text-xs text-zinc-600">Placement tracker</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              }`}
            >
              <Icon className="shrink-0 text-sm" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-xs text-zinc-500">Stay consistent</p>
        <p className="mt-1 text-sm text-zinc-300">
          Solve, revise, and track applications daily.
        </p>
        <Link
          to="/daily-tasks"
          className="mt-3 block cursor-pointer rounded-lg bg-zinc-100 py-2 text-center text-xs font-medium text-zinc-900 hover:bg-white"
        >
          View daily tasks
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
