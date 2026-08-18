"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.replace(
        "/login?success=Password%20updated%20successfully."
      );
    } catch (err) {
      console.error("Password update error:", err);

      setError(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  const passwordStrongEnough = password.length >= 8;
  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
      <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-6">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center sm:mb-10">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#004e47] text-white shadow-[0_8px_20px_rgba(0,78,71,0.18)]">
              <Brain
                size={30}
                strokeWidth={2.2}
              />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#004e47]">
              NutriTrack AI
            </h1>

            <p className="mt-2 text-sm font-medium text-[#3e4947]">
              Your Health Companion
            </p>

          </div>

          {/* Card */}
          <div className="rounded-[24px] border border-[#e7e9e8] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)] sm:p-8">

            {/* Heading */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#191c1d]">
                Create new password
              </h2>

              <p className="mt-3 text-sm font-medium leading-6 text-[#3e4947]">
                Choose a strong password for your NutriTrack AI
                account.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-700"
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* New Password */}
              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#191c1d]"
                >
                  New password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    strokeWidth={2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="At least 8 characters"
                    className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-12 text-sm font-medium text-[#191c1d] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#687370] transition hover:bg-[#f1f4f3] hover:text-[#004e47]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                {/* Password requirement */}
                <div className="mt-2 flex items-center gap-2">

                  <CheckCircle2
                    size={15}
                    className={
                      passwordStrongEnough
                        ? "text-[#008577]"
                        : "text-[#9aa5a2]"
                    }
                  />

                  <span
                    className={`text-xs font-medium ${
                      passwordStrongEnough
                        ? "text-[#008577]"
                        : "text-[#687370]"
                    }`}
                  >
                    At least 8 characters
                  </span>

                </div>

              </div>

              {/* Confirm Password */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#191c1d]"
                >
                  Confirm password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    strokeWidth={2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Repeat your password"
                    className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-12 text-sm font-medium text-[#191c1d] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#687370] transition hover:bg-[#f1f4f3] hover:text-[#004e47]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                {/* Match indicator */}
                {confirmPassword.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">

                    <CheckCircle2
                      size={15}
                      className={
                        passwordsMatch
                          ? "text-[#008577]"
                          : "text-[#9aa5a2]"
                      }
                    />

                    <span
                      className={`text-xs font-medium ${
                        passwordsMatch
                          ? "text-[#008577]"
                          : "text-[#687370]"
                      }`}
                    >
                      {passwordsMatch
                        ? "Passwords match"
                        : "Passwords must match"}
                    </span>

                  </div>
                )}

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 cursor-pointer flex h-12 w-full items-center justify-center rounded-xl bg-[#004e47] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#003f3a] hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Updating password..."
                  : "Update Password"}
              </button>

            </form>

          </div>

          {/* Back to login */}
          <p className="mt-6 text-center text-sm font-medium text-[#3e4947]">
            Remember your password?{" "}

            <Link
              href="/login"
              className="font-bold text-[#00685f] transition hover:text-[#004e47] hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}