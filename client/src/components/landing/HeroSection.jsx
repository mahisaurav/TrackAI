import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full"></div>

      {/* Navbar */}
      <header className="relative z-20">
        <div className="max-w-[1400px] mx-auto px-10 py-6 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            TrackAI
          </h1>

          {/* Nav Buttons */}
          <div className="flex items-center gap-5">
            <Link
              to="/login"
              className="text-zinc-300 hover:text-white transition text-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-2xl transition font-semibold shadow-lg shadow-blue-500/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-10">
        <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-4xl"
          >
            {/* Small Text */}
            <p className="text-blue-400 font-semibold uppercase tracking-wider mb-6 text-sm">
              AI-Powered Placement Tracking Platform
            </p>

            {/* Main Heading */}
            <h1 className="text-7xl font-extrabold leading-[1.1] mb-8">
              Track Your Placements
              <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 text-transparent bg-clip-text mt-2">
                Smarter with AI
              </span>
            </h1>

            {/* Description */}
            <p className="text-zinc-400 text-2xl leading-relaxed max-w-2xl mb-12">
              Manage applications, monitor interviews, analyze resumes with AI,
              and stay ahead in your placement journey.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-5">
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-9 py-4 rounded-2xl text-lg font-semibold transition shadow-xl shadow-blue-500/30"
              >
                Start Tracking
              </Link>

              <Link
                to="/login"
                className="border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 px-9 py-4 rounded-2xl text-lg transition"
              >
                Login
              </Link>
            </div>
          </motion.div>
          {/* Right Side */}
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Glow */}
            <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full"></div>

            {/* Main Card */}
            <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 w-[500px] shadow-2xl">
              {/* Top */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-zinc-400 text-sm">AI Match Score</p>

                  <h2 className="text-5xl font-bold text-blue-400">92%</h2>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-3xl">
                  ⚡
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
                  <p className="text-zinc-400 text-sm mb-2">Applications</p>

                  <h3 className="text-3xl font-bold">48</h3>
                </div>

                <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
                  <p className="text-zinc-400 text-sm mb-2">Interviews</p>

                  <h3 className="text-3xl font-bold text-yellow-400">12</h3>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                {["Google", "Amazon", "Microsoft"].map((company, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-zinc-900 rounded-2xl px-5 py-4 border border-zinc-800"
                  >
                    <div>
                      <h4 className="font-semibold">{company}</h4>

                      <p className="text-zinc-400 text-sm">Software Engineer</p>
                    </div>

                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
                      Applied
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
