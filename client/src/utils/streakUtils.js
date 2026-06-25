import { getTodayDate } from "./revisionUtils";

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateBefore(dateKey, daysBack) {
  const date = new Date(dateKey + "T00:00:00");
  date.setDate(date.getDate() - daysBack);
  return formatDateKey(date);
}

export function normalizeActivityLog(raw) {
  if (!raw || typeof raw !== "object") {
    return {};
  }

  const normalized = {};

  Object.entries(raw).forEach(([dateKey, value]) => {
    if (typeof value === "number") {
      normalized[dateKey] = { solved: value, revisions: 0, tasks: 0 };
      return;
    }

    normalized[dateKey] = {
      solved: value?.solved || 0,
      revisions: value?.revisions || 0,
      tasks: value?.tasks || 0,
    };
  });

  return normalized;
}

function isDayActive(dayLog, dailyGoal) {
  if (!dayLog) {
    return false;
  }

  return (
    dayLog.solved >= dailyGoal ||
    dayLog.revisions > 0 ||
    dayLog.tasks > 0
  );
}

export function getSolvedToday(activityLog) {
  const log = normalizeActivityLog(activityLog);
  return log[getTodayDate()]?.solved || 0;
}

export function calculateCurrentStreak(activityLog, dailyGoal) {
  const log = normalizeActivityLog(activityLog);

  if (dailyGoal <= 0) {
    return 0;
  }

  let streak = 0;
  let checkDate = getTodayDate();
  const todayLog = log[checkDate];

  if (!isDayActive(todayLog, dailyGoal)) {
    checkDate = getDateBefore(checkDate, 1);
  }

  while (isDayActive(log[checkDate], dailyGoal)) {
    streak += 1;
    checkDate = getDateBefore(checkDate, 1);
  }

  return streak;
}

export function calculateLongestStreak(activityLog, dailyGoal) {
  const log = normalizeActivityLog(activityLog);
  const dates = Object.keys(log).sort();

  if (dates.length === 0 || dailyGoal <= 0) {
    return 0;
  }

  let longest = 0;
  let current = 0;
  let previousActiveDate = null;

  dates.forEach((dateKey) => {
    if (isDayActive(log[dateKey], dailyGoal)) {
      if (
        previousActiveDate &&
        getDateBefore(dateKey, 1) === previousActiveDate
      ) {
        current += 1;
      } else {
        current = 1;
      }

      if (current > longest) {
        longest = current;
      }

      previousActiveDate = dateKey;
    } else {
      current = 0;
      previousActiveDate = null;
    }
  });

  return longest;
}

export function updateDailyGoal(streakData, newGoal) {
  const dailyGoal = Number(newGoal);

  if (Number.isNaN(dailyGoal) || dailyGoal < 1) {
    return streakData;
  }

  return {
    ...streakData,
    dailyGoal,
  };
}

export function isRevisedToday(lastRevisionDate) {
  return lastRevisionDate === getTodayDate();
}
