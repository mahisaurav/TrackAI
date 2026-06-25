const prisma = require("../prismaClient");
const { updateStatsWithActivity } = require("./dsaController");
const {
  parseTaskDateKey,
  formatTaskDate,
  getTodayKey,
  resolveTaskStatus,
} = require("../utils/taskDateUtils");

function taskToClient(task) {
  const completed = task.status === "completed";
  const displayStatus = resolveTaskStatus(task);

  return {
    id: task.id,
    title: task.title,
    status: displayStatus,
    completed,
    taskDate: formatTaskDate(task.taskDate),
    completedAt: task.completedAt ? task.completedAt.toISOString() : null,
    createdAt: task.createdAt.toISOString(),
  };
}

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.dailyTask.findMany({
      where: { userId: req.user.id },
      orderBy: [{ taskDate: "desc" }, { createdAt: "desc" }],
    });

    res.json(tasks.map(taskToClient));
  } catch {
    res.status(500).json({ error: "Failed to fetch daily tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, taskDate } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const date = taskDate
      ? parseTaskDateKey(taskDate)
      : parseTaskDateKey(getTodayKey());

    const task = await prisma.dailyTask.create({
      data: {
        userId: req.user.id,
        title: title.trim(),
        taskDate: date,
        status: "pending",
      },
    });

    res.status(201).json(taskToClient(task));
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const { title, taskDate, status } = req.body;

    const existing = await prisma.dailyTask.findFirst({
      where: { id: taskId, userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    const data = {};
    const wasCompleted = existing.status === "completed";

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ error: "Task title is required" });
      }
      data.title = title.trim();
    }

    if (taskDate !== undefined) {
      data.taskDate = parseTaskDateKey(taskDate);
    }

    if (status === "completed") {
      data.status = "completed";
      data.completedAt = new Date();
    } else if (status === "pending") {
      data.status = "pending";
      data.completedAt = null;
    }

    const task = await prisma.dailyTask.update({
      where: { id: taskId },
      data,
    });

    if (status === "completed" && !wasCompleted) {
      await updateStatsWithActivity(req.user.id, "tasks");
    }

    res.json(taskToClient(task));
  } catch {
    res.status(500).json({ error: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const existing = await prisma.dailyTask.findFirst({
      where: { id: taskId, userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    await prisma.dailyTask.delete({ where: { id: taskId } });
    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
