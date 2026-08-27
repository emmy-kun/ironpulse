import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

import { coaches } from "../../data/gymData";

function Coaches() {
  return (
    <section
      id="coaches"
      className="relative overflow-hidden bg-[#0B0B0D] py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Meet The Team"
          title="Coached By The Best."
          description="Every program is led by specialists with competitive and clinical backgrounds — not generalists."
        />

        <div className="mt-16 border-y border-white/10">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="
                group
                grid
                gap-4
                border-b
                border-white/10
                py-8
                transition-colors
                duration-300
                last:border-b-0
                hover:bg-white/[0.02]
                sm:grid-cols-[3rem_1fr_auto]
                sm:items-center
                sm:gap-8
              "
            >
              <span className="font-['Anton'] text-2xl text-zinc-700 transition-colors duration-300 group-hover:text-blue-500">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-2xl font-black text-white sm:text-3xl">
                    {coach.name}
                  </h3>

                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-400">
                    {coach.role}
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                  {coach.specialty}
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-700 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400 group-hover:opacity-100"
                  />
                </p>
              </div>

              <div className="flex gap-10 sm:justify-end">
                <div>
                  <p className="text-lg font-black text-white">
                    {coach.experience}
                  </p>
                  <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">
                    Experience
                  </p>
                </div>

                <div>
                  <p className="text-lg font-black text-white">
                    {coach.clients}
                  </p>
                  <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">
                    Clients
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Coaches;
