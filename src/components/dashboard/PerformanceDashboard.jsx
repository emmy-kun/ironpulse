import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../ui/Container";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";
import MemberWorkspace from "./MemberWorkspace";
import { getSession } from "../../lib/auth";
import { getMembership } from "../../lib/membership";

function PerformanceDashboard() {
  const [session, setSession] = useState(() => getSession());
  const [authOpen, setAuthOpen] = useState(false);
  const membership = session ? getMembership(session.email) : null;

  useEffect(() => {
    const handleAuthChange = () => setSession(getSession());
    window.addEventListener("ironpulse:auth", handleAuthChange);
    return () => window.removeEventListener("ironpulse:auth", handleAuthChange);
  }, []);

  return (
    <section id="dashboard" className="relative overflow-hidden bg-[#0B0B0D] py-32">
      <div className="absolute left-0 top-24 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">
            Member Dashboard
          </span>
          <h2 className="mt-8 font-['Anton'] text-5xl leading-tight text-white md:text-6xl">
            Your training progress,
            <br />
            <span className="text-blue-500">in one place.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Log in to view the activity recorded for your IronPulse membership.
          </p>
        </motion.div>

        {session && membership ? (
          <MemberWorkspace
            memberKey={session.email}
            memberName={session.name}
            membership={membership}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-xl rounded-3xl border border-white/10 bg-[#16181D] p-10 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
              <Lock size={28} className="text-blue-400" />
            </div>
            <h3 className="mt-6 font-['Anton'] text-3xl text-white">
              Your dashboard is private.
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Log in with your member account to see your saved workouts and weekly progress.
            </p>
            <Button className="mt-8 w-full justify-center" onClick={() => setAuthOpen(true)}>
              Log In
            </Button>
          </motion.div>
        )}
      </Container>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthenticated={(nextSession) => {
          setSession(nextSession);
          setAuthOpen(false);
        }}
      />
    </section>
  );
}

export default PerformanceDashboard;
