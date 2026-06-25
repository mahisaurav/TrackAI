import Modal from "../ui/Modal";

function SkillList({ title, skills, colorClass }) {
  if (!skills?.length) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-zinc-400 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`rounded-full px-3 py-1 text-sm ${colorClass}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function ATSReportModal({ open, onClose, report }) {
  if (!report) return null;

  return (
    <Modal open={open} onClose={onClose} title="ATS Report">
      <div className="space-y-5 max-h-[70vh] overflow-y-auto">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            ATS Score
          </p>
          <p className="mt-1 text-4xl font-semibold text-green-400">
            {report.atsScore}%
          </p>
        </div>

        <SkillList
          title="Matched Skills"
          skills={report.matchedSkills}
          colorClass="bg-green-500/10 text-green-400"
        />

        <SkillList
          title="Missing Skills"
          skills={report.missingSkills}
          colorClass="bg-red-500/10 text-red-400"
        />

        {report.strengths?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">
              Strengths
            </h3>
            <ul className="space-y-1 text-sm text-zinc-300">
              {report.strengths.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        {report.improvements?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">
              Improvements
            </h3>
            <ul className="space-y-1 text-sm text-zinc-300">
              {report.improvements.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        {report.summary && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Summary</h3>
            <p className="text-sm text-zinc-300">{report.summary}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ATSReportModal;
