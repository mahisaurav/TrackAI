import { FaCalendarAlt } from "react-icons/fa";
import Card, { CardHeader } from "../ui/Card";

const interviews = [
  { company: "Google", round: "Round 2", time: "Tomorrow, 10:00 AM" },
  { company: "Flipkart", round: "HR Round", time: "Thu, 3:00 PM" },
  { company: "Atlassian", round: "OA", time: "Fri, 11:00 AM" },
];

function UpcomingSection() {
  return (
    <Card>
      <CardHeader
        title="Upcoming"
        subtitle="Scheduled interviews"
      />

      <div className="space-y-3">
        {interviews.map((item) => (
          <div
            key={item.company}
            className="flex gap-3 rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-4 transition hover:border-zinc-700/80"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
              <FaCalendarAlt className="text-sm" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-white text-sm">
                {item.company}
                <span className="text-zinc-500 font-normal"> · {item.round}</span>
              </h3>
              <p className="text-zinc-500 text-xs mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default UpcomingSection;
