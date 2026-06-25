import api from "./api";

export async function fetchDsaProgress() {
  const response = await api.get("/api/dsa/progress");
  return response.data.progress;
}

export async function saveDsaProgress(questionKey, payload) {
  const response = await api.put(
    `/api/dsa/progress/${encodeURIComponent(questionKey)}`,
    payload,
  );
  return response.data;
}

export async function fetchDsaStats() {
  const response = await api.get("/api/dsa/stats");
  return response.data;
}

export async function updateDsaStats(payload) {
  const response = await api.put("/api/dsa/stats", payload);
  return response.data;
}

export async function fetchDailyTasks() {
  const response = await api.get("/api/daily-tasks");
  return response.data;
}

export async function createDailyTask(payload) {
  const response = await api.post("/api/daily-tasks", payload);
  return response.data;
}

export async function updateDailyTask(id, payload) {
  const response = await api.put(`/api/daily-tasks/${id}`, payload);
  return response.data;
}

export async function completeDailyTask(id) {
  const response = await api.patch(`/api/tasks/${id}`, {
    status: "completed",
  });
  return response.data;
}

export async function deleteDailyTask(id) {
  const response = await api.delete(`/api/daily-tasks/${id}`);
  return response.data;
}
