"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";

export default function Projects() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const wrap  = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const rect     = wrap.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const maxShift = track.scrollWidth - window.innerWidth + 96;
      track.style.transform = `translateX(-${progress * maxShift}px)`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Per-card mouse glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + "%");
    el.style.setProperty("--my", ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%");
  };

  return (
    <div id="projects-section" ref={wrapRef} style={{ height: "320vh" }}>
      <div
        className="sticky top-0 overflow-hidden flex flex-col justify-center"
        style={{ height: "100vh" }}
      >
        {/* Header */}
        <div className="absolute top-10 left-12 right-12 flex items-center justify-between z-10">
          <div
            className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] uppercase"
            style={{ color: "#FF6B5B" }}
          >
            <span className="w-5 h-px bg-[#FF6B5B] block" />
            Selected Work
          </div>
          <span
            className="text-[0.6rem] tracking-[0.1em] uppercase"
            style={{ color: "var(--text-dim)" }}
          >
            ← Scroll to browse →
          </span>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-5 px-12 will-change-transform"
          style={{ transition: "transform 0.05s linear" }}
        >
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="project-card flex-shrink-0 rounded-[20px] p-9 border relative overflow-hidden cursor-none"
              style={{
                minWidth: p.featured ? "480px" : "380px",
                background: "rgba(16,18,16,0.82)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {/* Mouse glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(255,107,91,0.07), transparent 60%)",
                }}
              />

              {/* Number + award */}
              <div className="flex items-center justify-between text-[0.62rem] tracking-[0.18em] uppercase mb-5"
                style={{ color: "var(--text-dim)" }}>
                <span>{p.num}</span>
                {p.award && (
                  <span className="text-[0.55rem] tracking-[0.06em] px-2.5 py-1 rounded-full border"
                    style={{ color: "#FF6B5B", background: "rgba(255,107,91,0.12)", borderColor: "rgba(255,107,91,0.25)" }}>
                    {p.award}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                className="font-syne font-bold leading-[1.2] mb-3.5 tracking-[-0.01em]"
                style={{ fontSize: p.featured ? "1.9rem" : "1.45rem", color: "var(--text)" }}
              >
                {p.title}
              </h3>

              {/* Desc */}
              <p className="text-[0.78rem] leading-[1.85] mb-4" style={{ color: "var(--text-dim)" }}>
                {p.desc}
              </p>

              {/* Bullets */}
              <ul className="space-y-1 mb-0">
                {p.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2.5 items-baseline text-[0.75rem] leading-[1.7]"
                    style={{ color: "var(--text-dim)" }}>
                    <span className="text-[#FF6B5B] flex-shrink-0 text-[0.8rem]">•</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-6">
                {p.tags.map((t) => (
                  <span key={t}
                    className="text-[0.56rem] tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border"
                    style={{ color: "var(--text-dim)", borderColor: "rgba(255,255,255,0.1)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* GitHub trail card */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-center text-center gap-3 rounded-[20px] border px-10"
            style={{
              minWidth: "220px",
              borderColor: "rgba(255,107,91,0.2)",
              borderStyle: "dashed",
              background: "rgba(255,107,91,0.03)",
            }}
          >
            <span className="text-[2rem]">💡</span>
            <span className="font-syne text-[0.9rem]" style={{ color: "var(--text-dim)" }}>
              More coming soon
            </span>
            <a href="https://github.com/PurabJain-77" target="_blank" rel="noopener noreferrer"
              className="text-[0.68rem] tracking-[0.08em] no-underline"
              style={{ color: "#FF6B5B" }}>
              ↗ GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
