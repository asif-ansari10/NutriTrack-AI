import { NextResponse } from "next/server";

import { getCoachContext } from "@/lib/coach/getCoachContext";

export async function GET() {
  try {
    const result =
      await getCoachContext();

    if (!result.authenticated) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please log in first.",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      success: true,
      context:
        result.context,
    });
  } catch (error) {
    console.error(
      "Coach context API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load your Coach data.",
      },
      {
        status: 500,
      }
    );
  }
}