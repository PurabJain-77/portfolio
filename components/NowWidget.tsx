export default function NowWidget() {
  const items = [
    { key: "Building",        val: "together.",              coral: true, sub: "— startup app" },
    { key: "Focus",           val: "IoT, cloud workflows, UI thinking" },
    { key: "Studying",        val: "VIT Chennai · 6th Semester" },
    { key: "Best recent win", val: "Best Paper @ IEEE STPEC 2025" },
    { key: "Reading",         val: "Project Hail Mary" },
  ];

  return (
    <div
      className="flex-shrink-0 rounded-[20px] p-8 border widget-float"
      style={{
        width: "340px",
        background: "var(--now-bg)",
        borderColor: "var(--card-border)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Label */}
      <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase mb-6"
        style={{ color: "#FF6B5B" }}>
        <span className="pulse-dot" />
        Now
      </div>

      {items.map(({ key, val, coral, sub }) => (
        <div key={key} className="mb-5 last:mb-0">
          <div className="text-[0.6rem] tracking-[0.1em] uppercase mb-1.5"
            style={{ color: "var(--text-dim)" }}>
            {key}
          </div>
          <div
            className="font-syne font-semibold text-[0.95rem] leading-snug"
            style={{ color: coral ? "#FF6B5B" : "var(--text)" }}
          >
            {val}
            {sub && (
              <span className="font-mono font-light text-[0.65rem] ml-1.5 opacity-60"
                style={{ color: "var(--text-dim)" }}>
                {sub}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
