"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function resetPassword(
  formData: FormData
) {
  const email = String(
    formData.get("email") || ""
  )
    .trim()
    .toLowerCase();

  if (!email) {
    redirect(
      "/forgot-password?error=Please%20enter%20your%20email."
    );
  }

  const supabase = await createClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          `${siteUrl}/update-password`,
      }
    );

  if (error) {
    console.error(
      "Password reset error:",
      error
    );
  }

  /*
   * Don't reveal whether the email exists.
   */

  redirect(
    "/forgot-password?success=If%20an%20account%20exists%20with%20this%20email%2C%20a%20password%20reset%20link%20has%20been%20sent."
  );
}