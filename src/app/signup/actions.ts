"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const fullName = String(
    formData.get("full_name") || ""
  ).trim();

  const email = String(
    formData.get("email") || ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") || ""
  );

  const confirmPassword = String(
    formData.get("confirm_password") || ""
  );

  if (!fullName || !email || !password || !confirmPassword) {
    redirect(
      "/signup?error=Please%20complete%20all%20fields."
    );
  }

  if (password.length < 8) {
    redirect(
      "/signup?error=Password%20must%20be%20at%20least%208%20characters."
    );
  }

  if (password !== confirmPassword) {
    redirect(
      "/signup?error=Passwords%20do%20not%20match."
    );
  }

  const supabase = await createClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          full_name: fullName,
        },

        emailRedirectTo:
          `${siteUrl}/auth/callback`,
      },
    });

  if (error) {
    console.error("Signup error:", error);

    redirect(
      `/signup?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  if (!data.user) {
    redirect(
      "/signup?error=Unable%20to%20create%20your%20account."
    );
  }

  /*
   * Supabase sends the verification email
   * when email confirmation is enabled.
   *
   * Do NOT create the profile here because
   * the user has not verified the email yet.
   */

  if (!data.session) {
    redirect(
      "/login?success=Account%20created!%20Please%20check%20your%20email%20and%20verify%20your%20account%20before%20signing%20in."
    );
  }

  /*
   * If email confirmation is disabled,
   * Supabase gives us a session immediately.
   */
  redirect("/onboarding");
}