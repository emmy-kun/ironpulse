const PROGRESS_KEY = "ironpulse_progress";
const WEEKLY_GOAL = 4;

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getWeekStart() {
  const date = new Date();
  const day = date.getDay();
  const daysFromMonday = (day + 6) % 7;
  date.setDate(date.getDate() - daysFromMonday);
  return date.toISOString().slice(0, 10);
}

function getYesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) ?? {};
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function createDefaultProgress() {
  return {
    weekStart: getWeekStart(),
    weeklyGoal: WEEKLY_GOAL,
    workouts: 0,
    streak: 0,
    totalWorkouts: 0,
    lastWorkout: null,
    recoverySessions: [],
    bookings: [],
    coachingSessions: [],
    nutritionPlan: "",
    onboardingComplete: false,
    lastReview: null,
  };
}

export function getProgress(memberKey) {
  const allProgress = readProgress();
  const saved = { ...createDefaultProgress(), ...(allProgress[memberKey] ?? {}) };

  if (saved.weekStart !== getWeekStart()) {
    return { ...saved, weekStart: getWeekStart(), workouts: 0 };
  }

  return saved;
}

export function recordWorkout(memberKey) {
  const allProgress = readProgress();
  const progress = getProgress(memberKey);
  const today = getToday();

  if (progress.lastWorkout === today) {
    return { progress, alreadyLogged: true };
  }

  const updated = {
    ...progress,
    weekStart: getWeekStart(),
    workouts: progress.workouts + 1,
    streak: progress.lastWorkout === getYesterday() ? progress.streak + 1 : 1,
    totalWorkouts: progress.totalWorkouts + 1,
    lastWorkout: today,
  };

  allProgress[memberKey] = updated;
  writeProgress(allProgress);

  return { progress: updated, alreadyLogged: false };
}

function updateProgress(memberKey, update) {
  const allProgress = readProgress();
  const updated = { ...getProgress(memberKey), ...update };
  allProgress[memberKey] = updated;
  writeProgress(allProgress);
  return updated;
}

export function addRecoverySession(memberKey, session) {
  const progress = getProgress(memberKey);
  const recoverySessions = [
    ...progress.recoverySessions,
    { ...session, id: `${session.type}-${Date.now()}`, date: getToday() },
  ];
  return updateProgress(memberKey, { recoverySessions });
}

export function bookClass(memberKey, classSession) {
  const progress = getProgress(memberKey);
  const booking = {
    ...classSession,
    id: `${classSession.day}-${classSession.time}-${classSession.name}`,
    bookedAt: getToday(),
  };

  if (progress.bookings.some((item) => item.id === booking.id)) return progress;
  return updateProgress(memberKey, { bookings: [...progress.bookings, booking] });
}

export function cancelClass(memberKey, bookingId) {
  const progress = getProgress(memberKey);
  return updateProgress(memberKey, {
    bookings: progress.bookings.filter((item) => item.id !== bookingId),
  });
}

export function bookCoachingSession(memberKey, session) {
  const progress = getProgress(memberKey);
  const coachingSessions = [
    ...progress.coachingSessions,
    { ...session, id: `${session.type}-${Date.now()}`, requestedAt: getToday() },
  ];
  return updateProgress(memberKey, { coachingSessions });
}

export function saveNutritionPlan(memberKey, nutritionPlan) {
  return updateProgress(memberKey, { nutritionPlan });
}

export function completeOnboarding(memberKey) {
  return updateProgress(memberKey, { onboardingComplete: true });
}

export function requestPerformanceReview(memberKey) {
  return updateProgress(memberKey, { lastReview: getToday() });
}
