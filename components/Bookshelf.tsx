"use client";

import { motion } from "framer-motion";
import { BOOKS } from "@/lib/data";

export default function Bookshelf() {
  return (
    <section className="relative z-[1] max-w-[1100px] mx-auto px-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] uppercase text-[#FF6B5B] mb-4"
      >
        <span className="w-5 h-px bg-[#FF6B5B] block" />Bookshelf
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-[0.78rem] leading-[1.8] mb-8"
        style={{ color:"var(--text-dim)" }}
      >
        A few books that have genuinely changed how I think. Hover to see my take.
      </motion.p>

      {/* Shelf */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative flex gap-3 items-end pb-6 border-b-2"
        style={{ borderColor:"var(--border)" }}
      >
        {/* Coral shelf underline */}
        <div
          className="absolute bottom-[-2px] left-0 right-[40%] h-1 rounded-sm opacity-40"
          style={{ background:"linear-gradient(to right, #FF6B5B, transparent)" }}
        />

        {BOOKS.map((book, i) => (
          <motion.div
            key={book.title}
            className="book relative group flex flex-col items-center"
            whileHover={{ y: -12, rotate: -2 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Spine */}
            <div
              className="book-spine w-[42px] flex items-center justify-center
                         font-mono text-[0.55rem] tracking-[0.08em]
                         px-1.5 py-4 shadow-[3px_3px_12px_rgba(0,0,0,0.4)]
                         text-white/85"
              style={{
                height: `${book.height}px`,
                background: book.bg,
              }}
            >
              {book.title}
            </div>

            {/* Tooltip */}
            <div
              className="book-tooltip absolute bottom-[calc(100%+14px)] left-1/2
                         -translate-x-1/2 w-[200px] rounded-xl p-3.5 border
                         opacity-0 pointer-events-none z-10 transition-all duration-300"
              style={{
                background:    "var(--now-bg)",
                borderColor:   "var(--card-border)",
                backdropFilter:"blur(16px)",
              }}
            >
              <div className="font-syne text-[0.78rem] font-semibold mb-1.5" style={{ color:"var(--text)" }}>
                {book.title}
              </div>
              <div className="text-[0.68rem] leading-[1.6] italic" style={{ color:"var(--text-dim)" }}>
                {book.note}
              </div>
              <div className="text-[0.58rem] tracking-[0.1em] uppercase text-[#FF6B5B] mt-2">
                {book.status}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
