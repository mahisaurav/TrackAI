function ProfileCard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div
      className="
      bg-zinc-900/60
      border
      border-zinc-800
      rounded-3xl
      p-8
      "
    >
      <div className="flex items-center gap-6">

        {/* Avatar */}
        <div
          className="
          h-24
          w-24
          rounded-3xl
          bg-gradient-to-br
          from-blue-500
          to-purple-600
          flex
          items-center
          justify-center
          text-white
          text-3xl
          font-bold
          "
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        {/* User Info */}
        <div>

          <h2 className="text-2xl font-bold text-white">
            {user?.name}
          </h2>

          <p className="text-zinc-400 mt-1">
            {user?.email}
          </p>

          <p className="text-zinc-500 text-sm mt-2">
            Member since June 2026
          </p>

        </div>

      </div>
    </div>
  );
}

export default ProfileCard;