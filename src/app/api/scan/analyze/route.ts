import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

import { createClient } from "@/lib/supabase/server";

/* =========================================================
   GEMINI
========================================================= */

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
});

/* =========================================================
   TYPES
========================================================= */

interface AnalyzeRequest {
  image?: string;
  mimeType?: string;
  description?: string;
  meal_type?: string;
  meal_date?: string;
}

interface GeminiMealResult {
  meal_type: "breakfast" | "lunch" | "snack" | "dinner";
  name: string;
  description: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  serving_size: string;
  confidence: number;
}

/* =========================================================
   CONSTANTS
========================================================= */

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ALLOWED_MEAL_TYPES = [
  "breakfast",
  "lunch",
  "snack",
  "dinner",
];

/*
  Gemini inline image requests should stay comfortably
  below the API's total request-size limit.

  We allow approximately 10 MB of Base64 data here.
*/
const MAX_BASE64_LENGTH = 14 * 1024 * 1024;

/* =========================================================
   HELPERS
========================================================= */

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);

  return !Number.isNaN(date.getTime());
}

/* ---------------------------------------------------------
   Remove data:image/...;base64, prefix if present
--------------------------------------------------------- */

function cleanBase64(image: string): string {
  if (image.startsWith("data:")) {
    const commaIndex = image.indexOf(",");

    if (commaIndex === -1) {
      return "";
    }

    return image.slice(commaIndex + 1);
  }

  return image;
}

/* ---------------------------------------------------------
   Safe number
--------------------------------------------------------- */

function safeNumber(
  value: unknown,
  fallback = 0
): number {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return number;
}

/* ---------------------------------------------------------
   Clamp
--------------------------------------------------------- */

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(
    max,
    Math.max(min, value)
  );
}

/* ---------------------------------------------------------
   Normalize Gemini response
--------------------------------------------------------- */

function normalizeResult(
  result: any,
  requestedMealType: string
): GeminiMealResult {
  let mealType = String(
    result?.meal_type || ""
  )
    .trim()
    .toLowerCase();

  if (
    !ALLOWED_MEAL_TYPES.includes(mealType)
  ) {
    mealType = ALLOWED_MEAL_TYPES.includes(
      requestedMealType
    )
      ? requestedMealType
      : "snack";
  }

  return {
    meal_type:
      mealType as GeminiMealResult["meal_type"],

    name:
      String(
        result?.name || "Meal"
      ).trim(),

    description:
      String(
        result?.description ||
          "Meal analyzed from the uploaded image."
      ).trim(),

    calories: Math.max(
      0,
      safeNumber(result?.calories)
    ),

    protein_g: Math.max(
      0,
      safeNumber(result?.protein_g)
    ),

    carbs_g: Math.max(
      0,
      safeNumber(result?.carbs_g)
    ),

    fat_g: Math.max(
      0,
      safeNumber(result?.fat_g)
    ),

    serving_size:
      String(
        result?.serving_size || ""
      ).trim(),

    confidence: clamp(
      safeNumber(result?.confidence),
      0,
      1
    ),
  };
}

/* =========================================================
   POST
========================================================= */

export async function POST(
  request: Request
) {
  try {
    /* =====================================================
       1. CHECK GEMINI API KEY
    ===================================================== */

    if (!apiKey) {
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

    /* =====================================================
       2. AUTHENTICATION
    ===================================================== */

    const supabase =
      await createClient();

    const {
      data: { user },
      error: authError,
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

    /* =====================================================
       3. READ REQUEST BODY
    ===================================================== */

    let body: AnalyzeRequest;

    try {
      body = await request.json();
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

    /* =====================================================
       4. IMAGE REQUIRED
    ===================================================== */

    if (
      !image ||
      typeof image !== "string"
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

    /* =====================================================
       5. MIME TYPE
    ===================================================== */

    if (
      !mimeType ||
      typeof mimeType !== "string"
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
      !ALLOWED_MIME_TYPES.includes(
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

    /* =====================================================
       6. CLEAN BASE64
    ===================================================== */

    const base64Image =
      cleanBase64(image);

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

    /* =====================================================
       7. IMAGE SIZE
    ===================================================== */

    if (
      base64Image.length >
      MAX_BASE64_LENGTH
    ) {
      return NextResponse.json(
        {
          error:
            "Image is too large. Please choose a smaller photo.",
        },
        {
          status: 413,
        }
      );
    }

    /* =====================================================
       8. DESCRIPTION
    ===================================================== */

    const userDescription =
      typeof description === "string"
        ? description.trim()
        : "";

    if (!userDescription) {
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

    /* =====================================================
       9. MEAL TYPE
    ===================================================== */

    const requestedMealType =
      typeof meal_type === "string"
        ? meal_type
            .trim()
            .toLowerCase()
        : "breakfast";

    const safeMealType =
      ALLOWED_MEAL_TYPES.includes(
        requestedMealType
      )
        ? requestedMealType
        : "breakfast";

    /* =====================================================
       10. MEAL DATE
    ===================================================== */

    const requestedMealDate =
      typeof meal_date === "string"
        ? meal_date.trim()
        : "";

    if (
      requestedMealDate &&
      !isValidDate(
        requestedMealDate
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid meal date.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       11. PROMPT
    ===================================================== */

    const prompt = `
You are the nutrition estimation assistant
for NutriTrack AI.

Analyze the provided meal image carefully.

USER SELECTED MEAL TYPE:
${safeMealType}

USER SELECTED MEAL DATE:
${requestedMealDate || "Not provided"}

USER DESCRIPTION:
${userDescription}

Your task is to estimate the nutrition
for the visible food and the serving
described by the user.

IMPORTANT RULES:

1. Carefully inspect the image.
2. Use the user's description to improve
   the nutrition estimate.
3. Do not invent ingredients that are
   clearly not visible.
4. If quantity is uncertain, estimate
   a reasonable serving size.
5. Nutrition values are estimates.
6. Do not provide medical advice.
7. Return ONLY valid JSON.
8. Do not use markdown.
9. Do not use code fences.
10. Do not include explanations outside JSON.

Return exactly this structure:

{
  "meal_type": "${safeMealType}",
  "name": "short meal name",
  "description": "brief description of visible food",
  "calories": 0,
  "protein_g": 0,
  "carbs_g": 0,
  "fat_g": 0,
  "serving_size": "estimated serving size",
  "confidence": 0.0
}

FIELD RULES:

meal_type:
Must be exactly one of:
breakfast
lunch
snack
dinner

name:
Short useful name of the meal.

description:
Brief description of the visible food.

calories:
Number only.

protein_g:
Number only.

carbs_g:
Number only.

fat_g:
Number only.

serving_size:
Estimated serving size.

confidence:
Decimal between 0 and 1.

Do not return:

meal_date
extra fields
markdown
comments
explanations
`;

    /* =====================================================
       12. GEMINI REQUEST
    ===================================================== */

    let response;

    try {
      response =
        await ai.models.generateContent({
          model: "gemini-3.6-flash",

          contents: [
            {
              inlineData: {
                mimeType,
                data: base64Image,
              },
            },
            {
              text: prompt,
            },
          ],

          config: {
            responseMimeType:
              "application/json",
          },
        });
    } catch (geminiError: any) {
      /*
       IMPORTANT:
       This is the ONLY Gemini catch block.
       Your previous file had a second catch
       immediately after this one.
      */

      console.error(
        "===================================="
      );

      console.error(
        "GEMINI API ERROR"
      );

      console.error(
        "Message:",
        geminiError?.message
      );

      console.error(
        "Name:",
        geminiError?.name
      );

      console.error(
        "Status:",
        geminiError?.status
      );

      console.error(
        "Code:",
        geminiError?.code
      );

      console.error(
        "Details:",
        geminiError?.details
      );

      console.error(
        "Full error:",
        geminiError
      );

      console.error(
        "===================================="
      );

      return NextResponse.json(
        {
          error:
            geminiError?.message ||
            "Gemini could not analyze the meal.",
        },
        {
          status: 502,
        }
      );
    }

    /* =====================================================
       13. GEMINI TEXT
    ===================================================== */

    const text =
      response.text;

    if (
      !text ||
      !text.trim()
    ) {
      console.error(
        "Gemini returned an empty response."
      );

      return NextResponse.json(
        {
          error:
            "Gemini returned an empty response. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    console.log(
      "Gemini raw response:",
      text
    );

    /* =====================================================
       14. PARSE JSON
    ===================================================== */

    let parsed: any;

    try {
      parsed =
        JSON.parse(
          text.trim()
        );
    } catch (parseError) {
      console.error(
        "Gemini returned invalid JSON."
      );

      console.error(
        "Raw Gemini response:",
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

    /* =====================================================
       15. NORMALIZE RESULT
    ===================================================== */

    const normalized =
      normalizeResult(
        parsed,
        safeMealType
      );

    /* =====================================================
       16. FINAL RESULT
    ===================================================== */

    const finalResult = {
      ...normalized,

      meal_date:
        requestedMealDate ||
        getTodayServerSide(),

      ai_analyzed: true,

      ai_confidence:
        normalized.confidence,
    };

    /* =====================================================
       17. LOG SUCCESS
    ===================================================== */

    console.log(
      "===================================="
    );

    console.log(
      "MEAL ANALYSIS SUCCESS"
    );

    console.log({
      userId: user.id,
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
      confidence:
        finalResult.confidence,
    });

    console.log(
      "===================================="
    );

    /* =====================================================
       18. RETURN
    ===================================================== */

    return NextResponse.json(
      finalResult,
      {
        status: 200,
      }
    );
  } catch (error: any) {
    /* =====================================================
       GLOBAL ERROR
    ===================================================== */

    console.error(
      "===================================="
    );

    console.error(
      "MEAL ANALYSIS ROUTE ERROR"
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "Full error:",
      error
    );

    console.error(
      "===================================="
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to analyze the meal right now. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   SERVER DATE
========================================================= */

function getTodayServerSide(): string {
  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}