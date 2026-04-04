import { MARQUEE_ITEMS } from "@/lib/data";

export default function Marquee() {
  // duplicate for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="relative z-[1] overflow-hidden border-t border-b py-4"
      style={{ borderColor:"var(--border)", background:"rgba(0,0,0,0.15)" }}
    >
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-syne font-medium text-[0.95rem] flex items-center gap-12 flex-shrink-0"
            style={{ color:"var(--text-dim)" }}
          >
            {item}
            <span style={{ color:"#FF6B5B" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
