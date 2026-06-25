function AccountInfo() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

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
        Account Information
      </h3>

      <div className="space-y-4">

        <div>
          <label className="text-zinc-500 text-sm">
            Full Name
          </label>

          <input
            value={user?.name || ""}
            readOnly
            className="
            mt-2
            w-full
            rounded-xl
            border border-zinc-800
            bg-zinc-950
            px-4 py-3
            text-white
            "
          />
        </div>

        <div>
          <label className="text-zinc-500 text-sm">
            Email
          </label>

          <input
            value={user?.email || ""}
            readOnly
            className="
            mt-2
            w-full
            rounded-xl
            border border-zinc-800
            bg-zinc-950
            px-4 py-3
            text-white
            "
          />
        </div>

      </div>
    </div>
  );
}

export default AccountInfo;