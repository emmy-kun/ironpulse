import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, User, X } from "lucide-react";

import Button from "../ui/Button";
import { logIn, signUp } from "../../lib/auth";

function Field({ icon: Icon, error, ...props }) {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-colors duration-300 focus-within:border-blue-500/50">
        <Icon size={16} className="shrink-0 text-zinc-500" />
        <input
          {...props}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function AuthModal({ open, onClose, onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!open) return;

    reset();
  }, [open, reset]);

  const handleClose = useCallback(() => {
    setMode("login");
    setFormError("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  const submit = (data) => {
    setFormError("");
    try {
      const session =
        mode === "login"
          ? logIn({ email: data.email, password: data.password })
          : signUp({ name: data.name, email: data.email, password: data.password });

      onAuthenticated(session);
      onClose();
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#16181D] p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-['Anton'] text-3xl text-white">
                  {mode === "login" ? "Welcome Back." : "Create Account."}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">
                  {mode === "login"
                    ? "Log in to see your dashboard and bookings."
                    : "Set up a member account to save your progress."}
                </p>
              </div>

              <button
                onClick={handleClose}
                aria-label="Close"
                className="text-zinc-500 transition-colors hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(submit)} noValidate className="mt-8 flex flex-col gap-4">
              {mode === "signup" && (
                <Field
                  icon={User}
                  type="text"
                  placeholder="Full name"
                  error={errors.name && "Enter your name."}
                  {...register("name", { required: mode === "signup" })}
                />
              )}

              <Field
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                error={errors.email && "Enter a valid email."}
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />

              <Field
                icon={Lock}
                type="password"
                placeholder="Password"
                error={errors.password && "Password must be at least 6 characters."}
                {...register("password", { required: true, minLength: 6 })}
              />

              {formError && <p className="text-sm text-red-400">{formError}</p>}

              <Button type="submit" size="lg" className="mt-2 w-full justify-center">
                {mode === "login" ? "Log In" : "Create Account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              {mode === "login" ? "New to IronPulse?" : "Already a member?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="font-semibold text-blue-400 hover:text-blue-300"
              >
                {mode === "login" ? "Create an account" : "Log in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
