import { Link } from "react-router-dom";

function CTASection() {

  return (

    <section className="bg-black text-white px-6 py-28">

      <div className="max-w-6xl mx-auto">

        <div className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-zinc-950 px-10 py-24 text-center">

          {/* Glow Effects */}
          <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-blue-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-purple-500/20 blur-3xl rounded-full"></div>

          {/* Content */}
          <div className="relative z-10">

            <p className="text-blue-400 font-medium mb-4">
              START YOUR JOURNEY
            </p>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">

              Your Placement Success
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Starts Here
              </span>

            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">

              Track applications, analyze resumes,
              and unlock AI-powered placement insights
              — all in one platform.

            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">

              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                Get Started Free
              </Link>

              <Link
                to="/login"
                className="border border-zinc-700 hover:border-zinc-500 transition px-8 py-4 rounded-2xl text-lg"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTASection;