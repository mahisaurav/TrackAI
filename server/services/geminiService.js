const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


const generateInterviewQuestions = async (resumeText) => {

  const prompt = `
You are a Senior Software Engineer interviewer.

Analyze the resume carefully.

Generate JSON ONLY in this format:

{
  "technical": [],
  "projects": [],
  "corecs": [],
  "hr": []
}

Each question object should contain:

{
  "question": "",
  "expectedAnswer": "",
  "difficulty": "",
  "followUpQuestions": []
}

Generate:

5 Technical
5 Project
5 Core CS
5 HR

Do not include markdown.
Do not include explanations.

Resume:
${resumeText}
`;


  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });


    const result =
      await model.generateContent(prompt);


    const text =
      result.response.text();


    const cleanedText =
      text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    return JSON.parse(cleanedText);


  } catch(error) {


    if(error.status === 503){

      console.log(
        "Gemini busy, trying fallback..."
      );


      const fallback =
        genAI.getGenerativeModel({
          model: "gemini-2.0-flash"
        });


      const result =
        await fallback.generateContent(prompt);


      const text =
        result.response.text();


      return JSON.parse(
        text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
      );
    }


    throw error;
  }

};


const analyzeResumeATS = async (resumeText, jobDescription) => {
  const prompt = `
You are an ATS (Applicant Tracking System) resume analyzer.

Compare the resume against the job description and return JSON ONLY in this exact format:

{
  "matchedSkills": [],
  "missingSkills": [],
  "additionalSkills": [],
  "experienceMatch": 0,
  "educationMatch": 0,
  "projectMatch": 0,
  "structureMatch": 0,
  "strengths": [],
  "improvements": [],
  "summary": ""
}

Rules:
- matchedSkills: skills from the job description found in the resume
- missingSkills: required skills from the job description not found in the resume
- additionalSkills: relevant skills in the resume not mentioned in the job description
- experienceMatch, educationMatch, projectMatch, structureMatch: scores from 0 to 100
- strengths: resume strengths relative to the job
- improvements: actionable suggestions to improve ATS match
- summary: brief 2-3 sentence overview
- Return JSON only. No markdown. No explanations.

Job Description:
${jobDescription}

Resume:
${resumeText}
`;

  const parseResponse = (text) => {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  };

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    return parseResponse(result.response.text());
  } catch (error) {
    if (error.status === 503) {
      const fallback = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const result = await fallback.generateContent(prompt);
      return parseResponse(result.response.text());
    }

    throw error;
  }
};

module.exports = {
  generateInterviewQuestions,
  analyzeResumeATS,
};
