function analyzeResume(text, skills) {

  let score = 0;

  const lowerText = text.toLowerCase();

  const details = {
    skillsCount: skills.length,
    projectsCount: 0,
    hasEducation: false,
    hasExperience: false,
    hasEmail: false,
    strengths: [],
    weaknesses: [],
  };

  // Contact Information
  if (lowerText.includes("@")) {
    score += 10;
    details.hasEmail = true;
    details.strengths.push(
      "Email information present"
    );
  } else {
    details.weaknesses.push(
      "Email information missing"
    );
  }

  // Skills Score
  if (skills.length >= 10) {
    score += 30;
    details.strengths.push(
      "Strong technical skill set"
    );
  } else if (skills.length >= 7) {
    score += 25;
    details.strengths.push(
      "Good technical skill set"
    );
  } else if (skills.length >= 4) {
    score += 20;
  } else {
    score += 10;
    details.weaknesses.push(
      "Add more technical skills"
    );
  }

  // Education
  if (
    lowerText.includes("education")
  ) {
    score += 15;
    details.hasEducation = true;
  } else {
    details.weaknesses.push(
      "Education section missing"
    );
  }

  // Experience
  if (
    lowerText.includes("experience") ||
    lowerText.includes("internship")
  ) {
    score += 20;
    details.hasExperience = true;
  } else {
    details.weaknesses.push(
      "No internship or work experience found"
    );
  }

  // Projects
  const projectMatches =
    lowerText.match(/project|projects/g);

  const projectsCount =
    projectMatches
      ? projectMatches.length
      : 0;

  details.projectsCount =
    projectsCount;

  if (projectsCount >= 3) {
    score += 25;
    details.strengths.push(
      "Multiple projects present"
    );
  } else if (projectsCount >= 2) {
    score += 18;
  } else if (projectsCount >= 1) {
    score += 10;
  } else {
    details.weaknesses.push(
      "Add projects to your resume"
    );
  }

  return {
    score,
    details,
  };
}

module.exports = {
  analyzeResume,
};