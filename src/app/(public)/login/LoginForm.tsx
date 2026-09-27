"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { login } from "./actions";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isBusy = isLoading || isGoogleLoading;

  function handleSubmit() {
    setIsLoading(true);
  }

  function handleGoogleLogin() {
    setIsGoogleLoading(true);
  }

  return (
    <>
      {/* Login Form */}
      <form
        action={login}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#191c1d]"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isBusy}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm text-[#191c1d] caret-[#004e47] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10 disabled:cursor-not-allowed disabled:bg-[#f3f5f4] disabled:opacity-70"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#191c1d]"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className={`text-xs font-semibold text-[#00685f] hover:underline ${
                isBusy
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
            />

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isBusy}
              placeholder="Enter your password"
              className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm text-[#191c1d] caret-[#004e47] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10 disabled:cursor-not-allowed disabled:bg-[#f3f5f4] disabled:opacity-70"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isBusy}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-6 text-sm font-semibold text-white transition hover:bg-[#003f3a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#004e47] disabled:active:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e1e3e4]" />

        <span className="text-xs text-[#687370]">
          OR
        </span>

        <div className="h-px flex-1 bg-[#e1e3e4]" />
      </div>

      {/* Google Login */}
      <a
        href="/auth/google"
        onClick={handleGoogleLogin}
        aria-disabled={isBusy}
        className={`flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#c1c9c7] bg-white text-sm font-medium text-[#191c1d] transition hover:bg-[#f8f9fa] ${
          isBusy
            ? "pointer-events-none cursor-not-allowed opacity-70"
            : ""
        }`}
      >
        {isGoogleLoading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin text-[#004e47]"
            />

            Connecting...
          </>
        ) : (
          <>
            <span className="text-lg font-bold">
              G
            </span>

            Continue with Google
          </>
        )}
      </a>
    </>
  );
}