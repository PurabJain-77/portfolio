"use client";

import { useEffect, useRef } from "react";

export default function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(255,107,91,0.055) 0%, transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
}
