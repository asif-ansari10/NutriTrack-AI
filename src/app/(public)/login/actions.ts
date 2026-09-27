// "use server";

// import { redirect } from "next/navigation";
// import { createClient } from "@/lib/supabase/server";

// export async function login(formData: FormData) {
//   const email = String(formData.get("email") || "")
//     .trim()
//     .toLowerCase();

//   const password = String(
//     formData.get("password") || ""
//   );

//   if (!email || !password) {
//     redirect(
//       "/login?error=Please%20enter%20your%20email%20and%20password."
//     );
//   }

//   const supabase = await createClient();

//   const { error } =
//     await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//   if (error) {
//     console.error("Login error:", error);

//     redirect(
//       `/login?error=${encodeURIComponent(
//         "Invalid email or password."
//       )}`
//     );
//   }

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect(
//       "/login?error=Unable%20to%20verify%20your%20account."
//     );
//   }

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("onboarding_completed")
//     .eq("id", user.id)
//     .maybeSingle();

//   if (!profile || !profile.onboarding_completed) {
//     redirect("/onboarding");
//   }

//   redirect("/");
// }

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

  /*
   * Validate form
   */
  if (!email || !password) {
    redirect(
      "/login?error=Please%20enter%20your%20email%20and%20password."
    );
  }

  const supabase = await createClient();

  /*
   * Authenticate with Supabase
   */
  const { error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (loginError) {
    console.error("Login error:", loginError);

    redirect(
      `/login?error=${encodeURIComponent(
        "Invalid email or password."
      )}`
    );
  }

  /*
   * Get authenticated user
   */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(
      "Authenticated user error:",
      userError
    );

    redirect(
      "/login?error=Unable%20to%20verify%20your%20account."
    );
  }

  /*
   * Get profile + role
   */
  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select(`
      id,
      onboarding_completed,
      role
    `)
    .eq("id", user.id)
    .maybeSingle();

  /*
   * Profile should exist for every authenticated user.
   */
  if (profileError) {
    console.error(
      "Profile fetch error:",
      profileError
    );

    redirect(
      `/login?error=${encodeURIComponent(
        "Unable to load your account profile."
      )}`
    );
  }

  if (!profile) {
    console.error(
      "Profile not found for user:",
      user.id
    );

    redirect(
      `/login?error=${encodeURIComponent(
        "Your account profile could not be found. Please contact support."
      )}`
    );
  }

  /*
   * Onboarding must be completed first.
   *
   * This applies to both normal users and admins.
   */
  if (profile.onboarding_completed !== true) {
    redirect("/onboarding");
  }

  /*
   * ADMIN
   */
  if (profile.role === "admin") {
    redirect("/admin");
  }

  /*
   * NORMAL USER
   */
  redirect("/home");
}