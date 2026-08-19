import Link from "next/link";
import {
  LockKeyhole,
  LogIn,
} from "lucide-react";

interface LoginRequiredProps {
  title?: string;
  description?: string;
}

export default function LoginRequired({
  title = "Login Required",
  description = "Please log in to your NutriTrack AI account to access this page.",
}: LoginRequiredProps) {
  return (
    <div className="flex min-h-[calc(100vh-72px)] items-start justify-center px-4 py-8 sm:px-6 sm:py-10 xl:min-h-screen xl:px-8 xl:py-8">

      <div
        className="
          w-full
          max-w-5xl
          rounded-[28px]
          bg-white
          px-5
          py-12
          text-center
          shadow-[0_6px_30px_rgba(0,0,0,0.04)]
          sm:px-8
          sm:py-16
        "
      >

        {/* Icon */}

        <div
          className="
            mx-auto
            mb-5
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-[#e7f8f5]
            text-[#005049]
          "
        >
          <LockKeyhole
            size={30}
            strokeWidth={2}
          />
        </div>

        {/* Title */}

        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
            text-[#191c1d]
            sm:text-3xl
          "
        >
          {title}
        </h1>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-3
            max-w-md
            text-sm
            leading-6
            text-[#687370]
            sm:text-base
          "
        >
          {description}
        </p>

        {/* Login */}

        <Link
          href="/login"
          className="
            mx-auto
            mt-7
            inline-flex
            min-h-[48px]
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#004e47]
            px-7
            text-sm
            font-semibold
            text-white
            shadow-[0_4px_15px_rgba(0,78,71,0.15)]
            transition
            duration-150
            hover:bg-[#003f3a]
            active:scale-[0.98]
          "
        >
          <LogIn size={18} />

          Sign In
        </Link>

        {/* Signup */}

        <p className="mt-5 text-sm text-[#687370]">
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
  );
}