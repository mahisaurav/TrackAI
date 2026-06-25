


function ProfileHero() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div
      className="
      bg-zinc-900/60
      border border-zinc-800
      rounded-3xl
      p-8
      "
    >
      <div className="flex flex-col items-center text-center">

        <div
          className="
          h-24 w-24
          rounded-full
          bg-gradient-to-br
          from-blue-500
          to-purple-600
          flex items-center justify-center
          text-white
          text-3xl
          font-bold
          "
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white">
          {user?.name}
        </h2>

        <p className="text-zinc-400">
          {user?.email}
        </p>

        <button
          className="
          mt-5
          px-5 py-2
          rounded-xl
          bg-blue-600
          hover:bg-blue-700
          text-white
          transition
          "
        >
          Edit Profile
        </button>

      </div>
    </div>
  );
}

export default ProfileHero;