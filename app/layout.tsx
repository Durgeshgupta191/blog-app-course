import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AuthProvider } from "@/app/providers";
import NavbarActions from "@/app/components/NavbarActions";
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
  title: "DevPulse - Premium Tech Blog & Insights",
  description: "Explore the latest insights, tutorials, and articles on web development, design, and software engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased font-sans">
        <AuthProvider>
          <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/70">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 group">
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold tracking-tight text-transparent transition-all group-hover:opacity-90">
                    DevPulse
                  </span>
                  <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Blog
                  </span>
                </Link>
                <nav className="flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Home
                  </Link>
                  <Link
                    href="/blogs"
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/users"
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Users
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <NavbarActions />
              </div>
            </div>
          </header>
          <main className="flex-1 flex flex-col">{children}</main>
          <footer className="border-t border-zinc-200/50 bg-white/30 py-8 dark:border-zinc-800/50 dark:bg-zinc-950/30">
            <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6 lg:px-8">
              <p>&copy; {new Date().getFullYear()} DevPulse. Built with Next.js & Tailwind CSS.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
