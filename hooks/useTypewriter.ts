"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriter(phrases: string[], delay = 1200) {
  const [display, setDisplay]   = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
    }

    const phrase = phrases[phraseIdx];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setCharIdx((c) => c + 1);
          setDisplay(phrase.substring(0, charIdx + 1));
          if (charIdx + 1 >= phrase.length) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          setCharIdx((c) => c - 1);
          setDisplay(phrase.substring(0, charIdx - 1));
          if (charIdx - 1 <= 0) {
            setDeleting(false);
            setPhraseIdx((p) => (p + 1) % phrases.length);
          }
        }
      },
      started.current && charIdx === 0 && phraseIdx === 0
        ? delay
        : deleting
        ? 28
        : 48 + Math.random() * 32
    );

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, delay]);

  return display;
}
