function extractEmail(text) {

  const emailRegex =
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

  const match =
    text.match(emailRegex);

  return match
    ? match[0]
    : null;
}

function extractProjects(text) {

  const projects = [];

  const lines =
    text.split("\n");

  for (const line of lines) {

    if (
      line.includes("(") &&
      line.includes(")")
    ) {
      projects.push(
        line.trim()
      );
    }

  }

  return projects;
}

module.exports = {
  extractEmail,
  extractProjects,
};