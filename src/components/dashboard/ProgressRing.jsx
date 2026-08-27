import { motion } from "framer-motion";

function ProgressRing({
  value,
  size = 130,
  stroke = 10,
  color = "#3B82F6",
  label,
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (value / 100) * circumference;

  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,.08)"
          strokeWidth={stroke}
          fill="none"
        />

        {/* Progress */}

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          whileInView={{
            strokeDashoffset: offset,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.8,
          }}
        />

        {/* Glow */}

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={2}
          fill="none"
          opacity={0.35}
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          whileInView={{
            strokeDashoffset: offset,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.8,
          }}
        />
      </svg>

      {/* Center */}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.h3
          initial={{
            scale: .8,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="text-3xl font-black text-white"
        >
          {value}%
        </motion.h3>

        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
          {label}
        </p>
      </div>
    </div>
  );
}

export default ProgressRing;