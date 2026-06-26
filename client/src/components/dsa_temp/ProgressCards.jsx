function ProgressCards({
  dailyGoal,
  solvedToday,
  currentStreak,
  longestStreak,
  onDailyGoalChange,
}) {
  const goalReached = solvedToday >= dailyGoal;

  return (
    <div>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
        Daily Goal & Streak
      </h2>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <p className="text-xs text-zinc-500">Daily Goal</p>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={dailyGoal}
              onChange={(e) => onDailyGoalChange(e.target.value)}
              className="w-16 cursor-pointer rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-xl font-semibold text-white"
            />
            <span className="text-xs text-zinc-500">solves/day</span>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <p className="text-xs text-zinc-500">Solved Today</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {solvedToday}/{dailyGoal}
          </p>
          <p className="mt-0.5 text-xs text-zinc-600">
            {goalReached ? "Goal reached" : "Keep going"}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <p className="text-xs text-zinc-500">Current Streak</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {currentStreak}{" "}
            <span className="text-sm font-normal text-zinc-500">days</span>
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <p className="text-xs text-zinc-500">Longest Streak</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {longestStreak}{" "}
            <span className="text-sm font-normal text-zinc-500">days</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressCards;
