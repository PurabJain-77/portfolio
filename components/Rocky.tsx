"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  cmdKSignal?: number;
  onCmdKOpen?: (() => void) | undefined;
}

const PHRASES = [
  "I am Rocky. I help. ♪",
  "Press ⌘K to go anywhere!",
  "Amaze amaze. You build things.",
  "I like your terminal. Very hello world.",
  "Rocky hear music in code. Is good.",
  "Three eyes better than two. More debug.",
  "You read Project Hail Mary? I am Rocky.",
  "Purab build. Rocky watch. Rocky approve. ♪",
  "Open ⌘K. Rocky get excited.",
  "Grace say: figure it out. Rocky agree.",
];

const IDLE_PHRASES = [
  "Still here. Watching. ♪",
  "Try ⌘K — very fast navigate.",
  "You scroll much. Rocky notice.",
];

export default function Rocky({ cmdKSignal = 0 }: Props) {
  const [tip, setTip]         = useState("");
  const [showTip, setShowTip] = useState(false);
  const [excited, setExcited] = useState(false);
  const phraseIdx             = useRef(0);
  const tipTimer              = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevSignal            = useRef(0);

  const showMessage = useCallback((msg: string) => {
    if (tipTimer.current) clearTimeout(tipTimer.current);
    setTip(msg);
    setShowTip(true);
    tipTimer.current = setTimeout(() => setShowTip(false), 3200);
  }, []);

  const triggerExcited = useCallback(() => {
    setExcited(true);
    setTimeout(() => setExcited(false), 600);
  }, []);

  const handleClick = useCallback(() => {
    triggerExcited();
    showMessage(PHRASES[phraseIdx.current % PHRASES.length]);
    phraseIdx.current++;
  }, [triggerExcited, showMessage]);

  // React to CmdK signal
  useEffect(() => {
    if (cmdKSignal > 0 && cmdKSignal !== prevSignal.current) {
      prevSignal.current = cmdKSignal;
      triggerExcited();
      showMessage(PHRASES[phraseIdx.current % PHRASES.length]);
      phraseIdx.current++;
    }
  }, [cmdKSignal, triggerExcited, showMessage]);

  // Idle messages every ~28s
  useEffect(() => {
    const id = setInterval(() => {
      if (!showTip && Math.random() < 0.35) {
        showMessage(IDLE_PHRASES[Math.floor(Math.random() * IDLE_PHRASES.length)]);
      }
    }, 28000);
    return () => clearInterval(id);
  }, [showMessage, showTip]);

  return (
    <div className="hidden md:block">
      {/* WIP Badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="fixed z-[598] flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md select-none"
        style={{
          bottom: "80px", left: "16px",
          borderColor: "var(--card-border)", background: "var(--card)",
        }}
        title="Still adding things — check back soon"
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background:"rgba(255,195,0,0.85)", animation:"wipPulse 2.5s ease-in-out infinite" }} />
        <span className="font-mono text-[0.52rem] tracking-[0.1em] uppercase"
          style={{ color:"var(--text-dim)" }}>
          Crafting in progress
        </span>
      </motion.div>

      {/* Rocky */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
        className="fixed z-[597]"
        style={{ bottom: "16px", left: "16px" }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 px-3 py-2 rounded-xl border font-mono text-[0.62rem] leading-[1.5] pointer-events-none"
              style={{
                bottom: "62px",
                background: "var(--card)", borderColor: "var(--card-border)",
                backdropFilter: "blur(12px)", color: "var(--text-dim)",
                width: "180px",
              }}
            >
              {tip}
              <span className="absolute w-2 h-2 rotate-45 border-r border-b"
                style={{
                  bottom: "-5px", left: "16px",
                  background: "var(--card)", borderColor: "var(--card-border)",
                }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rocky SVG */}
        <motion.div
          role="button" tabIndex={0}
          aria-label="Rocky — click me!"
          onClick={handleClick}
          onKeyDown={e => { if (e.key==="Enter"||e.key===" ") handleClick(); }}
          onMouseEnter={() => { if (!showTip) showMessage("I am Rocky ♪  Click me!"); }}
          animate={excited ? { scale:[1,1.3,1.3,1.2,1], rotate:[0,-8,8,-4,0] } : { scale:1, rotate:0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-[52px] h-[52px] cursor-none select-none"
        >
          <motion.svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"
            animate={{ y:[0,-5,0] }}
            transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
          >
            <ellipse cx="26" cy="28" rx="12" ry="10" fill="#C4823A" stroke="#8B5A1E" strokeWidth="1.2"/>
            <ellipse cx="26" cy="27" rx="9" ry="4" fill="#D4924A" opacity="0.6"/>
            <ellipse cx="26" cy="30" rx="8" ry="3" fill="#B4721A" opacity="0.4"/>
            <ellipse cx="26" cy="19" rx="7" ry="6" fill="#C4823A" stroke="#8B5A1E" strokeWidth="1.2"/>
            <circle cx="21" cy="17" r="2.2" fill="#1a1a1a"/>
            <circle cx="26" cy="16" r="2.2" fill="#1a1a1a"/>
            <circle cx="31" cy="17" r="2.2" fill="#1a1a1a"/>
            <circle cx="21.7" cy="16.3" r="0.7" fill="white" opacity="0.9"/>
            <circle cx="26.7" cy="15.3" r="0.7" fill="white" opacity="0.9"/>
            <circle cx="31.7" cy="16.3" r="0.7" fill="white" opacity="0.9"/>
            <path d="M16 24 Q9 20 5 17" stroke="#8B5A1E" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M15 28 Q8 27 4 26" stroke="#8B5A1E" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M16 32 Q9 34 5 37" stroke="#8B5A1E" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M36 24 Q43 20 47 17" stroke="#8B5A1E" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M37 28 Q44 27 48 26" stroke="#8B5A1E" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M36 32 Q43 34 47 37" stroke="#8B5A1E" strokeWidth="1.8" strokeLinecap="round"/>
            <text x="22" y="44" fontSize="9" fill="#FF6B5B" opacity="0.85" fontFamily="serif">♪</text>
          </motion.svg>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes wipPulse {
          0%,100%{ box-shadow:0 0 4px rgba(255,195,0,0.4); }
          50%    { box-shadow:0 0 10px rgba(255,195,0,0.8); }
        }
      `}</style>
    </div>
  );
}
