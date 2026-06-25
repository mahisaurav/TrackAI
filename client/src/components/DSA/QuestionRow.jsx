import { getQuestionKey, getTodayDate } from "../../utils/revisionUtils";
import { isRevisedToday } from "../../utils/streakUtils";

function QuestionRow({
  question,
  topicId,
  difficultyId,
  savingKey,
  onNotesClick,
  onMarkRevised,
  onConfidenceChange,
  onRevisionDateChange,
  onToggleCompleted,
}) {
  const questionKey = getQuestionKey(topicId, difficultyId, question.id);
  const isSaving = savingKey === questionKey;

  const hasNotes =
    question.notes &&
    (question.notes.approach ||
      question.notes.mistakes ||
      question.notes.keyLearning);

  const confidenceValue =
    question.confidence === "forgot"
      ? "forgotten"
      : question.confidence || "forgotten";

  const revisedToday = isRevisedToday(question.lastRevisionDate);

  return (
    <div
      className={`grid grid-cols-[40px_1.4fr_90px_110px_110px_140px_120px] items-center gap-2 border-b border-zinc-800/80 px-3 py-2.5 text-sm last:border-b-0 ${isSaving ? "opacity-60" : ""}`}
    >
      <input
        type="checkbox"
        checked={question.completed || false}
        disabled={isSaving}
        onChange={() => onToggleCompleted(!question.completed)}
        className="h-4 w-4 cursor-pointer accent-blue-600"
      />

      <p className="text-zinc-200">{question.title}</p>

      <button
        type="button"
        onClick={onNotesClick}
        className="cursor-pointer text-left text-xs text-zinc-400 hover:text-zinc-200"
      >
        {hasNotes ? "Notes" : "+ Notes"}
      </button>

      <input
        type="date"
        value={question.lastRevisionDate || ""}
        disabled={isSaving}
        onChange={(e) =>
          onRevisionDateChange("lastRevisionDate", e.target.value)
        }
        className="cursor-pointer rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-300"
      />

      <input
        type="date"
        value={question.nextRevisionDate || ""}
        disabled={isSaving}
        onChange={(e) =>
          onRevisionDateChange("nextRevisionDate", e.target.value)
        }
        className="cursor-pointer rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-300"
      />

      <select
        value={confidenceValue}
        disabled={isSaving}
        onChange={(e) => onConfidenceChange(e.target.value)}
        className="cursor-pointer rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-200"
      >
        <option value="confident">Confident</option>
        <option value="revision">Needs Revision</option>
        <option value="forgotten">Forgotten</option>
      </select>

      {revisedToday ? (
        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1.5 text-center text-xs font-medium text-emerald-400">
          ✓ Revised Today
        </span>
      ) : (
        <button
          type="button"
          onClick={onMarkRevised}
          disabled={isSaving}
          className="cursor-pointer rounded-md border border-zinc-600 bg-zinc-800 px-2 py-1.5 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Mark Revised
        </button>
      )}
    </div>
  );
}

export default QuestionRow;
