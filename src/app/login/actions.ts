"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") || ""
  );

  if (!email || !password) {
    redirect(
      "/login?error=Please%20enter%20your%20email%20and%20password."
    );
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    console.error("Login error:", error);

    redirect(
      `/login?error=${encodeURIComponent(
        "Invalid email or password."
      )}`
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login?error=Unable%20to%20verify%20your%20account."
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.onboarding_completed) {
    redirect("/onboarding");
  }

  redirect("/");
}