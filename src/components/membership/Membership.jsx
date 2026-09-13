import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";

import { membershipPlans } from "../../data/gymData";
import { getSession } from "../../lib/auth";

function Membership() {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null);

  const handleChoosePlan = (planId) => {
    const currentSession = getSession();
    if (currentSession) {
      navigate(`/checkout/${planId}`);
    } else {
      setPendingPlan(planId);
      setAuthOpen(true);
    }
  };

  const handleAuthenticated = () => {
    setAuthOpen(false);
    if (pendingPlan) {
      navigate(`/checkout/${pendingPlan}`);
      setPendingPlan(null);
    }
  };

  return (
    <section
      id="membership"
      className="relative overflow-hidden bg-[#0B0B0D] py-32"
    >
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[150px]" />

      <Container>
        <SectionHeading
          eyebrow="Membership"
          title="Choose Your Plan."
          description="No lock-in contracts. Pause for up to 60 days a year, upgrade anytime, and cancel with 30 days' notice."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-center">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`
                relative
                flex
                h-full
                flex-col
                rounded-[28px]
                border
                p-9
                ${
                  plan.highlighted
                    ? "border-amber-400/40 bg-gradient-to-b from-amber-400/10 via-[#16181D] to-[#16181D] shadow-[0_30px_80px_rgba(251,191,36,.12)] lg:scale-105"
                    : "border-white/10 bg-[#16181D]"
                }
              `}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0B0B0D] sm:gap-2 sm:px-5 sm:text-xs sm:tracking-[0.2em]">
                  <Star size={12} fill="#0B0B0D" />
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-black text-white">{plan.name}</h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {plan.description}
              </p>

              <div className="mt-8 flex items-end gap-1">
                <span className="text-5xl font-black text-white">
                  {plan.price}
                </span>
                <span className="pb-1.5 text-zinc-500">{plan.period}</span>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div
                      className={`
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        ${
                          plan.highlighted
                            ? "bg-amber-400/20"
                            : "bg-blue-500/15"
                        }
                      `}
                    >
                      <Check
                        size={13}
                        className={
                          plan.highlighted ? "text-amber-300" : "text-blue-400"
                        }
                      />
                    </div>

                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <Button
                  variant={plan.highlighted ? "accent" : "secondary"}
                  className="w-full justify-center"
                  onClick={() => handleChoosePlan(plan.id)}
                >
                  Choose {plan.name}
                </Button>
              </div>

            </motion.div>
          ))}
        </div>
      </Container>

      <AuthModal
        open={authOpen}
        onClose={() => {
          setAuthOpen(false);
          setPendingPlan(null);
        }}
        onAuthenticated={handleAuthenticated}
      />
    </section>
  );
}

export default Membership;
