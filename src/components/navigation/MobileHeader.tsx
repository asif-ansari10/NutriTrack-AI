import Link from "next/link";
import {
  Brain,
  CircleHelp,
} from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-[#e1e3e4] bg-white/95 px-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-xl sm:px-5 xl:hidden">

      {/* =================================================
          LOGO
      ================================================= */}

      <Link
        href="/"
        className="flex cursor-pointer items-center gap-3"
      >

        {/* Logo Icon */}

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#004e47] text-white shadow-sm">
          <Brain
            size={23}
            strokeWidth={2.2}
          />
        </div>

        {/* Logo Text */}

        <div>

          <h1 className="text-lg font-bold leading-5 tracking-tight text-[#004e47] sm:text-xl">
            NutriTrack AI
          </h1>

          <p className="mt-0.5 text-[11px] leading-4 text-[#3e4947] sm:text-xs">
            Your Health Companion
          </p>

        </div>

      </Link>

      {/* =================================================
          HELP
      ================================================= */}

      <Link
        href="/help"
        aria-label="Help Center"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[#3e4947] transition-all duration-200 hover:bg-[#e7f8f5] hover:text-[#005049] active:scale-95"
      >
        <CircleHelp
          size={23}
          strokeWidth={2}
        />
      </Link>

    </header>
  );
}