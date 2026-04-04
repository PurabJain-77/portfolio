import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        coral: "#FF6B5B",
        "coral-glow": "rgba(255,107,91,0.25)",
        cream: "#F2EDE6",
        ink: "#0E0E0E",
        surface: "#161616",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        serif: ["var(--font-instrument-serif)", "serif"],
      },
      animation: {
        "drift-1": "drift 20s ease-in-out infinite alternate",
        "drift-2": "drift 25s ease-in-out infinite alternate",
        "drift-3": "drift 18s ease-in-out infinite alternate",
        "drift-4": "drift 22s ease-in-out infinite alternate",
        marquee: "marquee 30s linear infinite",
        "widget-float": "widgetFloat 6s ease-in-out infinite",
        "scroll-grow": "scrollGrow 2s infinite",
        blink: "blink 0.9s infinite",
        pulse: "pulseGlow 2s infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(3%,5%) scale(1.08)" },
          "100%": { transform: "translate(-4%,2%) scale(0.95)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        widgetFloat: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scrollGrow: {
          "0%,100%": { transform: "scaleX(0.3)", opacity: "0.3" },
          "50%": { transform: "scaleX(1)", opacity: "1" },
        },
        blink: {
          "0%,50%": { opacity: "1" },
          "51%,100%": { opacity: "0" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,107,91,0.25)" },
          "50%": { boxShadow: "0 0 0 6px transparent" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
