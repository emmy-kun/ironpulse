import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Container from "../ui/Container";
import ProgramCard from "./ProgramCard";

import { programs } from "../../data/gymData";

function Programs() {
  const navigate = useNavigate();

  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-[#0B0B0D] py-32"
    >
      {/* Background Glow */}

      <div className="absolute left-0 top-40 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />

      <Container>
        {/* SECTION HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">
              Training Programs
            </span>

            <h2 className="mt-6 max-w-3xl font-['Anton'] text-5xl leading-tight text-white md:text-6xl">
              Four Programs.
              <br />
              One Standard.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Strength, speed, recovery, nutrition. Pick where you start.
              Every program is built and coached by specialists, not
              generalists.
            </p>
          </div>

          <button
            onClick={() => navigate("/programs")}
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-[#16181D]
              px-7
              py-4
              text-white
              transition-all
              duration-300
              hover:border-blue-500/30
              hover:bg-blue-500/10
            "
          >
            View All Programs

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>

        {/* PROGRAM GRID */}

        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
            >
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Programs;