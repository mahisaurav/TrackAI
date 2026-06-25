import { useState } from "react";

function QuestionCard({ question }) {
const [showAnswer, setShowAnswer] =
useState(false);

const [showFollowUps, setShowFollowUps] =
useState(false);

const [confidence, setConfidence] =
useState("");

const difficultyColors = {
Easy: "bg-green-200 text-green-900",
Medium: "bg-yellow-200 text-yellow-900",
Hard: "bg-red-200 text-red-900",
};

return ( <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
  <div className="flex items-center justify-between mb-5">

    <span className="bg-blue-200 !text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
  {question.category}
</span>

    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${
        difficultyColors[
          question.difficulty
        ] ||
        "bg-gray-200 text-gray-900"
      }`}
    >
      {question.difficulty}
    </span>

  </div>

  <h3 className="text-xl font-bold text-gray-900 mb-5 leading-relaxed">
    {question.question}
  </h3>

  <div className="flex flex-wrap gap-3 mb-5">

    <button
      onClick={() =>
        setShowAnswer(
          !showAnswer
        )
      }
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
    >
      {showAnswer
        ? "Hide Answer"
        : "Show Answer"}
    </button>

    <button
      onClick={() =>
        setShowFollowUps(
          !showFollowUps
        )
      }
      className="px-4 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
    >
      Follow Ups
    </button>

  </div>

  {showAnswer && (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5">

      <h4 className="font-bold text-blue-900 mb-3">
        Expected Answer
      </h4>

      <p className="text-gray-900 text-sm leading-7">
        {question.expectedAnswer}
      </p>

    </div>
  )}

  {showFollowUps && (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-5">

      <h4 className="font-bold text-purple-900 mb-3">
        Follow Up Questions
      </h4>

      <ul className="space-y-3 list-disc ml-5 text-sm text-gray-900">
        {question.followUpQuestions?.map(
          (item, index) => (
            <li key={index}>
              {item}
            </li>
          )
        )}
      </ul>

    </div>
  )}

  <div className="border-t pt-5">

    <p className="text-sm font-semibold text-gray-800 mb-3">
      Confidence Level
    </p>

    <div className="flex flex-wrap gap-2">

      <button
        onClick={() =>
          setConfidence(
            "Strong"
          )
        }
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          confidence ===
          "Strong"
            ? "bg-green-500 text-white"
            : "bg-green-100 text-green-800"
        }`}
      >
        🟢 Strong
      </button>

      <button
        onClick={() =>
          setConfidence(
            "Average"
          )
        }
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          confidence ===
          "Average"
            ? "bg-yellow-500 text-white"
            : "bg-yellow-100 text-yellow-900"
        }`}
      >
        🟡 Average
      </button>

      <button
        onClick={() =>
          setConfidence(
            "Weak"
          )
        }
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          confidence ===
          "Weak"
            ? "bg-red-500 text-white"
            : "bg-red-100 text-red-800"
        }`}
      >
        🔴 Weak
      </button>

    </div>

  </div>

</div>


);
}

export default QuestionCard;
