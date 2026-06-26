import { useState,useEffect } from "react";
import InterviewForm from "../components/mockInterview/InterviewForm";
import QuestionList from "../components/mockInterview/QuestionList";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { generateInterview } from "../api/mockInterviewApi";
import { getResumes } from "../api/resumeApi";

function MockInterview() {
  const [questions, setQuestions] = useState({
    technical: [],
    projects: [],
    corecs: [],
    hr: [],
  });

  const [loading, setLoading] = useState(false);

  const [activeCategory, setActiveCategory] =
    useState("All");
    const [resumes, setResumes] =
  useState([]);

const [selectedResume,
  setSelectedResume] =
  useState("");

  useEffect(() => {

  const fetchResumes =
    async () => {

      const response =
        await getResumes();

      setResumes(
  response.data
);
    };

  fetchResumes();

}, []);

  const handleGenerate = async () => {
    if (!selectedResume) {
    alert("Please select a resume");
    return;
    }
    try {
      setLoading(true);


      const response =
    await generateInterview({
  resumeId: selectedResume,
});

      console.log(
        response.data.questions
      );

      setQuestions(
        response.data.questions
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    "technical",
    "projects",
    "corecs",
    "hr",
  ];

  const filteredQuestions =
    activeCategory === "All"
      ? [
          ...questions.technical,
          ...questions.projects,
          ...questions.corecs,
          ...questions.hr,
        ]
      : questions[activeCategory] || [];

  const technicalCount =
    questions.technical.length;

  const projectCount =
    questions.projects.length;

  const coreCount =
    questions.corecs.length;

  const hrCount =
    questions.hr.length;

  const totalQuestions =
    technicalCount +
    projectCount +
    coreCount +
    hrCount;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
       <select
  value={selectedResume}
  onChange={(e) => setSelectedResume(e.target.value)}
  className="w-full border rounded-xl p-3 mb-4 text-gray-900 bg-white"
>
  <option value="" className="text-gray-900">
    Select Resume
  </option>

  {resumes.map((resume) => (
    <option
      key={resume.id}
      value={resume.id}
      className="text-gray-900"
    >
      {resume.title}
    </option>
  ))}
</select>
        <InterviewForm
          loading={loading}
          onGenerate={handleGenerate}
        />

        {loading && (
          <div className="bg-white rounded-2xl border p-10 text-center animate-pulse">
            <h2 className="text-xl font-semibold mb-3">
              Generating Interview...
            </h2>

            <p className="text-gray-500">
              Analyzing Resume...
            </p>

            <p className="text-gray-500">
              Generating Questions...
            </p>

            <p className="text-gray-500">
              Preparing Answers...
            </p>
          </div>
        )}

        {!loading &&
          totalQuestions === 0 && (
            <div className="bg-white rounded-2xl border p-10 text-center">
              <div className="text-5xl mb-4">
                🎯
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Ready to Practice?
              </h2>

              <p className="text-gray-500">
                Generate a personalized
                interview based on your
                resume.
              </p>
            </div>
          )}

        {!loading &&
          totalQuestions > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

  <div className="bg-white border rounded-xl p-4">
    <p className="text-sm text-gray-600">
      Total
    </p>

    <h3 className="text-2xl font-bold text-gray-900">
      {totalQuestions}
    </h3>
  </div>


  <div className="bg-white border rounded-xl p-4">
    <p className="text-sm text-gray-600">
      Technical
    </p>

    <h3 className="text-2xl font-bold text-gray-900">
      {technicalCount}
    </h3>
  </div>


  <div className="bg-white border rounded-xl p-4">
    <p className="text-sm text-gray-600">
      Projects
    </p>

    <h3 className="text-2xl font-bold text-gray-900">
      {projectCount}
    </h3>
  </div>


  <div className="bg-white border rounded-xl p-4">
    <p className="text-sm text-gray-600">
      Core CS
    </p>

    <h3 className="text-2xl font-bold text-gray-900">
      {coreCount}
    </h3>
  </div>


  <div className="bg-white border rounded-xl p-4">
    <p className="text-sm text-gray-600">
      HR
    </p>

    <h3 className="text-2xl font-bold text-gray-900">
      {hrCount}
    </h3>
  </div>

</div>

              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(
                  (category) => (
                    <button
                    key={category}
                    onClick={() =>
                        setActiveCategory(category)
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-white border text-gray-900"
                    }`}
                    >
                    {category}
                    </button>
                  )
                )}
              </div>

              <QuestionList
                questions={
                  filteredQuestions
                }
              />
            </>
          )}
      </div>
    </DashboardLayout>
  );
}

export default MockInterview;