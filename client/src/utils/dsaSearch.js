import { mergeQuestionWithProgress } from "./revisionUtils";

export function filterQuestions(topics, questionProgress, searchText) {
  const query = searchText.trim().toLowerCase();

  if (!query) {
    return {
      hasSearch: false,
      hasResults: true,
      matchingTopicIds: [],
      matchingDifficultyKeys: [],
      matchingQuestions: {},
    };
  }

  const matchingTopicIds = [];
  const matchingDifficultyKeys = [];
  const matchingQuestions = {};
  let hasResults = false;

  topics.forEach((topic) => {
    const topicMatches = topic.title.toLowerCase().includes(query);
    let topicHasMatch = false;

    topic.difficulties.forEach((difficulty) => {
      const difficultyKey = `${topic.id}-${difficulty.id}`;

      const builtInQuestions = difficulty.questions.map((question) =>
        mergeQuestionWithProgress(
          question,
          topic.id,
          difficulty.id,
          questionProgress,
        ),
      );

      const filteredQuestions = builtInQuestions.filter((question) => {
        const questionMatches = question.title.toLowerCase().includes(query);
        return topicMatches || questionMatches;
      });

      if (filteredQuestions.length > 0) {
        matchingDifficultyKeys.push(difficultyKey);
        matchingQuestions[difficultyKey] = filteredQuestions;
        topicHasMatch = true;
        hasResults = true;
      }
    });

    if (topicHasMatch) {
      matchingTopicIds.push(topic.id);
    }
  });

  return {
    hasSearch: true,
    hasResults,
    matchingTopicIds,
    matchingDifficultyKeys,
    matchingQuestions,
  };
}
