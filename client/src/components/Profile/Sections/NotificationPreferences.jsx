function NotificationPreferences() {
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
        Notification Preferences
      </h3>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Interview Reminders
          </span>

          <span className="text-green-400">
            Enabled
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Application Updates
          </span>

          <span className="text-green-400">
            Enabled
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            ATS Updates
          </span>

          <span className="text-green-400">
            Enabled
          </span>
        </div>

      </div>
    </div>
  );
}

export default NotificationPreferences;