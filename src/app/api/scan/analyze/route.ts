import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

import { createClient } from "@/lib/supabase/server";

/* ============================================================
   GEMINI
============================================================ */

const apiKey =
  process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    "GEMINI_API_KEY is not configured."
  );
}

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
});

/* ============================================================
   TYPES
============================================================ */

interface AnalyzeRequest {
  image?: string;
  mimeType?: string;
  description?: string;
  meal_type?: string;
  meal_date?: string;
}

interface GeminiMealResult {
  meal_type: MealType;
  name: string;
  description: string;

  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;

  serving_size: string;
  confidence: number;
}

/* ============================================================
   MEAL TYPES
============================================================ */

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

/* ============================================================
   MIME TYPES
============================================================ */

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

/*
 * Base64 request limit.
 *
 * Your ScanPage already compresses images before upload.
 * This provides an additional server-side safety limit.
 */
const MAX_BASE64_LENGTH =
  14 * 1024 * 1024;

/* ============================================================
   TYPE GUARDS
============================================================ */

function isMealType(
  value: string
): value is MealType {
  return (
    ALLOWED_MEAL_TYPES.includes(
      value as MealType
    )
  );
}

function isMimeType(
  value: string
): boolean {
  return (
    ALLOWED_MIME_TYPES.includes(
      value as (typeof ALLOWED_MIME_TYPES)[number]
    )
  );
}

/* ============================================================
   DATE VALIDATION
============================================================ */

function isValidDate(
  value: string
): boolean {
  /*
   * Expected:
   *
   * YYYY-MM-DD
   */

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      value
    )
  ) {
    return false;
  }

  const date =
    new Date(
      `${value}T00:00:00`
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return false;
  }

  /*
   * Make sure JavaScript didn't
   * normalize an invalid date.
   */

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return (
    `${year}-${month}-${day}` ===
    value
  );
}

/* ============================================================
   TODAY - SERVER DATE
============================================================ */

function getTodayServerSide(): string {
  /*
   * NutriTrack uses India time.
   */

  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone:
        "Asia/Kolkata",
    }
  ).format(
    new Date()
  );
}

/* ============================================================
   CLEAN BASE64
============================================================ */

function cleanBase64(
  image: string
): string {
  /*
   * Supports:
   *
   * abcdef....
   *
   * and:
   *
   * data:image/jpeg;base64,abcdef...
   */

  const trimmed =
    image.trim();

  if (
    trimmed.startsWith(
      "data:"
    )
  ) {
    const commaIndex =
      trimmed.indexOf(",");

    if (
      commaIndex === -1
    ) {
      return "";
    }

    return trimmed
      .slice(
        commaIndex + 1
      )
      .trim();
  }

  return trimmed;
}

/* ============================================================
   SAFE NUMBER
============================================================ */

function safeNumber(
  value: unknown,
  fallback = 0
): number {
  const parsed =
    Number(value);

  if (
    !Number.isFinite(
      parsed
    )
  ) {
    return fallback;
  }

  return parsed;
}

/* ============================================================
   CLAMP
============================================================ */

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );
}

/* ============================================================
   NORMALIZE GEMINI RESULT
============================================================ */

function normalizeResult(
  result: unknown,
  requestedMealType: MealType
): GeminiMealResult {
  const data =
    result &&
    typeof result ===
      "object"
      ? (result as Record<
          string,
          unknown
        >)
      : {};

  /*
   * ----------------------------------------------------------
   * MEAL TYPE
   * ----------------------------------------------------------
   */

  const rawMealType =
    String(
      data.meal_type || ""
    )
      .trim()
      .toLowerCase();

  const mealType: MealType =
    isMealType(
      rawMealType
    )
      ? rawMealType
      : requestedMealType;

  /*
   * ----------------------------------------------------------
   * NAME
   * ----------------------------------------------------------
   */

  const name =
    String(
      data.name ||
        "Meal"
    ).trim();

  /*
   * ----------------------------------------------------------
   * DESCRIPTION
   * ----------------------------------------------------------
   */

  const description =
    String(
      data.description ||
        "Meal analyzed from the uploaded image."
    ).trim();

  /*
   * ----------------------------------------------------------
   * NUTRITION
   * ----------------------------------------------------------
   */

  const calories =
    Math.max(
      0,
      safeNumber(
        data.calories
      )
    );

  const protein =
    Math.max(
      0,
      safeNumber(
        data.protein_g
      )
    );

  const carbs =
    Math.max(
      0,
      safeNumber(
        data.carbs_g
      )
    );

  const fat =
    Math.max(
      0,
      safeNumber(
        data.fat_g
      )
    );

  const fiber =
    Math.max(
      0,
      safeNumber(
        data.fiber_g
      )
    );

  /*
   * ----------------------------------------------------------
   * SERVING SIZE
   * ----------------------------------------------------------
   */

  const servingSize =
    String(
      data.serving_size ||
        ""
    ).trim();

  /*
   * ----------------------------------------------------------
   * CONFIDENCE
   * ----------------------------------------------------------
   */

  const confidence =
    clamp(
      safeNumber(
        data.confidence
      ),
      0,
      1
    );

  return {
    meal_type:
      mealType,

    name:
      name || "Meal",

    description:
      description ||
      "Meal analyzed from the uploaded image.",

    calories,

    protein_g:
      protein,

    carbs_g:
      carbs,

    fat_g:
      fat,

    fiber_g:
      fiber,

    serving_size:
      servingSize,

    confidence,
  };
}

/* ============================================================
   POST
============================================================ */

export async function POST(
  request: Request
) {
  try {
    /* ========================================================
       1. CHECK GEMINI KEY
    ======================================================== */

    if (
      !process.env.GEMINI_API_KEY
    ) {
      console.error(
        "GEMINI_API_KEY is missing."
      );

      return NextResponse.json(
        {
          error:
            "Gemini API key is not configured on the server.",
        },
        {
          status: 500,
        }
      );
    }

    /* ========================================================
       2. AUTHENTICATION
    ======================================================== */

    const supabase =
      await createClient();

    const {
      data: {
        user,
      },
      error:
        authError,
    } =
      await supabase.auth.getUser();

    if (authError) {
      console.error(
        "Supabase auth error:",
        authError
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          error:
            "You must be logged in.",
        },
        {
          status: 401,
        }
      );
    }

    /* ========================================================
       3. READ REQUEST JSON
    ======================================================== */

    let body: AnalyzeRequest;

    try {
      body =
        await request.json();
    } catch (error) {
      console.error(
        "Invalid JSON request:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      image,
      mimeType,
      description,
      meal_type,
      meal_date,
    } = body;

    /* ========================================================
       4. IMAGE VALIDATION
    ======================================================== */

    if (
      !image ||
      typeof image !==
        "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Meal image is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       5. MIME TYPE VALIDATION
    ======================================================== */

    if (
      !mimeType ||
      typeof mimeType !==
        "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Image MIME type is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !isMimeType(
        mimeType
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid image type. Please use JPG, PNG or WebP.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       6. CLEAN BASE64
    ======================================================== */

    const base64Image =
      cleanBase64(
        image
      );

    if (!base64Image) {
      return NextResponse.json(
        {
          error:
            "Invalid image data.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       7. IMAGE SIZE VALIDATION
    ======================================================== */

    if (
      base64Image.length >
      MAX_BASE64_LENGTH
    ) {
      return NextResponse.json(
        {
          error:
            "Image is too large. Please upload a smaller image.",
        },
        {
          status: 413,
        }
      );
    }

    /* ========================================================
       8. DESCRIPTION
    ======================================================== */

    const userDescription =
      typeof description ===
        "string"
        ? description.trim()
        : "";

    if (
      !userDescription
    ) {
      return NextResponse.json(
        {
          error:
            "Please describe what you ate.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       9. MEAL TYPE
    ======================================================== */

    const rawMealType =
      typeof meal_type ===
        "string"
        ? meal_type
            .trim()
            .toLowerCase()
        : "";

    /*
     * If the selected value is
     * invalid, use breakfast.
     *
     * This is also TypeScript-safe.
     */

    const safeMealType: MealType =
      isMealType(
        rawMealType
      )
        ? rawMealType
        : "breakfast";

    /* ========================================================
       10. MEAL DATE
    ======================================================== */

    const rawMealDate =
      typeof meal_date ===
        "string"
        ? meal_date.trim()
        : "";

    if (
      rawMealDate &&
      !isValidDate(
        rawMealDate
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid meal date. Use YYYY-MM-DD.",
        },
        {
          status: 400,
        }
      );
    }

    const safeMealDate =
      rawMealDate ||
      getTodayServerSide();

    /* ========================================================
       11. GEMINI PROMPT
    ======================================================== */

    const prompt = `
You are a nutrition estimation assistant for NutriTrack AI.

Analyze the provided meal image carefully.

The user selected meal type:
"${safeMealType}"

The user selected meal date:
"${safeMealDate}"

The user's description is:

"${userDescription}"

Your job is to estimate the nutrition for the visible food and the serving described by the user.

IMPORTANT RULES:

1. Analyze the image carefully.
2. Use the user's description to improve the estimate.
3. Do not invent ingredients that are clearly not visible.
4. If exact quantity is unknown, provide a reasonable estimated serving.
5. Nutrition values are estimates only.
6. Do not provide medical advice.
7. Return ONLY valid JSON.
8. Do not use markdown.
9. Do not use code fences.
10. Do not add explanations outside the JSON.
11. Fiber must always be included.
12. All nutrition values must be numbers.
13. Do not return null for nutrition values.

Return exactly this structure:

{
  "meal_type": "${safeMealType}",
  "name": "short meal name",
  "description": "brief description of the visible meal",
  "calories": 0,
  "protein_g": 0,
  "carbs_g": 0,
  "fat_g": 0,
  "fiber_g": 0,
  "serving_size": "estimated serving size",
  "confidence": 0.0
}

Rules for the fields:

- meal_type must be exactly one of:

  breakfast
  lunch
  before_workout
  snack
  after_workout
  dinner

- Prefer the user's selected meal type unless the image/context clearly indicates another type.

- name must be a short useful meal name.

- description should briefly describe the visible meal.

- calories must be a non-negative number.

- protein_g must be a non-negative number.

- carbs_g must be a non-negative number.

- fat_g must be a non-negative number.

- fiber_g must be a non-negative number.

- serving_size should describe the estimated serving.

- confidence must be a decimal number between 0 and 1.

Do not include:

- meal_date
- markdown
- extra fields
- comments
- explanations
`;

    /* ========================================================
       12. CALL GEMINI
    ======================================================== */

    let response;

    try {
      response =
        await ai.models.generateContent(
          {
            model:
              "gemini-3.6-flash",

            contents: [
              {
                inlineData: {
                  mimeType:
                    mimeType,

                  data:
                    base64Image,
                },
              },
              {
                text:
                  prompt,
              },
            ],

            config: {
              responseMimeType:
                "application/json",
            },
          }
        );
    } catch (
      geminiError: unknown
    ) {
      console.error(
        "========== GEMINI ERROR =========="
      );

      console.error(
        geminiError
      );

      if (
        geminiError instanceof
        Error
      ) {
        console.error(
          "Message:",
          geminiError.message
        );

        console.error(
          "Stack:",
          geminiError.stack
        );
      }

      console.error(
        "=================================="
      );

      return NextResponse.json(
        {
          error:
            geminiError instanceof
            Error
              ? geminiError.message
              : "Gemini could not analyze the meal. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    /* ========================================================
       13. GET GEMINI TEXT
    ======================================================== */

    const text =
      response.text;

    if (
      !text ||
      !text.trim()
    ) {
      console.error(
        "Gemini returned empty response."
      );

      return NextResponse.json(
        {
          error:
            "AI returned an empty response. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    /* ========================================================
       14. PARSE JSON
    ======================================================== */

    let parsed: unknown;

    try {
      let cleanText =
        text.trim();

      /*
       * Safety:
       * Gemini should return JSON because
       * responseMimeType is JSON.
       *
       * But remove accidental code fences
       * if they appear.
       */

      if (
        cleanText.startsWith(
          "```"
        )
      ) {
        cleanText =
          cleanText
            .replace(
              /^```(?:json)?/i,
              ""
            )
            .replace(
              /```$/i,
              ""
            )
            .trim();
      }

      parsed =
        JSON.parse(
          cleanText
        );
    } catch (
      parseError
    ) {
      console.error(
        "Gemini returned invalid JSON."
      );

      console.error(
        "Gemini text:",
        text
      );

      console.error(
        "JSON parse error:",
        parseError
      );

      return NextResponse.json(
        {
          error:
            "AI returned an invalid nutrition response. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    /* ========================================================
       15. NORMALIZE RESULT
    ======================================================== */

    const normalized =
      normalizeResult(
        parsed,
        safeMealType
      );

    /* ========================================================
       16. FINAL RESULT
    ======================================================== */

    const finalResult = {
      meal_type:
        normalized.meal_type,

      meal_date:
        safeMealDate,

      name:
        normalized.name,

      description:
        normalized.description,

      calories:
        normalized.calories,

      protein_g:
        normalized.protein_g,

      carbs_g:
        normalized.carbs_g,

      fat_g:
        normalized.fat_g,

      fiber_g:
        normalized.fiber_g,

      serving_size:
        normalized.serving_size,

      confidence:
        normalized.confidence,
    };

    /* ========================================================
       17. LOG SUCCESS
    ======================================================== */

    console.log(
      "Meal analysis successful:",
      {
        userId:
          user.id,

        mealType:
          finalResult.meal_type,

        mealDate:
          finalResult.meal_date,

        name:
          finalResult.name,

        calories:
          finalResult.calories,

        protein:
          finalResult.protein_g,

        carbs:
          finalResult.carbs_g,

        fat:
          finalResult.fat_g,

        fiber:
          finalResult.fiber_g,
      }
    );

    /* ========================================================
       18. RETURN
    ======================================================== */

    return NextResponse.json(
      finalResult,
      {
        status: 200,
      }
    );
  } catch (error) {
    /* ========================================================
       GLOBAL ERROR
    ======================================================== */

    console.error(
      "Meal analysis route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to analyze the meal right now. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}