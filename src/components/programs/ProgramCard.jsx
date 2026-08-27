import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function ProgramCard({ program }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/programs/${program.id}`)}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-[#16181D]
        shadow-[0_20px_60px_rgba(0,0,0,.45)]
        cursor-pointer
      "
    >
      {/* IMAGE */}

      <div className="relative h-[420px] overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0B0B0D]
            via-black/20
            to-transparent
          "
        />

        {/* BLUE GLOW */}

        <div
          className="
            absolute
            inset-0
            bg-blue-500/0
            transition-all
            duration-500
            group-hover:bg-blue-500/10
          "
        />
      </div>

      {/* CONTENT */}

      <div className="absolute bottom-0 left-0 w-full p-8">

        {/* LINE */}

        <div
          className="
            mb-6
            h-[3px]
            w-14
            rounded-full
            bg-blue-500
            transition-all
            duration-500
            group-hover:w-28
          "
        />

        <h3 className="text-3xl font-black text-white">
          {program.title}
        </h3>

        <p className="mt-4 leading-7 text-zinc-300">
          {program.description}
        </p>

        <motion.div
          whileHover={{ x: 5 }}
          className="
            mt-8
            flex
            items-center
            gap-3
            text-blue-400
            font-semibold
          "
        >
          Explore Program

          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProgramCard;