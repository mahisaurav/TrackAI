import { FaBell, FaSearch } from "react-icons/fa";

function Topbar() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

      {/* Left Side */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-1">
          Manage your placement journey
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div
          className="
            hidden md:flex
            items-center
            gap-2
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900/50
            px-4
            py-3
            w-[280px]
          "
        >
          <FaSearch className="text-zinc-500" />

          <input
            type="text"
            placeholder="Quick search..."
            className="
              bg-transparent
              outline-none
              text-sm
              text-white
              w-full
              placeholder:text-zinc-600
            "
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          className="
            h-11
            w-11
            flex
            items-center
            justify-center
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900/50
            text-zinc-400
            hover:text-white
            hover:border-blue-500/40
            transition
          "
        >
          <FaBell />
        </button>

      </div>
    </header>
  );
}

export default Topbar;