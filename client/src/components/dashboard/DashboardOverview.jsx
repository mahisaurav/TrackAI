import {
  FaBriefcase,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import DashboardHero from "./DashboardHero";
import StatCard from "./StatCard";

function DashboardOverview({ stats }) {
  const statCards = [
    {
      title: "Applications",
      value: stats.total,
      icon: <FaBriefcase />,
      color: "bg-blue-500",
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: <FaClock />,
      color: "bg-amber-500",
    },
    {
      title: "Offers",
      value: stats.offers,
      icon: <FaCheckCircle />,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
      <div className="xl:col-span-3 min-w-0">
        <DashboardHero stats={stats} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 min-w-0">
        {statCards.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

export default DashboardOverview;
