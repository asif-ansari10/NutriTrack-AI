// import { NextResponse } from "next/server";

// import { createClient } from "@/lib/supabase/server";

// export async function GET(
//   request: Request
// ) {
//   try {
//     const supabase =
//       await createClient();

//     /*
//      * Get the current website origin.
//      *
//      * Production:
//      * https://nutritrackai.co.in
//      *
//      * Local:
//      * http://localhost:3000
//      */
//     const url = new URL(request.url);

//     const origin =
//       process.env.NODE_ENV === "production"
//         ? "https://nutritrackai.co.in"
//         : url.origin;

//     /*
//      * IMPORTANT
//      *
//      * Google first authenticates the user,
//      * then Supabase sends the user to this
//      * callback route.
//      */
//     const redirectTo =
//       `${origin}/auth/callback`;

//     console.log(
//       "Google OAuth redirect:",
//       redirectTo
//     );

//     const {
//       data,
//       error,
//     } =
//       await supabase.auth.signInWithOAuth({
//         provider: "google",

//         options: {
//           redirectTo,
//         },
//       });

//     /*
//      * OAuth URL could not be created.
//      */
//     if (error) {
//       console.error(
//         "Google OAuth start error:",
//         error
//       );

//       return NextResponse.redirect(
//         new URL(
//           `/login?error=${encodeURIComponent(
//             "Unable to start Google sign in."
//           )}`,
//           origin
//         )
//       );
//     }

//     /*
//      * Supabase should return the Google
//      * authorization URL.
//      */
//     if (!data?.url) {
//       console.error(
//         "Google OAuth URL missing."
//       );

//       return NextResponse.redirect(
//         new URL(
//           `/login?error=${encodeURIComponent(
//             "Google sign in URL could not be created."
//           )}`,
//           origin
//         )
//       );
//     }

//     /*
//      * Send browser to Google.
//      */
//     return NextResponse.redirect(
//       data.url
//     );
//   } catch (error) {
//     console.error(
//       "Google OAuth exception:",
//       error
//     );

//     const url =
//       new URL(request.url);

//     return NextResponse.redirect(
//       new URL(
//         `/login?error=${encodeURIComponent(
//           "Something went wrong while starting Google sign in."
//         )}`,
//         url.origin
//       )
//     );
//   }
// }

// import { NextResponse } from "next/server";

// import { createClient } from "@/lib/supabase/server";

// export async function GET(request: Request) {
//   try {
//     const supabase = await createClient();

//     /*
//      * Get the current website origin.
//      *
//      * Production:
//      * https://www.nutritrackai.co.in
//      *
//      * Local:
//      * http://localhost:3000
//      */
//     const url = new URL(request.url);

//     const origin =
//       process.env.NODE_ENV === "production"
//         ? "https://www.nutritrackai.co.in"
//         : url.origin;

//     /*
//      * Google will authenticate the user and then
//      * Supabase will redirect to our callback route.
//      */
//     const redirectTo = `${origin}/auth/callback`;

//     console.log("Google OAuth redirect:", redirectTo);

//     const { data, error } =
//       await supabase.auth.signInWithOAuth({
//         provider: "google",

//         options: {
//           redirectTo,
//         },
//       });

//     /*
//      * OAuth URL could not be created.
//      */
//     if (error) {
//       console.error(
//         "Google OAuth start error:",
//         error
//       );

//       return NextResponse.redirect(
//         new URL(
//           `/login?error=${encodeURIComponent(
//             "Unable to start Google sign in."
//           )}`,
//           origin
//         )
//       );
//     }

//     /*
//      * Supabase should return the Google
//      * authorization URL.
//      */
//     if (!data?.url) {
//       console.error(
//         "Google OAuth URL missing."
//       );

//       return NextResponse.redirect(
//         new URL(
//           `/login?error=${encodeURIComponent(
//             "Google sign in URL could not be created."
//           )}`,
//           origin
//         )
//       );
//     }

//     /*
//      * Redirect the browser to Google.
//      */
//     return NextResponse.redirect(data.url);
//   } catch (error) {
//     console.error(
//       "Google OAuth exception:",
//       error
//     );

//     const url = new URL(request.url);

//     return NextResponse.redirect(
//       new URL(
//         `/login?error=${encodeURIComponent(
//           "Something went wrong while starting Google sign in."
//         )}`,
//         url.origin
//       )
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const requestUrl = new URL(request.url);

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      requestUrl.origin;

    const origin = siteUrl.replace(/\/$/, "");

    const redirectTo = `${origin}/auth/callback`;

    console.log("=================================");
    console.log("Google OAuth");
    console.log("Site URL:", origin);
    console.log("Redirect URL:", redirectTo);
    console.log("=================================");

    const {
      data,
      error,
    } = await supabase.auth.signInWithOAuth({
      provider: "google",

      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

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

    if (!data?.url) {
      console.error(
        "Google OAuth URL was not generated."
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
     * Redirect browser to Google.
     */
    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error(
      "Google OAuth exception:",
      error
    );

    const requestUrl = new URL(request.url);

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      requestUrl.origin;

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Something went wrong while starting Google sign in."
        )}`,
        origin
      )
    );
  }
}