"use client";

import { useEffect, useRef } from "react";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export function useKonami(onActivate: () => void) {
  const idxRef = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (KONAMI.includes(e.key)) e.preventDefault();

      if (e.key === KONAMI[idxRef.current]) {
        idxRef.current++;
      } else {
        idxRef.current = e.key === KONAMI[0] ? 1 : 0;
      }

      if (idxRef.current === KONAMI.length) {
        idxRef.current = 0;
        onActivate();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onActivate]);
}
