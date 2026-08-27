import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

import { faqs } from "../../data/gymData";

function FAQ() {
  const [openId, setOpenId] = useState(faqs[0].id);

  return (
    <section id="faq" className="relative bg-[#0B0B0D] py-32">
      <Container>
        <SectionHeading
          eyebrow="Good To Know"
          title="Frequently Asked."
        />

        <div className="mx-auto mt-16 max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {faqs.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="text-lg font-bold text-white">
                    {item.question}
                  </span>

                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      text-blue-400
                      transition-transform
                      duration-300
                      ${isOpen ? "rotate-45" : ""}
                    `}
                  >
                    <Plus size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 leading-7 text-zinc-400">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default FAQ;
