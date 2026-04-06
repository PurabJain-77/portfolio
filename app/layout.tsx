import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Martian_Mono, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Purab Jain — EEE · Design · Cloud",
  description:
    "Portfolio of Purab Jain — EEE student at VIT Chennai building IoT systems, cloud tools, and thoughtful interfaces. IEEE Best Paper Award winner.",
  keywords: [
    "Purab Jain",
    "EEE",
    "VIT Chennai",
    "IoT",
    "UI/UX",
    "AWS",
    "portfolio",
    "engineer",
  ],
  authors: [
    {
      name: "Purab Jain",
      url: "https://linkedin.com/in/purabjain01/",
    },
  ],
  themeColor: "#FF6B5B",
  openGraph: {
    title: "Purab Jain — EEE · Design · Cloud",
    description:
      "Engineering student building at the intersection of hardware, cloud, and design.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purab Jain — Portfolio",
    description: "EEE student · IEEE Best Paper · AWS · Google UX Design",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${martianMono.variable} ${cormorant.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23FF6B5B'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,sans-serif' font-weight='700' font-size='14' fill='white'>PJ</text></svg>"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}