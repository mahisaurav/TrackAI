import { useState, useEffect } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import ApplicationCard from "../components/dashboard/ApplicationCard";
import AddApplicationForm from "../components/dashboard/sections/AddApplicationForm";

import api from "../api/api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [editingApp, setEditingApp] = useState(null);

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

  const handleAddApplication = async (applicationData) => {
    try {
      await api.post("/applications", {
        ...applicationData,
        status: "Applied",
        match: Math.floor(Math.random() * 30) + 70,
      });

      fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Failed to add application");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/applications/${id}`);

      setApplications((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.log(error);

      alert("Failed to delete application");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await api.put(
        `/applications/${editingApp.id}`,
        editingApp,
      );

      setApplications((prev) =>
        prev.map((job) => (job.id === editingApp.id ? response.data : job)),
      );

      setEditingApp(null);
    } catch (error) {
      console.log(error);

      alert("Failed to update application");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log("Status Change Fired:", id, newStatus);

    try {
      const application = applications.find((job) => job.id === id);

      console.log("Application:", application);

      const response = await api.put(`/applications/${id}`, {
        ...application,
        status: newStatus,
      });

      console.log("Response:", response.data);

      setApplications((prev) =>
        prev.map((job) => (job.id === id ? response.data : job)),
      );
    } catch (error) {
      console.log("STATUS UPDATE ERROR:", error.response?.data || error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">APPLICATIONS</h1>

      <AddApplicationForm onSubmit={handleAddApplication} />

      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map((job) => (
            <ApplicationCard
              key={job.id}
              company={job.company}
              role={job.role}
              location={job.location}
              status={job.status}
              match={job.match}
              onDelete={() => handleDelete(job.id)}
              showStatusDropdown={true}
              onStatusChange={(newStatus) =>
                handleStatusChange(job.id, newStatus)
              }
              onEdit={() => setEditingApp(job)}
            />
          ))
        ) : (
          <div className="py-10 text-center text-zinc-500">
            No applications found
          </div>
        )}
      </div>

      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Edit Application</h2>

            <div className="space-y-4">
              <input
                type="text"
                value={editingApp.company}
                onChange={(e) =>
                  setEditingApp({
                    ...editingApp,
                    company: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                value={editingApp.role}
                onChange={(e) =>
                  setEditingApp({
                    ...editingApp,
                    role: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                value={editingApp.location}
                onChange={(e) =>
                  setEditingApp({
                    ...editingApp,
                    location: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500"
              />
              <select
                value={editingApp.status}
                onChange={(e) =>
                  setEditingApp({
                    ...editingApp,
                    status: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingApp(null)}
                className="rounded-xl border border-zinc-700 px-5 py-2"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  console.log("BUTTON CLICKED");
                  handleSaveChanges();
                }}
                className="cursor-pointer rounded-xl bg-blue-500 px-5 py-2 hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Applications;
