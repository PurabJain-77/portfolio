"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TIMELINE, CERTS } from "@/lib/data";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Journey() {
  const tlRef  = useRef<HTMLDivElement>(null);
  const inView = useInView(tlRef, { once: true, amount: 0.1 });

  return (
    <>
      {/* Timeline */}
      <section
        id="journey"
        className="relative z-[1] max-w-[1100px] mx-auto px-12 py-24"
      >
        <motion.div {...reveal()}
          className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] uppercase text-[#FF6B5B] mb-14"
        >
          <span className="w-5 h-px bg-[#FF6B5B] block" />Journey
        </motion.div>

        <div ref={tlRef} className="relative">
          {/* SVG line */}
          <div className="absolute left-[160px] top-0 bottom-0 w-[2px] z-0 pointer-events-none">
            <svg width="2" height="100%" style={{ overflow:"visible" }}>
              <line x1="1" y1="0" x2="1" y2="100%"
                stroke="rgba(255,107,91,0.15)" strokeWidth="2" />
              <motion.line
                className="timeline-path"
                x1="1" y1="0" x2="1" y2="100%"
                stroke="#FF6B5B" strokeWidth="2"
                strokeDasharray="1000"
                initial={{ strokeDashoffset: 1000 }}
                animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 1000 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </div>

          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              {...reveal(i * 0.12)}
              className="relative z-[1] grid gap-10 py-10 first:pt-0"
              style={{ gridTemplateColumns: "160px 1fr" }}
            >
              {/* Meta */}
              <div className="text-right pr-10">
                <div className="text-[0.62rem] tracking-[0.06em] mb-2" style={{ color:"var(--text-dim)" }}>
                  {item.date}
                </div>
                <div className="font-syne font-semibold text-[0.9rem] text-[#FF6B5B]">
                  {item.org}
                </div>
              </div>

              {/* Dot */}
              <div
                className="absolute left-[151px] top-11 w-[18px] h-[18px] rounded-full border-2 border-[#FF6B5B] flex items-center justify-center"
                style={{ background:"var(--surface)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B5B]" />
              </div>

              {/* Content */}
              <div>
                <div className="text-[0.82rem] font-medium mb-2.5" style={{ color:"var(--text)" }}>
                  {item.role}
                </div>
                <div className="text-[0.76rem] leading-[1.8]" style={{ color:"var(--text-dim)" }}>
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="relative z-[1] max-w-[1100px] mx-auto px-12 pb-24">
        <motion.div {...reveal()}
          className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] uppercase text-[#FF6B5B] mb-14"
        >
          <span className="w-5 h-px bg-[#FF6B5B] block" />Certifications
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              {...reveal(i * 0.07)}
              whileHover={{ y: -3, borderColor:"rgba(255,107,91,0.3)" }}
              className="border rounded-2xl p-[22px] transition-all duration-300"
              style={{ background:"var(--card)", borderColor:"var(--card-border)", backdropFilter:"blur(8px)" }}
            >
              <div className="text-[1.3rem] mb-2.5">{cert.icon}</div>
              <div className="text-[0.76rem] leading-[1.5] mb-1.5" style={{ color:"var(--text)" }}>
                {cert.name}
              </div>
              <div className="text-[0.6rem] tracking-[0.08em] uppercase" style={{ color:"var(--text-dim)" }}>
                {cert.issuer}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
