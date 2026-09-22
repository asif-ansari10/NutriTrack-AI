import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";

import { createClient } from "@/lib/supabase/server";
import ProgressReport from "@/components/progress/ProgressReport";

export const runtime = "nodejs";

function toNumber(value: unknown): number {
  const result = Number(value);

  return Number.isFinite(result) ? result : 0;
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function GET(request: NextRequest) {
  try {
    // =========================================================
    // SUPABASE
    // =========================================================

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // =========================================================
    // DATE RANGE
    // =========================================================

    const { searchParams } = new URL(request.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (
      !from ||
      !to ||
      !isValidDate(from) ||
      !isValidDate(to)
    ) {
      return NextResponse.json(
        {
          error: "Valid from and to dates are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (from > to) {
      return NextResponse.json(
        {
          error: "Start date cannot be after end date.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================================================
    // PROFILE
    // =========================================================

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select(
        `
          current_weight_kg,
          target_weight_kg,
          daily_calorie_target,
          protein_target_g,
          carbs_target_g,
          fat_target_g,
          fiber_target_g
        `
      )
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        "Progress export profile error:",
        profileError
      );

      return NextResponse.json(
        {
          error: "Failed to load profile.",
        },
        {
          status: 500,
        }
      );
    }

    if (!profile) {
      return NextResponse.json(
        {
          error: "Profile not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =========================================================
    // MEALS
    // =========================================================

    const {
      data: meals,
      error: mealsError,
    } = await supabase
      .from("meals")
      .select(
        `
          id,
          meal_date,
          meal_type,
          name,
          calories,
          protein_g,
          carbs_g,
          fat_g,
          fiber_g
        `
      )
      .eq("user_id", user.id)
      .gte("meal_date", from)
      .lte("meal_date", to)
      .order("meal_date", {
        ascending: true,
      });

    if (mealsError) {
      console.error(
        "Progress export meals error:",
        mealsError
      );

      return NextResponse.json(
        {
          error: "Failed to load meals.",
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // ACTIVITIES
    // =========================================================

    const {
      data: activities,
      error: activitiesError,
    } = await supabase
      .from("activities")
      .select(
        `
          id,
          activity_date,
          activity_type,
          activity_name,
          duration_minutes,
          calories_burned
        `
      )
      .eq("user_id", user.id)
      .gte("activity_date", from)
      .lte("activity_date", to)
      .order("activity_date", {
        ascending: true,
      });

    if (activitiesError) {
      console.error(
        "Progress export activities error:",
        activitiesError
      );

      return NextResponse.json(
        {
          error: "Failed to load activities.",
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // WEIGHT LOGS
    // =========================================================

    const {
      data: weightLogs,
      error: weightError,
    } = await supabase
      .from("weight_logs")
      .select(
        `
          id,
          weight_kg,
          recorded_at,
          note
        `
      )
      .eq("user_id", user.id)
      .gte("recorded_at", from)
      .lte("recorded_at", to)
      .order("recorded_at", {
        ascending: true,
      });

    if (weightError) {
      console.error(
        "Progress export weight error:",
        weightError
      );

      return NextResponse.json(
        {
          error: "Failed to load weight history.",
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // PDF DATA
    // =========================================================

    const reportProps = {
      from,
      to,

      profile: {
        currentWeight: toNumber(
          profile.current_weight_kg
        ),

        targetWeight: toNumber(
          profile.target_weight_kg
        ),

        calorieTarget: toNumber(
          profile.daily_calorie_target
        ),

        proteinTarget: toNumber(
          profile.protein_target_g
        ),

        carbsTarget: toNumber(
          profile.carbs_target_g
        ),

        fatTarget: toNumber(
          profile.fat_target_g
        ),

        fiberTarget: toNumber(
          profile.fiber_target_g
        ),
      },

      meals: meals ?? [],

      activities: activities ?? [],

      weightLogs: weightLogs ?? [],
    };

    // =========================================================
    // CREATE PDF
    // =========================================================

    const pdfElement = createElement(
      ProgressReport,
      reportProps
    );

    const pdfBuffer =
      await renderToBuffer(
        pdfElement as any
      );

    // =========================================================
    // DOWNLOAD
    // =========================================================

    const filename =
      `NutriTrack-AI-Progress-${from}-to-${to}.pdf`;

    return new NextResponse(
      pdfBuffer as BodyInit,
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${filename}"`,

          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Progress PDF export error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to generate progress PDF.",
      },
      {
        status: 500,
      }
    );
  }
}