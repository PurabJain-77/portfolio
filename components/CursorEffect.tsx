"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const ringPos = useRef({ x: 0, y: 0 });
  const mouse   = useRef({ x: 0, y: 0 });
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    const animateRing = () => {
      const { x, y } = ringPos.current;
      const dx = mouse.current.x - x;
      const dy = mouse.current.y - y;
      ringPos.current = { x: x + dx * 0.12, y: y + dy * 0.12 };

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const click = (e: MouseEvent) => {
      const r = document.createElement("div");
      r.className = "ripple";
      r.style.left   = `${e.clientX}px`;
      r.style.top    = `${e.clientY}px`;
      r.style.width  = "60px";
      r.style.height = "60px";
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 800);
    };

    const hover = (e: Event) => {
      const t = e.target as HTMLElement;
      const isInteractive = t.closest("a,button,[role='button'],.book,.project-card,.cert-card,.skill-row");
      setExpanded(!!isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    document.addEventListener("mouseover", hover);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      document.removeEventListener("mouseover", hover);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${expanded ? "expand" : ""}`} />
    </>
  );
}
