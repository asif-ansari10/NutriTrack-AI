// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// export async function GET(request: Request) {
//   const requestUrl = new URL(request.url);

//   const code = requestUrl.searchParams.get("code");

//   if (!code) {
//     return NextResponse.redirect(
//       new URL("/login?error=oauth_failed", requestUrl.origin)
//     );
//   }

//   const supabase = await createClient();

//   const { error } =
//     await supabase.auth.exchangeCodeForSession(code);

//   if (error) {
//     return NextResponse.redirect(
//       new URL(
//         `/login?error=${encodeURIComponent(error.message)}`,
//         requestUrl.origin
//       )
//     );
//   }

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return NextResponse.redirect(
//       new URL("/login", requestUrl.origin)
//     );
//   }

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("onboarding_completed")
//     .eq("id", user.id)
//     .maybeSingle();

//   if (
//     profile?.onboarding_completed === true
//   ) {
//     return NextResponse.redirect(
//       new URL("/", requestUrl.origin)
//     );
//   }

//   return NextResponse.redirect(
//     new URL("/onboarding", requestUrl.origin)
//   );
// }
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");

  /*
   * Where should we go after authentication?
   *
   * Examples:
   *
   * /auth/callback?code=xxx
   * /auth/callback?code=xxx&next=/update-password
   */
  const next = url.searchParams.get("next");

  /*
   * No authorization code
   */
  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Authentication%20failed.",
        url.origin
      )
    );
  }

  const supabase = await createClient();

  /*
   * Exchange code for Supabase session
   */
  const {
    error: exchangeError,
  } = await supabase.auth.exchangeCodeForSession(
    code
  );

  if (exchangeError) {
    console.error(
      "Auth callback exchange error:",
      exchangeError
    );

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Authentication link is invalid or has expired."
        )}`,
        url.origin
      )
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
      "Auth callback user error:",
      userError
    );

    return NextResponse.redirect(
      new URL(
        "/login?error=Unable%20to%20authenticate%20your%20account.",
        url.origin
      )
    );
  }

  /*
   * IMPORTANT:
   *
   * Password reset flow.
   *
   * If the callback contains:
   *
   * next=/update-password
   *
   * go directly there.
   *
   * DO THIS BEFORE PROFILE CHECK.
   */
  if (
    next &&
    next.startsWith("/") &&
    !next.startsWith("//")
  ) {
    return NextResponse.redirect(
      new URL(next, url.origin)
    );
  }

  /*
   * Normal authentication flow
   *
   * Check profile
   */
  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select(
      "id, full_name, avatar_url, onboarding_completed"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error(
      "Profile fetch error:",
      profileError
    );

    return NextResponse.redirect(
      new URL(
        "/login?error=Unable%20to%20load%20your%20profile.",
        url.origin
      )
    );
  }

  /*
   * Profile doesn't exist
   */
  if (!profile) {
    const fullName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "";

    const avatarUrl =
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      null;

    const {
      error: createProfileError,
    } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        onboarding_completed: false,
      });

    if (createProfileError) {
      console.error(
        "Profile creation error:",
        createProfileError
      );

      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            "Unable to create your profile."
          )}`,
          url.origin
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        "/onboarding",
        url.origin
      )
    );
  }

  /*
   * Onboarding incomplete
   */
  if (
    profile.onboarding_completed !== true
  ) {
    return NextResponse.redirect(
      new URL(
        "/onboarding",
        url.origin
      )
    );
  }

  /*
   * Fully authenticated user
   */
  return NextResponse.redirect(
    new URL(
      "/",
      url.origin
    )
  );
}