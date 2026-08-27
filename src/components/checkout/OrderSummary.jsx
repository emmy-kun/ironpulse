import { Check, Star } from "lucide-react";
import { membershipPlans } from "../../data/gymData";

const colorStyles = {
  blue: {
    badge: "bg-blue-500/15 text-blue-400",
    check: "bg-blue-500/15 text-blue-400",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/10",
  },
  amber: {
    badge: "bg-amber-400/15 text-amber-300",
    check: "bg-amber-400/20 text-amber-300",
    border: "border-amber-400/30",
    glow: "shadow-amber-400/10",
  },
  emerald: {
    badge: "bg-emerald-500/15 text-emerald-400",
    check: "bg-emerald-500/15 text-emerald-400",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/10",
  },
};

function OrderSummary({ planId }) {
  const plan = membershipPlans.find((p) => p.id === planId);
  if (!plan) return null;

  const theme = colorStyles[plan.color] || colorStyles.blue;

  return (
    <div className="sticky top-28 space-y-6">
      <h1 className="font-['Anton'] text-4xl text-white">Checkout.</h1>

      <div
        className={`rounded-[24px] border ${theme.border} bg-[#16181D] p-7 shadow-xl ${theme.glow}`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${theme.badge}`}
          >
            {plan.name}
          </span>
          {plan.highlighted && (
            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
              <Star size={11} fill="currentColor" />
              Popular
            </span>
          )}
        </div>

        <div className="mt-6 flex items-end gap-1">
          <span className="text-4xl font-black text-white">{plan.price}</span>
          <span className="pb-1 text-zinc-500">{plan.period}</span>
        </div>

        <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>

        <div className="my-6 h-px bg-white/10" />

        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${theme.check}`}
              >
                <Check size={13} />
              </div>
              <span className="text-sm text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="my-6 h-px bg-white/10" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Subtotal</span>
          <span className="text-sm text-white">{plan.price}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-zinc-400">Tax</span>
          <span className="text-sm text-white">Included</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-semibold text-white">Total</span>
          <span className="text-xl font-black text-white">
            {plan.price}
            <span className="text-sm font-normal text-zinc-500">
              {plan.period}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
