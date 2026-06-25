



function DashboardPreview() {

  return (

    <section className="bg-black text-white py-28 px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">

          <p className="text-blue-400 font-medium mb-4">
            SMART DASHBOARD
          </p>

          <h2 className="text-5xl font-bold mb-6">
            Manage Everything in One Place
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Track applications, monitor interviews,
            visualize progress, and organize your
            placement journey efficiently.
          </p>

        </div>

        {/* Dashboard Mockup */}
        <div className="relative">

          {/* Glow */}
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>

          {/* Mockup Card */}
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

            {/* Top Bar */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-zinc-800">

              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>

            </div>

            {/* Content */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left */}
              <div className="lg:col-span-2 space-y-6">

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
                    <p className="text-zinc-400 mb-2">
                      Applications
                    </p>
                    <h3 className="text-4xl font-bold text-blue-400">
                      42
                    </h3>
                  </div>

                  <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
                    <p className="text-zinc-400 mb-2">
                      Interviews
                    </p>
                    <h3 className="text-4xl font-bold text-yellow-400">
                      8
                    </h3>
                  </div>

                  <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
                    <p className="text-zinc-400 mb-2">
                      Offers
                    </p>
                    <h3 className="text-4xl font-bold text-green-400">
                      2
                    </h3>
                  </div>

                </div>

                {/* Applications */}
                <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

                  <h3 className="text-2xl font-semibold mb-6">
                    Recent Applications
                  </h3>

                  <div className="space-y-4">

                    {[
                      "Google",
                      "Microsoft",
                      "Amazon",
                    ].map((company, index) => (

                      <div
                        key={index}
                        className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-4"
                      >

                        <div>

                          <h4 className="font-semibold">
                            {company}
                          </h4>

                          <p className="text-zinc-400 text-sm">
                            Software Engineer
                          </p>

                        </div>

                        <span className="bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-sm">
                          Applied
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              {/* Right */}
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

                <h3 className="text-2xl font-semibold mb-8">
                  AI Match Score
                </h3>

                <div className="flex items-center justify-center h-75">

                  <div className="w-48 h-48 rounded-full border-14 border-blue-500 flex items-center justify-center">

                    <div className="text-center">

                      <h2 className="text-5xl font-bold">
                        92%
                      </h2>

                      <p className="text-zinc-400 mt-2">
                        ATS Score
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardPreview;