import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const origin = new URL(request.url).origin;

  const { data, error } =
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

  if (error) {
    console.error("Google OAuth error:", error);

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Unable to continue with Google."
        )}`,
        origin
      )
    );
  }

  return NextResponse.redirect(data.url);
}