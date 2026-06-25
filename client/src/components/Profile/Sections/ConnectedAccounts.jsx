function ConnectedAccounts() {
  return (
    <div
      className="
      bg-zinc-900/60
      border border-zinc-800
      rounded-3xl
      p-6
      "
    >
      <h3 className="text-white font-semibold text-lg mb-6">
        Connected Accounts
      </h3>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span className="text-zinc-400">
            GitHub
          </span>

          <span className="text-red-400">
            Not Connected
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            LinkedIn
          </span>

          <span className="text-green-400">
            Connected
          </span>
        </div>

      </div>
    </div>
  );
}

export default ConnectedAccounts;