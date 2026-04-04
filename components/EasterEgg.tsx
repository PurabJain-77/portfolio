"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  active: boolean;
  onDismiss: () => void;
}

const DISCO_BLOBS = [
  { size:"70vw", bg:"rgba(255,107,91,0.8)", top:"-20%",  left:"-15%",  dur:"4s"   },
  { size:"60vw", bg:"rgba(107,255,184,0.6)", bottom:"-15%", right:"-10%", dur:"5s", delay:"-2s" },
  { size:"50vw", bg:"rgba(107,184,255,0.6)", top:"30%",  left:"30%",   dur:"3.5s", delay:"-1s" },
];

export default function EasterEgg({ active, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onDismiss}
          className="fixed inset-0 z-[9500] flex items-center justify-center"
          style={{ background:"rgba(0,0,0,0.7)", cursor:"pointer" }}
        >
          {DISCO_BLOBS.map((b, i) => (
            <div
              key={i}
              className="disco-blob absolute rounded-full"
              style={{
                width: b.size, height: b.size,
                background: `radial-gradient(circle, ${b.bg}, transparent 70%)`,
                top: b.top, left: b.left,
                bottom: (b as typeof b & { bottom?: string }).bottom,
                right:  (b as typeof b & { right?: string  }).right,
                filter: "blur(70px)",
                animationDuration:  b.dur,
                animationDelay:     (b as typeof b & { delay?: string }).delay ?? "0s",
              }}
            />
          ))}

          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type:"spring", stiffness:200, delay:0.1 }}
              className="text-[4rem] mb-4"
            >
              🎉
            </motion.div>
            <motion.h2
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.2 }}
              className="font-syne font-extrabold tracking-[-0.03em] text-white"
              style={{
                fontSize:"clamp(2rem,6vw,5rem)",
                textShadow:"0 0 60px rgba(255,107,91,0.8)",
              }}
            >
              SECRET UNLOCKED
            </motion.h2>
            <motion.p
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.35 }}
              className="font-mono text-[0.82rem] mt-4 tracking-[0.1em]"
              style={{ color:"rgba(255,255,255,0.7)" }}
            >
              ↑↑↓↓←→←→BA — you actually did it. respect.
            </motion.p>
            <motion.p
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.5 }}
              className="font-serif italic text-[1.3rem] mt-8"
              style={{ color:"rgba(255,255,255,0.5)" }}
            >
              now close this and get back to building things 👾
            </motion.p>
            <motion.p
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.7 }}
              className="font-mono text-[0.6rem] mt-6 tracking-[0.15em] uppercase"
              style={{ color:"rgba(255,255,255,0.3)" }}
            >
              click anywhere to dismiss
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
