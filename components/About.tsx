"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BELIEFS } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] uppercase text-[#FF6B5B] mb-14">
      <span className="w-5 h-px bg-[#FF6B5B] block" />
      {children}
    </div>
  );
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function About() {
  return (
    <>
      {/* About */}
      <section
        id="about"
        className="relative z-[1] max-w-[1100px] mx-auto px-12 py-24"
      >
        <motion.div {...reveal()}>
          <SectionLabel>About</SectionLabel>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <motion.div {...reveal(0.1)}>
            <h2
              className="font-syne font-bold leading-[1.15] tracking-[-0.02em] mb-9"
              style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: "var(--text)" }}
            >
              Building things that{" "}
              <em className="font-serif text-[#FF6B5B] not-italic italic">work</em>{" "}
              and things that{" "}
              <em className="font-serif text-[#FF6B5B] not-italic italic">feel right.</em>
            </h2>
            <div className="flex gap-9 flex-wrap">
              {[
                { num: "4+",  label: "Projects"    },
                { num: "1st", label: "IEEE Award"  },
                { num: "3",   label: "Cloud Certs" },
              ].map(({ num, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span
                    className="font-syne font-extrabold leading-none tracking-[-0.03em]"
                    style={{ fontSize: "2.4rem", color: "#FF6B5B" }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-[0.6rem] tracking-[0.12em] uppercase"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...reveal(0.2)}
            className="text-[0.82rem] leading-[1.9] space-y-4"
            style={{ color: "var(--text-dim)" }}
          >
            <p>
              I&apos;m a 3rd-year EEE student at VIT Chennai — currently in my 6th semester
              — exploring the overlap between engineering fundamentals and modern product thinking.
            </p>
            <p>
              I build things that span hardware and software: IoT systems that talk to the cloud,
              mobile apps with clean interfaces, and systems that make sense of raw signals.
            </p>
            <p>
              When I&apos;m not deep in circuits or code, I&apos;m journaling, watching La Liga,
              hiking, or exploring Jain temple trails across South India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="relative z-[1] max-w-[1100px] mx-auto px-12 pb-24">
        <motion.div {...reveal()}>
          <SectionLabel>What I believe</SectionLabel>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BELIEFS.map(({ num, text }, i) => (
            <motion.div
              key={num}
              {...reveal(i * 0.1)}
              className="border rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "var(--card-border)",
                background:  "var(--card)",
                backdropFilter: "blur(8px)",
              }}
              whileHover={{ borderColor: "rgba(255,107,91,0.3)" }}
            >
              <div className="text-[0.58rem] tracking-[0.12em] text-[#FF6B5B] mb-4">{num}</div>
              <div
                className="font-serif text-[1.05rem] leading-[1.5] italic"
                style={{ color: "var(--text)" }}
              >
                {text}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
