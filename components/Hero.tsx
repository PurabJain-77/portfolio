"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import NowWidget from "@/components/NowWidget";
import { TYPEWRITER_PHRASES } from "@/lib/data";

interface Props {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: Props) {
  const nameRef  = useRef<HTMLHeadingElement>(null);
  const rawText  = useTypewriter(TYPEWRITER_PHRASES, 1200);
  const display  = rawText.replace(/\n/g, "<br/>");

  // Magnetic name
  const handleNameMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const el   = nameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx   = (e.clientX - (rect.left + rect.width  / 2)) * 0.08;
    const dy   = (e.clientY - (rect.top  + rect.height / 2)) * 0.08;
    el.style.transform  = `translate(${dx}px,${dy}px)`;
    el.style.transition = "";
  };

  const handleNameLeave = () => {
    const el = nameRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform  = "translate(0,0)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 600);
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-16 pt-[120px] pb-20 gap-10 z-[1]"
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        <motion.div {...fade(0.2)}
          className="inline-block text-[0.62rem] tracking-[0.15em] uppercase px-[18px] py-1.5 rounded-full border mb-7"
          style={{ color:"var(--text-dim)", borderColor:"var(--card-border)", background:"var(--card)", backdropFilter:"blur(8px)" }}
        >
          Engineering × Product × Systems Thinking
        </motion.div>

        <motion.p {...fade(0.35)}
          className="text-[0.65rem] tracking-[0.15em] uppercase mb-4"
          style={{ color:"var(--text-dim)" }}
        >
          📍 Chennai, India
        </motion.p>

        <motion.h1
          {...fade(0.5)}
          ref={nameRef}
          onMouseMove={handleNameMove}
          onMouseLeave={handleNameLeave}
          className="font-syne font-extrabold leading-[0.9] tracking-[-0.03em] mb-6 will-change-transform"
          style={{
            fontSize: "clamp(4rem,10vw,9rem)",
            color: "var(--cream)",
          }}
        >
          Purab Jain
        </motion.h1>

        <motion.div {...fade(0.7)}
          className="font-serif italic leading-[1.2] mb-7 min-h-[3.5em]"
          style={{ fontSize:"clamp(1.5rem,3.5vw,3rem)", color:"#FF6B5B" }}
        >
          <span dangerouslySetInnerHTML={{ __html: display }} />
          <span className="cursor-blink" />
        </motion.div>

        <motion.p {...fade(0.9)}
          className="text-[0.82rem] leading-[1.9] max-w-[480px] mb-10"
          style={{ color:"var(--text-dim)" }}
        >
          I am an Electrical and Electronics Engineering student who enjoys turning
          ideas into working experiences — from IoT prototypes and cloud tools to
          thoughtful interfaces and research-backed problem solving.
        </motion.p>

        <motion.div {...fade(1.1)} className="flex gap-3 flex-wrap">
          <button
            onClick={() => scrollTo("#projects-section")}
            className="px-8 py-3.5 rounded-full text-[0.68rem] tracking-[0.08em] uppercase text-white font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,91,0.25)]"
            style={{ background:"#FF6B5B" }}
          >
            View Work ↓
          </button>
          <button
            onClick={onOpenTerminal}
            className="px-8 py-3.5 rounded-full text-[0.68rem] tracking-[0.08em] uppercase transition-all hover:-translate-y-0.5 hover:border-[#FF6B5B] hover:text-[#FF6B5B]"
            style={{
              color:"var(--text)", border:"1px solid var(--card-border)",
              background:"var(--card)", backdropFilter:"blur(8px)",
            }}
          >
            Open Terminal _
          </button>
        </motion.div>
      </div>

      {/* NOW widget */}
      <motion.div {...fade(1.0)}>
        <NowWidget />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        {...fade(1.4)}
        className="absolute bottom-9 left-16 flex items-center gap-3"
      >
        <div
          className="w-12 h-px origin-left"
          style={{
            background: "linear-gradient(to right,var(--text-dim),transparent)",
            animation: "scrollGrow 2s infinite",
          }}
        />
        <span className="text-[0.58rem] tracking-[0.15em] uppercase" style={{ color:"var(--text-dim)" }}>
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
