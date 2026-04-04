"use client";

import { cn } from "@/lib/utils";

interface Props {
  enabled: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ enabled, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[0.62rem] tracking-widest uppercase transition-all",
        "border-white/8 bg-white/4",
        enabled ? "text-[#FF6B5B] border-[rgba(255,107,91,0.25)]" : "text-white/50"
      )}
    >
      {/* knob */}
      <span
        className={cn(
          "relative w-7 h-4 rounded-full transition-colors duration-300",
          enabled ? "bg-[#FF6B5B]" : "bg-white/8"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-300",
            enabled ? "translate-x-3" : "translate-x-0"
          )}
        />
      </span>
      Sound
    </button>
  );
}
