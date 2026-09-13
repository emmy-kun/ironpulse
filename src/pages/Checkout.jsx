import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { membershipPlans } from "../data/gymData";
import { getSession } from "../lib/auth";
import { setMembership } from "../lib/membership";
import AuthModal from "../components/auth/AuthModal";
import OrderSummary from "../components/checkout/OrderSummary";
import CheckoutForm from "../components/checkout/CheckoutForm";
import AuthPrompt from "../components/checkout/AuthPrompt";
import SuccessView from "../components/checkout/SuccessView";
import logo from "../assets/logos/logo.png";

function Checkout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = membershipPlans.find((p) => p.id === planId);

  const [session, setSession] = useState(() => getSession());
  const [authOpen, setAuthOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [membership, setMembershipState] = useState(null);

  useEffect(() => {
    if (!plan) {
      navigate("/", { replace: true });
    }
  }, [plan, navigate]);

  if (!plan) return null;

  const handlePurchase = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activatedMembership = setMembership(plan);
        setMembershipState(activatedMembership);
        setSuccess(true);
        resolve();
      }, 2200);
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0B0B0D]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="flex items-center gap-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link to="/">
            <img
              src={logo}
              alt="IronPulse"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
            <ShieldCheck size={14} />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        {!session ? (
          <AuthPrompt onOpenAuth={() => setAuthOpen(true)} />
        ) : success ? (
          <SuccessView
            memberName={session.name}
            membership={membership}
            features={plan.features}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <OrderSummary planId={planId} />
            </div>
            <div className="lg:col-span-8">
              <CheckoutForm
                plan={plan}
                onSubmit={handlePurchase}
                session={session}
              />
            </div>
          </motion.div>
        )}
      </main>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthenticated={(s) => {
          setSession(s);
          setAuthOpen(false);
        }}
      />
    </div>
  );
}

export default Checkout;
