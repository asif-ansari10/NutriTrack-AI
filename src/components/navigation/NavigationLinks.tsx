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
  Loader2,
} from "lucide-react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

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
  if (href === "/") {
    return pathname === "/";
  }

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
  const pathname = usePathname();
  const router = useRouter();

  const [loadingHref, setLoadingHref] =
    useState<string | null>(null);

  /* ==========================================================
     RESET LOADING AFTER NAVIGATION
  ========================================================== */

  useEffect(() => {
    setLoadingHref(null);
  }, [pathname]);

  /* ==========================================================
     HANDLE NAVIGATION
  ========================================================== */

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    /*
     * If already navigating, don't allow
     * multiple clicks.
     */
    if (loadingHref) {
      event.preventDefault();
      return;
    }

    /*
     * Don't show loading when clicking
     * the page you're already on.
     */
    if (isActiveRoute(pathname, href)) {
      return;
    }

    /*
     * Home uses a complete browser refresh.
     */
    if (href === "/") {
      event.preventDefault();

      setLoadingHref("/");

      window.location.href = "/";

      return;
    }

    /*
     * Show loading animation.
     */
    event.preventDefault();

    setLoadingHref(href);

    /*
     * Small delay allows the spinner to render
     * before Next.js starts navigation.
     */
    requestAnimationFrame(() => {
      router.push(href);
    });
  };

  return (
    <nav className="flex-1 space-y-2">

      {navItems.map((item) => {
        const Icon = item.icon;

        const active = isActiveRoute(
          pathname,
          item.href
        );

        const loading =
          loadingHref === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={
              active
                ? "page"
                : undefined
            }
            aria-busy={
              loading
                ? true
                : undefined
            }
            onClick={(event) =>
              handleNavigation(
                event,
                item.href
              )
            }
            className={`group relative flex h-12 cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-4 text-sm transition-all duration-200 ${
              active
                ? "bg-[#91f4e6] font-bold text-[#005049] shadow-[0_2px_8px_rgba(0,78,71,0.06)]"
                : "font-medium text-[#3e4947] hover:bg-[#f0f3f2] hover:text-[#005049]"
            } ${
              loading
                ? "pointer-events-none"
                : ""
            }`}
          >

            {/* ==================================================
                LOADING SHIMMER
            ================================================== */}

            {loading && (
              <span
                className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                aria-hidden="true"
              />
            )}

            {/* ==================================================
                ICON
            ================================================== */}

            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">

              {loading ? (
                <Loader2
                  size={22}
                  strokeWidth={2.3}
                  className="animate-spin text-[#00685f]"
                />
              ) : (
                <Icon
                  size={22}
                  strokeWidth={
                    active
                      ? 2.4
                      : 2
                  }
                  className={`transition-transform duration-200 ${
                    active
                      ? "scale-105"
                      : "group-hover:scale-105"
                  }`}
                />
              )}

            </span>

            {/* ==================================================
                LABEL
            ================================================== */}

            <span className="relative">
              {loading
                ? "Loading..."
                : item.label}
            </span>

          </Link>
        );
      })}

      {/* ========================================================
          ANIMATION
      ======================================================== */}

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

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
  const pathname = usePathname();
  const router = useRouter();

  const [loadingHref, setLoadingHref] =
    useState<string | null>(null);

  /* ==========================================================
     MOBILE ITEMS
  ========================================================== */

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

  /* ==========================================================
     RESET AFTER NAVIGATION
  ========================================================== */

  useEffect(() => {
    setLoadingHref(null);
  }, [pathname]);

  /* ==========================================================
     HANDLE MOBILE NAVIGATION
  ========================================================== */

  const handleMobileNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (loadingHref) {
      event.preventDefault();
      return;
    }

    /*
     * Already on this page.
     */
    if (isActiveRoute(pathname, href)) {
      return;
    }

    /*
     * Home = full refresh.
     */
    if (href === "/") {
      event.preventDefault();

      setLoadingHref("/");

      window.location.href = "/";

      return;
    }

    /*
     * Start loading animation.
     */
    event.preventDefault();

    setLoadingHref(href);

    requestAnimationFrame(() => {
      router.push(href);
    });
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-[#e1e3e4] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] xl:hidden">

        <div className="flex h-[76px] items-center justify-around px-1 sm:h-20 sm:px-2">

          {mobileItems.map((item) => {
            const Icon = item.icon;

            const active =
              isActiveRoute(
                pathname,
                item.href
              );

            const loading =
              loadingHref ===
              item.href;

            /* ==================================================
               CENTER SCAN BUTTON
            ================================================== */

            if (
              "scan" in item &&
              item.scan
            ) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label="Scan Meal"
                  aria-busy={
                    loading
                      ? true
                      : undefined
                  }
                  onClick={(event) =>
                    handleMobileNavigation(
                      event,
                      item.href
                    )
                  }
                  className={`group relative -mt-7 flex min-w-[60px] cursor-pointer flex-col items-center gap-1 transition-transform duration-200 ${
                    loading
                      ? "pointer-events-none"
                      : ""
                  }`}
                >

                  {/* SCAN CIRCLE */}

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ${
                      active
                        ? "scale-105 bg-[#00685f] ring-4 ring-[#91f4e6]"
                        : "bg-[#004e47] group-hover:scale-105 group-hover:bg-[#00685f]"
                    } ${
                      loading
                        ? "scale-105"
                        : ""
                    }`}
                  >

                    {loading ? (
                      <Loader2
                        size={24}
                        className="animate-spin"
                      />
                    ) : (
                      <Icon size={24} />
                    )}

                    {/* LOADING RING */}

                    {loading && (
                      <span className="absolute inset-[-4px] animate-ping rounded-full border-2 border-[#91f4e6] opacity-60" />
                    )}

                  </div>

                  {/* LABEL */}

                  <span
                    className={`text-[11px] font-semibold ${
                      active || loading
                        ? "text-[#005049]"
                        : "text-[#3e4947]"
                    }`}
                  >
                    {loading
                      ? "Loading..."
                      : item.label}
                  </span>

                </Link>
              );
            }

            /* ==================================================
               NORMAL MOBILE ITEM
            ================================================== */

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
                aria-busy={
                  loading
                    ? true
                    : undefined
                }
                onClick={(event) =>
                  handleMobileNavigation(
                    event,
                    item.href
                  )
                }
                className={`flex min-w-[58px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 transition-all duration-200 ${
                  active
                    ? "bg-[#91f4e6] text-[#005049]"
                    : "text-[#3e4947] hover:bg-[#f0f3f2] hover:text-[#005049]"
                } ${
                  loading
                    ? "pointer-events-none"
                    : ""
                }`}
              >

                {/* ICON */}

                <span className="flex h-[21px] w-[21px] items-center justify-center">

                  {loading ? (
                    <Loader2
                      size={21}
                      strokeWidth={2.4}
                      className="animate-spin text-[#00685f]"
                    />
                  ) : (
                    <Icon
                      size={21}
                      strokeWidth={
                        active
                          ? 2.5
                          : 2
                      }
                    />
                  )}

                </span>

                {/* LABEL */}

                <span
                  className={`text-[9px] sm:text-[11px] ${
                    active || loading
                      ? "font-bold"
                      : "font-medium"
                  }`}
                >
                  {loading
                    ? "Loading..."
                    : item.label}
                </span>

              </Link>
            );
          })}

        </div>

      </nav>

      {/* ========================================================
          MOBILE NAV LOADING LINE
      ======================================================== */}

      {loadingHref && (
        <div className="fixed bottom-[76px] left-0 z-[60] h-[2px] w-full overflow-hidden bg-[#e7f8f5] xl:hidden">

          <div className="h-full w-1/3 animate-[navProgress_1s_ease-in-out_infinite] rounded-full bg-[#00685f]" />

        </div>
      )}

      {/* ========================================================
          ANIMATIONS
      ======================================================== */}

      <style jsx global>{`
        @keyframes navProgress {
          0% {
            transform: translateX(-120%);
          }

          50% {
            transform: translateX(120%);
          }

          100% {
            transform: translateX(350%);
          }
        }
      `}</style>
    </>
  );
}