import { useState, useEffect, useMemo, useCallback } from "react";
import api from "../api/api";
import { getDashboardStats, getStatusChartData } from "../utils/applicationStats";

export function useApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [editingApp, setEditingApp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    try {
      const response = await api.get("/applications");
      setApplications(response.data);
    } catch {
      // fetch failed silently; loading state still clears
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filteredApplications = useMemo(() => {
    if (selectedStatus === "All") return applications;
    return applications.filter((job) => job.status === selectedStatus);
  }, [applications, selectedStatus]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filteredApplications;
    return filteredApplications.filter((item) => {
      const company = (item.company || "").toLowerCase();
      const role = (item.role || "").toLowerCase();
      const location = (item.location || "").toLowerCase();
      return company.includes(q) || role.includes(q) || location.includes(q);
    });
  }, [filteredApplications, query]);

  const stats = useMemo(
    () => getDashboardStats(applications),
    [applications]
  );

  const chartData = useMemo(
    () => getStatusChartData(applications),
    [applications]
  );

  const addApplication = async ({ company, role, location }) => {
    await api.post("/applications", {
      company,
      role,
      location,
      match: Math.floor(Math.random() * 30) + 70,
    });
    await fetchApplications();
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((job) => job.id !== id));
    } catch {
      alert("Failed to delete application");
    }
  };

  const updateApplicationStatus = async (id, newStatus) => {
    const job = applications.find((item) => item.id === id);
    if (!job) return;

    try {
      const response = await api.put(`/applications/${id}`, {
        company: job.company,
        role: job.role,
        location: job.location,
        status: newStatus,
        match: job.match,
      });

      setApplications((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const saveEdit = async () => {
    if (!editingApp) return;

    try {
      const { id, company, role, location, status, match } = editingApp;
      const response = await api.put(`/applications/${id}`, {
        company,
        role,
        location,
        status,
        match,
      });

      setApplications((prev) =>
        prev.map((job) => (job.id === id ? response.data : job))
      );
      setEditingApp(null);
    } catch {
      alert("Failed to update application");
    }
  };

  return {
    applications,
    filteredItems,
    selectedStatus,
    setSelectedStatus,
    query,
    setQuery,
    editingApp,
    setEditingApp,
    loading,
    stats,
    chartData,
    addApplication,
    deleteApplication,
    updateApplicationStatus,
    saveEdit,
    refresh: fetchApplications,
  };
}
