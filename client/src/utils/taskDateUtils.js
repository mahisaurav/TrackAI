export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateLabel(dateStr) {
  if (!dateStr) {
    return "—";
  }

  const parsed = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(parsed.getTime())) {
    return dateStr;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function resolveTaskStatus(task) {
  if (task.completed || task.status === "completed") {
    return "completed";
  }

  const todayKey = getTodayKey();

  if (task.taskDate < todayKey) {
    return "missed";
  }

  return "pending";
}

export function groupTasksByStatus(tasks) {
  const pending = [];
  const completed = [];
  const missed = [];

  tasks.forEach((task) => {
    const status = resolveTaskStatus(task);

    if (status === "completed") {
      completed.push({ ...task, status });
    } else if (status === "missed") {
      missed.push({ ...task, status });
    } else {
      pending.push({ ...task, status });
    }
  });

  pending.sort((a, b) => a.taskDate.localeCompare(b.taskDate) || b.id - a.id);
  completed.sort((a, b) => {
    const aTime = a.completedAt || a.taskDate;
    const bTime = b.completedAt || b.taskDate;
    return bTime.localeCompare(aTime);
  });
  missed.sort((a, b) => a.taskDate.localeCompare(b.taskDate));

  return { pending, completed, missed };
}

export function countTaskStats(tasks) {
  const grouped = groupTasksByStatus(tasks);

  return {
    total: tasks.length,
    pending: grouped.pending.length,
    completed: grouped.completed.length,
    missed: grouped.missed.length,
  };
}
