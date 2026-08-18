import Link from "next/link";
import {
  Camera,
  Brain,
  LogOut,
  LogIn,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { DesktopNavigation } from "./NavigationLinks";

export default async function Sidebar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col bg-white shadow-[4px_0_20px_rgba(0,0,0,0.04)] xl:flex">

      <div className="flex h-full flex-col p-6">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="mb-8 flex items-center gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#004e47] text-white shadow-sm">
            <Brain size={25} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">

            <h1 className="text-xl font-bold tracking-tight text-[#004e47]">
              NutriTrack AI
            </h1>

            <p className="text-sm leading-5 text-[#3e4947]">
              Your Health
              <br />
              Companion
            </p>

          </div>

        </div>

        {/* =================================================
            SCAN NEW MEAL
        ================================================= */}

        <Link
          href="/scan"
          className="mb-5 flex h-14 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#004e47] to-[#00685f] px-4 text-sm font-bold text-white shadow-[0_4px_15px_rgba(0,78,71,0.15)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(0,78,71,0.2)] active:scale-[0.99]"
        >
          <Camera size={21} />

          <span>
            Scan New Meal
          </span>
        </Link>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <DesktopNavigation
          isLoggedIn={!!user}
        />

        {/* =================================================
            AUTH
        ================================================= */}

        <div className="border-t border-[#e1e3e4] pt-4">

          {user ? (
            <form
              action="/auth/signout"
              method="POST"
            >
              <button
                type="submit"
                className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-4 text-[#3e4947] transition-all duration-200 hover:bg-[#fff0ef] hover:text-[#c62828]"
              >
                <LogOut size={22} />

                <span>
                  Logout
                </span>
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-4 font-semibold text-[#00685f] transition-all duration-200 hover:bg-[#e7f8f5]"
            >
              <LogIn size={22} />

              <span>
                Login
              </span>
            </Link>
          )}

        </div>

      </div>

    </aside>
  );
}