import { useEffect, useMemo, useState } from "react";
import ProfileHero from "../components/Profile/Sections/ProfileHero";
import AccountInfo from "../components/Profile/Sections/AccountInformation";
import PlacementSummary from "../components/Profile/Sidebar/PlacementSummary";
import ResumeOverview from "../components/Profile/Sections/ResumeOverview";
import NotificationPreferences from "../components/Profile/Sections/NotificationPreferences";
import ConnectedAccounts from "../components/Profile/Sections/ConnectedAccounts";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import api from "../api/api";
import { getDashboardStats } from "../utils/applicationStats";

function formatRelativeDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "N/A";

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

function Profile() {
  const [applications, setApplications] = useState([]);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [applicationsResponse, resumesResponse] = await Promise.all([
          api.get("/applications"),
          api.get("/api/resume"),
        ]);

        setApplications(applicationsResponse.data);
        setResumes(resumesResponse.data);
      } catch {
        // keep defaults when fetch fails
      }
    };

    fetchProfileData();
  }, []);

  const applicationStats = useMemo(
    () => getDashboardStats(applications),
    [applications]
  );

  const resumeStats = useMemo(() => {
    const scoredResumes = resumes.filter(
      (resume) => resume.atsScore !== null && resume.atsScore !== undefined
    );

    const averageAtsScore =
      scoredResumes.length > 0
        ? Math.round(
            scoredResumes.reduce((sum, resume) => sum + resume.atsScore, 0) /
              scoredResumes.length
          )
        : null;

    const highestAtsScore =
      scoredResumes.length > 0
        ? Math.max(...scoredResumes.map((resume) => resume.atsScore))
        : null;

    const latestResume = [...resumes].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    )[0];

    return {
      averageAtsScore,
      highestAtsScore,
      totalResumes: resumes.length,
      lastUpdated: formatRelativeDate(latestResume?.uploadedAt),
    };
  }, [resumes]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-zinc-500 mt-1">Manage your TrackAI account</p>
        </div>

        <ProfileHero />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AccountInfo />
          <PlacementSummary
            totalApplications={applicationStats.total}
            interviews={applicationStats.interviews}
            offers={applicationStats.offers}
            resumesUploaded={resumeStats.totalResumes}
            averageAtsScore={resumeStats.averageAtsScore}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeOverview
            highestAtsScore={resumeStats.highestAtsScore}
            totalResumes={resumeStats.totalResumes}
            lastUpdated={resumeStats.lastUpdated}
          />
          <NotificationPreferences />
        </div>

        <ConnectedAccounts />
      </div>
    </DashboardLayout>
  );
}

export default Profile;
