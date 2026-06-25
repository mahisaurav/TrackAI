import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="bg-black text-white border-t border-zinc-800 px-6 py-16">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>

            <h2 className="text-3xl font-bold text-blue-500 mb-4">
              TrackAI
            </h2>

            <p className="text-zinc-400 leading-relaxed">

              AI-powered placement tracking platform
              helping students manage applications,
              resumes, interviews, and career growth.

            </p>

          </div>

          {/* Product */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Product
            </h3>

            <div className="space-y-3 text-zinc-400">

              <p className="hover:text-white transition cursor-pointer">
                Dashboard
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Applications
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Analytics
              </p>

            </div>

          </div>

          {/* AI Features */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              AI Features
            </h3>

            <div className="space-y-3 text-zinc-400">

              <p className="hover:text-white transition cursor-pointer">
                ATS Resume Checker
              </p>

              <p className="hover:text-white transition cursor-pointer">
                AI Job Matching
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Resume Analysis
              </p>

            </div>

          </div>

          {/* Auth */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Account
            </h3>

            <div className="space-y-3">

              <Link
                to="/login"
                className="block text-zinc-400 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-zinc-400 hover:text-white transition"
              >
                Register
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-zinc-500 text-sm">
            © 2026 TrackAI. All rights reserved.
          </p>

          <p className="text-zinc-500 text-sm">
            Built with React, Node.js, PostgreSQL & AI
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;