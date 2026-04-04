"use client";

import { useState, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";

import CursorEffect      from "@/components/CursorEffect";
import MouseLight        from "@/components/MouseLight";
import AuroraBackground  from "@/components/AuroraBackground";
import Navbar            from "@/components/Navbar";
import Hero              from "@/components/Hero";
import Marquee           from "@/components/Marquee";
import About             from "@/components/About";
import Skills            from "@/components/Skills";
import Projects          from "@/components/Projects";
import Journey           from "@/components/Journey";
import Currently         from "@/components/Currently";
import Bookshelf         from "@/components/Bookshelf";
import Journal           from "@/components/Journal";
import Contact           from "@/components/Contact";
import Footer            from "@/components/Footer";
import Terminal          from "@/components/Terminal";
import EasterEgg         from "@/components/EasterEgg";
import CommandPalette    from "@/components/CommandPalette";
import { useSound }      from "@/hooks/useSound";
import { useKonami }     from "@/hooks/useKonami";

/* Scroll-to-top button */
import { useState as useLocalState } from "react";

function ScrollTopBtn() {
  const [visible, setVisible] = useLocalState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-[600] w-11 h-11 rounded-full text-white text-[1.1rem] border-none shadow-[0_4px_20px_rgba(255,107,91,0.4)] transition-all duration-300"
      style={{
        background: "#FF6B5B",
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      ↑
    </button>
  );
}

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [easterActive, setEasterActive] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme !== "light";

  const { playClick, playChord } = useSound(soundEnabled);

  // Global click sound on interactive elements
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[role='button']")) playClick(520, 0.07, 0.05);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [playClick]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(v => !v);
    playClick(660, 0.08, 0.06);
  }, [playClick]);

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
    playClick(isDark ? 440 : 660, 0.09, 0.06);
  }, [isDark, setTheme, playClick]);

  const openTerminal  = useCallback(() => setTerminalOpen(true),  []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  const activateEaster = useCallback(() => {
    setEasterActive(true);
    playChord([880, 1100, 1320], 0.3);
    setTimeout(() => setEasterActive(false), 5000);
  }, [playChord]);

  useKonami(activateEaster);

  return (
    <>
      {/* Global effects */}
      <CursorEffect />
      <MouseLight />
      <AuroraBackground isDark={isDark} />

      {/* Skip to content */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Overlays */}
      <Terminal open={terminalOpen} onClose={closeTerminal} />
      <EasterEgg active={easterActive} onDismiss={() => setEasterActive(false)} />
      <CommandPalette
        onOpenTerminal={openTerminal}
        onToggleTheme={toggleTheme}
        onToggleSound={toggleSound}
      />

      {/* Nav */}
      <Navbar
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
        onOpenTerminal={openTerminal}
        onModeToggle={toggleTheme}
      />

      {/* Main */}
      <main id="main-content">
        <Hero onOpenTerminal={openTerminal} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Currently />
        <Bookshelf />
        <Journal />
        <Contact onOpenTerminal={openTerminal} />
      </main>

      <Footer />
      <ScrollTopBtn />
    </>
  );
}
