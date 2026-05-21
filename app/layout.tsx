import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Reading List",
  description:
    "A curated, tiered reading list of blog posts on agentic AI systems — agent harnesses, production deployment, evals, context engineering, MCP, and more.",
  openGraph: {
    title: "Agentic Reading List",
    description:
      "136 curated blog posts on agentic AI, ranked S/A/B with summaries.",
    type: "website",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-mono text-sm sm:text-base font-semibold tracking-tight hover:opacity-70"
            >
              agentic-reading-list
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6 text-sm">
              <Link
                href="/start-here"
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                Start here
              </Link>
              <a
                href="https://github.com/seyonv/agentic-reading-list"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                GitHub
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] mt-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-sm text-[var(--muted)] flex flex-wrap items-center justify-between gap-2">
            <span>
              Open source —{" "}
              <a
                href="https://github.com/seyonv/agentic-reading-list"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-[var(--foreground)]"
              >
                contribute on GitHub
              </a>
            </span>
            <span className="font-mono text-xs">MIT · curated 2024–2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
