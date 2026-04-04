"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

interface Props { onToggle?: () => void }

export default function ThemeToggle({ onToggle }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [anim, setAnim]       = useState<"going-dark"|"going-light"|null>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggle = () => {
    const goingDark = !isDark; // currently light → going dark
    setAnim(goingDark ? "going-dark" : "going-light");
    setTimeout(() => setAnim(null), 500);
    onToggle?.();

    const curtain = curtainRef.current;
    if (!curtain) { setTheme(isDark ? "light" : "dark"); return; }

    curtain.style.background = goingDark ? "#161616" : "#F2EDE6";

    if (goingDark) {
      curtain.style.clipPath = "inset(0 0 100% 0)";
      requestAnimationFrame(() => {
        curtain.style.transition = "clip-path 0.52s cubic-bezier(0.76,0,0.24,1)";
        curtain.style.clipPath   = "inset(0 0 0 0)";
      });
    } else {
      curtain.style.clipPath = "inset(100% 0 0 0)";
      requestAnimationFrame(() => {
        curtain.style.transition = "clip-path 0.52s cubic-bezier(0.76,0,0.24,1)";
        curtain.style.clipPath   = "inset(0 0 0 0)";
      });
    }

    setTimeout(() => setTheme(isDark ? "light" : "dark"), 280);

    setTimeout(() => {
      if (!curtain) return;
      curtain.style.transition = "clip-path 0.44s cubic-bezier(0.76,0,0.24,1)";
      curtain.style.clipPath   = goingDark ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)";
    }, 560);

    setTimeout(() => {
      if (!curtain) return;
      curtain.style.clipPath = curtain.style.transition = curtain.style.background = "";
    }, 1050);
  };

  return (
    <>
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[8500] pointer-events-none"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      />

      {/* Button */}
      <button
        onClick={toggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="flex items-center gap-0 rounded-full border px-0 pl-3.5 py-[5px] transition-all duration-200 group"
        style={{
          borderColor: "var(--card-border)",
          background:  "var(--card)",
        }}
      >
        <span
          className="font-mono text-[0.6rem] tracking-[0.18em] uppercase mr-2.5 transition-colors duration-200 group-hover:text-[#FF6B5B]"
          style={{ color: "var(--text-dim)" }}
        >
          Theme
        </span>

        {/* Pill knob */}
        <span
          className="w-[34px] h-[24px] rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-[rgba(255,107,91,0.4)]"
          style={{ borderColor: "var(--card-border)", background: "var(--card-border)" }}
        >
          <span
            className="w-[11px] h-[17px] rounded-full border transition-all duration-300"
            style={{
              background:   isDark ? "var(--text-dim)" : "#FF6B5B",
              borderColor:  isDark ? "var(--text-dim)" : "#FF6B5B",
              animation:    anim
                ? `${anim === "going-dark" ? "knobDown" : "knobUp"} 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards`
                : "none",
            }}
          />
        </span>
      </button>

      <style>{`
        @keyframes knobDown {
          0%   { transform: translateY(-4px); }
          60%  { transform: translateY(4px);  }
          100% { transform: translateY(0);    }
        }
        @keyframes knobUp {
          0%   { transform: translateY(4px);  }
          60%  { transform: translateY(-4px); }
          100% { transform: translateY(0);    }
        }
      `}</style>
    </>
  );
}
