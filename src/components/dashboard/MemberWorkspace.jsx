import { useState } from "react";
import {
  CalendarCheck,
  Check,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  Lock,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { membershipPlans, scheduleDays } from "../../data/gymData";
import {
  addRecoverySession,
  bookClass,
  bookCoachingSession,
  cancelClass,
  completeOnboarding,
  getProgress,
  requestPerformanceReview,
  saveNutritionPlan,
  recordWorkout,
} from "../../lib/progress";

const recoveryOptions = ["Ice bath", "Infrared sauna", "Compression boots", "Sports massage", "Mobility session"];
const classSessions = scheduleDays.flatMap((day) => day.classes.map((item) => ({ ...item, day: day.day })));

function Panel({ title, eyebrow, children, action }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#16181D] p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-blue-400">{eyebrow}</p>
          <h3 className="mt-2 text-2xl font-black text-white">{title}</h3>
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function LockedFeature({ label, plan }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
      <Lock size={16} className="shrink-0 text-zinc-600" />
      <span>{label} is included with the {plan} plan and above.</span>
    </div>
  );
}

function MemberWorkspace({ memberKey, memberName, membership }) {
  const [progress, setProgress] = useState(() => getProgress(memberKey));
  const [notice, setNotice] = useState("");
  const [nutritionPlan, setNutritionPlan] = useState(progress.nutritionPlan);
  const isElite = membership.planId === "elite" || membership.planId === "performance";
  const isPerformance = membership.planId === "performance";
  const plan = membershipPlans.find((item) => item.id === membership.planId);
  const benefits = membership.features ?? plan?.features ?? [];
  const firstName = memberName.split(" ")[0];
  const goalProgress = Math.min(100, Math.round((progress.workouts / progress.weeklyGoal) * 100));
  const workoutLoggedToday = progress.lastWorkout === new Date().toISOString().slice(0, 10);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyBookings = progress.bookings.filter((item) => item.bookedAt?.startsWith(currentMonth)).length;
  const monthlyCoaching = progress.coachingSessions.filter((item) => item.requestedAt?.startsWith(currentMonth)).length;
  const setUpdated = (updated, message) => {
    setProgress(updated);
    setNotice(message);
  };

  const handleWorkout = () => {
    const result = recordWorkout(memberKey);
    setUpdated(result.progress, result.alreadyLogged ? "Today's workout is already logged." : "Workout logged.");
  };

  const handleRecovery = (type) => {
    setUpdated(addRecoverySession(memberKey, { type }), `${type} added to your recovery log.`);
  };

  const handleBooking = (session) => {
    const alreadyBooked = progress.bookings.some((item) => item.id === `${session.day}-${session.time}-${session.name}`);
    if (alreadyBooked) return;
    setUpdated(bookClass(memberKey, session), `${session.name} booked for ${session.day}.`);
  };

  const handleCoaching = (type) => {
    setUpdated(bookCoachingSession(memberKey, { type }), `${type} requested.`);
  };

  return (
    <div className="mt-16 space-y-6">
      <div className="rounded-3xl border border-blue-500/20 bg-[#16181D] p-8 shadow-[0_20px_70px_rgba(37,99,235,.08)] md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400">{membership.planName} member</p>
            <h3 className="mt-3 font-['Anton'] text-4xl text-white">Welcome back, {firstName}.</h3>
            <p className="mt-3 text-zinc-400">Everything included in your membership, in one place.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400">
            <ShieldCheck size={17} /> Active membership
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 text-zinc-400"><Dumbbell size={17} className="text-blue-400" /> Workouts this week</div>
            <p className="mt-3 text-3xl font-black text-white">{progress.workouts}/{progress.weeklyGoal}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 text-zinc-400"><RefreshCw size={17} className="text-orange-400" /> Current streak</div>
            <p className="mt-3 text-3xl font-black text-white">{progress.streak} <span className="text-base font-semibold text-zinc-500">days</span></p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 text-zinc-400"><TargetIcon /> Consistency</div>
            <p className="mt-3 text-3xl font-black text-white">{goalProgress}%</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-[width] duration-500" style={{ width: `${goalProgress}%` }} /></div>
          <button type="button" onClick={handleWorkout} disabled={workoutLoggedToday} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500">
            {workoutLoggedToday ? <Check size={17} /> : <Dumbbell size={17} />} {workoutLoggedToday ? "Logged today" : "Log workout"}
          </button>
        </div>
        {notice && <p className="mt-4 text-sm text-emerald-400" role="status">{notice}</p>}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel eyebrow="Bookings" title="Book a group class" action={<span className="text-xs text-zinc-500">{progress.bookings.length} booked</span>}>
          <div className="space-y-3">
            {classSessions.slice(0, 8).map((session) => {
              const id = `${session.day}-${session.time}-${session.name}`;
              const booked = progress.bookings.some((item) => item.id === id);
              const classLimitReached = membership.planId === "essential" && monthlyBookings >= 8 && !booked;
              return <div key={id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-semibold text-white">{session.name}</p><p className="mt-1 text-sm text-zinc-500">{session.day} at {session.time} · {session.coach}</p></div>
                <button type="button" disabled={classLimitReached} onClick={() => booked ? setUpdated(cancelClass(memberKey, id), "Class booking cancelled.") : handleBooking(session)} className={`rounded-lg px-3 py-2 text-xs font-bold ${booked ? "border border-white/10 text-zinc-400" : "bg-blue-500 text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500"}`}>{booked ? "Cancel" : classLimitReached ? "Monthly limit reached" : "Book class"}</button>
              </div>;
            })}
          </div>
          {!isElite && <p className="mt-4 text-xs text-zinc-500">Essential includes up to 8 group classes per month.</p>}
        </Panel>

        <Panel eyebrow="Recovery Lab" title="Track recovery sessions">
          {isElite ? <>
            <div className="grid gap-3 sm:grid-cols-2">
              {recoveryOptions.map((type) => <button key={type} type="button" onClick={() => handleRecovery(type)} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-zinc-300 transition hover:border-blue-500/40 hover:text-white"><HeartPulse size={16} className="text-cyan-400" /> {type}</button>)}
            </div>
            <div className="mt-5 flex items-center justify-between text-sm"><span className="text-zinc-500">Sessions logged</span><span className="font-bold text-white">{progress.recoverySessions.length}</span></div>
          </> : <LockedFeature label="Recovery Lab tracking" plan="Elite" />}
        </Panel>

        <Panel eyebrow="Coaching" title="Manage coaching sessions">
          {isElite ? <>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" disabled={monthlyCoaching >= (isPerformance ? 4 : 2)} onClick={() => handleCoaching("Coaching session")} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm text-zinc-300 hover:border-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"><UserRound size={18} className="mb-2 text-blue-400" />Request coaching session<p className="mt-1 text-xs text-zinc-500">{isPerformance ? "Weekly included" : "2 sessions per month"}</p></button>
              {isPerformance && <button type="button" disabled={monthlyCoaching >= 4} onClick={() => handleCoaching("1-on-1 coaching")} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm text-zinc-300 hover:border-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"><Sparkles size={18} className="mb-2 text-amber-300" />Request 1-on-1 coaching<p className="mt-1 text-xs text-zinc-500">Included in Performance</p></button>}
            </div>
            <p className="mt-4 text-sm text-zinc-500">{monthlyCoaching} of {isPerformance ? "4" : "2"} coaching request{monthlyCoaching === 1 ? "" : "s"} this month.</p>
          </> : <LockedFeature label="Coaching sessions" plan="Elite" />}
        </Panel>

        <Panel eyebrow="Nutrition" title="Your nutrition plan">
          {isPerformance ? <>
            <textarea value={nutritionPlan} onChange={(event) => setNutritionPlan(event.target.value)} placeholder="Add your nutrition goals, meal notes, or coach recommendations..." className="min-h-28 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-blue-500/40" />
            <button type="button" onClick={() => setUpdated(saveNutritionPlan(memberKey, nutritionPlan), "Nutrition plan saved.")} className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-400">Save nutrition plan</button>
          </> : <LockedFeature label="Custom nutrition planning" plan="Performance" />}
        </Panel>

        <Panel eyebrow="Reviews" title="Performance review">
          {isPerformance ? <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-zinc-300">Quarterly performance reviews keep your plan aligned with your results.</p><p className="mt-2 text-xs text-zinc-500">{progress.lastReview ? `Last requested ${progress.lastReview}` : "No review requested yet"}</p></div><button type="button" onClick={() => setUpdated(requestPerformanceReview(memberKey), "Performance review requested.")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-400"><ClipboardCheck size={16} /> Request review</button></div> : <LockedFeature label="Quarterly performance reviews" plan="Performance" />}
        </Panel>

        <Panel eyebrow="Getting started" title="Membership benefits">
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((feature) => <div key={feature} className="flex items-start gap-2 text-sm text-zinc-300"><Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />{feature}</div>)}
          </div>
          {!progress.onboardingComplete && <button type="button" onClick={() => setUpdated(completeOnboarding(memberKey), "Onboarding marked complete.")} className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-300 hover:border-blue-500/40 hover:text-white"><MessageSquare size={16} /> Mark onboarding complete</button>}
          {progress.onboardingComplete && <p className="mt-5 flex items-center gap-2 text-sm text-emerald-400"><Check size={16} /> Onboarding complete</p>}
        </Panel>
      </div>
    </div>
  );
}

function TargetIcon() {
  return <CalendarCheck size={17} className="text-emerald-400" />;
}

export default MemberWorkspace;
