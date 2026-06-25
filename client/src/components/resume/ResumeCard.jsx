import { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";

import api from "../../api/api";
import Modal from "../ui/Modal";
import ATSReportModal from "./ATSReportModal";
import JobDescriptionModal from "./JobDescriptionModal";

const actionButtonClass =
  "cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50";

function ResumeCard({
  id,
  name,
  analyzed,
  atsScore,
  report,
  uploadedAt,
  onDelete,
  onAnalyzed,
}) {
  const [loading, setLoading] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [localReport, setLocalReport] = useState(report);

  useEffect(() => {
    if (report) setLocalReport(report);
  }, [report]);

  const handlePreview = async () => {
    try {
      const response = await api.get(`/api/resume/${id}/preview`);
      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(id);
  };

  const handleAnalyze = async (jobDescription) => {
    setLoading(true);

    try {
      const response = await api.post(`/api/resume/${id}/analyze`, {
        jobDescription,
      });

      setLocalReport(response.data);
      setShowJobModal(false);
      onAnalyzed(id, response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeClick = () => {
    if (analyzed && localReport) {
      setShowReportModal(true);
      return;
    }

    setShowJobModal(true);
  };

  const getButtonLabel = () => {
    if (loading) return "Analyzing...";
    if (analyzed && localReport) return "View Report";
    return "Analyze ATS";
  };

  return (
    <>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="flex items-start gap-3">
          <FaFilePdf className="mt-0.5 shrink-0 text-xl text-red-500" />

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-white">{name}</h3>
            <p className="mt-0.5 text-sm text-zinc-500">
              Uploaded {uploadedAt}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {analyzed && atsScore != null ? (
            <span className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
              ATS {atsScore}%
            </span>
          ) : (
            <span className="w-fit rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-400">
              ATS Not Analyzed
            </span>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAnalyzeClick}
              disabled={loading}
              className={`${actionButtonClass} border-blue-500/40 text-blue-400 hover:bg-blue-500/10`}
            >
              {getButtonLabel()}
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className={`${actionButtonClass} border-zinc-700 text-zinc-200 hover:bg-zinc-800`}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className={`${actionButtonClass} border-red-500/40 text-red-400 hover:bg-red-500/10`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <JobDescriptionModal
        open={showJobModal}
        onClose={() => setShowJobModal(false)}
        onSubmit={handleAnalyze}
        loading={loading}
      />

      <ATSReportModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
        report={localReport}
      />

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Resume"
      >
        <p className="text-sm text-zinc-400">
          Do you want to delete{" "}
          <span className="font-medium text-white">{name}</span>? This action
          cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowDeleteModal(false)}
            className="cursor-pointer rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ResumeCard;
