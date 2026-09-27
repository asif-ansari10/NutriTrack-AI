// import { NextResponse } from "next/server";

// import { createClient } from "@/lib/supabase/server";

// export async function GET(
//   request: Request
// ) {
//   const url =
//     new URL(request.url);

//   const code =
//     url.searchParams.get("code");

//   const next =
//     url.searchParams.get("next");

//   /*
//    * No OAuth code.
//    */
//   if (!code) {
//     return NextResponse.redirect(
//       new URL(
//         "/login?error=Authentication%20code%20missing.",
//         url.origin
//       )
//     );
//   }

//   try {
//     const supabase =
//       await createClient();

//     /*
//      * Exchange OAuth code
//      * for Supabase session.
//      */
//     const {
//       error: exchangeError,
//     } =
//       await supabase.auth.exchangeCodeForSession(
//         code
//       );

//     if (exchangeError) {
//       console.error(
//         "OAuth code exchange error:",
//         exchangeError
//       );

//       return NextResponse.redirect(
//         new URL(
//           `/login?error=${encodeURIComponent(
//             "Google authentication failed. Please try again."
//           )}`,
//           url.origin
//         )
//       );
//     }

//     /*
//      * Get authenticated user.
//      */
//     const {
//       data: { user },
//       error: userError,
//     } =
//       await supabase.auth.getUser();

//     if (userError || !user) {
//       console.error(
//         "OAuth user error:",
//         userError
//       );

//       return NextResponse.redirect(
//         new URL(
//           `/login?error=${encodeURIComponent(
//             "Unable to authenticate your account."
//           )}`,
//           url.origin
//         )
//       );
//     }

//     /*
//      * Password reset / explicit next route.
//      *
//      * Only allow internal routes.
//      */
//     if (
//       next &&
//       next.startsWith("/") &&
//       !next.startsWith("//")
//     ) {
//       return NextResponse.redirect(
//         new URL(
//           next,
//           url.origin
//         )
//       );
//     }

//     /*
//      * Check profile.
//      */
//     const {
//       data: profile,
//       error: profileError,
//     } =
//       await supabase
//         .from("profiles")
//         .select(
//           "id, full_name, avatar_url, onboarding_completed"
//         )
//         .eq("id", user.id)
//         .maybeSingle();

//     if (profileError) {
//       console.error(
//         "Profile fetch error:",
//         profileError
//       );

//       return NextResponse.redirect(
//         new URL(
//           `/login?error=${encodeURIComponent(
//             "Unable to load your profile."
//           )}`,
//           url.origin
//         )
//       );
//     }

//     /*
//      * No profile.
//      *
//      * This normally happens for a new
//      * Google user.
//      */
//     if (!profile) {
//       const fullName =
//         user.user_metadata?.full_name ||
//         user.user_metadata?.name ||
//         "";

//       const avatarUrl =
//         user.user_metadata?.avatar_url ||
//         user.user_metadata?.picture ||
//         null;

//       const {
//         error: profileCreateError,
//       } =
//         await supabase
//           .from("profiles")
//           .insert({
//             id: user.id,
//             full_name: fullName,
//             avatar_url: avatarUrl,
//             onboarding_completed: false,
//           });

//       if (profileCreateError) {
//         console.error(
//           "Profile creation error:",
//           profileCreateError
//         );

//         return NextResponse.redirect(
//           new URL(
//             `/login?error=${encodeURIComponent(
//               "Unable to create your profile."
//             )}`,
//             url.origin
//           )
//         );
//       }

//       /*
//        * New Google user.
//        * Send them to onboarding.
//        */
//       return NextResponse.redirect(
//         new URL(
//           "/onboarding",
//           url.origin
//         )
//       );
//     }

//     /*
//      * Existing user who has not completed
//      * onboarding.
//      */
//     if (
//       profile.onboarding_completed !== true
//     ) {
//       return NextResponse.redirect(
//         new URL(
//           "/onboarding",
//           url.origin
//         )
//       );
//     }

//     /*
//      * Existing fully configured user.
//      */
//     return NextResponse.redirect(
//       new URL(
//         "/",
//         url.origin
//       )
//     );
//   } catch (error) {
//     console.error(
//       "OAuth callback exception:",
//       error
//     );

//     return NextResponse.redirect(
//       new URL(
//         `/login?error=${encodeURIComponent(
//           "Authentication failed. Please try again."
//         )}`,
//         url.origin
//       )
//     );
//   }
// }

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");

  /*
   * No OAuth code.
   */
  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Authentication%20code%20missing.",
        url.origin
      )
    );
  }

  try {
    const supabase = await createClient();

    /*
     * Exchange OAuth code for Supabase session.
     */
    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error(
        "OAuth code exchange error:",
        exchangeError
      );

      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            "Google authentication failed. Please try again."
          )}`,
          url.origin
        )
      );
    }

    /*
     * Get authenticated user.
     */
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error(
        "OAuth user error:",
        userError
      );

      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            "Unable to authenticate your account."
          )}`,
          url.origin
        )
      );
    }

    /*
     * Check profile.
     *
     * The database trigger should have already
     * created the profile for a new user.
     */
    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        avatar_url,
        onboarding_completed,
        role
      `)
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        "Profile fetch error:",
        profileError
      );

      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            "Unable to load your profile."
          )}`,
          url.origin
        )
      );
    }

    /*
     * If there is no profile, something is wrong
     * with the profile creation trigger.
     */
    if (!profile) {
      console.error(
        "Profile not found for authenticated user:",
        user.id
      );

      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            "Your account profile could not be created. Please contact support."
          )}`,
          url.origin
        )
      );
    }

    /*
     * Explicit internal redirect.
     *
     * Useful for flows such as password reset.
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
     * User has not completed onboarding.
     */
    if (profile.onboarding_completed !== true) {
      return NextResponse.redirect(
        new URL(
          "/onboarding",
          url.origin
        )
      );
    }

    /*
     * Existing authenticated user.
     *
     * Admin will eventually go to /admin.
     * Normal users go to /home.
     */
    if (profile.role === "admin") {
      return NextResponse.redirect(
        new URL(
          "/admin",
          url.origin
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        "/home",
        url.origin
      )
    );
  } catch (error) {
    console.error(
      "OAuth callback exception:",
      error
    );

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Authentication failed. Please try again."
        )}`,
        url.origin
      )
    );
  }
}