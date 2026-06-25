function calculateATSScore(text) {

  let score = 0;

  const lowerText = text.toLowerCase();

  if (lowerText.includes("skills")) {
    score += 25;
  }

  if (lowerText.includes("project")) {
    score += 25;
  }

  if (lowerText.includes("education")) {
    score += 20;
  }

  if (lowerText.includes("experience")) {
    score += 20;
  }

  if (lowerText.includes("@")) {
    score += 10;
  }

  return score;
}

module.exports = {
  calculateATSScore,
};