import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // =========================================================
    // AUTH
    // =========================================================

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You must be logged in.",
        },
        {
          status: 401,
        }
      );
    }

    // =========================================================
    // REQUEST BODY
    // =========================================================

    const body = await request.json();

    const weight = Number(body.weight);

    const note =
      typeof body.note === "string"
        ? body.note.trim()
        : null;

    // =========================================================
    // VALIDATION
    // =========================================================

    if (!Number.isFinite(weight)) {
      return NextResponse.json(
        {
          error: "Please enter a valid weight.",
        },
        {
          status: 400,
        }
      );
    }

    if (weight < 20 || weight > 500) {
      return NextResponse.json(
        {
          error:
            "Please enter a weight between 20 and 500 kg.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================================================
    // TODAY
    // =========================================================

    const today = new Date()
      .toISOString()
      .split("T")[0];

    // =========================================================
    // SAVE WEIGHT HISTORY
    // =========================================================

    const {
      error: weightLogError,
    } = await supabase
      .from("weight_logs")
      .insert({
        user_id: user.id,
        weight_kg: weight,
        recorded_at: today,
        note: note || null,
      });

    if (weightLogError) {
      console.error(
        "Weight log insert error:",
        weightLogError
      );

      return NextResponse.json(
        {
          error:
            "Failed to save your weight.",
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // UPDATE PROFILE CURRENT WEIGHT
    // =========================================================

    const {
      error: profileError,
    } = await supabase
      .from("profiles")
      .update({
        current_weight_kg: weight,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", user.id);

    if (profileError) {
      console.error(
        "Profile update error:",
        profileError
      );

      return NextResponse.json(
        {
          error:
            "Weight was logged, but your profile could not be updated.",
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // SUCCESS
    // =========================================================

    return NextResponse.json({
      success: true,
      weight,
      recorded_at: today,
    });
  } catch (error) {
    console.error(
      "Update weight API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while updating your weight.",
      },
      {
        status: 500,
      }
    );
  }
}