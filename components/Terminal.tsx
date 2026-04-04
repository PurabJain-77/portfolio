"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TERMINAL_COMMANDS } from "@/lib/data";

interface Line {
  text: string;
  type: "cmd" | "out" | "dim";
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Terminal({ open, onClose }: Props) {
  const [lines, setLines]   = useState<Line[]>([
    { text: "Welcome to Purab's terminal. Type help to get started.", type: "dim" },
    { text: "─────────────────────────────────────",                  type: "dim" },
  ]);
  const [input, setInput]   = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const runCmd = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [...lines, { text: `purab@portfolio ~$ ${raw}`, type: "cmd" }];

    if (!cmd) { setLines(next); return; }
    if (cmd === "clear") { setLines([]); return; }
    if (cmd === "exit")  { onClose(); return; }
    if (cmd === "date")  {
      next.push({ text: new Date().toLocaleDateString("en-IN", {
        weekday:"long", year:"numeric", month:"long", day:"numeric"
      }), type:"out" });
      setLines(next); return;
    }

    const out = TERMINAL_COMMANDS[cmd];
    if (out) {
      next.push({ text: out, type: "out" });
    } else {
      next.push({
        text: `command not found: ${cmd}. Type help for options.`,
        type: "dim",
      });
    }
    setLines(next);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCmd(input);
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[8000] flex items-center justify-center"
          style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(12px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            transition={{ duration: 0.3 }}
            className="w-[640px] max-w-[90vw] rounded-2xl overflow-hidden border"
            style={{
              background:"#0D0D0D",
              borderColor:"rgba(255,107,91,0.3)",
              boxShadow:"0 32px 80px rgba(0,0,0,0.8), 0 0 40px rgba(255,107,91,0.08)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3.5 border-b"
              style={{ background:"#161616", borderColor:"rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F56]"
              />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-auto text-[0.7rem] tracking-[0.04em]"
                style={{ color:"rgba(255,255,255,0.4)" }}>
                purab@portfolio ~ zsh
              </span>
            </div>

            {/* Body */}
            <div
              ref={bodyRef}
              className="p-5 font-mono text-[0.78rem] min-h-[360px] max-h-[60vh] overflow-y-auto"
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={`terminal-line mb-1 ${
                    l.type === "cmd" ? "cmd" :
                    l.type === "dim" ? "dim" : ""
                  }`}
                >
                  {l.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-5 pb-5">
              <span className="text-[#FF6B5B] flex-shrink-0 text-[0.78rem] font-mono">
                purab@portfolio ~$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                className="flex-1 bg-transparent border-none outline-none font-mono text-[0.78rem]"
                style={{ color:"var(--text)", caretColor:"#FF6B5B" }}
                placeholder="_"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
