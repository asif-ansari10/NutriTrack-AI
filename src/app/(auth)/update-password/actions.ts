"use server";

import { createClient } from "@/lib/supabase/server";

export async function updatePassword(
  formData: FormData
) {
  const password = String(
    formData.get("password") || ""
  );

  const confirmPassword = String(
    formData.get("confirmPassword") || ""
  );

  if (password.length < 8) {
    return {
      error:
        "Password must be at least 8 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
    };
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.updateUser({
      password,
    });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
  };
}