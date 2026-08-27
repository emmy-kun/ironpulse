import { motion } from "framer-motion";

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const alignment = {
    center: "text-center items-center",
    left: "text-left items-start",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignment[align]} max-w-3xl ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      {eyebrow && (
        <span className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-500">
          {eyebrow}
        </span>
      )}

      <h2 className="font-['Anton'] text-4xl leading-none text-white md:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-zinc-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;