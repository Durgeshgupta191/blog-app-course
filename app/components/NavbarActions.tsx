"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavbarActions() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-24 bg-zinc-800/50 rounded-lg animate-pulse" />;
  }

  if (session && session.user) {
    return (
      <div className="flex items-center gap-6">
        <span className="text-sm text-zinc-400 font-medium hidden md:inline">
          Hi, <span className="text-zinc-200">{session.user.name}</span>
        </span>
        <Link
          href="/blogs/new"
          className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          create new
        </Link>
        <Link
          href="/me"
          className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          me
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 hover:bg-red-500 px-4 text-sm font-bold text-white transition-colors cursor-pointer"
        >
          logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/register"
        className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-650 px-4 text-sm font-semibold text-white hover:bg-indigo-600 transition-colors cursor-pointer"
      >
        Sign Up
      </Link>
    </div>
  );
}
