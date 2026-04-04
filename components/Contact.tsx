"use client";

import { motion } from "framer-motion";
import { FOOTER_SOCIALS } from "@/lib/data";

interface Props { onOpenTerminal: () => void }

const PRIMARY = [
  { label: "✉ Email",    href: "mailto:thisispurab01@gmail.com" },
  { label: "↗ LinkedIn", href: "https://linkedin.com/in/purabjain01/", external: true },
  { label: "↗ GitHub",   href: "https://github.com/PurabJain-77",       external: true },
];

const ELSEWHERE = [
  { label: "𝕏 Twitter / X", href: "https://x.com/" },
  { label: "⌨ LeetCode",    href: "https://leetcode.com/u/thisispurab/",                       external: true },
  { label: "✦ Behance",     href: "https://www.behance.net/purabjain2",                         external: true },
  { label: "📚 Goodreads",  href: "https://www.goodreads.com/user/show/145908897-purab",        external: true },
];

export default function Contact({ onOpenTerminal }: Props) {
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="contact" className="relative z-[1] max-w-[1100px] mx-auto px-12 py-24 text-center">
      <motion.h2 {...fade()}
        className="font-syne font-extrabold leading-[0.92] tracking-[-0.04em] mb-9"
        style={{ fontSize: "clamp(3rem,8vw,7.5rem)", color: "var(--text)" }}
      >
        Let&apos;s build<br />
        something{" "}
        <em className="font-serif not-italic italic" style={{ color: "#FF6B5B" }}>together.</em>
      </motion.h2>

      <motion.p {...fade(0.15)}
        className="text-[0.8rem] leading-[1.8] mb-10"
        style={{ color: "var(--text-dim)" }}
      >
        Open to internship opportunities, collaborations,<br />
        and interesting conversations.
      </motion.p>

      {/* Primary */}
      <motion.div {...fade(0.25)} className="flex gap-2.5 flex-wrap justify-center mb-4">
        {PRIMARY.map(({ label, href, external }) => (
          <a key={label} href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-[0.68rem] tracking-[0.08em] uppercase px-6 py-3 rounded-full border transition-all duration-300 hover:-translate-y-0.5 no-underline"
            style={{ color: "var(--text)", borderColor: "var(--card-border)", background: "var(--card)", backdropFilter: "blur(8px)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#FF6B5B"; (e.currentTarget as HTMLAnchorElement).style.color = "#FF6B5B"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)"; }}
          >
            {label}
          </a>
        ))}
        <button onClick={onOpenTerminal}
          className="text-[0.68rem] tracking-[0.08em] uppercase px-6 py-3 rounded-full border font-mono transition-all duration-300 hover:-translate-y-0.5"
          style={{ color: "#FF6B5B", borderColor: "rgba(255,107,91,0.4)", background: "rgba(255,107,91,0.08)" }}>
          _ Open Terminal
        </button>
      </motion.div>

      {/* Elsewhere */}
      <motion.div {...fade(0.35)} className="flex flex-wrap gap-2.5 justify-center items-center">
        <span className="text-[0.58rem] tracking-[0.15em] uppercase mr-1" style={{ color: "var(--text-dim)" }}>
          Elsewhere →
        </span>
        {ELSEWHERE.map(({ label, href, external }) => (
          <a key={label} href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-[0.65rem] tracking-[0.07em] px-4 py-1.5 rounded-full border transition-all duration-200 hover:-translate-y-0.5 no-underline"
            style={{ color: "var(--text-dim)", borderColor: "var(--card-border)", background: "var(--card)", backdropFilter: "blur(8px)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FF6B5B"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,107,91,0.35)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--card-border)"; }}
          >
            {label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
