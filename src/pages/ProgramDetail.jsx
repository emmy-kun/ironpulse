import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock,
  Calendar,
  Dumbbell,
  Zap,
} from "lucide-react";

import { programs, coaches } from "../data/gymData";
import logo from "../assets/logos/logo.png";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer";

const intensityColor = {
  High: "bg-red-500/15 text-red-400 border-red-500/20",
  Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

function ProgramDetail() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const program = programs.find((p) => p.id === programId);
  const coach = coaches.find((c) => c.name === program?.coach);
  const otherPrograms = programs.filter((p) => p.id !== programId);

  if (!program) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0D]">
        <div className="text-center">
          <h1 className="font-['Anton'] text-4xl text-white">Program Not Found</h1>
          <Button className="mt-6" onClick={() => navigate("/programs")}>
            View All Programs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <header className="border-b border-white/10 bg-[#0B0B0D]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            <ArrowLeft size={18} />
            Back
          </button>
          <Link to="/">
            <img src={logo} alt="IronPulse" className="h-10 w-auto object-contain" />
          </Link>
          <Link to="/programs" className="hidden text-sm font-medium text-zinc-400 transition-colors hover:text-white sm:block">
            All Programs
          </Link>
        </div>
      </header>

      <section className="relative h-[45vh] min-h-[300px] overflow-hidden sm:h-[55vh] sm:min-h-[400px] lg:h-[65vh] lg:min-h-[480px]">
        <img src={program.image} alt={program.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full">
          <div className="mx-auto max-w-7xl px-6 pb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${intensityColor[program.intensity] || intensityColor.Medium}`}>
                  {program.intensity} Intensity
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  <Clock size={11} />
                  {program.duration}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  <Calendar size={11} />
                  {program.frequency}
                </span>
              </div>
              <h1 className="font-['Anton'] text-5xl leading-tight text-white md:text-7xl lg:text-8xl">{program.title}</h1>
              <p className="mt-4 max-w-xl text-lg text-zinc-300">{program.tagline}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                <Zap size={20} className="text-blue-400" />
                What to Expect
              </h2>
              <p className="mt-4 leading-7 text-zinc-400">{program.description}</p>
              <ul className="mt-8 space-y-4">
                {program.whatToExpect.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                      <Check size={13} className="text-blue-400" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                <Calendar size={20} className="text-blue-400" />
                Weekly Schedule
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {program.schedule.map((s) => (
                  <div key={`${s.day}-${s.time}`} className="rounded-2xl border border-white/10 bg-[#16181D] p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">{s.day}</div>
                    <div className="mt-1 text-lg font-bold text-white">{s.name}</div>
                    <div className="mt-1 text-sm text-zinc-400">{s.time}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                <Dumbbell size={20} className="text-blue-400" />
                Equipment
              </h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {program.equipment.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#16181D] px-4 py-3 text-sm text-zinc-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="space-y-8 lg:sticky lg:top-28">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-[24px] border border-white/10 bg-[#16181D] p-8">
                <h3 className="text-xl font-bold text-white">Benefits</h3>
                <ul className="mt-6 space-y-4">
                  {program.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                        <Check size={11} className="text-emerald-400" />
                      </div>
                      <span className="text-sm text-zinc-300">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {coach && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="rounded-[24px] border border-white/10 bg-[#16181D] p-8">
                  <h3 className="text-xl font-bold text-white">Lead Coach</h3>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-lg font-bold text-blue-400">
                      {coach.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-bold text-white">{coach.name}</div>
                      <div className="text-sm text-zinc-400">{coach.role}</div>
                      <div className="mt-1 text-xs text-zinc-500">{coach.experience} experience</div>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="rounded-[24px] border border-blue-500/20 bg-blue-500/5 p-8">
                <h3 className="text-xl font-bold text-white">Ready to Train?</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Join IronPulse and get full access to {program.title} plus everything else in the club.
                </p>
                <Button className="mt-6 w-full justify-center" onClick={() => navigate("/")}>View Memberships</Button>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-20 lg:mt-32">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-['Anton'] text-4xl text-white md:text-5xl">Other Programs</h2>
            <button onClick={() => navigate("/programs")} className="group hidden items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white sm:flex">
              View All
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {otherPrograms.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => navigate(`/programs/${p.id}`)}
                className="group cursor-pointer overflow-hidden rounded-[24px] border border-white/10 bg-[#16181D]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{p.tagline}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-400">
                    Explore
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}

export default ProgramDetail;
