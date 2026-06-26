import { useEffect, useState } from "react";

function AddQuestionModal({
  isOpen,
  onClose,
  onSave,
  editingQuestion,
}) {
  const [formData, setFormData] =
    useState({
      title: "",
      completed: false,
      notes: "",
      lastRevisionDate: "",
      nextRevisionDate: "",
      confidence: "forgotten",
      revisionStatus: "scheduled",
    });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;

    if (editingQuestion) {
      setFormData({
        title: editingQuestion.title || "",
        completed: editingQuestion.completed || false,
        notes: editingQuestion.notes || "",
        lastRevisionDate: editingQuestion.lastRevisionDate || "",
        nextRevisionDate: editingQuestion.nextRevisionDate || "",
        confidence: editingQuestion.confidence || "forgotten",
        revisionStatus: editingQuestion.revisionStatus || "scheduled",
      });
    } else {
      setFormData({
        title: "",
        completed: false,
        notes: "",
        lastRevisionDate: "",
        nextRevisionDate: "",
        confidence: "forgotten",
        revisionStatus: "scheduled",
      });
    }
  }, [isOpen, editingQuestion]);

  if (!isOpen) return null;


  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert(
        "Problem Name is required"
      );
      return;
    }

    const questionData = {
  ...formData,
};

    if (editingQuestion) {
      onSave({
        ...editingQuestion,
        ...questionData,
      });
    } else {
      onSave({
        id: Date.now(),
        ...questionData,
        isCustom: true,
      });
    }

    setFormData({
      title: "",
      completed: false,
      notes: "",
      lastRevisionDate: "",
      nextRevisionDate: "",
      confidence: "forgotten",
      revisionStatus: "scheduled",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {editingQuestion ? "Edit Custom Question" : "Add Custom Question"}
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <label className="text-sm text-zinc-400">
              Problem Name *
            </label>

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                formData.completed
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  completed:
                    e.target.checked,
                })
              }
            />

            <span className="text-white">
              Completed
            </span>
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Notes
            </label>

            <textarea
              rows="4"
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes:
                    e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Last Revision Date
            </label>

            <input
              type="date"
              value={
                formData.lastRevisionDate
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastRevisionDate:
                    e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Next Revision Date
            </label>

            <input
              type="date"
              value={
                formData.nextRevisionDate
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nextRevisionDate:
                    e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Confidence
            </label>

            <select
              value={
                formData.confidence
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confidence:
                    e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white"
            >
              <option value="confident">
                🟢 Confident
              </option>

              <option value="revision">
                🟡 Needs Revision
              </option>

              <option value="forgotten">
                🔴 Forgotten
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Revision Status
            </label>

            <select
              value={
                formData.revisionStatus
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  revisionStatus:
                    e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white"
            >
              <option value="scheduled">
                Scheduled
              </option>

              <option value="due">
                Due
              </option>

              <option value="completed">
                Completed
              </option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Save Question
          </button>

        </div>
      </div>
    </div>
  );
}

export default AddQuestionModal;