import { useState } from "react";
import { Check, Dumbbell, Flame, Target } from "lucide-react";
import { getProgress, recordWorkout } from "../../lib/progress";

function MemberProgress({ memberKey, memberName, planName }) {
  const [progress, setProgress] = useState(() => getProgress(memberKey));
  const [notice, setNotice] = useState("");
  const goalProgress = Math.min(100, Math.round((progress.workouts / progress.weeklyGoal) * 100));
  const workoutLoggedToday = progress.lastWorkout === new Date().toISOString().slice(0, 10);

  const handleLogWorkout = () => {
    const result = recordWorkout(memberKey);
    setProgress(result.progress);
    setNotice(result.alreadyLogged ? "Today's workout is already logged." : "Workout logged. Keep the streak going.");
  };

  return (
    <div className="mt-16 rounded-3xl border border-blue-500/20 bg-[#16181D] p-8 shadow-[0_20px_70px_rgba(37,99,235,.08)] md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400">My Progress</p>
          <h3 className="mt-3 font-['Anton'] text-4xl text-white">Keep building, {memberName.split(" ")[0]}.</h3>
          <p className="mt-3 text-zinc-400">{planName} member activity, saved to this account.</p>
        </div>
        <button
          type="button"
          onClick={handleLogWorkout}
          disabled={workoutLoggedToday}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500"
        >
          {workoutLoggedToday ? <Check size={17} /> : <Dumbbell size={17} />}
          {workoutLoggedToday ? "Logged Today" : "Log Workout"}
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-zinc-400"><Target size={17} className="text-blue-400" /> Weekly Goal</div>
          <p className="mt-3 text-3xl font-black text-white">{progress.workouts}/{progress.weeklyGoal}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-zinc-400"><Flame size={17} className="text-orange-400" /> Current Streak</div>
          <p className="mt-3 text-3xl font-black text-white">{progress.streak} <span className="text-base font-semibold text-zinc-500">days</span></p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-zinc-400"><Dumbbell size={17} className="text-emerald-400" /> Total Workouts</div>
          <p className="mt-3 text-3xl font-black text-white">{progress.totalWorkouts}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">This week's consistency</span>
          <span className="font-bold text-blue-400">{goalProgress}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-[width] duration-500" style={{ width: `${goalProgress}%` }} />
        </div>
      </div>

      {notice && <p className="mt-4 text-sm text-emerald-400" role="status">{notice}</p>}
    </div>
  );
}

export default MemberProgress;
