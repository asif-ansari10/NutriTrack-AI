import Link from "next/link";
import { Brain, LogIn, UserPlus, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AuthScrollLock from "./AuthScrollLock";

export default async function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  /*
   * LOGGED IN
   */
  if (user) {
    return <>{children}</>;
  }

  /*
   * LOGGED OUT
   */
  return (
    <>
      {/* Dashboard in background */}
      <div
        aria-hidden="true"
        className="select-none"
      >
        {children}
      </div>

      {/* Prevent scrolling while logged out */}
      <AuthScrollLock />

      {/* Authentication overlay */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-5 backdrop-blur-[8px]">

        <div className="w-full max-w-md rounded-[28px] bg-white p-7 text-center shadow-2xl sm:p-9">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f7f4] text-[#004e47]">
            <LockKeyhole size={30} />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#191c1d] sm:text-3xl">
            Login required
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#4b5754] sm:text-base">
            Please sign in to your NutriTrack AI account to access your
            dashboard, meals, progress and AI Coach.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3">

            <Link
              href="/login"
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-5 text-sm font-semibold text-white transition hover:bg-[#003f3a] active:scale-[0.99]"
            >
              <LogIn size={19} />
              Sign In
            </Link>

            <Link
              href="/signup"
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#b9c5c2] bg-white px-5 text-sm font-semibold text-[#004e47] transition hover:bg-[#f3f7f6] active:scale-[0.99]"
            >
              <UserPlus size={19} />
              Create Account
            </Link>

          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#687370]">
            <Brain size={15} />
            <span>NutriTrack AI</span>
          </div>

        </div>
      </div>
    </>
  );
}