import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function SuccessView({ planName }) {
  const navigate = useNavigate();

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
        Your <span className="font-semibold text-white">{planName}</span>{" "}
        membership has been activated. You now have full access to everything
        included in your plan.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Button
          className="w-full justify-center"
          onClick={() => navigate("/")}
        >
          Go to Dashboard
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
