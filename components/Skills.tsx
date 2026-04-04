"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "@/lib/data";

export default function Skills() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="skills"
      className="relative z-[1] max-w-[1100px] mx-auto px-12 pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] uppercase text-[#FF6B5B] mb-14"
      >
        <span className="w-5 h-px bg-[#FF6B5B] block" />
        Toolkit
      </motion.div>

      <div ref={ref} className="flex flex-col">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="skill-row flex items-center gap-5 py-5 border-b group transition-all"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-[0.58rem] w-[22px]" style={{ color:"var(--text-dim)" }}>
              {skill.idx}
            </span>
            <span
              className="text-[0.78rem] w-[220px] transition-colors duration-200 group-hover:text-[#FF6B5B]"
              style={{ color:"var(--text)" }}
            >
              {skill.name}
            </span>
            <div className="flex-1 h-px relative" style={{ background:"var(--border)" }}>
              <motion.div
                className="absolute left-0 top-[-1px] h-[2px] bg-[#FF6B5B] rounded-sm origin-left"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: 1.4,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <span
              className="text-[0.58rem] tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border"
              style={{ color:"var(--text-dim)", borderColor:"var(--border)" }}
            >
              {skill.tag}
            </span>
          </motion.div>
        ))}
        {/* top border for first row */}
        <style>{`.skill-row:first-child{border-top:1px solid var(--border)}`}</style>
      </div>
    </section>
  );
}
