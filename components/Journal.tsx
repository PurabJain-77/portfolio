"use client";

import { motion } from "framer-motion";
import { JOURNAL } from "@/lib/data";

export default function Journal() {
  return (
    <section className="relative z-[1] max-w-[1100px] mx-auto px-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] uppercase text-[#FF6B5B] mb-4"
      >
        <span className="w-5 h-px bg-[#FF6B5B] block" />Thoughts
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-[0.78rem] leading-[1.8] mb-10"
        style={{ color: "var(--text-dim)" }}
      >
        Short notes on tech, design, and figuring things out.
      </motion.p>

      <div className="flex flex-col">
        {JOURNAL.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group grid gap-8 py-7 border-b transition-all first:border-t"
            style={{
              gridTemplateColumns: "120px 1fr",
              borderColor: "var(--border)",
            }}
          >
            {/* Meta */}
            <div>
              <div className="text-[0.6rem] tracking-[0.08em]" style={{ color:"var(--text-dim)" }}>
                {entry.date}
              </div>
              <span
                className="inline-block mt-1.5 text-[0.55rem] tracking-[0.1em] uppercase text-[#FF6B5B]
                           border border-[rgba(255,107,91,0.3)] px-2 py-0.5 rounded-full"
              >
                {entry.tag}
              </span>
            </div>

            {/* Body */}
            <div className="flex items-start gap-4">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 mt-[7px] transition-all duration-300
                           group-hover:bg-[#FF6B5B] group-hover:shadow-[0_0_12px_rgba(255,107,91,0.25)]"
                style={{ background:"var(--border)" }}
              />
              <p
                className="font-serif text-[1.05rem] leading-[1.65] italic transition-colors duration-200
                           group-hover:text-[var(--text)]"
                style={{ color:"var(--text-dim)" }}
              >
                {entry.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
