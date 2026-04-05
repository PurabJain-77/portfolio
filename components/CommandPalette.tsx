"use client";

import { useEffect, useRef, useState, KeyboardEvent, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CmdItem {
  group: string;
  icon: string;
  label: string;
  hint: string;
  action: () => void;
}

interface Props {
  onPokeRocky: () => void;
  onOpen?: () => void;
  onOpenTerminal: () => void;
  onToggleTheme:  () => void;
  onToggleSound:  () => void;
}

export default function CommandPalette({ onOpenTerminal, onToggleTheme, onToggleSound, onPokeRocky, onOpen }: Props) {
  const [open,     setOpen]     = useState(false);
  const [query,    setQuery]    = useState("");
  const [active,   setActive]   = useState(0);
  const inputRef   = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const ALL_ITEMS: CmdItem[] = [
    // Navigate
    { group:"Navigate", icon:"🏠", label:"Home",     hint:"top",      action:()=>window.scrollTo({top:0,behavior:"smooth"}) },
    { group:"Navigate", icon:"👤", label:"About",    hint:"#about",   action:()=>scrollTo("#about")            },
    { group:"Navigate", icon:"🔧", label:"Toolkit",  hint:"#skills",  action:()=>scrollTo("#skills")           },
    { group:"Navigate", icon:"💡", label:"Projects", hint:"#projects",action:()=>scrollTo("#projects-section") },
    { group:"Navigate", icon:"🗓", label:"Journey",  hint:"#journey", action:()=>scrollTo("#journey")          },
    { group:"Navigate", icon:"📬", label:"Contact",  hint:"#contact", action:()=>scrollTo("#contact")          },
    // Actions
    { group:"Actions", icon:"🕷️", label:"Poke Rocky",    hint:"pet",  action: onPokeRocky },
    { group:"Actions", icon:"💻", label:"Open Terminal",  hint:"_",    action: onOpenTerminal },
    { group:"Actions", icon:"🌙", label:"Toggle Theme",   hint:"mode", action: onToggleTheme  },
    { group:"Actions", icon:"🔊", label:"Toggle Sound",   hint:"sound",action: onToggleSound  },
    { group:"Actions", icon:"↑",  label:"Back to Top",    hint:"top",  action:()=>window.scrollTo({top:0,behavior:"smooth"}) },
    // Links
    { group:"Links", icon:"📧", label:"Email",     hint:"mail",  action:()=>window.open("mailto:thisispurab01@gmail.com") },
    { group:"Links", icon:"in", label:"LinkedIn",  hint:"↗",     action:()=>window.open("https://linkedin.com/in/purabjain01/","_blank") },
    { group:"Links", icon:"⌥",  label:"GitHub",    hint:"↗",     action:()=>window.open("https://github.com/PurabJain-77","_blank") },
    { group:"Links", icon:"⌨",  label:"LeetCode",  hint:"↗",     action:()=>window.open("https://leetcode.com/u/thisispurab/","_blank") },
    { group:"Links", icon:"✦",  label:"Behance",   hint:"↗",     action:()=>window.open("https://www.behance.net/purabjain2","_blank") },
    { group:"Links", icon:"📚", label:"Goodreads", hint:"↗",     action:()=>window.open("https://www.goodreads.com/user/show/145908897-purab","_blank") },
  ];

  const filtered = query.trim()
    ? ALL_ITEMS.filter(it =>
        it.label.toLowerCase().includes(query.toLowerCase()) ||
        it.group.toLowerCase().includes(query.toLowerCase()) ||
        it.hint.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ITEMS;

  // Group for rendering
  const groups = filtered.reduce<Record<string, CmdItem[]>>((acc, item) => {
    (acc[item.group] = acc[item.group] ?? []).push(item);
    return acc;
  }, {});

  const openPalette  = useCallback(() => { setOpen(true); setQuery(""); setActive(0); onOpen?.(); }, [onOpen]);
  const closePalette = useCallback(() => { setOpen(false); }, []);

  const run = useCallback((item: CmdItem) => { item.action(); closePalette(); }, [closePalette]);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open ? closePalette() : openPalette();
      }
      if (e.key === "Escape" && open) closePalette();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, openPalette, closePalette]);

  // Auto focus
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  // Scroll active into view
  useEffect(() => {
    const el = resultsRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === "Enter" && filtered[active]) run(filtered[active]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => { if (e.target === e.currentTarget) closePalette(); }}
            className="fixed inset-0 z-[9100] flex items-start justify-center pt-[18vh]"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ scale: 0.97, y: -8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-[560px] max-w-[90vw] rounded-2xl overflow-hidden border"
              style={{
                background: "rgba(18,16,14,0.97)",
                borderColor: "var(--card-border)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,91,0.06)",
              }}
            >
              {/* Input */}
              <div
                className="flex items-center gap-3 px-5 py-4 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-[1rem] opacity-45" aria-hidden>⌘</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setActive(0); }}
                  onKeyDown={onKey}
                  className="flex-1 bg-transparent border-none outline-none text-[0.85rem]"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text)", caretColor: "#FF6B5B" }}
                  placeholder="Search or jump to…"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Command search"
                />
                <kbd
                  className="text-[0.55rem] px-1.5 py-0.5 rounded border font-mono"
                  style={{ borderColor: "var(--border)", color: "var(--text-dim)", background: "rgba(255,255,255,0.04)" }}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={resultsRef} className="max-h-[360px] overflow-y-auto p-2" role="listbox">
                {filtered.length === 0 ? (
                  <div className="text-center py-8 text-[0.75rem] opacity-40" style={{ color: "var(--text-dim)" }}>
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(groups).map(([grp, items]) => (
                    <div key={grp}>
                      <div
                        className="text-[0.55rem] tracking-[0.16em] uppercase px-3 py-2.5 opacity-50"
                        style={{ color: "var(--text-dim)" }}
                      >
                        {grp}
                      </div>
                      {items.map((item) => {
                        const idx = filtered.indexOf(item);
                        return (
                          <div
                            key={item.label}
                            data-idx={idx}
                            role="option"
                            aria-selected={idx === active}
                            onClick={() => run(item)}
                            onMouseEnter={() => setActive(idx)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-none transition-colors duration-100"
                            style={{
                              background: idx === active ? "rgba(255,107,91,0.1)" : "transparent",
                            }}
                          >
                            {/* Icon box */}
                            <span
                              className="w-7 h-7 rounded-lg border flex items-center justify-center text-[0.8rem] flex-shrink-0 transition-all duration-100"
                              style={{
                                background:   idx === active ? "rgba(255,107,91,0.15)" : "rgba(255,255,255,0.05)",
                                borderColor:  idx === active ? "rgba(255,107,91,0.3)" : "var(--border)",
                              }}
                            >
                              {item.icon}
                            </span>
                            <span
                              className="font-syne font-medium text-[0.82rem] flex-1 transition-colors duration-100"
                              style={{ color: idx === active ? "#FF6B5B" : "var(--text)" }}
                            >
                              {item.label}
                            </span>
                            <span className="text-[0.6rem] opacity-50 ml-auto" style={{ color: "var(--text-dim)" }}>
                              {item.hint}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center gap-4 px-5 py-2.5 border-t text-[0.58rem] opacity-50"
                style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}
              >
                {[["↑↓","navigate"],["↵","select"],["ESC","close"]].map(([k,l])=>(
                  <span key={k} className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded border font-mono text-[0.52rem]"
                      style={{ borderColor:"var(--border)", background:"rgba(255,255,255,0.04)" }}>
                      {k}
                    </kbd>
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
