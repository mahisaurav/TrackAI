import Sidebar from "./Sidebar";
import ProfileMenu from "./ProfileMenu";
import { useTheme } from "../../context/ThemeContext";

function DashboardLayout({ children }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen ${
        isLight ? "bg-zinc-50 text-zinc-900" : "bg-zinc-950 text-white"
      }`}
    >
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.03),transparent)]"
        aria-hidden
      />
      <Sidebar />

      <main className="relative lg:ml-[260px] p-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex justify-end">
            <ProfileMenu />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
