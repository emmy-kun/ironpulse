import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function SuccessView({ memberName, membership, features }) {
  const navigate = useNavigate();
  const activatedDate = new Date(membership.activatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-lg rounded-[28px] border border-white/10 bg-[#16181D] p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15"
      >
        <Check size={36} className="text-emerald-400" />
      </motion.div>
      <h2 className="font-['Anton'] text-3xl text-white">
        Welcome to IronPulse.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Your <span className="font-semibold text-white">{membership.planName}</span>{" "}
        membership has been activated. You now have full access to everything
        included in your plan.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 via-[#172033] to-[#111318] p-6 text-left shadow-[0_20px_60px_rgba(59,130,246,.15)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">
              IronPulse Member
            </div>
            <div className="mt-3 text-xl font-black text-white">{memberName}</div>
          </div>
          <ShieldCheck size={26} className="shrink-0 text-blue-300" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">Plan</div>
            <div className="mt-1 text-sm font-semibold text-white">{membership.planName}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">Active since</div>
            <div className="mt-1 text-sm font-semibold text-white">{activatedDate}</div>
          </div>
          <div className="col-span-2">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">Member ID</div>
            <div className="mt-1 font-mono text-sm font-semibold tracking-wider text-blue-200">{membership.memberId}</div>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Your membership includes
        </h3>
        <ul className="mt-4 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
              <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <Button
          className="w-full justify-center"
          onClick={() => navigate("/")}
        >
          Go to Dashboard <ArrowRight size={17} />
        </Button>
        <Button
          variant="secondary"
          className="w-full justify-center"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
}

export default SuccessView;
