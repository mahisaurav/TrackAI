import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import {
  fetchDailyTasks,
  createDailyTask,
  updateDailyTask,
  completeDailyTask,
  deleteDailyTask,
} from "../api/dsaApi";
import {
  getTodayKey,
  formatDateLabel,
  groupTasksByStatus,
  countTaskStats,
} from "../utils/taskDateUtils";

function StatusBadge({ status }) {
  const styles = {
    pending: "border-zinc-600 bg-zinc-800 text-zinc-300",
    completed: "border-zinc-700 bg-zinc-800/50 text-zinc-500",
    missed: "border-zinc-600 bg-zinc-800 text-zinc-300",
  };

  const labels = {
    pending: "Pending",
    completed: "Completed",
    missed: "Missed",
  };

  return (
    <span
      className={`inline-flex rounded border px-2 py-0.5 text-xs font-medium ${styles[status] || styles.pending}`}
    >
      {labels[status] || status}
    </span>
  );
}

function SummaryCards({ stats }) {
  const cards = [
    { label: "Total Tasks", value: stats.total },
    { label: "Pending", value: stats.pending },
    { label: "Completed", value: stats.completed },
    { label: "Missed", value: stats.missed },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5"
        >
          <p className="text-xs text-zinc-500">{card.label}</p>
          <p className="mt-0.5 text-xl font-semibold text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

function TaskListHeader() {
  return (
    <div className="hidden min-w-[680px] grid-cols-[32px_1fr_88px_96px_168px] gap-3 border-b border-zinc-800 px-3 pb-2 text-xs font-medium uppercase tracking-wide text-zinc-600 sm:grid">
      <span />
      <span>Task</span>
      <span>Status</span>
      <span>Date</span>
      <span className="text-right">Actions</span>
    </div>
  );
}

function TaskRow({ task, onComplete, onEdit, onDelete, completingId, highlight }) {
  const isCompleted = task.status === "completed";
  const isCompleting = completingId === task.id;
  const canComplete = !isCompleted;

  return (
    <div
      className={`grid min-w-[680px] grid-cols-[32px_1fr_88px_96px_168px] items-center gap-3 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 ${
        highlight ? "border-l-2 border-l-amber-600" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        disabled={!canComplete || isCompleting}
        onChange={() => canComplete && onComplete(task.id)}
        className="h-4 w-4 cursor-pointer accent-zinc-300 disabled:cursor-not-allowed"
        aria-label={`Mark "${task.title}" as complete`}
      />

      <p
        className={`truncate text-sm ${isCompleted ? "text-zinc-500 line-through" : "font-medium text-zinc-100"}`}
      >
        {task.title}
      </p>

      <StatusBadge status={task.status} />

      <p className="text-xs text-zinc-500">{formatDateLabel(task.taskDate)}</p>

      <div className="flex items-center justify-end gap-1">
        {canComplete && (
          <button
            type="button"
            onClick={() => onComplete(task.id)}
            disabled={isCompleting}
            className="cursor-pointer rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCompleting ? "Saving…" : "Complete"}
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="cursor-pointer rounded px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="cursor-pointer rounded px-2 py-1 text-xs text-zinc-500 hover:text-zinc-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function TaskSection({
  title,
  tasks,
  emptyMessage,
  onComplete,
  onEdit,
  onDelete,
  completingId,
  primary = false,
  highlightToday = false,
}) {
  const today = getTodayKey();

  return (
    <section
      className={`rounded-lg border p-3 ${
        primary ? "border-zinc-700 bg-zinc-900/50" : "border-zinc-800 bg-zinc-900/30"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h2
          className={`text-sm font-medium ${primary ? "text-white" : "text-zinc-300"}`}
        >
          {title}
        </h2>
        <span className="text-xs text-zinc-600">{tasks.length}</span>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-zinc-600">{emptyMessage}</p>
      ) : (
        <div className="overflow-x-auto">
          <TaskListHeader />
          <div className="mt-1.5 space-y-1">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onComplete={onComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                completingId={completingId}
                highlight={
                  highlightToday &&
                  task.status === "pending" &&
                  task.taskDate === today
                }
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TaskFormModal({ isOpen, onClose, onSubmit, initialTask }) {
  const [title, setTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (initialTask) {
      setTitle(initialTask.title);
      setTaskDate(initialTask.taskDate);
    } else {
      setTitle("");
      setTaskDate(getTodayKey());
    }
  }, [initialTask, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        title: title.trim(),
        taskDate,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-5"
      >
        <h3 className="text-lg font-medium text-white">
          {initialTask ? "Edit Task" : "Add Task"}
        </h3>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-zinc-500">Task</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solve 3 Array questions"
              className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white"
              required
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500">Due date</label>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="mt-1 w-full cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white"
              required
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
          >
            {saving ? "Saving…" : initialTask ? "Save" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

function DailyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [completingId, setCompletingId] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchDailyTasks();
      setTasks(data);
    } catch {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const stats = useMemo(() => countTaskStats(tasks), [tasks]);

  const groupedTasks = useMemo(() => groupTasksByStatus(tasks), [tasks]);

  const handleCreate = async (payload) => {
    try {
      const created = await createDailyTask(payload);
      setTasks((prev) => [created, ...prev]);
      setShowForm(false);
    } catch {
      setError("Failed to create task.");
    }
  };

  const handleUpdate = async (payload) => {
    if (!editingTask) {
      return;
    }

    try {
      const updated = await updateDailyTask(editingTask.id, payload);
      setTasks((prev) =>
        prev.map((task) => (task.id === updated.id ? updated : task)),
      );
      setEditingTask(null);
    } catch {
      setError("Failed to update task.");
    }
  };

  const handleComplete = async (id) => {
    const previous = tasks;

    setCompletingId(id);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "completed",
              completed: true,
              completedAt: new Date().toISOString(),
            }
          : task,
      ),
    );

    try {
      const updated = await completeDailyTask(id);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated : task)),
      );
    } catch {
      setTasks(previous);
      setError("Failed to complete task.");
    } finally {
      setCompletingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    try {
      await deleteDailyTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setError("Failed to delete task.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-white">Daily Tasks</h1>
            <p className="text-sm text-zinc-500">Plan and finish your daily prep</p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="cursor-pointer rounded-lg bg-zinc-100 px-3.5 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
          >
            + Add Task
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-zinc-500">Loading tasks...</p>
        ) : (
          <>
            <SummaryCards stats={stats} />

            <div className="space-y-3">
              <TaskSection
                title="Pending Tasks"
                tasks={groupedTasks.pending}
                emptyMessage={
                  stats.total === 0
                    ? "Create your first task to get started."
                    : "No pending tasks today."
                }
                onComplete={handleComplete}
                onEdit={setEditingTask}
                onDelete={handleDelete}
                completingId={completingId}
                primary
                highlightToday
              />

              <TaskSection
                title="Completed Tasks"
                tasks={groupedTasks.completed}
                emptyMessage="No completed tasks yet."
                onComplete={handleComplete}
                onEdit={setEditingTask}
                onDelete={handleDelete}
                completingId={completingId}
              />

              <TaskSection
                title="Missed Tasks"
                tasks={groupedTasks.missed}
                emptyMessage="No missed tasks."
                onComplete={handleComplete}
                onEdit={setEditingTask}
                onDelete={handleDelete}
                completingId={completingId}
              />
            </div>
          </>
        )}
      </div>

      <TaskFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleCreate}
      />

      <TaskFormModal
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        initialTask={editingTask}
        onSubmit={handleUpdate}
      />
    </DashboardLayout>
  );
}

export default DailyTasks;
