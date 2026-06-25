import { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

function RevisionQueue({ dueQuestions }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <FaChevronDown className="text-xs text-zinc-500" />
          ) : (
            <FaChevronRight className="text-xs text-zinc-500" />
          )}
          <h2 className="text-lg font-medium text-white">Revision Queue</h2>
        </div>
        <span className="text-xs text-zinc-500">
          {dueQuestions.length} due
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {dueQuestions.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No revisions due — you&apos;re caught up.
            </p>
          ) : (
            dueQuestions.map((question) => (
              <div
                key={question.id}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    {question.title}
                  </p>
                  <p className="text-xs text-zinc-500">{question.topic}</p>
                </div>
                <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400">
                  Due {question.nextRevisionDate}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default RevisionQueue;
