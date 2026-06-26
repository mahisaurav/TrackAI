import { useState } from "react";
import QuestionRow from "./QuestionRow";
import NotesModal from "./NotesModal";
import { normalizeDateForInput } from "../../utils/revisionUtils";

function QuestionTable({
  questions,
  topicId,
  difficultyId,
  savingKey,
  onMarkRevised,
  onConfidenceChange,
  onRevisionDateChange,
  onToggleCompleted,
  onNotesSave,
}) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showNotes, setShowNotes] = useState(false);

  const handleOpenNotes = (question) => {
    setSelectedQuestion(question);
    setShowNotes(true);
  };

  const handleCloseNotes = () => {
    setShowNotes(false);
    setSelectedQuestion(null);
  };

  const getQuestionForRow = (question) => {
    return {
      ...question,
      lastRevisionDate: normalizeDateForInput(question.lastRevisionDate),
      nextRevisionDate: normalizeDateForInput(question.nextRevisionDate),
    };
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-800">
      <div className="min-w-[900px]">
        <div className="grid grid-cols-[40px_1.4fr_90px_110px_110px_140px_120px] gap-2 bg-zinc-900/80 px-3 py-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          <span>Done</span>
          <span>Problem</span>
          <span>Notes</span>
          <span>Last Rev</span>
          <span>Next Rev</span>
          <span>Confidence</span>
          <span>Revision</span>
        </div>

        {questions.map((question) => (
          <QuestionRow
            key={`${topicId}-${difficultyId}-${question.id}`}
            question={getQuestionForRow(question)}
            topicId={topicId}
            difficultyId={difficultyId}
            savingKey={savingKey}
            onNotesClick={() => handleOpenNotes(question)}
            onMarkRevised={() =>
              onMarkRevised(topicId, difficultyId, question)
            }
            onConfidenceChange={(newConfidence) =>
              onConfidenceChange(
                topicId,
                difficultyId,
                question,
                newConfidence,
              )
            }
            onRevisionDateChange={(field, value) =>
              onRevisionDateChange(
                topicId,
                difficultyId,
                question,
                field,
                value,
              )
            }
            onToggleCompleted={(newCompleted) =>
              onToggleCompleted(
                topicId,
                difficultyId,
                question,
                newCompleted,
              )
            }
          />
        ))}
      </div>

      <NotesModal
        isOpen={showNotes}
        question={selectedQuestion}
        onSave={(notes) => {
          if (selectedQuestion) {
            onNotesSave(topicId, difficultyId, selectedQuestion, notes);
          }
        }}
        onClose={handleCloseNotes}
      />
    </div>
  );
}

export default QuestionTable;
