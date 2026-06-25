const STORAGE_KEYS = {
  customQuestions: "customQuestions",
  questionProgress: "dsaQuestionProgress",
  streakData: "dsaStreakData",
};

export function getDefaultStreakData() {
  return {
    dailyGoal: 3,
    activityLog: {},
  };
}

export function loadCustomQuestions() {
  const saved = localStorage.getItem(STORAGE_KEYS.customQuestions);
  return saved ? JSON.parse(saved) : [];
}

export function saveCustomQuestions(questions) {
  localStorage.setItem(
    STORAGE_KEYS.customQuestions,
    JSON.stringify(questions),
  );
}

export function loadQuestionProgress() {
  const saved = localStorage.getItem(STORAGE_KEYS.questionProgress);
  return saved ? JSON.parse(saved) : {};
}

export function saveQuestionProgress(progress) {
  localStorage.setItem(
    STORAGE_KEYS.questionProgress,
    JSON.stringify(progress),
  );
}

export function loadStreakData() {
  const saved = localStorage.getItem(STORAGE_KEYS.streakData);
  return saved ? JSON.parse(saved) : getDefaultStreakData();
}

export function saveStreakData(data) {
  localStorage.setItem(STORAGE_KEYS.streakData, JSON.stringify(data));
}
