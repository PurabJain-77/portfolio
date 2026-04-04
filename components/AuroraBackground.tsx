"use client";

import { useEffect, useRef } from "react";

const BLOBS = [
  {
    cls: "b1",
    style: "width:60vw;height:60vw;top:-20%;left:-20%;opacity:0.7;animation-duration:20s;",
    darkBg: "radial-gradient(#7B2D1E,transparent 70%)",
    lightBg: "radial-gradient(#FFD4C8,transparent 70%)",
  },
  {
    cls: "b2",
    style: "width:50vw;height:50vw;top:30%;right:-15%;opacity:0.6;animation-duration:25s;animation-delay:-8s;",
    darkBg: "radial-gradient(#1A3D2E,transparent 70%)",
    lightBg: "radial-gradient(#C8F0D8,transparent 70%)",
  },
  {
    cls: "b3",
    style: "width:40vw;height:40vw;bottom:-10%;left:25%;opacity:0.5;animation-duration:18s;animation-delay:-4s;",
    darkBg: "radial-gradient(#1E2840,transparent 70%)",
    lightBg: "radial-gradient(#C8D8F0,transparent 70%)",
  },
  {
    cls: "b4",
    style: "width:30vw;height:30vw;top:50%;left:50%;opacity:0.4;animation-duration:22s;animation-delay:-12s;",
    darkBg: "radial-gradient(#3D1A1A,transparent 70%)",
    lightBg: "radial-gradient(#F0D8C8,transparent 70%)",
  },
];

interface Props {
  isDark: boolean;
}

export default function AuroraBackground({ isDark }: Props) {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      blobRefs.current.forEach((b, i) => {
        if (b) b.style.transform = `translateY(${y * (0.08 + i * 0.02)}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {BLOBS.map((blob, i) => (
        <div
          key={blob.cls}
          ref={(el) => { blobRefs.current[i] = el; }}
          className="aurora-blob"
          style={{
            ...Object.fromEntries(
              blob.style.split(";").filter(Boolean).map((s) => {
                const [k, v] = s.split(":");
                // convert kebab-case to camelCase
                const key = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                return [key, v.trim()];
              })
            ),
            background: isDark ? blob.darkBg : blob.lightBg,
          }}
        />
      ))}
    </div>
  );
}
