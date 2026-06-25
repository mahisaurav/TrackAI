import { useEffect, useState, useCallback } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import ResumeStats from "../components/resume/ResumeStats";
import ResumeUploadCard from "../components/resume/ResumeUploadCard";
import ResumeCard from "../components/resume/ResumeCard";

import api from "../api/api";

function Resumes() {
  const [resumes, setResumes] = useState([]);

  const fetchResumes = useCallback(async () => {
    try {
      const response = await api.get("/api/resume");
      setResumes(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/resume/${id}`);

      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnalyzed = (id, report) => {
    setResumes((prevResumes) =>
      prevResumes.map((resume) =>
        resume.id === id
          ? {
              ...resume,
              analyzed: true,
              atsScore: report.atsScore,
              atsReport: report,
            }
          : resume,
      ),
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-white">Resume Manager</h1>

          <p className="mt-2 text-sm text-zinc-400">
            Upload, manage, and analyze your resumes against job descriptions.
          </p>
        </div>

        <ResumeStats resumes={resumes} />

        <ResumeUploadCard onUploadSuccess={fetchResumes} />

        <div>
          <h2 className="mb-4 text-lg font-medium text-white">My Resumes</h2>

          {resumes.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-6 py-10 text-center">
              <p className="text-sm text-zinc-400">
                No resumes uploaded yet. Upload a PDF to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  id={resume.id}
                  name={resume.title}
                  analyzed={resume.analyzed}
                  atsScore={resume.atsScore}
                  report={resume.atsReport}
                  uploadedAt={new Date(resume.uploadedAt).toLocaleDateString()}
                  onDelete={handleDelete}
                  onAnalyzed={handleAnalyzed}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Resumes;
