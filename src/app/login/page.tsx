import Link from "next/link";
import { login } from "./actions";
import { Brain, Mail, Lock } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT - LOGIN */}
        <div className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#004e47] text-white shadow-lg">
                <Brain size={30} />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#004e47]">
                NutriTrack AI
              </h1>

              <p className="mt-2 text-sm text-[#3e4947]">
                Your Health Companion
              </p>
            </div>

            {/* Card */}
            <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-8">

              <div className="mb-7">
                <p className="text-sm text-[#3e4947]">
                  Sign in to continue tracking your nutrition.
                </p>

                {/* Error */}
                {params.error && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {params.error}
                  </div>
                )}

                {/* Success */}
                {params.success && (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {params.success}
                  </div>
                )}
              </div>

              <form action={login} className="space-y-5">

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
  placeholder="you@example.com"
  className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm text-[#191c1d] caret-[#004e47] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
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
                      className="text-xs font-semibold text-[#00685f] hover:underline"
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
  placeholder="Enter your password"
  className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm text-[#191c1d] caret-[#004e47] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
/>
                  </div>
                </div>

                {/* Login */}
                <button
                  type="submit"
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#004e47] px-6 text-sm font-semibold text-white transition hover:bg-[#003f3a] active:scale-[0.99]"
                >
                  Sign In
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
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#c1c9c7] bg-white text-sm font-medium text-[#191c1d] transition hover:bg-[#f8f9fa]"
              >
                <span className="text-lg font-bold">
                  G
                </span>

                Continue with Google
              </a>
            </div>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-[#3e4947]">
              Don't have an account?{" "}

              <Link
                href="/signup"
                className="font-semibold text-[#00685f] hover:underline"
              >
                Create account
              </Link>
            </p>

          </div>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="relative hidden overflow-hidden lg:block">

          <img
            src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1400&q=85"
            alt="Healthy nutrition bowl"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#004e47]/30" />

          <div className="absolute bottom-12 left-12 max-w-md text-white">

            <p className="mb-3 text-sm font-semibold uppercase tracking-widest">
              NutriTrack AI
            </p>

            <h2 className="text-4xl font-bold leading-tight">
              Make every meal count.
            </h2>

            <p className="mt-4 text-lg text-white/90">
              Track your food, activity and progress in one simple place.
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}