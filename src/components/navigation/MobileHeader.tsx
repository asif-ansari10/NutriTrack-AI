"use client";

import Link from "next/link";

import {
  Brain,
  CircleHelp,
    User,
} from "lucide-react";

export default function MobileHeader() {
  return (
    <header
      className="
        sticky top-0 z-40
        flex h-[72px]
        items-center justify-between
        border-b border-[#e1e3e4]
        bg-white
        px-4
        shadow-[0_2px_10px_rgba(0,0,0,0.03)]
        sm:px-5
        xl:hidden
      "
    >

      {/* ======================================================
          LOGO
      ====================================================== */}

      <Link
        href="/"
        prefetch
        className="flex items-center gap-3"
      >
        <div
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full
            bg-[#004e47]
            text-white
            shadow-sm
          "
        >
          <Brain
            size={23}
            strokeWidth={2.2}
          />
        </div>

        <div>
          <h1
            className="
              text-lg font-bold
              leading-5 tracking-tight
              text-[#004e47]
              sm:text-xl
            "
          >
            NutriTrack AI
          </h1>

          <p
            className="
              mt-0.5 text-[11px]
              leading-4 text-[#3e4947]
              sm:text-xs
            "
          >
            Your Health Companion
          </p>
        </div>
      </Link>

      {/* ======================================================
          RIGHT ACTIONS
      ====================================================== */}

      <div className="flex items-center gap-1">

{/* ====================================================
    PROFILE
==================================================== */}

<Link
  href="/profile"
  prefetch
  aria-label="Profile"
  className="
    flex h-11 w-11
    items-center justify-center
    rounded-full
    text-[#004e47]
    transition-colors
    duration-150
    hover:bg-[#e7f8f5]
    hover:text-[#005049]
    active:scale-95
  "
>
  <User
    size={23}
    strokeWidth={2}
  />
</Link>

        {/* ====================================================
            HELP
        ==================================================== */}

        <Link
          href="/help"
          prefetch
          aria-label="Help Center"
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-full
            text-[#3e4947]
            transition-colors
            duration-150
            hover:bg-[#e7f8f5]
            hover:text-[#005049]
            active:scale-95
          "
        >
          <CircleHelp
            size={23}
            strokeWidth={2}
          />
        </Link>

      </div>

    </header>
  );
}