import { useState } from "react";

import Modal from "../ui/Modal";

function JobDescriptionModal({ open, onClose, onSubmit, loading }) {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = () => {
    if (!jobDescription.trim() || loading) return;
    onSubmit(jobDescription.trim());
  };

  const handleClose = () => {
    if (loading) return;
    setJobDescription("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Analyze ATS">
      <div className="space-y-4">
        <p className="text-sm text-zinc-400">
          Paste the job description to compare against your resume.
        </p>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          rows={8}
          disabled={loading}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="cursor-pointer rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !jobDescription.trim()}
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default JobDescriptionModal;
