const MEMBERSHIP_KEY = "ironpulse_membership";

export function getMembership(ownerEmail) {
  try {
    const membership = JSON.parse(localStorage.getItem(MEMBERSHIP_KEY));
    if (ownerEmail && membership?.ownerEmail && membership.ownerEmail !== ownerEmail) return null;
    return membership;
  } catch {
    return null;
  }
}

export function setMembership(plan, owner, paymentMethod = "card") {
  const activatedAt = new Date().toISOString();
  const membership = {
    planId: plan.id,
    planName: plan.name,
    price: plan.price,
    period: plan.period,
    features: plan.features,
    ownerEmail: owner?.email ?? null,
    paymentMethod,
    activatedAt,
    memberId: `IP-${plan.id.toUpperCase()}-${Date.parse(activatedAt).toString(36).toUpperCase()}`,
  };
  localStorage.setItem(MEMBERSHIP_KEY, JSON.stringify(membership));
  window.dispatchEvent(new Event("ironpulse:membership"));
  return membership;
}

export function clearMembership() {
  localStorage.removeItem(MEMBERSHIP_KEY);
  window.dispatchEvent(new Event("ironpulse:membership"));
}
