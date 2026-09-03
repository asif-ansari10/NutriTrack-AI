"use client";

import Link from "next/link";

import {
  Home,
  BookOpen,
  ScanLine,
  TrendingUp,
  Brain,
  User,
  HelpCircle,
  LogIn,
} from "lucide-react";

import { usePathname } from "next/navigation";

/* ============================================================
   NAVIGATION ITEMS
============================================================ */

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Diary",
    href: "/diary",
    icon: BookOpen,
  },
  {
    label: "Progress",
    href: "/progress",
    icon: TrendingUp,
  },
  {
    label: "AI Coach",
    href: "/coach",
    icon: Brain,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

/* ============================================================
   ACTIVE ROUTE
============================================================ */

function isActiveRoute(
  pathname: string,
  href: string
) {
  /*
   * Home should only be active on /
   */

  if (href === "/") {
    return pathname === "/";
  }

  /*
   * Other pages remain active on nested routes.
   *
   * Example:
   * /coach
   * /coach/chat
   *
   * Both activate AI Coach.
   */

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

/* ============================================================
   DESKTOP NAVIGATION
============================================================ */

export function DesktopNavigation({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname =
    usePathname();

  return (
    <nav className="flex-1 space-y-2">

      {navItems.map(
        (item) => {
          const Icon =
            item.icon;

          const active =
            isActiveRoute(
              pathname,
              item.href
            );

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={
                active
                  ? "page"
                  : undefined
              }
              className={`group flex h-12 cursor-pointer items-center gap-3 rounded-xl px-4 text-sm transition-colors duration-150 ${
                active
                  ? "bg-[#91f4e6] font-bold text-[#005049] shadow-[0_2px_8px_rgba(0,78,71,0.06)]"
                  : "font-medium text-[#3e4947] hover:bg-[#f0f3f2] hover:text-[#005049]"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={
                  active
                    ? 2.4
                    : 2
                }
                className="shrink-0"
              />

              <span>
                {item.label}
              </span>
            </Link>
          );
        }
      )}

    </nav>
  );
}

/* ============================================================
   MOBILE NAVIGATION
============================================================ */

export function MobileNavigation({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname =
    usePathname();

  /*
   * Keep the bottom navigation compact.
   *
   * AI Coach is included here instead of Help so
   * it is directly accessible from the main mobile nav.
   */

  const mobileItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },

    {
      label: "Diary",
      href: "/diary",
      icon: BookOpen,
    },

    {
      label: "Scan",
      href: "/scan",
      icon: ScanLine,
      scan: true,
    },

    {
      label: "Progress",
      href: "/progress",
      icon: TrendingUp,
    },

    isLoggedIn
      ? {
          label: "AI Coach",
          href: "/coach",
          icon: Brain,
        }
      : {
          label: "Login",
          href: "/login",
          icon: LogIn,
        },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-[#e1e3e4] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] xl:hidden">

      <div className="flex h-[76px] items-center justify-around px-1 sm:h-20 sm:px-2">

        {mobileItems.map(
          (item) => {
            const Icon =
              item.icon;

            const active =
              isActiveRoute(
                pathname,
                item.href
              );

            /* =================================================
               CENTER SCAN BUTTON
            ================================================= */

            if (
              "scan" in item &&
              item.scan
            ) {
              return (
                <Link
                  key={
                    item.label
                  }
                  href={
                    item.href
                  }
                  aria-label="Scan Meal"
                  className="group -mt-7 flex min-w-[60px] cursor-pointer flex-col items-center gap-1"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-150 ${
                      active
                        ? "scale-105 bg-[#00685f] ring-4 ring-[#91f4e6]"
                        : "bg-[#004e47] group-hover:bg-[#00685f]"
                    }`}
                  >
                    <Icon
                      size={24}
                    />
                  </div>

                  <span
                    className={`text-[11px] font-semibold ${
                      active
                        ? "text-[#005049]"
                        : "text-[#3e4947]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            }

            /* =================================================
               NORMAL MOBILE ITEM
            ================================================= */

            return (
              <Link
                key={
                  item.label
                }
                href={
                  item.href
                }
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
                className={`flex min-w-[58px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 transition-colors duration-150 ${
                  active
                    ? "bg-[#91f4e6] text-[#005049]"
                    : "text-[#3e4947] hover:bg-[#f0f3f2] hover:text-[#005049]"
                }`}
              >
                <Icon
                  size={21}
                  strokeWidth={
                    active
                      ? 2.5
                      : 2
                  }
                />

                <span
                  className={`text-[9px] sm:text-[11px] ${
                    active
                      ? "font-bold"
                      : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          }
        )}

      </div>

    </nav>
  );
}