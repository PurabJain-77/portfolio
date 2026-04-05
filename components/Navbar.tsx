"use client";

import { useScramble } from "@/hooks/useScramble";
import SoundToggle from "@/components/ui/SoundToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface Props {
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onOpenTerminal: () => void;
  onModeToggle?: () => void;
}

function NavLink({ href, label }: { href: string; label: string }) {
  const { text, scramble, reset } = useScramble(label);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    
      href={href}
      onClick={handleClick}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="text-[0.72rem] tracking-[0.04em] px-3.5 py-1.5 rounded-full transition-all no-underline"
      style={{ color: "var(--text-dim)" }}
      onMouseOver={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--card)";
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--coral, #FF6B5B)";
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)";
      }}
    >
      {text}
    </a>
  );
}

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects-section", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({
  soundEnabled,
  onSoundToggle,
  onModeToggle,
}: Props) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[500] flex items-center rounded-full border px-2 py-2 pl-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      style={{
        background: "var(--nav-bg)",
        borderColor: "var(--card-border)",
        backdropFilter: "blur(20px)",
      }}
    >
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="flex items-center gap-2.5 mr-7 opacity-100 hover:opacity-75 transition-opacity"
      >
        <div
          className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white font-bold text-[0.7rem] flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#FF6B5B,#ff9a7a)" }}
        >
          PJ
        </div>

        <span
          className="font-syne font-semibold text-[0.85rem] whitespace-nowrap"
          style={{ color: "var(--text)" }}
        >
          Purab Jain
        </span>
      </button>

      <div className="hidden md:flex gap-1 mr-4">
        {NAV_LINKS.map((l) => (
          <NavLink key={l.href} href={l.href} label={l.label} />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} />
        <ThemeToggle onToggle={onModeToggle} />

        <a
          href="mailto:thisispurab01@gmail.com"
          className="px-5 py-2 rounded-full text-[0.68rem] tracking-[0.06em] font-medium whitespace-nowrap transition-all no-underline"
          style={{ background: "var(--text)", color: "var(--surface)" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#FF6B5B";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--surface)";
          }}
        >
          Say Hello
        </a>
      </div>
    </nav>
  );
}