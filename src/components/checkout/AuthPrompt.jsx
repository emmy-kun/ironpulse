import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function AuthPrompt({ onOpenAuth }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-[#16181D] p-10 text-center"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
        <Lock size={28} className="text-blue-400" />
      </div>
      <h2 className="font-['Anton'] text-3xl text-white">Members Only.</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Please log in or create an account to complete your membership purchase.
      </p>
      <Button className="mt-8 w-full justify-center" onClick={onOpenAuth}>
        Log In or Sign Up
      </Button>
      <Link
        to="/"
        className="mt-4 inline-block text-sm text-zinc-500 transition-colors hover:text-white"
      >
        Return to homepage
      </Link>
    </motion.div>
  );
}

export default AuthPrompt;
