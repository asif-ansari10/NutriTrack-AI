// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// export async function GET(request: Request) {
//   const supabase = await createClient();

//   const origin = new URL(request.url).origin;

//   const { data, error } =
//     await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: `${origin}/auth/callback`,
//       },
//     });

//   if (error) {
//     console.error("Google OAuth error:", error);

//     return NextResponse.redirect(
//       new URL(
//         `/login?error=${encodeURIComponent(
//           "Unable to continue with Google."
//         )}`,
//         origin
//       )
//     );
//   }

//   return NextResponse.redirect(data.url);
// }

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request
) {
  try {
    const supabase =
      await createClient();

    /*
     * Get the current website origin.
     *
     * Production:
     * https://nutritrackai.co.in
     *
     * Local:
     * http://localhost:3000
     */
    const url = new URL(request.url);

    const origin =
      process.env.NODE_ENV === "production"
        ? "https://nutritrackai.co.in"
        : url.origin;

    /*
     * IMPORTANT
     *
     * Google first authenticates the user,
     * then Supabase sends the user to this
     * callback route.
     */
    const redirectTo =
      `${origin}/auth/callback`;

    console.log(
      "Google OAuth redirect:",
      redirectTo
    );

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo,
        },
      });

    /*
     * OAuth URL could not be created.
     */
    if (error) {
      console.error(
        "Google OAuth start error:",
        error
      );

      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            "Unable to start Google sign in."
          )}`,
          origin
        )
      );
    }

    /*
     * Supabase should return the Google
     * authorization URL.
     */
    if (!data?.url) {
      console.error(
        "Google OAuth URL missing."
      );

      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            "Google sign in URL could not be created."
          )}`,
          origin
        )
      );
    }

    /*
     * Send browser to Google.
     */
    return NextResponse.redirect(
      data.url
    );
  } catch (error) {
    console.error(
      "Google OAuth exception:",
      error
    );

    const url =
      new URL(request.url);

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Something went wrong while starting Google sign in."
        )}`,
        url.origin
      )
    );
  }
}