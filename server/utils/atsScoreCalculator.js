function calculateAtsScore(geminiAnalysis) {
  const matched = geminiAnalysis.matchedSkills?.length ?? 0;
  const missing = geminiAnalysis.missingSkills?.length ?? 0;
  const total = matched + missing;

  const skillsMatch =
    total > 0 ? Math.round((matched / total) * 100) : 0;

  const atsScore = Math.round(
    skillsMatch * 0.4 +
      geminiAnalysis.experienceMatch * 0.25 +
      geminiAnalysis.projectMatch * 0.15 +
      geminiAnalysis.educationMatch * 0.1 +
      geminiAnalysis.structureMatch * 0.1
  );

  return { skillsMatch, atsScore };
}

module.exports = {
  calculateAtsScore,
};
