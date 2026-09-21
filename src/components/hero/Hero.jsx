import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";

import Container from "../ui/Container";
import Button from "../ui/Button";
import { scrollToSection } from "../../lib/lenis";

import heroPoster from "../../assets/images/hero.jpg";
import heroVideo from "../../assets/videos/hero.mp4";

const stats = [
  { value: "5,000+", label: "Active Members" },
  { value: "145", label: "Weekly Classes" },
  { value: "24", label: "Professional Coaches" },
  { value: "97%", label: "Member Satisfaction" },
];

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative flex min-h-[480px] items-center overflow-hidden bg-[#0B0B0D] pt-20 sm:min-h-[85vh] lg:min-h-screen"
    >
      {/* Background Video */}

      <div className="absolute inset-x-0 top-0 h-[clamp(220px,62vw,360px)] sm:inset-0 sm:h-auto">
        <video
          className="h-full w-full object-cover object-[center_30%] sm:object-center"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/70 to-[#0B0B0D]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/80 via-transparent to-[#0B0B0D]/30" />
      </div>

      {/* Mouse Parallax Glows */}

      <MouseParallaxContainer
        className="pointer-events-none absolute inset-0"
        globalFactorX={0.3}
        globalFactorY={0.3}
        resetOnLeave
      >
        <MouseParallaxChild factorX={0.4} factorY={0.3}>
          <div className="absolute left-1/4 top-24 h-[450px] w-[450px] rounded-full bg-blue-500/20 blur-[150px]" />
        </MouseParallaxChild>

        <MouseParallaxChild factorX={-0.5} factorY={-0.2}>
          <div className="absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-amber-400/10 blur-[140px]" />
        </MouseParallaxChild>
      </MouseParallaxContainer>

      <Container className="relative">
        {/* ================= HERO ================= */}

        <div className="flex min-h-[320px] flex-col justify-center sm:min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span
              className="
                mt-4
                inline-flex
                items-center
                rounded-full
                border
                border-blue-500/30
                bg-blue-500/10
                px-5
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.35em]
                text-blue-400
                backdrop-blur-sm
              "
            >
              Elite Performance Club
            </span>

            <h1
              className="
                mt-8
                font-['Anton']
                text-6xl
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-7xl
                lg:text-8xl
              "
            >
              Train <span className="text-blue-500">Smarter.</span>
              <br />
              Recover Faster.
            </h1>

            <p
              className="
                mt-8
                max-w-xl
                text-lg
                leading-8
                text-zinc-300
              "
            >
              Join a premium performance club built for athletes,
              professionals and anyone committed to becoming stronger,
              healthier and more resilient through expert coaching and
              modern recovery.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollToSection("membership")}>
                Join Club
                <ArrowRight size={18} />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/programs")}
              >
                Explore Programs
              </Button>
            </div>
          </motion.div>
        </div>

        {/* ================= STATS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            mb-16
            mt-8
            grid
            gap-6
            sm:mt-12
            lg:mt-16
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              transition={{ duration: 0.25 }}
              className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                ${
                  index === 3
                    ? "border-blue-500/30 bg-blue-500/10"
                    : "border-white/10 bg-[#16181D]/80"
                }
              `}
            >
              {/* Glow */}

              {index === 3 && (
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" />
              )}

              <div className="relative">
                <h2
                  className={`
                    text-5xl
                    font-black
                    ${
                      index === 3
                        ? "text-white"
                        : "text-blue-500"
                    }
                  `}
                >
                  {item.value}
                </h2>

                <p
                  className={`
                    mt-4
                    text-sm
                    uppercase
                    tracking-[0.22em]
                    ${
                      index === 3
                        ? "text-blue-200"
                        : "text-zinc-400"
                    }
                  `}
                >
                  {item.label}
                </p>

                {index === 3 && (
                  <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "97%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: 0.4,
                      }}
                      className="h-full rounded-full bg-blue-500"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Scroll Cue */}

      <motion.button
        onClick={() => navigate("/programs")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-400 transition-colors hover:text-blue-400"
        aria-label="Scroll to programs"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}

export default Hero;
