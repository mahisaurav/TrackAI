import { useState, useRef } from "react";

import api from "../../api/api";

function ResumeUploadCard({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploaded(false);
  };

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!selectedFile || uploading) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", selectedFile);

      await api.post("/api/resume/upload", formData);

      setUploaded(true);
      setSelectedFile(null);

      if (onUploadSuccess) {
        await onUploadSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 px-6 py-10 text-center">
      <h2 className="text-lg font-medium text-white">Upload Resume</h2>

      <p className="mt-2 text-sm text-zinc-500">
        PDF format only. Your file is stored securely.
      </p>

      <button
        type="button"
        onClick={handleSelectClick}
        className="mt-5 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        Choose File
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {selectedFile && !uploaded && (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-zinc-400">{selectedFile.name}</p>

          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="cursor-pointer rounded-lg border border-zinc-700 px-5 py-2 text-sm text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Now"}
          </button>
        </div>
      )}

      {uploaded && (
        <p className="mt-4 text-sm text-green-400">Uploaded successfully.</p>
      )}
    </div>
  );
}

export default ResumeUploadCard;
