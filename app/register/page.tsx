"use client";

import { useActionState, useEffect } from "react";
import { registerUser } from "@/app/actions";
import { useNotification } from "@/context/NotificationContext";
import Link from "next/link";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state?.error) {
      showNotification(state.error, "error");
    }
  }, [state, showNotification]);

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center flex-1 relative isolate">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent transition-all hover:opacity-90"
          >
            DevPulse
          </Link>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">Create your account</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in instead
            </Link>
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/50 border border-red-850 text-sm text-red-200">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              defaultValue={state?.values?.name || ""}
              placeholder="e.g. John Doe"
              className="mt-2 block w-full px-4 py-2.5 border border-zinc-800 rounded-lg bg-zinc-900/80 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-zinc-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              defaultValue={state?.values?.username || ""}
              placeholder="e.g. johndoe"
              className="mt-2 block w-full px-4 py-2.5 border border-zinc-800 rounded-lg bg-zinc-900/80 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-zinc-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="••••••••"
              className="mt-2 block w-full px-4 py-2.5 border border-zinc-800 rounded-lg bg-zinc-900/80 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-zinc-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              required
              placeholder="••••••••"
              className="mt-2 block w-full px-4 py-2.5 border border-zinc-800 rounded-lg bg-zinc-900/80 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-bold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
