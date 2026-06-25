export function getQuestionKey(topicId, difficultyId, questionId) {
  return `${topicId}-${difficultyId}-${questionId}`;
}

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateNextRevisionDate(confidence, fromDate) {
  let daysToAdd = 1;

  if (confidence === "confident") {
    daysToAdd = 7;
  } else if (confidence === "revision") {
    daysToAdd = 3;
  }

  const start = fromDate ? new Date(fromDate + "T00:00:00") : new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + daysToAdd);

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, "0");
  const day = String(start.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isRevisionDue(nextRevisionDate) {
  if (!nextRevisionDate || nextRevisionDate === "-") {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(nextRevisionDate);
  if (Number.isNaN(dueDate.getTime())) {
    return false;
  }

  dueDate.setHours(0, 0, 0, 0);
  return dueDate <= today;
}

export function markQuestionAsRevised(question) {
  const today = getTodayDate();
  const confidence = question.confidence || "forgotten";
  const nextRevisionDate = calculateNextRevisionDate(confidence, today);

  return {
    lastRevisionDate: today,
    nextRevisionDate: nextRevisionDate,
  };
}

export function normalizeDateForInput(dateStr) {
  if (!dateStr || dateStr === "-") {
    return "";
  }

  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function mergeQuestionWithProgress(
  question,
  topicId,
  difficultyId,
  questionProgress,
) {
  const key = getQuestionKey(topicId, difficultyId, question.id);
  const saved = questionProgress[key];

  if (!saved) {
    return question;
  }

  return { ...question, ...saved };
}

export function getDueQuestions(topics, questionProgress) {
  const dueList = [];

  topics.forEach((topic) => {
    topic.difficulties.forEach((difficulty) => {
      difficulty.questions.forEach((question) => {
        const merged = mergeQuestionWithProgress(
          question,
          topic.id,
          difficulty.id,
          questionProgress,
        );

        const nextDate = merged.nextRevisionDate;

        if (isRevisionDue(nextDate)) {
          dueList.push({
            id: getQuestionKey(topic.id, difficulty.id, question.id),
            title: merged.title,
            topic: topic.title,
            nextRevisionDate: nextDate,
          });
        }
      });
    });
  });

  return dueList;
}
