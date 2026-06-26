import {
  FaRobot,
  FaChartLine,
  FaBriefcase,
  FaBell,
} from "react-icons/fa";

function FeatureSection() {

  const features = [
    {
      icon: <FaBriefcase />,
      title: "Application Tracking",
      description:
        "Track all your job applications, interviews, and offers in one place.",
    },

    {
      icon: <FaRobot />,
      title: "AI Resume Analysis",
      description:
        "Get AI-powered resume insights and ATS optimization suggestions.",
    },

    {
      icon: <FaChartLine />,
      title: "Placement Analytics",
      description:
        "Analyze your placement progress with smart visual dashboards.",
    },

    {
      icon: <FaBell />,
      title: "Smart Reminders",
      description:
        "Never miss interviews, deadlines, or follow-ups again.",
    },
  ];

  return (

    <section className="bg-black text-white py-28 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">

          <p className="text-blue-400 font-medium mb-4">
            FEATURES
          </p>

          <h2 className="text-5xl font-bold mb-6">
            Everything You Need
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Built to help students manage placements smarter,
            faster, and with AI-driven insights.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500/40 transition"
            >

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl mb-6">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeatureSection;