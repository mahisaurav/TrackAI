const TRACKED_STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export function countByStatus(applications, status) {
  return applications.filter(
    (app) => (app.status || "Applied") === status
  ).length;
}

export function getDashboardStats(applications) {
  return {
    total: applications.length,
    interviews: countByStatus(applications, "Interview"),
    offers: countByStatus(applications, "Offer"),
    applied: countByStatus(applications, "Applied"),
    rejected: countByStatus(applications, "Rejected"),
  };
}

export function getStatusChartData(applications) {
  return TRACKED_STATUSES.map((name) => ({
    name,
    value: countByStatus(applications, name),
  }));
}
