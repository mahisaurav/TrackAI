import { User, LogOut, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function ProfileDropdown({ user, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className="
      absolute
      right-0
      top-14
      w-72
      bg-[#0f172a]
      border border-slate-800
      rounded-2xl
      shadow-2xl
      overflow-hidden
      z-50
    "
    >
      {/* Header */}

      <div className="p-5">
        <div className="flex items-center gap-3">
          <div
            className="
            h-12
            w-12
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            flex
            items-center
            justify-center
            text-white
            font-bold
          "
          >
            {user?.name?.charAt(0)}
          </div>

          <div>
            <h3 className="text-white font-semibold">
              {user?.name}
            </h3>

            <p className="text-gray-400 text-sm">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800" />

      <div className="p-2">

        <Link
          to="/profile"
          className="
          flex items-center gap-3
          px-4 py-3
          rounded-xl
          text-gray-300
          hover:bg-slate-800
          hover:text-white
          transition
        "
        >
          <User size={18} />
          View Profile
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          className="
          w-full
          flex items-center gap-3
          px-4 py-3
          rounded-xl
          text-gray-300
          hover:bg-slate-800
          hover:text-white
          transition
        "
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <div className="border-t border-slate-800" />

      <div className="p-2">
        <button
          onClick={onLogout}
          className="
          w-full
          flex items-center gap-3
          px-4 py-3
          rounded-xl
          text-red-400
          hover:bg-red-500/10
          transition
        "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileDropdown;