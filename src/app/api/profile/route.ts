import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      goal,
      gender,
      dateOfBirth,
      heightCm,
      currentWeightKg,
      targetWeightKg,
      activityLevel,
    } = body;

    if (
      !goal ||
      !gender ||
      !dateOfBirth ||
      !heightCm ||
      !currentWeightKg ||
      !targetWeightKg ||
      !activityLevel
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all onboarding fields.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        goal,
        gender,
        date_of_birth: dateOfBirth,
        height_cm: heightCm,
        current_weight_kg: currentWeightKg,
        target_weight_kg: targetWeightKg,
        activity_level: activityLevel,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Profile update error:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Invalid request.",
      },
      { status: 400 }
    );
  }
}