/**
 * Date-only helpers for Daily Tasks.
 * Store task dates as UTC midnight from YYYY-MM-DD strings to avoid timezone drift.
 */

function parseTaskDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatTaskDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function resolveTaskStatus(task) {
  if (task.status === "completed") {
    return "completed";
  }

  const taskDateKey = formatTaskDate(task.taskDate);
  const todayKey = getTodayKey();

  if (taskDateKey < todayKey) {
    return "missed";
  }

  return "pending";
}

module.exports = {
  parseTaskDateKey,
  formatTaskDate,
  getTodayKey,
  resolveTaskStatus,
};
