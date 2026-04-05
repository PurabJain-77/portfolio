"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import NowWidget from "@/components/NowWidget";
import { TYPEWRITER_PHRASES } from "@/lib/data";

interface Props {
  onOpenTerminal: () => void;
}

// Terminal button typewriter phrases
const TERM_PHRASES = [
  "open terminal",
  "say hello",
  "run --explore",
  "cat about.md",
  "ls projects/",
  "whoami",
];

function TerminalButton({ onClick }: { onClick: () => void }) {
  const [text, setText]         = useState("");
  const [pIdx, setPIdx]         = useState(0);
  const [cIdx, setCIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TERM_PHRASES[pIdx];
    const delay = deleting ? 45 : 90 + Math.random() * 60;

    const t = setTimeout(() => {
      if (!deleting) {
        const next = cIdx + 1;
        setText(phrase.substring(0, next));
        setCIdx(next);
        if (next >= phrase.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        const next = cIdx - 1;
        setText(phrase.substring(0, next));
        setCIdx(next);
        if (next <= 0) {
          setDeleting(false);
          setPIdx(p => (p + 1) % TERM_PHRASES.length);
        }
      }
    }, delay);

    return () => clearTimeout(t);
  }, [cIdx, deleting, pIdx]);

  return (
    <button
      onClick={onClick}
      aria-label="Open terminal"
      className="flex items-center gap-0 rounded-[10px] overflow-hidden border transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "#0D0D0D",
        borderColor: "rgba(255,107,91,0.35)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,107,91,0.7)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 1px rgba(0,0,0,0.4), 0 8px 32px rgba(255,107,91,0.2)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,107,91,0.35)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 1px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)";
      }}
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-[5px] px-3.5 py-2.5 border-r flex-shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <span className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#FFBD2E]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
      </div>
      {/* Body */}
      <div className="flex items-center gap-2 px-3.5 py-2.5">
        <span className="text-[0.72rem] font-medium flex-shrink-0"
          style={{ color: "rgba(255,107,91,0.7)", fontFamily: "var(--font-dm-mono)" }}>
          ~/purab $
        </span>
        <span className="text-[0.72rem] tracking-[0.06em] whitespace-nowrap"
          style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-dm-mono)", minWidth: "96px" }}>
          {text}
        </span>
        {/* Blinking cursor */}
        <span className="inline-block w-[7px] h-[13px] flex-shrink-0"
          style={{ background: "#FF6B5B", animation: "tbtnBlink 1s step-end infinite" }} />
      </div>
      <style>{`
        @keyframes tbtnBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </button>
  );
}

export default function Hero({ onOpenTerminal }: Props) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const rawText = useTypewriter(TYPEWRITER_PHRASES, 1200);
  const display = rawText.replace(/\n/g, "<br/>");

  const handleNameMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const el = nameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.08;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.08;
    el.style.transform = `translate(${dx}px,${dy}px)`;
    el.style.transition = "";
  };

  const handleNameLeave = () => {
    const el = nameRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "translate(0,0)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 600);
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="hero" aria-label="Introduction"
      className="relative min-height-screen flex flex-col md:flex-row items-center px-6 md:px-16 pt-[120px] pb-20 gap-8 md:gap-10 z-[1]"
      style={{ minHeight: "100vh" }}
    >
      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left">
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
          style={{ fontSize: "clamp(3.5rem,10vw,9rem)", color: "var(--text)" }}
        >
          Purab Jain
        </motion.h1>

        <motion.div {...fade(0.7)}
          className="font-serif italic leading-[1.2] mb-7"
          style={{ fontSize:"clamp(1.3rem,3.5vw,3rem)", color:"#FF6B5B", minHeight:"2.2em" }}
        >
          <span dangerouslySetInnerHTML={{ __html: display }} />
          <span className="cursor-blink" />
        </motion.div>

        <motion.p {...fade(0.9)}
          className="text-[0.82rem] leading-[1.9] mb-10 max-w-[480px]"
          style={{ color:"var(--text-dim)" }}
        >
          I am an Electrical and Electronics Engineering student who enjoys turning
          ideas into working experiences — from IoT prototypes and cloud tools to
          thoughtful interfaces and research-backed problem solving.
        </motion.p>

        {/* Buttons */}
        <motion.div {...fade(1.1)} className="flex gap-3 flex-wrap justify-center md:justify-start">
          <button
            onClick={() => scrollTo("#projects-section")}
            className="px-8 py-3.5 rounded-full text-[0.68rem] tracking-[0.08em] uppercase text-white font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,91,0.25)]"
            style={{ background:"#FF6B5B" }}
          >
            View Work ↓
          </button>
          <TerminalButton onClick={onOpenTerminal} />
        </motion.div>

        {/* ⌘K hint — desktop only */}
        <motion.p {...fade(1.4)}
          className="hidden md:flex items-center gap-2 mt-4 text-[0.62rem] tracking-[0.06em] flex-wrap"
          style={{ color:"var(--text-dim)" }}
        >
          Press{" "}
          <kbd className="px-2 py-0.5 rounded border font-mono text-[0.58rem]"
            style={{ borderColor:"var(--card-border)", background:"var(--card)" }}>⌘K</kbd>
          <span style={{ opacity:0.35 }}>·</span>
          <kbd className="px-2 py-0.5 rounded border font-mono text-[0.58rem]"
            style={{ borderColor:"var(--card-border)", background:"var(--card)" }}>Ctrl+K</kbd>
          to navigate anywhere
        </motion.p>
      </div>

      {/* NOW widget — hidden on mobile */}
      <motion.div {...fade(1.0)} className="hidden md:block">
        <NowWidget />
      </motion.div>

      {/* Scroll hint */}
      <motion.div {...fade(1.4)}
        className="absolute bottom-9 left-1/2 md:left-16 -translate-x-1/2 md:translate-x-0 flex items-center gap-3"
      >
        <div className="w-12 h-px origin-left"
          style={{ background:"linear-gradient(to right,var(--text-dim),transparent)", animation:"scrollGrow 2s infinite" }} />
        <span className="text-[0.58rem] tracking-[0.15em] uppercase" style={{ color:"var(--text-dim)" }}>
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
