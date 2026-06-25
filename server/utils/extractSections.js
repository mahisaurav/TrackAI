function extractSections(text) {

  const sections = {};

  const sectionNames = [
    "education",
    "skills",
    "projects",
    "positions of responsibility",
    "interests and hobbies"
  ];

  const lowerText =
    text.toLowerCase();

  for (let i = 0; i < sectionNames.length; i++) {

    const current =
      sectionNames[i];

    const next =
      sectionNames[i + 1];

    const startIndex = lowerText.indexOf(current);

    if (startIndex === -1)
      continue;

    const endIndex = next
        ? lowerText.indexOf(next)
        : text.length;

    sections[current] =
      text
        .slice(
          startIndex,
          endIndex
        )
        .trim();
  }

  return sections;
}

module.exports = {
  extractSections,
};