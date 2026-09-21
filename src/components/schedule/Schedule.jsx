import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, User } from "lucide-react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

import { scheduleDays } from "../../data/gymData";

const intensityStyles = {
  Low: "border-white/10 bg-white/5 text-zinc-400",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  High: "border-blue-500/30 bg-blue-500/10 text-blue-400",
};

function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const current = scheduleDays[activeDay];

  return (
    <section
      id="schedule"
      className="relative overflow-hidden bg-[#0B0B0D] py-32"
    >
      <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[130px]" />

      <Container>
        <SectionHeading
          eyebrow="Weekly Timetable"
          title="Find Your Slot."
          description="Every session is coached live. Pick a day to see what's running. Book your spot up to a week ahead through the member app."
        />

        {/* Day Tabs */}

        <div className="mt-14 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:[display:none]">
          {scheduleDays.map((item, index) => (
            <button
              key={item.day}
              onClick={() => setActiveDay(index)}
              className={`
                whitespace-nowrap
                rounded-full
                border
                px-6
                py-3
                text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                transition-all
                duration-300
                ${
                  activeDay === index
                    ? "border-blue-500/30 bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "border-white/10 bg-[#16181D] text-zinc-400 hover:border-white/20 hover:text-white"
                }
              `}
            >
              {item.day}
            </button>
          ))}
        </div>

        {/* Class List */}

        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#16181D]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-white/5"
            >
              {current.classes.map((session) => (
                <div
                  key={`${session.time}-${session.name}`}
                  className="
                    flex
                    flex-col
                    gap-4
                    p-6
                    transition-colors
                    duration-300
                    hover:bg-white/[0.03]
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div className="flex items-center gap-5">
                    <div className="flex w-16 shrink-0 items-center gap-2 text-blue-400">
                      <Clock size={16} />
                      <span className="font-semibold">{session.time}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {session.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                        <User size={14} />
                        {session.coach}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`
                      inline-flex
                      w-fit
                      items-center
                      rounded-full
                      border
                      px-4
                      py-1.5
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      ${intensityStyles[session.intensity]}
                    `}
                  >
                    {session.intensity}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

export default Schedule;
