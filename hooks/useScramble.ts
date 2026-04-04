"use client";

import { useState, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

export function useScramble(original: string) {
  const [text, setText] = useState(original);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iter = 0;

    intervalRef.current = setInterval(() => {
      setText(
        original
          .split("")
          .map((_, i) => {
            if (i < iter) return original[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iter >= original.length) {
        clearInterval(intervalRef.current!);
        setText(original);
      }
      iter += 0.4;
    }, 30);
  }, [original]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(original);
  }, [original]);

  return { text, scramble, reset };
}
