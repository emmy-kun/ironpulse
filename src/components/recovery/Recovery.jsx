import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import Container from "../ui/Container";
import Button from "../ui/Button";

import recoveryImage from "../../assets/images/recovery1.jpg";

const features = [
  "Ice Bath Therapy",
  "Infrared Sauna",
  "Compression Boots",
  "Sports Massage",
  "Mobility Sessions",
  "Recovery Tracking",
];

function Recovery() {
  return (
    <section
      id="recovery"
      className="relative overflow-hidden bg-[#0B0B0D] py-32"
    >
      {/* Background Glow */}

      <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[150px]" />

      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
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
              Recovery Lab
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
              Recover Faster.
              <br />
              Perform Better.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
              Training breaks the body down. Recovery builds it back stronger.
              Our science-backed recovery lab helps you reduce soreness,
              improve mobility, and stay ready for your next performance.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15">
                    <Check
                      size={16}
                      className="text-blue-400"
                    />
                  </div>

                  <span className="text-zinc-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button size="lg">
                Book Recovery
                <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="relative"
          >
            <img
              src={recoveryImage}
              alt="Recovery"
              className="
                h-[420px]
                w-full
                rounded-[36px]
                object-cover
                shadow-[0_30px_90px_rgba(0,0,0,.45)]
                sm:h-[560px]
                lg:h-[700px]
              "
            />

            {/* Floating Card */}

            <motion.div
              whileHover={{
                y: -8,
              }}
              className="
                absolute
                bottom-4
                left-4
                right-4
                w-auto
                rounded-3xl
                border
                border-white/10
                bg-[#16181D]/90
                p-5
                backdrop-blur-xl
                sm:bottom-6
                sm:left-6
                sm:right-auto
                sm:w-80
                sm:p-6
                lg:bottom-8
                lg:left-8
                lg:w-72
              "
            >
              <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
                Recovery Score
              </p>

              <h3 className="mt-2 text-4xl font-black text-white sm:mt-3 sm:text-5xl">
                95%
              </h3>

              <div className="mt-4 h-2 rounded-full bg-white/10 sm:mt-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "95%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.6,
                  }}
                  className="h-full rounded-full bg-blue-500"
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-400 sm:mt-5">
                Members using our recovery protocols consistently report
                faster muscle recovery and improved weekly performance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Recovery;