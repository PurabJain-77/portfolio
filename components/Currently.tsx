"use client";

import { motion } from "framer-motion";
import { CURRENTLY } from "@/lib/data";

export default function Currently() {
  return (
    <section className="relative z-[1] max-w-[1100px] mx-auto px-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] uppercase mb-14"
        style={{ color: "#FF6B5B" }}
      >
        <span className="w-5 h-px block" style={{ background: "#FF6B5B" }} />
        Currently
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {CURRENTLY.map(({ emoji, label, val, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className="border rounded-2xl p-[22px]"
            style={{ background: "var(--card)", borderColor: "var(--card-border)", backdropFilter: "blur(8px)" }}
          >
            <div className="text-[0.58rem] tracking-[0.14em] uppercase mb-2.5" style={{ color: "#FF6B5B" }}>
              {emoji} {label}
            </div>
            <div
              className="font-syne font-semibold text-[0.92rem] leading-[1.3]"
              style={{ color: label === "Building" ? "#FF6B5B" : "var(--text)" }}
            >
              {val}
            </div>
            <div className="text-[0.68rem] mt-1" style={{ color: "var(--text-dim)" }}>{sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
