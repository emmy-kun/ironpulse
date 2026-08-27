import { motion } from "framer-motion";
import * as ReactCountUp from "react-countup";
import {
  Activity,
  HeartPulse,
  Flame,
  MoonStar,
  TrendingUp,
} from "lucide-react";

import Container from "../ui/Container";
import DashboardCard from "../ui/DashboardCard";
import PerformanceChart from "./PerformanceChart";
import ProgressRing from "./ProgressRing";

// react-countup's CJS/UMD build confuses Vite's ESM interop, so the
// default export sometimes arrives as the whole module namespace.
const CountUp = ReactCountUp.default?.default ?? ReactCountUp.default;

const metrics = [
  {
    icon: Activity,
    title: "Recovery",
    value: 98,
    unit: "%",
    progress: 98,
  },
  {
    icon: HeartPulse,
    title: "Heart Rate",
    value: 72,
    unit: " BPM",
    progress: 72,
  },
  {
    icon: Flame,
    title: "Calories",
    value: 1245,
    unit: " kcal",
    progress: 84,
  },
  {
    icon: MoonStar,
    title: "Sleep",
    value: 8.4,
    unit: " hrs",
    progress: 87,
  },
];

const heatmap = [
  3, 5, 2, 4, 5, 4, 3,
  4, 5, 3, 2, 5, 4, 4,
  2, 3, 5, 4, 5, 5, 3,
  4, 4, 5, 2, 3, 4, 5,
];

function PerformanceDashboard() {
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden bg-[#0B0B0D] py-32"
    >
      {/* Background Glows */}

      <div className="absolute left-0 top-24 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px]" />

      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <Container>
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: .8,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="
              inline-flex
              rounded-full
              border
              border-blue-500/20
              bg-blue-500/10
              px-5
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-blue-400
            "
          >
            Performance Intelligence
          </span>

          <h2
            className="
              mt-8
              font-['Anton']
              text-5xl
              leading-tight
              text-white
              md:text-6xl
            "
          >
            See What Your Training
            <br />

            <span className="text-blue-500">
              Is Actually Doing.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-zinc-400
            "
          >
            Every workout generates valuable insights.
            Monitor your recovery, sleep, endurance,
            heart rate and weekly progress through
            real-time performance analytics.
          </p>
        </motion.div>

        {/* Progress Rings */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: .2,
          }}
          className="
            mt-20
            grid
            gap-10
            md:grid-cols-3
          "
        >
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-[#16181D]
              p-8
              text-center
            "
          >
            <ProgressRing
              value={98}
              label="Recovery"
            />
          </div>

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-[#16181D]
              p-8
              text-center
            "
          >
            <ProgressRing
              value={91}
              label="Strength"
            />
          </div>

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-[#16181D]
              p-8
              text-center
           " >
              <ProgressRing
                value={94}
                label="Cardio"
              />
          </div>
        </motion.div>

        {/* Main Dashboard */}

        <div
          className="
            mt-16
            grid
            gap-8
            xl:grid-cols-[2fr_1fr]
          "
        >
          {/* Left Side */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: .25,
            }}
          >
            <PerformanceChart />
          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: .35,
            }}
            className="grid gap-6"
          >
            {metrics.map((item) => (
              <DashboardCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                value={item.value}
                unit={item.unit}
                progress={item.progress}
              />
            ))}
          </motion.div>
        </div>

                {/* Weekly Activity */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: .45,
          }}
          className="
            mt-16
            rounded-3xl
            border
            border-white/10
            bg-[#16181D]
            p-8
          "
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                Weekly Activity
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                Training Consistency
              </h3>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2">
              <TrendingUp
                size={18}
                className="text-blue-400"
              />

              <span className="font-semibold text-blue-400">
                +18% This Week
              </span>
            </div>
          </div>

          {/* Heatmap */}

          <div className="mt-10 grid grid-cols-7 gap-3 sm:grid-cols-14">
            {heatmap.map((value, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: .5,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * .02,
                }}
                className={`
                  aspect-square
                  rounded-xl
                  transition-all
                  duration-300
                  hover:scale-110
                  ${
                    value === 5
                      ? "bg-blue-500"
                      : value === 4
                      ? "bg-blue-500/80"
                      : value === 3
                      ? "bg-blue-500/60"
                      : value === 2
                      ? "bg-blue-500/35"
                      : "bg-white/5"
                  }
                `}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-white/5" />
              Low Activity
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-blue-500/35" />
              Moderate
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-blue-500" />
              Peak Performance
            </div>
          </div>
        </motion.div>

        {/* Live Overview */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: .55,
          }}
          className="
            mt-16
            grid
            gap-6
            md:grid-cols-4
          "
        >
          <div className="rounded-3xl border border-white/10 bg-[#16181D] p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Active Members
            </p>

            <h2 className="mt-4 text-5xl font-black text-white">
              <CountUp
                end={5284}
                duration={2}
                separator=","
              />
            </h2>

            <p className="mt-2 text-zinc-400">
              Training Today
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#16181D] p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Avg Workout
            </p>

            <h2 className="mt-4 text-5xl font-black text-white">
              <CountUp
                end={74}
                duration={2}
              />
            </h2>

            <p className="mt-2 text-zinc-400">
              Minutes
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#16181D] p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Weekly Goal
            </p>

            <h2 className="mt-4 text-5xl font-black text-white">
              <CountUp
                end={89}
                duration={2}
              />
              %
            </h2>

            <p className="mt-2 text-zinc-400">
              Completed
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#16181D] p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Club Ranking
            </p>

            <h2 className="mt-4 text-5xl font-black text-blue-400">
              #12
            </h2>

            <p className="mt-2 text-zinc-400">
              This Month
            </p>
          </div>
        </motion.div>

                {/* Bottom Performance Banner */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: .65,
          }}
          className="
            mt-16
            overflow-hidden
            rounded-[36px]
            border
            border-blue-500/20
            bg-gradient-to-r
            from-blue-600/10
            via-[#16181D]
            to-cyan-500/10
            p-10
          "
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}

            <div className="max-w-2xl">
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-blue-500/20
                  bg-blue-500/10
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-blue-400
                "
              >
                Weekly Summary
              </span>

              <h3 className="mt-6 text-4xl font-black text-white">
                Your performance keeps improving.
              </h3>

              <p className="mt-5 text-lg leading-8 text-zinc-400">
                Recovery remains exceptionally high while your training
                consistency and cardiovascular endurance continue to
                improve week after week. Stay consistent and you'll keep
                climbing the leaderboard.
              </p>
            </div>

            {/* Right */}

            <div className="text-center">
              <motion.h2
                initial={{
                  scale: .7,
                  opacity: 0,
                }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: .8,
                  duration: .5,
                }}
                className="text-7xl font-black text-blue-400"
              >
                +21%
              </motion.h2>

              <p className="mt-3 uppercase tracking-[0.35em] text-zinc-500">
                Better Than Last Week
              </p>

              <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: "82%",
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1.6,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                />
              </div>

              <p className="mt-4 text-sm text-zinc-400">
                Weekly Performance Index
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default PerformanceDashboard;