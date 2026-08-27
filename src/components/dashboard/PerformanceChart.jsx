import { motion } from "framer-motion";

const data = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 96 },
];

const points = "40,220 120,180 200,195 280,130 360,145 440,75 520,55";

const area = `
M40 220
L120 180
L200 195
L280 130
L360 145
L440 75
L520 55
L520 260
L40 260
Z
`;

function PerformanceChart() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#16181D]
        p-8
      "
    >
      {/* Glow */}

      <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-blue-500/10 blur-[100px]" />

      {/* Header */}

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
            Weekly Progress
          </p>

          <h3 className="mt-2 text-3xl font-black text-white">
            Performance Trend
          </h3>
        </div>

        <div className="rounded-full bg-blue-500/10 px-4 py-2">
          <span className="text-sm font-semibold text-blue-400">
            +12%
          </span>
        </div>
      </div>

      {/* Chart */}

      <div className="relative mt-12">
        <svg
          viewBox="0 0 560 280"
          className="w-full"
        >
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="#60A5FA"
              />

              <stop
                offset="100%"
                stopColor="#2563EB"
              />
            </linearGradient>

            <linearGradient
              id="fillGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#3B82F6"
                stopOpacity=".35"
              />

              <stop
                offset="100%"
                stopColor="#3B82F6"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Grid */}

          {[40, 90, 140, 190, 240].map((line) => (
            <line
              key={line}
              x1="40"
              x2="520"
              y1={line}
              y2={line}
              stroke="rgba(255,255,255,.05)"
            />
          ))}

          {/* Area */}

          <motion.path
            d={area}
            fill="url(#fillGradient)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.3,
            }}
          />

          {/* Line */}

          <motion.polyline
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            initial={{
              pathLength: 0,
            }}
            whileInView={{
              pathLength: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 2,
            }}
          />

          {/* Points */}

          {[
            [40,220],
            [120,180],
            [200,195],
            [280,130],
            [360,145],
            [440,75],
            [520,55],
          ].map(([x,y], index) => (
            <motion.g
              key={index}
              initial={{
                scale:0,
              }}
              whileInView={{
                scale:1,
              }}
              viewport={{
                once:true,
              }}
              transition={{
                delay:index*0.15,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="8"
                fill="#3B82F6"
              />

              <circle
                cx={x}
                cy={y}
                r="16"
                fill="#3B82F6"
                opacity=".18"
              />
            </motion.g>
          ))}
        </svg>

        {/* Labels */}

        <div className="mt-6 flex justify-between text-xs uppercase tracking-[0.25em] text-zinc-500">
          {data.map((item) => (
            <span key={item.day}>
              {item.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerformanceChart;