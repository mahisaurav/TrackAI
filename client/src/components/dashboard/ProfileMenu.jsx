import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../Profile/ProfileDropDown";
import api from "../../api/api";

function ProfileMenu() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      navigate("/login");
    } catch {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowProfile((open) => !open)}
        className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/20 border border-white/10 hover:scale-105 transition-all"
        aria-label="Open profile menu"
      >
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </button>

      {showProfile && (
        <ProfileDropdown user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default ProfileMenu;
