import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_MEAL_TYPES = [
  "breakfast",
  "lunch",
  "before_workout",
  "snack",
  "after_workout",
  "dinner",
] as const;

type MealType =
  (typeof ALLOWED_MEAL_TYPES)[number];

interface SaveMealRequest {
  meal_date?: string;
  meal_type?: string;
  name?: string;
  description?: string;
  calories?: number | string;
  protein_g?: number | string;
  carbs_g?: number | string;
  fat_g?: number | string;
  fiber_g?: number | string;
  serving_size?: string;
  ai_analyzed?: boolean;
  ai_confidence?: number | string;
}

function numberValue(value: unknown): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function confidenceValue(value: unknown): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.min(1, Math.max(0, parsed));
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] =
    value.split("-").map(Number);

  const date = new Date(
    year,
    month - 1,
    day
  );

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error(
        "Supabase auth error:",
        authError
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    let body: SaveMealRequest;

    try {
      body = await request.json();
    } catch (error) {
      console.error(
        "Invalid save meal JSON:",
        error
      );

      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const {
      meal_date,
      meal_type,
      name,
      description,
      calories,
      protein_g,
      carbs_g,
      fat_g,
      fiber_g,
      serving_size,
      ai_analyzed,
      ai_confidence,
    } = body;

    if (
      !meal_date ||
      typeof meal_date !== "string"
    ) {
      return NextResponse.json(
        { error: "Meal date is required." },
        { status: 400 }
      );
    }

    if (!isValidDate(meal_date)) {
      return NextResponse.json(
        {
          error:
            "Invalid meal date. Use YYYY-MM-DD.",
        },
        { status: 400 }
      );
    }

    const normalizedMealType = String(
      meal_type || ""
    )
      .trim()
      .toLowerCase();

    if (
      !ALLOWED_MEAL_TYPES.includes(
        normalizedMealType as MealType
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid meal type. Choose breakfast, lunch, before workout, snack, after workout or dinner.",
        },
        { status: 400 }
      );
    }

    const mealName = String(
      name || ""
    ).trim();

    if (!mealName) {
      return NextResponse.json(
        { error: "Meal name is required." },
        { status: 400 }
      );
    }

    if (mealName.length > 150) {
      return NextResponse.json(
        { error: "Meal name is too long." },
        { status: 400 }
      );
    }

    const mealDescription =
      description
        ? String(description).trim()
        : null;

    const mealServingSize =
      serving_size
        ? String(serving_size).trim()
        : null;

    const mealCalories = numberValue(
      calories
    );

    const mealProtein = numberValue(
      protein_g
    );

    const mealCarbs = numberValue(
      carbs_g
    );

    const mealFat = numberValue(fat_g);

    const mealFiber = numberValue(
      fiber_g
    );

    const wasAiAnalyzed = Boolean(
      ai_analyzed
    );

    const confidence = confidenceValue(
      ai_confidence
    );

    const {
      data,
      error,
    } = await supabase
      .from("meals")
      .insert({
        user_id: user.id,
        meal_date,
        meal_type: normalizedMealType,
        name: mealName,
        description: mealDescription,
        calories: Math.round(
          mealCalories
        ),
        protein_g: mealProtein,
        carbs_g: mealCarbs,
        fat_g: mealFat,
        fiber_g: mealFiber,
        serving_size: mealServingSize,
        ai_analyzed: wasAiAnalyzed,
        ai_confidence: confidence,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Supabase meal save error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Could not save the meal to your diary.",
          details:
            process.env.NODE_ENV ===
            "development"
              ? error.message
              : undefined,
        },
        { status: 500 }
      );
    }

    console.log(
      "Meal saved successfully:",
      {
        userId: user.id,
        mealId: data.id,
        mealDate: data.meal_date,
        mealType: data.meal_type,
        name: data.name,
        fiber: data.fiber_g,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Meal added to your diary.",
        meal: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Save meal API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while saving the meal.",
      },
      { status: 500 }
    );
  }
}
