import { useCallback, useEffect, useState } from "react";
import ProgressCards from "../components/DSA/ProgressCards";
import AnalyticsCards from "../components/DSA/AnalyticsCards";
import SearchBar from "../components/DSA/SearchBar";
import TopicAccordion from "../components/DSA/TopicAccordion";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import RevisionQueue from "../components/DSA/RevisionQueue";
import dsaTopics from "../data/dsaTopic";
import {
  getQuestionKey,
  markQuestionAsRevised,
  getDueQuestions,
} from "../utils/revisionUtils";
import { isRevisedToday } from "../utils/streakUtils";
import { getAnalytics } from "../utils/dsaAnalytics";
import {
  fetchDsaProgress,
  fetchDsaStats,
  saveDsaProgress,
  updateDsaStats,
} from "../api/dsaApi";
import {
  getSolvedToday,
  calculateCurrentStreak,
  calculateLongestStreak,
  normalizeActivityLog,
} from "../utils/streakUtils";

function DSASheet() {
  const [questionProgress, setQuestionProgress] = useState({});
  const [streakData, setStreakData] = useState({
    dailyGoal: 3,
    activityLog: {},
  });
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingKey, setSavingKey] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [progress, stats] = await Promise.all([
        fetchDsaProgress(),
        fetchDsaStats(),
      ]);

      setQuestionProgress(progress);
      setStreakData({
        dailyGoal: stats.dailyGoal,
        activityLog: normalizeActivityLog(stats.activityLog),
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
      });
    } catch {
      setError("Failed to load DSA progress. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const persistProgress = async (questionKey, payload) => {
    setSavingKey(questionKey);

    try {
      const result = await saveDsaProgress(questionKey, payload);

      setQuestionProgress((prev) => ({
        ...prev,
        [questionKey]: result.progress,
      }));

      if (result.stats) {
        setStreakData((prev) => ({
          ...prev,
          activityLog: normalizeActivityLog(result.stats.activityLog),
          currentStreak: result.stats.currentStreak,
          longestStreak: result.stats.longestStreak,
        }));
      }
    } catch {
      setError("Failed to save progress. Please try again.");
    } finally {
      setSavingKey(null);
    }
  };

  const updateBuiltInQuestion = (
    topicId,
    difficultyId,
    questionId,
    updates,
    activityFlags = {},
  ) => {
    const key = getQuestionKey(topicId, difficultyId, questionId);
    persistProgress(key, { ...updates, ...activityFlags });
  };

  const handleMarkRevised = (topicId, difficultyId, question) => {
    if (isRevisedToday(question.lastRevisionDate)) {
      return;
    }

    const revisionUpdate = markQuestionAsRevised(question);
    updateBuiltInQuestion(topicId, difficultyId, question.id, revisionUpdate, {
      recordRevision: true,
    });
  };

  const handleConfidenceChange = (
    topicId,
    difficultyId,
    question,
    newConfidence,
  ) => {
    updateBuiltInQuestion(topicId, difficultyId, question.id, {
      confidence: newConfidence,
    });
  };

  const handleRevisionDateChange = (
    topicId,
    difficultyId,
    question,
    field,
    value,
  ) => {
    const apiField =
      field === "lastRevisionDate" ? "lastRevisionDate" : "nextRevisionDate";

    updateBuiltInQuestion(topicId, difficultyId, question.id, {
      [apiField]: value || null,
    });
  };

  const handleToggleCompleted = (
    topicId,
    difficultyId,
    question,
    newCompleted,
  ) => {
    const wasCompleted = question.completed || false;

    updateBuiltInQuestion(
      topicId,
      difficultyId,
      question.id,
      { completed: newCompleted },
      {
        recordSolve: !wasCompleted && newCompleted,
        undoSolve: wasCompleted && !newCompleted,
      },
    );
  };

  const handleNotesSave = (topicId, difficultyId, question, notes) => {
    updateBuiltInQuestion(topicId, difficultyId, question.id, { notes });
  };

  const handleDailyGoalChange = async (newGoal) => {
    try {
      const stats = await updateDsaStats({ dailyGoal: Number(newGoal) });
      setStreakData((prev) => ({
        ...prev,
        dailyGoal: stats.dailyGoal,
        activityLog: normalizeActivityLog(stats.activityLog),
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
      }));
    } catch {
      setError("Failed to update daily goal.");
    }
  };

  const dueQuestions = getDueQuestions(dsaTopics, questionProgress);

  const analytics = getAnalytics(
    dsaTopics,
    questionProgress,
    dueQuestions.length,
  );

  const activityLog = streakData.activityLog || {};
  const dailyGoal = streakData.dailyGoal || 3;
  const solvedToday = getSolvedToday(activityLog);
  const currentStreak =
    streakData.currentStreak ?? calculateCurrentStreak(activityLog, dailyGoal);
  const longestStreak =
    streakData.longestStreak ?? calculateLongestStreak(activityLog, dailyGoal);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-zinc-500">Loading DSA sheet...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">DSA Sheet</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Curated placement prep — track solves, revisions, and notes
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <ProgressCards
          dailyGoal={dailyGoal}
          solvedToday={solvedToday}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          onDailyGoalChange={handleDailyGoalChange}
        />

        <AnalyticsCards analytics={analytics} />

        <SearchBar searchText={searchText} onSearchChange={setSearchText} />

        <RevisionQueue dueQuestions={dueQuestions} />

        <TopicAccordion
          questionProgress={questionProgress}
          searchText={searchText}
          savingKey={savingKey}
          onMarkRevised={handleMarkRevised}
          onConfidenceChange={handleConfidenceChange}
          onRevisionDateChange={handleRevisionDateChange}
          onToggleCompleted={handleToggleCompleted}
          onNotesSave={handleNotesSave}
        />
      </div>
    </DashboardLayout>
  );
}

export default DSASheet;
