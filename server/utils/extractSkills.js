const { skillsDatabase,} = require("./skillsDatabase");

function extractSkills(text) {

  const lowerText =
    text.toLowerCase();

  const foundSkills = [];

  for (const skill of skillsDatabase) {

    if(lowerText.includes(skill)){
      foundSkills.push(skill);
    }
  }
  return foundSkills;
}

module.exports = {
  extractSkills,
};