"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Activity, Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "/features" },
  { label: "AI Scanner", href: "/ai-food-scanner" },
  { label: "Calorie Tracker", href: "/calorie-tracker" },
  { label: "AI Coach", href: "/ai-coach" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/features") {
      return pathname === "/features";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#bec9c6]/30 bg-[#f8f9fa]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00685f] text-white shadow-sm">
            <Activity size={19} />
          </span>

          <span className="font-bold tracking-tight text-[#004e47]">
            NutriTrack AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative rounded-full px-4 py-2 text-sm font-medium
                  transition-all duration-200
                  ${
                    active
                      ? "bg-[#00685f]/10 font-semibold text-[#00685f]"
                      : "text-[#3e4947] hover:bg-[#00685f]/5 hover:text-[#004e47]"
                  }
                `}
              >
                {link.label}

                {/* Active indicator */}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#00685f]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 sm:flex">
          <Link
            href="/login"
            className={`
              text-sm font-semibold transition-colors
              ${
                pathname === "/login"
                  ? "text-[#00685f]"
                  : "text-[#191c1d] hover:text-[#004e47]"
              }
            `}
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className={`
              rounded-full px-5 py-2.5 text-xs font-bold uppercase
              tracking-wide transition-all
              ${
                pathname === "/signup"
                  ? "bg-[#004e47] text-white"
                  : "bg-[#00685f] text-white hover:bg-[#004e47]"
              }
            `}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg p-2 text-[#3e4947] transition hover:bg-[#e7e8e9] lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-[#bec9c6]/30 bg-[#f8f9fa] px-4 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">

            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`
                    rounded-xl px-4 py-3 text-sm transition
                    ${
                      active
                        ? "bg-[#00685f]/10 font-semibold text-[#00685f]"
                        : "font-medium text-[#3e4947] hover:bg-[#e7e8e9]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Auth Buttons */}
            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-[#bec9c6]/30 pt-4">

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={`
                  rounded-full border px-4 py-3 text-center text-sm font-semibold
                  ${
                    pathname === "/login"
                      ? "border-[#00685f] bg-[#00685f]/10 text-[#00685f]"
                      : "border-[#bec9c6]"
                  }
                `}
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#00685f] px-4 py-3 text-center text-sm font-bold text-white"
              >
                Get Started
              </Link>

            </div>
          </nav>
        </div>
      )}
    </header>
  );
}