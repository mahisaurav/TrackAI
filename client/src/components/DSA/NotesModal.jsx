import { useEffect, useState } from "react";

function NotesModal({ isOpen, onClose, question, onSave }) {
  const [notes, setNotes] = useState({
    approach: "",
    mistakes: "",
    keyLearning: "",
  });

  useEffect(() => {
    if (!question) {
      return;
    }

    if (question.notes) {
      setNotes({
        approach: question.notes.approach || "",
        mistakes: question.notes.mistakes || "",
        keyLearning: question.notes.keyLearning || "",
      });
    } else {
      setNotes({
        approach: "",
        mistakes: "",
        keyLearning: "",
      });
    }
  }, [question]);

  if (!isOpen || !question) {
    return null;
  }

  const handleSave = () => {
    onSave(notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">{question.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-zinc-500 hover:text-zinc-300"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500">Approach</label>
            <textarea
              rows="3"
              value={notes.approach}
              onChange={(e) =>
                setNotes({ ...notes, approach: e.target.value })
              }
              className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500">Mistakes Made</label>
            <textarea
              rows="2"
              value={notes.mistakes}
              onChange={(e) =>
                setNotes({ ...notes, mistakes: e.target.value })
              }
              className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500">Key Learning</label>
            <textarea
              rows="2"
              value={notes.keyLearning}
              onChange={(e) =>
                setNotes({ ...notes, keyLearning: e.target.value })
              }
              className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="cursor-pointer rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesModal;
