import { motion } from "framer-motion";

function DashboardCard({
  icon: Icon,
  title,
  value = 0,
  unit = "",
  progress = 100,
  color = "blue",
}) {
  const accent =
    color === "green"
      ? "from-emerald-500 to-emerald-400"
      : color === "red"
        ? "from-red-500 to-red-400"
        : color === "orange"
          ? "from-orange-500 to-orange-400"
          : "from-blue-500 to-cyan-400";

  const numericValue =
    typeof value === "number" ? value : parseFloat(value) || 0;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#16181D]
        p-7
        shadow-[0_20px_50px_rgba(0,0,0,.35)]
      "
    >
      {/* Glow */}

      <div
        className={`
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-gradient-to-br
          ${accent}
          opacity-10
          blur-[80px]
          transition-all
          duration-500
          group-hover:opacity-20
        `}
      />

      {/* Header */}

      <div className="relative flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
          {Icon && <Icon size={26} className="text-blue-400" />}
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-xs font-medium text-emerald-300">Live</span>
        </div>
      </div>

      {/* Title */}

      <p className="mt-7 text-xs uppercase tracking-[0.25em] text-zinc-500">
        {title}
      </p>

      {/* Value */}

      <div className="mt-3 flex items-end gap-2">
        <h2 className="text-5xl font-black text-white">{numericValue}</h2>

        <span className="pb-2 text-zinc-400">{unit}</span>
      </div>

      {/* Progress */}

      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
          <span>Today's Goal</span>

          <span>{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: `${progress}%`,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.4,
            }}
            className={`
              h-full
              rounded-full
              bg-gradient-to-r
              ${accent}
            `}
          />
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
        <span className="text-sm text-zinc-500">Updated now</span>

        <span className="font-semibold text-blue-400">Excellent</span>
      </div>
    </motion.div>
  );
}

export default DashboardCard;
