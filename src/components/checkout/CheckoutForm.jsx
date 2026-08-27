import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  MapPin,
  Smartphone,
  User,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import Button from "../ui/Button";

function InputField({ icon: Icon, label, error, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </label>
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

function CheckoutForm({ plan, onSubmit, session }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: session?.name || "",
      email: session?.email || "",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-10">
      <section>
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <User size={18} className="text-zinc-500" />
          Member Information
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField icon={User} label="Full Name" placeholder="John Doe"
            error={errors.fullName && "Full name is required."}
            {...register("fullName", { required: true })} />
          <InputField icon={Mail} label="Email Address" type="email" placeholder="you@example.com"
            error={errors.email && "Valid email is required."}
            {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
          <InputField icon={Smartphone} label="Phone Number" type="tel" placeholder="+1 (555) 000-0000"
            error={errors.phone && "Phone number is required."}
            {...register("phone", { required: true })} />
        </div>
      </section>

      <section>
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <CreditCard size={18} className="text-zinc-500" />
          Payment Method
        </h3>
        <div className="mb-6 flex gap-3">
          <button type="button" onClick={() => setPaymentMethod("card")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
              paymentMethod === "card" ? "border-blue-500/40 bg-blue-500/10 text-white" : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
            }`}>
            <CreditCard size={16} /> Credit Card
          </button>
          <button type="button" onClick={() => setPaymentMethod("paypal")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
              paymentMethod === "paypal" ? "border-blue-500/40 bg-blue-500/10 text-white" : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
            }`}>
            PayPal
          </button>
        </div>
        <AnimatePresence mode="wait">
          {paymentMethod === "card" && (
            <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-5">
              <InputField icon={CreditCard} label="Card Number" placeholder="0000 0000 0000 0000" maxLength={19}
                error={errors.cardNumber && "Card number is required."} {...register("cardNumber", { required: true })} />
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField icon={Lock} label="Expiry Date" placeholder="MM / YY" maxLength={7}
                  error={errors.expiry && "Required."} {...register("expiry", { required: true })} />
                <InputField icon={Lock} label="CVC" placeholder="123" maxLength={4} type="password"
                  error={errors.cvc && "Required."} {...register("cvc", { required: true })} />
              </div>
            </motion.div>
          )}
          {paymentMethod === "paypal" && (
            <motion.div key="paypal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <p className="text-sm text-zinc-400">
                You will be redirected to PayPal to complete your payment securely after clicking <span className="font-semibold text-white">Complete Purchase</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section>
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <MapPin size={18} className="text-zinc-500" />
          Billing Address
        </h3>
        <div className="grid gap-5">
          <InputField icon={MapPin} label="Street Address" placeholder="123 IronPulse Street"
            error={errors.address && "Address is required."} {...register("address", { required: true })} />
          <div className="grid gap-5 sm:grid-cols-3">
            <InputField icon={MapPin} label="City" placeholder="New York"
              error={errors.city && "Required."} {...register("city", { required: true })} />
            <InputField icon={MapPin} label="State" placeholder="NY"
              error={errors.state && "Required."} {...register("state", { required: true })} />
            <InputField icon={MapPin} label="ZIP Code" placeholder="10001"
              error={errors.zip && "Required."} {...register("zip", { required: true })} />
          </div>
        </div>
      </section>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
            {...register("terms", { required: true })} />
          <span className="text-sm leading-5 text-zinc-400">
            I agree to the <span className="text-white underline">Terms of Service</span> and <span className="text-white underline">Membership Agreement</span>.
            I understand I can pause or cancel with 30 days&apos; notice.
          </span>
        </label>
        {errors.terms && <p className="mt-2 text-xs text-red-400">You must agree to the terms to continue.</p>}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? (
          <><Loader2 size={18} className="animate-spin" /> Processing Payment...</>
        ) : (
          <><Lock size={18} /> Complete Purchase — {plan.price}{plan.period}</>
        )}
      </Button>
    </form>
  );
}

export default CheckoutForm;
