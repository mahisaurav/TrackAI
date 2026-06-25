import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";
import Topbar from "../components/dashboard/Topbar";
import StatusChart from "../components/dashboard/StatusChart";
import UpcomingSection from "../components/dashboard/UpcomingSection";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardHero from "../components/dashboard/DashboardHero";

import api from "../api/api";
import { getStatusChartData } from "../utils/applicationStats";

import {
  FaBriefcase,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

function Dashboard() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const stats = [
    {
      title: "Applications",
      value: applications.length,
      icon: <FaBriefcase />,
      color: "bg-blue-500",
      change: 12,
    },
    {
      title: "Interviews",
      value: applications.filter((job) => job.status === "Interview").length,
      icon: <FaClock />,
      color: "bg-yellow-500",
      change: 8,
    },
    {
      title: "Offers",
      value: applications.filter((job) => job.status === "Offer").length,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
      change: 18,
    },
  ];

  const heroStats = {
    total: applications.length,
    interviews: applications.filter((job) => job.status === "Interview").length,
    offers: applications.filter((job) => job.status === "Offer").length,
  };

  const chartData = useMemo(
    () => getStatusChartData(applications),
    [applications]
  );

  return (
    <DashboardLayout>
      <Topbar />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 min-w-0">
          <DashboardHero stats={heroStats} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-6 min-w-0">
          {stats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-w-0 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Recent Applications
            </h2>

            <Link
              to="/applications"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-4 transition hover:border-zinc-700"
                >
                  <div>
                    <h3 className="text-white font-medium">{app.company}</h3>
                    <p className="text-zinc-400 text-sm">{app.role}</p>
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {app.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-zinc-800 py-12 text-center text-zinc-500">
                No applications yet — add some from the Applications page.
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <StatusChart data={chartData} />
          <UpcomingSection />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
