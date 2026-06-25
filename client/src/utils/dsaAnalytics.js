import { mergeQuestionWithProgress } from "./revisionUtils";

export function getAllQuestions(topics, questionProgress) {
  const allQuestions = [];

  topics.forEach((topic) => {
    topic.difficulties.forEach((difficulty) => {
      difficulty.questions.forEach((question) => {
        const merged = mergeQuestionWithProgress(
          question,
          topic.id,
          difficulty.id,
          questionProgress,
        );

        allQuestions.push({
          ...merged,
          topicId: topic.id,
          topicTitle: topic.title,
          difficultyId: difficulty.id,
          difficultyTitle: difficulty.title,
        });
      });
    });
  });

  return allQuestions;
}

export function getAnalytics(topics, questionProgress, dueCount) {
  const allQuestions = getAllQuestions(topics, questionProgress);

  const total = allQuestions.length;
  const solved = allQuestions.filter((question) => question.completed).length;

  const easyTotal = allQuestions.filter(
    (question) => question.difficultyId === "easy",
  ).length;
  const mediumTotal = allQuestions.filter(
    (question) => question.difficultyId === "medium",
  ).length;
  const hardTotal = allQuestions.filter(
    (question) => question.difficultyId === "hard",
  ).length;

  const easySolved = allQuestions.filter(
    (question) => question.difficultyId === "easy" && question.completed,
  ).length;

  const mediumSolved = allQuestions.filter(
    (question) => question.difficultyId === "medium" && question.completed,
  ).length;

  const hardSolved = allQuestions.filter(
    (question) => question.difficultyId === "hard" && question.completed,
  ).length;

  const completionPercentage =
    total === 0 ? 0 : Math.round((solved / total) * 100);

  return {
    totalQuestions: total,
    solvedQuestions: solved,
    easySolved,
    mediumSolved,
    hardSolved,
    easyTotal,
    mediumTotal,
    hardTotal,
    dueToday: dueCount,
    completionPercentage,
  };
}
