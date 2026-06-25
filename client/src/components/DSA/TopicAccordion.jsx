import { useState, useEffect } from "react";
import dsaTopics, {
  getTopicCounts,
  getDifficultyCounts,
} from "../../data/dsaTopic";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import QuestionTable from "./QuestionTable";
import { mergeQuestionWithProgress } from "../../utils/revisionUtils";
import { filterQuestions } from "../../utils/dsaSearch";

function TopicAccordion({
  questionProgress,
  searchText,
  savingKey,
  onMarkRevised,
  onConfidenceChange,
  onRevisionDateChange,
  onToggleCompleted,
  onNotesSave,
}) {
  const [activeTopics, setActiveTopics] = useState([]);
  const [activeDifficulty, setActiveDifficulty] = useState([]);

  const searchResults = filterQuestions(
    dsaTopics,
    questionProgress,
    searchText,
  );

  useEffect(() => {
    if (!searchResults.hasSearch) {
      return;
    }

    if (searchResults.hasResults) {
      setActiveTopics(searchResults.matchingTopicIds);
      setActiveDifficulty(searchResults.matchingDifficultyKeys);
    }
  }, [searchText, questionProgress]);

  const toggleTopic = (id) => {
    setActiveTopics((prev) =>
      prev.includes(id)
        ? prev.filter((topicId) => topicId !== id)
        : [...prev, id],
    );
  };

  const toggleDifficulty = (key) => {
    setActiveDifficulty((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key],
    );
  };

  if (searchResults.hasSearch && !searchResults.hasResults) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-2 text-lg font-medium text-white">Topics</h2>
        <p className="text-sm text-zinc-500">No questions match your search.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="mb-5 text-lg font-medium text-white">Topics</h2>

      <div className="space-y-3">
        {dsaTopics.map((topic) => {
          if (
            searchResults.hasSearch &&
            !searchResults.matchingTopicIds.includes(topic.id)
          ) {
            return null;
          }

          const topicCounts = getTopicCounts(topic, questionProgress);

          return (
            <div
              key={topic.id}
              className="overflow-hidden rounded-lg border border-zinc-800"
            >
              <button
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/40"
              >
                <div className="flex items-center gap-3">
                  {activeTopics.includes(topic.id) ? (
                    <FaChevronDown className="text-xs text-zinc-500" />
                  ) : (
                    <FaChevronRight className="text-xs text-zinc-500" />
                  )}
                  <span className="font-medium text-white">{topic.title}</span>
                </div>
                <span className="text-sm text-zinc-500">
                  {topicCounts.solved}/{topicCounts.total}
                </span>
              </button>

              {activeTopics.includes(topic.id) && (
                <div className="border-t border-zinc-800 p-4">
                  <div className="space-y-2">
                    {topic.difficulties.map((difficulty) => {
                      const difficultyKey = `${topic.id}-${difficulty.id}`;

                      if (
                        searchResults.hasSearch &&
                        !searchResults.matchingDifficultyKeys.includes(
                          difficultyKey,
                        )
                      ) {
                        return null;
                      }

                      let allQuestions;

                      if (searchResults.hasSearch) {
                        allQuestions =
                          searchResults.matchingQuestions[difficultyKey] || [];
                      } else {
                        allQuestions = difficulty.questions.map((question) =>
                          mergeQuestionWithProgress(
                            question,
                            topic.id,
                            difficulty.id,
                            questionProgress,
                          ),
                        );
                      }

                      const diffCounts = getDifficultyCounts(
                        topic.id,
                        difficulty,
                        questionProgress,
                      );

                      const progressPercent =
                        diffCounts.total === 0
                          ? 0
                          : (diffCounts.solved / diffCounts.total) * 100;

                      return (
                        <div
                          key={difficultyKey}
                          className="overflow-hidden rounded-lg border border-zinc-800/80"
                        >
                          <button
                            type="button"
                            onClick={() => toggleDifficulty(difficultyKey)}
                            className="flex w-full cursor-pointer items-center justify-between px-3 py-2.5 hover:bg-zinc-800/30"
                          >
                            <div className="flex items-center gap-2">
                              {activeDifficulty.includes(difficultyKey) ? (
                                <FaChevronDown className="text-xs text-zinc-600" />
                              ) : (
                                <FaChevronRight className="text-xs text-zinc-600" />
                              )}
                              <span className="text-sm font-medium text-zinc-300">
                                {difficulty.title}
                              </span>
                            </div>
                            <span className="text-xs text-zinc-500">
                              {diffCounts.solved}/{diffCounts.total}
                            </span>
                          </button>

                          <div className="px-3 pb-2">
                            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                              <div
                                className={`h-full rounded-full ${
                                  difficulty.id === "easy"
                                    ? "bg-emerald-600"
                                    : difficulty.id === "medium"
                                      ? "bg-amber-600"
                                      : "bg-rose-600"
                                }`}
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>

                          {activeDifficulty.includes(difficultyKey) && (
                            <div className="border-t border-zinc-800 p-3">
                              {allQuestions.length > 0 ? (
                                <QuestionTable
                                  topicId={topic.id}
                                  difficultyId={difficulty.id}
                                  questions={allQuestions}
                                  savingKey={savingKey}
                                  onMarkRevised={onMarkRevised}
                                  onConfidenceChange={onConfidenceChange}
                                  onRevisionDateChange={onRevisionDateChange}
                                  onToggleCompleted={onToggleCompleted}
                                  onNotesSave={onNotesSave}
                                />
                              ) : (
                                <p className="text-sm text-zinc-500">
                                  No questions in this section.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopicAccordion;
