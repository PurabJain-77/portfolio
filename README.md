# Purab Jain — Portfolio (Next.js)

Personal portfolio built with **Next.js 14 · TypeScript · Tailwind CSS · Framer Motion**.

## Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework & routing |
| TypeScript | Type safety everywhere |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| next-themes | Dark / light mode |
| lucide-react | Icons |
| lenis | Smooth scrolling |
| clsx | Conditional classnames |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open [https://thisispurab.me](https://thisispurab.me).

## File Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, ThemeProvider, SEO
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Custom CSS (aurora, cursor, animations)
├── components/
│   ├── Navbar.tsx          # Floating pill nav with sound/mode/CTA
│   ├── Hero.tsx            # Magnetic name, typewriter, NOW widget
│   ├── NowWidget.tsx       # Floating info card (right side of hero)
│   ├── Marquee.tsx         # Infinite scrolling ticker
│   ├── About.tsx           # About + Beliefs sections
│   ├── Skills.tsx          # Animated skill bars
│   ├── Projects.tsx        # Horizontal scroll project cards
│   ├── Journey.tsx         # SVG timeline + Certifications
│   ├── Currently.tsx       # Currently reading/watching/following
│   ├── Bookshelf.tsx       # Interactive book spine shelf
│   ├── Journal.tsx         # Thoughts / blog entries
│   ├── Contact.tsx         # Contact section
│   ├── Footer.tsx          # Footer with Konami hint
│   ├── Terminal.tsx        # Interactive terminal overlay
│   ├── EasterEgg.tsx       # Konami code secret screen
│   ├── CursorEffect.tsx    # Custom cursor + ring + ripple
│   ├── MouseLight.tsx      # Mouse-following radial glow
│   ├── AuroraBackground.tsx # Animated aurora blobs
│   └── ui/
│       ├── SoundToggle.tsx # Sound on/off toggle
│       └── ThemeToggle.tsx # Dark/light mode toggle
├── hooks/
│   ├── useSound.ts         # Web Audio API sound hook
│   ├── useKonami.ts        # Konami code sequence detector
│   ├── useTypewriter.ts    # Typewriter effect hook
│   └── useScramble.ts      # Text scramble on hover
├── lib/
│   ├── data.ts             # All typed content (projects, skills, etc.)
│   └── utils.ts            # clsx utility
└── public/
    └── favicon.ico
```

## Customisation

All content lives in **`lib/data.ts`** — edit projects, skills, journal entries, books, and timeline items there without touching any components.

## Features

- afds
- 🌙 Dark / ☀️ Light mode
- 🔊 Sound toggle (Web Audio API)
- ✍️ Typewriter hero tagline
- 🧲 Magnetic name on hover
- 🔀 Text scramble on nav hover
- ↔️ Horizontal scroll project rail
- 📜 Self-drawing SVG timeline
- 📚 Interactive bookshelf with tooltips
- 📓 Journal / thoughts section
- 💻 Working terminal (`help`, `whoami`, `ls`, `skills`, `projects`, `contact`, `date`, `weather`, `clear`, `exit`)
- 🎉 Konami code easter egg (↑↑↓↓←→←→BA)
- 🖱️ Custom cursor + ring + click ripple
- 🌊 Mouse-following background glow
- ♾️ Smooth section reveal animations (Framer Motion)

## Build for Production

```bash
npm run build
npm start
```
