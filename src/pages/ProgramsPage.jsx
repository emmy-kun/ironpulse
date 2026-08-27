import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock, Zap } from "lucide-react";

import { programs } from "../data/gymData";
import logo from "../assets/logos/logo.png";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer";

const intensityColor = {
  High: "bg-red-500/15 text-red-400 border-red-500/20",
  Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

function ProgramsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <header className="border-b border-white/10 bg-[#0B0B0D]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <Link to="/">
            <img src={logo} alt="IronPulse" className="h-10 w-auto object-contain" />
          </Link>
          <div className="hidden text-xs text-zinc-500 sm:block">Training Programs</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-20 max-w-3xl">
          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">
            Training Programs
          </span>
          <h1 className="mt-8 font-['Anton'] text-6xl leading-tight text-white md:text-7xl lg:text-8xl">
            Four Programs.
            <br />
            One Standard.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Strength, speed, recovery, nutrition. Every program is built and coached by specialists, not generalists. Pick where you start.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              onClick={() => navigate(`/programs/${program.id}`)}
              className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-[#16181D] shadow-[0_20px_60px_rgba(0,0,0,.45)]"
            >
              <div className="relative h-[420px] overflow-hidden">
                <img src={program.image} alt={program.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-blue-500/0 transition-all duration-500 group-hover:bg-blue-500/10" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${intensityColor[program.intensity] || intensityColor.Medium}`}>
                    {program.intensity} Intensity
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    <Clock size={11} />
                    {program.duration}
                  </span>
                </div>
                <div className="mb-6 h-[3px] w-14 rounded-full bg-blue-500 transition-all duration-500 group-hover:w-28" />
                <h3 className="text-3xl font-black text-white">{program.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-300">{program.tagline}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-400">
                  View Program
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-16 rounded-[28px] border border-white/10 bg-[#16181D] p-8 text-center md:p-16 lg:mt-24">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
            <Zap size={28} className="text-blue-400" />
          </div>
          <h2 className="font-['Anton'] text-4xl text-white md:text-5xl">Not Sure Where to Start?</h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            Book a complimentary assessment. We will match you with the right program based on your goals, schedule, and training history.
          </p>
          <Button className="mt-8 justify-center" onClick={() => navigate("/")}>Book Free Assessment</Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default ProgramsPage;
