"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Loader2,
} from "lucide-react";
import { signup } from "./actions";

export default function SignupForm() {
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
      {/* Signup Form */}
      <form
        action={signup}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="full_name"
            className="mb-2 block text-sm font-medium text-[#191c1d]"
          >
            Full name
          </label>

          <div className="relative">
            <User
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
            />

            <input
              id="full_name"
              name="full_name"
              type="text"
              autoComplete="name"
              required
              disabled={isBusy}
              placeholder="Your name"
              className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm text-[#191c1d] caret-[#004e47] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10 disabled:cursor-not-allowed disabled:bg-[#f3f5f4] disabled:opacity-70"
            />
          </div>
        </div>

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
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#191c1d]"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
            />

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={isBusy}
              placeholder="At least 8 characters"
              className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm text-[#191c1d] caret-[#004e47] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10 disabled:cursor-not-allowed disabled:bg-[#f3f5f4] disabled:opacity-70"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm_password"
            className="mb-2 block text-sm font-medium text-[#191c1d]"
          >
            Confirm password
          </label>

          <div className="relative">
            <Lock
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
            />

            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={isBusy}
              placeholder="Repeat your password"
              className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm text-[#191c1d] caret-[#004e47] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10 disabled:cursor-not-allowed disabled:bg-[#f3f5f4] disabled:opacity-70"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isBusy}
          className="mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-6 text-sm font-semibold text-white transition hover:bg-[#003f3a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#004e47] disabled:active:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Creating account...
            </>
          ) : (
            "Create Account"
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

      {/* Google */}
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