"use client";

import { useRef, useCallback } from "react";

export function useSound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext ||
        (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const playClick = useCallback(
    (freq = 440, dur = 0.06) => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.value = freq;
        o.type = "sine";
        g.gain.setValueAtTime(0.08, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        o.start();
        o.stop(ctx.currentTime + dur);
      } catch {
        // AudioContext not available (SSR or blocked)
      }
    },
    [enabled, getCtx]
  );

  const playChord = useCallback(
    (freqs: number[], dur = 0.2) => {
      freqs.forEach((f, i) => setTimeout(() => playClick(f, dur), i * 200));
    },
    [playClick]
  );

  return { playClick, playChord };
}
