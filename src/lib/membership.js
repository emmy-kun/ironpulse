const MEMBERSHIP_KEY = "ironpulse_membership";

export function getMembership() {
  try {
    return JSON.parse(localStorage.getItem(MEMBERSHIP_KEY));
  } catch {
    return null;
  }
}

export function setMembership(plan) {
  const activatedAt = new Date().toISOString();
  const membership = {
    planId: plan.id,
    planName: plan.name,
    price: plan.price,
    period: plan.period,
    activatedAt,
    memberId: `IP-${plan.id.toUpperCase()}-${Date.parse(activatedAt).toString(36).toUpperCase()}`,
  };
  localStorage.setItem(MEMBERSHIP_KEY, JSON.stringify(membership));
  return membership;
}

export function clearMembership() {
  localStorage.removeItem(MEMBERSHIP_KEY);
}
