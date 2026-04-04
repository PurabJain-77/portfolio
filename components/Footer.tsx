import { FOOTER_SOCIALS } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="relative z-[1] flex items-center justify-center px-12 py-8 border-t"
      style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}
    >
      <div className="flex flex-col items-center gap-5 w-full">
        {/* Social strip */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {FOOTER_SOCIALS.map(({ label, href, external }) => (
            <a key={label} href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[0.62rem] tracking-[0.06em] px-3 py-1.5 rounded-full border transition-all duration-200 no-underline"
              style={{ color: "var(--text-dim)", borderColor: "var(--border)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FF6B5B"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,107,91,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"; }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex w-full items-center justify-between flex-wrap gap-2 pt-4 border-t text-[0.6rem] tracking-[0.06em]"
          style={{ borderColor: "var(--border)" }}
        >
          <span>© 2026 Purab Jain · Chennai, India</span>
          <span className="text-[0.56rem] tracking-[0.1em]" style={{ color: "#FF6B5B" }}>
            ↑↑↓↓←→←→BA &nbsp;·&nbsp; ⌘K
          </span>
          <span>Designed with intention.</span>
        </div>
      </div>
    </footer>
  );
}
