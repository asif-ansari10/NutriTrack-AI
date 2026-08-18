import Link from "next/link";
import { Brain, Mail } from "lucide-react";
import { resetPassword } from "./actions";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
      <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-6">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center sm:mb-10">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#004e47] text-white shadow-[0_8px_20px_rgba(0,78,71,0.18)]">
              <Brain size={30} strokeWidth={2.2} />
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
                Forgot your password?
              </h2>

              <p className="mt-3 text-sm font-medium leading-6 text-[#3e4947]">
                Enter your email address and we'll send you
                a secure password reset link.
              </p>
            </div>

            {/* Error */}
            {params.error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-700">
                {params.error}
              </div>
            )}

            {/* Success */}
            {params.success && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium leading-5 text-green-700">
                {params.success}
              </div>
            )}

            {/* Form */}
            <form
              action={resetPassword}
              className="mt-7 space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#191c1d]"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    strokeWidth={2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm font-medium text-[#191c1d] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                  />

                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex cursor-pointer h-12 w-full items-center justify-center rounded-xl bg-[#004e47] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#003f3a] hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2"
              >
                Send Reset Link
              </button>

            </form>

          </div>

          {/* Login */}
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