const prisma = require("../prismaClient");
const {
  calculateCurrentStreak,
  calculateLongestStreak,
  recordActivity,
  removeSolvedActivity,
  getTodayKey,
  normalizeActivityLog,
} = require("../utils/streakCalculator");

function progressToClient(record) {
  return {
    questionKey: record.questionKey,
    completed: record.completed,
    confidence: record.confidence,
    notes: record.notes,
    lastRevisionDate: record.lastRevision
      ? record.lastRevision.toISOString().slice(0, 10)
      : null,
    nextRevisionDate: record.nextRevision
      ? record.nextRevision.toISOString().slice(0, 10)
      : null,
  };
}

function statsToClient(stats) {
  const activityLog = normalizeActivityLog(stats.activityLog);

  return {
    dailyGoal: stats.dailyGoal,
    activityLog,
    currentStreak: calculateCurrentStreak(activityLog, stats.dailyGoal),
    longestStreak: calculateLongestStreak(activityLog, stats.dailyGoal),
    lastActiveDate: stats.lastActiveDate
      ? stats.lastActiveDate.toISOString().slice(0, 10)
      : null,
  };
}

async function getOrCreateStats(userId) {
  let stats = await prisma.dsaUserStats.findUnique({
    where: { userId },
  });

  if (!stats) {
    stats = await prisma.dsaUserStats.create({
      data: { userId },
    });
  }

  return stats;
}

async function updateStatsWithActivity(userId, activityType, undoSolve = false) {
  const stats = await getOrCreateStats(userId);
  let activityLog = normalizeActivityLog(stats.activityLog);

  if (undoSolve) {
    activityLog = removeSolvedActivity(activityLog);
  } else if (activityType) {
    activityLog = recordActivity(activityLog, activityType);
  }

  const currentStreak = calculateCurrentStreak(activityLog, stats.dailyGoal);
  const longestStreak = Math.max(
    stats.longestStreak,
    calculateLongestStreak(activityLog, stats.dailyGoal),
  );

  const updated = await prisma.dsaUserStats.update({
    where: { userId },
    data: {
      activityLog,
      currentStreak,
      longestStreak,
      lastActiveDate: new Date(getTodayKey() + "T00:00:00"),
    },
  });

  return statsToClient(updated);
}

const getProgress = async (req, res) => {
  try {
    const records = await prisma.dsaProgress.findMany({
      where: { userId: req.user.id },
    });

    const progressMap = {};
    records.forEach((record) => {
      progressMap[record.questionKey] = progressToClient(record);
    });

    res.json({ progress: progressMap });
  } catch {
    res.status(500).json({ error: "Failed to fetch DSA progress" });
  }
};

const upsertProgress = async (req, res) => {
  try {
    const { questionKey } = req.params;
    const {
      completed,
      confidence,
      notes,
      lastRevisionDate,
      nextRevisionDate,
      recordSolve,
      undoSolve,
      recordRevision,
    } = req.body;

    if (!questionKey) {
      return res.status(400).json({ error: "Question key is required" });
    }

    const existing = await prisma.dsaProgress.findUnique({
      where: {
        userId_questionKey: {
          userId: req.user.id,
          questionKey,
        },
      },
    });

    const data = {};

    if (completed !== undefined) {
      data.completed = completed;
    }

    if (confidence !== undefined) {
      data.confidence = confidence;
    }

    if (notes !== undefined) {
      data.notes = notes;
    }

    if (lastRevisionDate !== undefined) {
      data.lastRevision = lastRevisionDate
        ? new Date(lastRevisionDate + "T00:00:00")
        : null;
    }

    if (nextRevisionDate !== undefined) {
      data.nextRevision = nextRevisionDate
        ? new Date(nextRevisionDate + "T00:00:00")
        : null;
    }

    let record;

    if (existing) {
      record = await prisma.dsaProgress.update({
        where: { id: existing.id },
        data,
      });
    } else {
      record = await prisma.dsaProgress.create({
        data: {
          userId: req.user.id,
          questionKey,
          completed: completed || false,
          confidence: confidence || null,
          notes: notes || null,
          lastRevision: lastRevisionDate
            ? new Date(lastRevisionDate + "T00:00:00")
            : null,
          nextRevision: nextRevisionDate
            ? new Date(nextRevisionDate + "T00:00:00")
            : null,
        },
      });
    }

    let stats = null;

    const todayKey = getTodayKey();
    const alreadyRevisedToday =
      existing?.lastRevision &&
      existing.lastRevision.toISOString().slice(0, 10) === todayKey;

    if (recordSolve) {
      stats = await updateStatsWithActivity(req.user.id, "solved");
    } else if (undoSolve) {
      stats = await updateStatsWithActivity(req.user.id, null, true);
    } else if (recordRevision && !alreadyRevisedToday) {
      stats = await updateStatsWithActivity(req.user.id, "revisions");
    }

    res.json({
      progress: progressToClient(record),
      stats,
    });
  } catch {
    res.status(500).json({ error: "Failed to save DSA progress" });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await getOrCreateStats(req.user.id);
    res.json(statsToClient(stats));
  } catch {
    res.status(500).json({ error: "Failed to fetch DSA stats" });
  }
};

const updateStats = async (req, res) => {
  try {
    const { dailyGoal } = req.body;
    const parsedGoal = Number(dailyGoal);

    if (Number.isNaN(parsedGoal) || parsedGoal < 1) {
      return res.status(400).json({ error: "Daily goal must be at least 1" });
    }

    const stats = await getOrCreateStats(req.user.id);
    const activityLog = normalizeActivityLog(stats.activityLog);

    const updated = await prisma.dsaUserStats.update({
      where: { userId: req.user.id },
      data: {
        dailyGoal: parsedGoal,
        currentStreak: calculateCurrentStreak(activityLog, parsedGoal),
        longestStreak: calculateLongestStreak(activityLog, parsedGoal),
      },
    });

    res.json(statsToClient(updated));
  } catch {
    res.status(500).json({ error: "Failed to update DSA stats" });
  }
};

const recordTaskActivity = async (req, res) => {
  try {
    const stats = await updateStatsWithActivity(req.user.id, "tasks");
    res.json(stats);
  } catch {
    res.status(500).json({ error: "Failed to record task activity" });
  }
};

module.exports = {
  getProgress,
  upsertProgress,
  getStats,
  updateStats,
  recordTaskActivity,
  updateStatsWithActivity,
};
