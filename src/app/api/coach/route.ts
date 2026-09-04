// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";
// import { getCoachContext } from "@/lib/coach/getCoachContext";

// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// type CoachIntent =
//   | "nutrition"
//   | "meal"
//   | "fitness"
//   | "health"
//   | "weight"
//   | "progress"
//   | "restaurant"
//   | "general_nutrition"
//   | "unrelated";

// interface CoachRequest {
//   message?: string;
//   conversation?: {
//     role: "user" | "assistant";
//     content: string;
//   }[];
//   latitude?: number;
//   longitude?: number;
// }

// /* -------------------------------------------------------------------------- */
// /* Obvious unrelated-topic detection                                         */
// /*                                                                            */
// /* These questions are rejected before Gemini is called.                     */
// /* -------------------------------------------------------------------------- */

// function isObviouslyUnrelated(message: string): boolean {
//   const text = message.toLowerCase().trim();

//   const unrelatedPatterns = [
//     // Programming
//     /\bjava\b/,
//     /\bpython\b/,
//     /\bjavascript\b/,
//     /\btypescript\b/,
//     /\breact\b/,
//     /\bnext\.?\s*js\b/,
//     /\bnode\.?\s*js\b/,
//     /\bangular\b/,
//     /\bvue\.?js\b/,
//     /\bphp\b/,
//     /\bc\+\+\b/,
//     /\bc#\b/,
//     /\bruby\b/,
//     /\bswift\b/,
//     /\bkotlin\b/,
//     /\bprogramming\b/,
//     /\bprogrammer\b/,
//     /\bcoding\b/,
//     /\bcode\b/,
//     /\bdebug\b/,
//     /\bdebugging\b/,
//     /\bsoftware development\b/,
//     /\bapi development\b/,
//     /\bhtml\b/,
//     /\bcss\b/,
//     /\btailwind\b/,
//     /\bgithub\b/,
//     /\bgit\b/,
//     /\bdocker\b/,
//     /\bkubernetes\b/,
//     /\bsql\b/,
//     /\bdatabase\b/,
//     /\bpostgres\b/,
//     /\bsupabase\b/,

//     // Technology
//     /\bcomputer\b/,
//     /\blaptop\b/,
//     /\boperating system\b/,
//     /\bwindows\b/,
//     /\blinux\b/,
//     /\bmacos\b/,
//     /\biphone\b/,
//     /\bandroid development\b/,

//     // Unrelated entertainment
//     /\bvideo game\b/,
//     /\bvideo games\b/,
//     /\bgaming\b/,
//     /\bplaystation\b/,
//     /\bxbox\b/,
//     /\bnintendo\b/,

//     // Unrelated academic/general subjects
//     /\bsolve this equation\b/,
//     /\bmathematics homework\b/,
//     /\bphysics homework\b/,
//     /\bchemistry homework\b/,
//     /\bwrite an essay about\b/,
//     /\bwrite my assignment\b/,
//   ];

//   return unrelatedPatterns.some((pattern) => pattern.test(text));
// }

// /* -------------------------------------------------------------------------- */
// /* Intent detection                                                           */
// /* -------------------------------------------------------------------------- */

// function detectIntent(message: string): CoachIntent {
//   const text = message.toLowerCase();

//   if (isObviouslyUnrelated(message)) {
//     return "unrelated";
//   }

//   // Restaurant / food location
//   if (
//     /\brestaurant\b/.test(text) ||
//     /\brestaurants\b/.test(text) ||
//     /\bfood near me\b/.test(text) ||
//     /\beat near me\b/.test(text) ||
//     /\bhealthy food near me\b/.test(text) ||
//     /\bhealthy restaurant\b/.test(text) ||
//     /\bhealthy restaurants\b/.test(text) ||
//     /\bwhere should i eat\b/.test(text) ||
//     /\bwhere can i eat\b/.test(text)
//   ) {
//     return "restaurant";
//   }

//   // Meal questions
//   if (
//     /\bwhat should i eat\b/.test(text) ||
//     /\bwhat can i eat\b/.test(text) ||
//     /\bwhat to eat\b/.test(text) ||
//     /\bmeal\b/.test(text) ||
//     /\bdinner\b/.test(text) ||
//     /\blunch\b/.test(text) ||
//     /\bbreakfast\b/.test(text) ||
//     /\bsnack\b/.test(text) ||
//     /\bfood\b/.test(text) ||
//     /\beat\b/.test(text) ||
//     /\brecipe\b/.test(text) ||
//     /\bchicken\b/.test(text) ||
//     /\beggs?\b/.test(text) ||
//     /\bpaneer\b/.test(text) ||
//     /\bvegetarian\b/.test(text) ||
//     /\bvegan\b/.test(text)
//   ) {
//     return "meal";
//   }

//   // Nutrition
//   if (
//     /\bcalorie\b/.test(text) ||
//     /\bcalories\b/.test(text) ||
//     /\bprotein\b/.test(text) ||
//     /\bcarbs?\b/.test(text) ||
//     /\bcarbohydrate\b/.test(text) ||
//     /\bfat\b/.test(text) ||
//     /\bfiber\b/.test(text) ||
//     /\bmacro\b/.test(text) ||
//     /\bmacros\b/.test(text) ||
//     /\bnutrition\b/.test(text) ||
//     /\bnutrient\b/.test(text) ||
//     /\bvitamin\b/.test(text) ||
//     /\bmineral\b/.test(text) ||
//     /\bhealthy diet\b/.test(text)
//   ) {
//     return "nutrition";
//   }

//   // Weight
//   if (
//     /\bweight\b/.test(text) ||
//     /\blose weight\b/.test(text) ||
//     /\bweight loss\b/.test(text) ||
//     /\bgain weight\b/.test(text) ||
//     /\bweight gain\b/.test(text) ||
//     /\blose fat\b/.test(text) ||
//     /\bbody fat\b/.test(text) ||
//     /\bcutting\b/.test(text) ||
//     /\bbulking\b/.test(text)
//   ) {
//     return "weight";
//   }

//   // Fitness
//   if (
//     /\bworkout\b/.test(text) ||
//     /\bexercise\b/.test(text) ||
//     /\bgym\b/.test(text) ||
//     /\btraining\b/.test(text) ||
//     /\brunning\b/.test(text) ||
//     /\bwalking\b/.test(text) ||
//     /\bcardio\b/.test(text) ||
//     /\bstrength\b/.test(text) ||
//     /\blifting\b/.test(text) ||
//     /\bmuscle\b/.test(text) ||
//     /\bfitness\b/.test(text) ||
//     /\bwork out\b/.test(text)
//   ) {
//     return "fitness";
//   }

//   // Progress / user's NutriTrack records
//   if (
//     /\btoday\b/.test(text) ||
//     /\bthis month\b/.test(text) ||
//     /\bprogress\b/.test(text) ||
//     /\bmy meals\b/.test(text) ||
//     /\bwhat did i eat\b/.test(text) ||
//     /\bhow much did i eat\b/.test(text) ||
//     /\bmy calories\b/.test(text) ||
//     /\bmy protein\b/.test(text) ||
//     /\bmy weight history\b/.test(text) ||
//     /\bmy activity\b/.test(text) ||
//     /\bmy workout\b/.test(text) ||
//     /\bhow am i doing\b/.test(text)
//   ) {
//     return "progress";
//   }

//   // General health
//   if (
//     /\bhealth\b/.test(text) ||
//     /\bsymptom\b/.test(text) ||
//     /\bsymptoms\b/.test(text) ||
//     /\bpain\b/.test(text) ||
//     /\btired\b/.test(text) ||
//     /\bfatigue\b/.test(text) ||
//     /\bsleep\b/.test(text) ||
//     /\bstress\b/.test(text) ||
//     /\bhydration\b/.test(text) ||
//     /\bdehydration\b/.test(text) ||
//     /\bblood pressure\b/.test(text) ||
//     /\bcholesterol\b/.test(text) ||
//     /\bdiabetes\b/.test(text) ||
//     /\bdigestion\b/.test(text) ||
//     /\bconstipation\b/.test(text) ||
//     /\bheadache\b/.test(text) ||
//     /\bwellness\b/.test(text)
//   ) {
//     return "health";
//   }

//   // If the question is not obviously unrelated, let Gemini determine
//   // whether it fits the NutriTrack scope.
//   return "general_nutrition";
// }

// /* -------------------------------------------------------------------------- */
// /* Unrelated response                                                         */
// /* -------------------------------------------------------------------------- */

// function getOutOfScopeResponse(): string {
//   return `I'm **NutriTrack Coach**, so I can help with:

// - 🍎 Nutrition and food
// - 🥗 Meal planning
// - 🔥 Calories and macros
// - 💪 Protein and fiber
// - 🏃 Exercise and workouts
// - ⚖️ Weight loss, gain, or maintenance
// - ❤️ General health and wellness
// - 📊 Your NutriTrack progress
// - 🍽️ Healthy restaurant recommendations

// I can't help with programming, coding, or unrelated topics.

// Try asking me something like:
// - "What should I eat for dinner?"
// - "How much protein do I need?"
// - "Is eating eggs every day healthy?"
// - "Why am I tired after my workout?"
// - "How many calories have I eaten today?"`;
// }

// /* -------------------------------------------------------------------------- */
// /* System prompt                                                              */
// /* -------------------------------------------------------------------------- */

// function buildSystemPrompt(context: unknown, intent: CoachIntent): string {
//   return `
// You are **NutriTrack Coach**, a personalized AI nutrition, fitness, and wellness assistant.

// Your job is NOT to be a general-purpose chatbot.

// Your supported areas are:

// - Nutrition
// - Food
// - Meals
// - Calories
// - Protein
// - Carbohydrates
// - Fat
// - Fiber
// - Weight loss
// - Weight gain
// - Weight maintenance
// - Exercise
// - Fitness
// - Workouts
// - Recovery
// - General health and wellness
// - Healthy restaurant recommendations
// - The user's NutriTrack data

// Current detected intent:
// ${intent}

// ==================================================
// STRICT SCOPE
// ==================================================

// Only answer questions related to NutriTrack's purpose.

// Do NOT answer questions about:

// - Programming
// - Java
// - Python
// - JavaScript
// - TypeScript
// - React
// - Next.js
// - Node.js
// - HTML/CSS
// - Git/GitHub
// - Databases
// - Software development
// - Technology troubleshooting
// - Gaming
// - Politics
// - Unrelated school/homework questions
// - Other unrelated topics

// If the question is unrelated, politely redirect the user to nutrition, fitness, meals, weight management, or health.

// Do not provide code for unrelated programming questions.

// ==================================================
// USER DATA
// ==================================================

// The following is the user's real NutriTrack data.

// Use this data when answering personalized questions.

// IMPORTANT:

// - Never invent meals.
// - Never invent calories.
// - Never invent protein.
// - Never invent activities.
// - Never invent weight records.
// - Never invent nutrition targets.
// - Never claim the user ate something unless it exists in the supplied data.
// - If today's meals are empty, say that no meals have been logged today.
// - If today's activities are empty, say that no activities have been logged today.
// - If a value is unavailable, say that it is unavailable.
// - Do not silently create fake values.

// USER CONTEXT:

// ${JSON.stringify(context, null, 2)}

// ==================================================
// NUTRITION RECOMMENDATIONS
// ==================================================

// When recommending food:

// 1. Consider the user's goal.
// 2. Consider their daily calorie target.
// 3. Consider calories already consumed.
// 4. Consider calories remaining.
// 5. Consider protein consumed and remaining.
// 6. Consider carbohydrates and fat.
// 7. Consider fiber.
// 8. Consider today's meals.
// 9. Consider today's activities.
// 10. Give realistic serving sizes.

// When giving nutrition numbers for food that has not been logged:

// Clearly label them as:

// "Estimated"

// Do not present estimates as database records.

// Example:

// Estimated nutrition:
// - Calories: ~600 kcal
// - Protein: ~50 g
// - Carbs: ~55 g
// - Fat: ~18 g
// - Fiber: ~8 g

// ==================================================
// PERSONALIZATION
// ==================================================

// If the user asks:

// "What should I eat for dinner?"

// Use today's actual NutriTrack records and nutrition targets.

// If no meals have been logged today, say that clearly.

// Then recommend a dinner based on their profile and target.

// If they have already eaten today, calculate the recommendation around their remaining nutrition.

// If the user asks:

// "How much protein do I have left?"

// Use the actual target minus today's actual intake.

// If the user asks:

// "How am I doing this month?"

// Use the current month's records supplied in the context.

// ==================================================
// HEALTH QUESTIONS
// ==================================================

// General health and wellness questions ARE allowed.

// Examples:

// - "Why am I tired after exercising?"
// - "Is eating eggs every day healthy?"
// - "How much water should I drink?"
// - "Why am I hungry at night?"
// - "What foods are high in fiber?"
// - "Why am I not losing weight?"

// However:

// Do not diagnose medical conditions.

// Do not claim certainty about symptoms.

// Do not prescribe prescription medication.

// For serious symptoms or potentially dangerous situations, recommend appropriate professional medical care.

// If symptoms could represent an emergency, advise the user to seek urgent medical attention.

// ==================================================
// RESTAURANTS
// ==================================================

// If restaurant data is supplied separately from Google Places:

// Only use restaurants that actually appear in the supplied restaurant results.

// Never invent:

// - Restaurant names
// - Ratings
// - Addresses
// - Distances
// - Opening hours
// - Prices
// - Menu items

// If restaurant results are unavailable, say that you need location/restaurant data rather than making up recommendations.

// ==================================================
// RESPONSE STYLE
// ==================================================

// Be conversational, helpful, and concise.

// Do not start every answer with:

// "As an AI..."

// Use Markdown.

// Use headings when useful.

// Use bullet points for recommendations.

// For meal recommendations, show:

// ### Recommended Meal

// Meal description

// **Estimated nutrition**
// - Calories
// - Protein
// - Carbs
// - Fat
// - Fiber

// Then briefly explain why it fits the user's goal.

// Avoid unnecessarily repeating the user's entire profile.

// If the question is simple, answer directly.

// ==================================================
// IMPORTANT
// ==================================================

// You are NutriTrack Coach.

// Your purpose is to help the user make better decisions about:

// food + nutrition + fitness + weight + health + wellness.

// Do not become a general chatbot.
// `;
// }

// /* -------------------------------------------------------------------------- */
// /* POST                                                                       */
// /* -------------------------------------------------------------------------- */

// export async function POST(request: Request) {
//   try {
//     /* ---------------------------------------------------------------------- */
//     /* 1. Check authentication                                                */
//     /* ---------------------------------------------------------------------- */

//     const supabase = await createClient();

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Please log in to use NutriTrack Coach.",
//         },
//         { status: 401 }
//       );
//     }

//     /* ---------------------------------------------------------------------- */
//     /* 2. Read request                                                        */
//     /* ---------------------------------------------------------------------- */

//     const body = (await request.json()) as CoachRequest;

//     const message = body.message?.trim();

//     if (!message) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Please enter a message.",
//         },
//         { status: 400 }
//       );
//     }

//     /* ---------------------------------------------------------------------- */
//     /* 3. Detect intent                                                       */
//     /* ---------------------------------------------------------------------- */

//     const intent = detectIntent(message);

//     console.log("[NutriTrack Coach] Intent:", intent);
//     console.log("[NutriTrack Coach] Message:", message);

//     /* ---------------------------------------------------------------------- */
//     /* 4. Reject obvious unrelated questions BEFORE Gemini                    */
//     /* ---------------------------------------------------------------------- */

//     if (intent === "unrelated") {
//       return NextResponse.json({
//         success: true,
//         reply: getOutOfScopeResponse(),
//         intent: "unrelated",
//       });
//     }

//     /* ---------------------------------------------------------------------- */
//     /* 5. Get fresh NutriTrack data                                           */
//     /* ---------------------------------------------------------------------- */

//     const context = await getCoachContext();

//     /* ---------------------------------------------------------------------- */
//     /* 6. Gemini API key                                                      */
//     /* ---------------------------------------------------------------------- */

//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey) {
//       console.error("[NutriTrack Coach] GEMINI_API_KEY is missing.");

//       return NextResponse.json(
//         {
//           success: false,
//           error: "AI Coach is not configured correctly. GEMINI_API_KEY is missing.",
//         },
//         { status: 500 }
//       );
//     }

//     const model =
//       process.env.GEMINI_MODEL || "gemini-2.5-flash";

//     /* ---------------------------------------------------------------------- */
//     /* 7. Build system prompt                                                */
//     /* ---------------------------------------------------------------------- */

//     const systemPrompt = buildSystemPrompt(context, intent);

//     /* ---------------------------------------------------------------------- */
//     /* 8. Conversation history                                               */
//     /* ---------------------------------------------------------------------- */

//     const previousMessages =
//       Array.isArray(body.conversation)
//         ? body.conversation.slice(-10)
//         : [];

//     const contents = [
//       ...previousMessages.map((item) => ({
//         role: item.role === "assistant" ? "model" : "user",
//         parts: [
//           {
//             text: item.content,
//           },
//         ],
//       })),

//       {
//         role: "user",
//         parts: [
//           {
//             text: message,
//           },
//         ],
//       },
//     ];

//     /* ---------------------------------------------------------------------- */
//     /* 9. Call Gemini                                                         */
//     /* ---------------------------------------------------------------------- */

//     const geminiUrl =
//       `https://generativelanguage.googleapis.com/v1beta/models/` +
//       `${model}:generateContent?key=${apiKey}`;

//     const geminiResponse = await fetch(geminiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         systemInstruction: {
//           parts: [
//             {
//               text: systemPrompt,
//             },
//           ],
//         },

//         contents,

//         generationConfig: {
//           temperature: 0.65,
//           topP: 0.9,
//           maxOutputTokens: 1200,
//         },
//       }),

//       cache: "no-store",
//     });

//     /* ---------------------------------------------------------------------- */
//     /* 10. Handle Gemini errors                                               */
//     /* ---------------------------------------------------------------------- */

//     if (!geminiResponse.ok) {
//       const errorText = await geminiResponse.text();

//       console.error(
//         "[NutriTrack Coach] Gemini error:",
//         geminiResponse.status,
//         errorText
//       );

//       if (geminiResponse.status === 429) {
//         return NextResponse.json(
//           {
//             success: false,
//             error:
//               "NutriTrack Coach is temporarily unavailable because the AI service rate limit has been reached. Please try again later.",
//           },
//           { status: 429 }
//         );
//       }

//       if (geminiResponse.status === 401 || geminiResponse.status === 403) {
//         return NextResponse.json(
//           {
//             success: false,
//             error:
//               "NutriTrack Coach could not authenticate with the AI service. Please check the Gemini API configuration.",
//           },
//           { status: 500 }
//         );
//       }

//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "NutriTrack Coach could not process your request right now.",
//         },
//         { status: 502 }
//       );
//     }

//     /* ---------------------------------------------------------------------- */
//     /* 11. Parse Gemini response                                              */
//     /* ---------------------------------------------------------------------- */

//     const result = await geminiResponse.json();

//     const reply =
//       result?.candidates?.[0]?.content?.parts
//         ?.map((part: { text?: string }) => part.text || "")
//         .join("")
//         .trim();

//     if (!reply) {
//       console.error(
//         "[NutriTrack Coach] Empty Gemini response:",
//         JSON.stringify(result)
//       );

//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "NutriTrack Coach returned an empty response. Please try again.",
//         },
//         { status: 502 }
//       );
//     }

//     /* ---------------------------------------------------------------------- */
//     /* 12. Return response                                                    */
//     /* ---------------------------------------------------------------------- */

//     return NextResponse.json({
//       success: true,
//       reply,
//       intent,
//     });
//   } catch (error) {
//     console.error("[NutriTrack Coach] Unexpected error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error:
//           "Something went wrong while contacting NutriTrack Coach. Please try again.",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCoachContext } from "@/lib/coach/getCoachContext";
import { searchRestaurants } from "@/lib/coach/restaurantSearch";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type CoachIntent =
  | "nutrition"
  | "meal"
  | "fitness"
  | "health"
  | "weight"
  | "progress"
  | "restaurant"
  | "general_nutrition"
  | "unrelated";

interface CoachRequest {
  message?: string;

  conversation?: {
    role: "user" | "assistant";
    content: string;
  }[];

  latitude?: number;
  longitude?: number;
}

/* -------------------------------------------------------------------------- */
/* Obvious unrelated-topic detection                                         */
/* -------------------------------------------------------------------------- */

function isObviouslyUnrelated(message: string): boolean {
  const text = message.toLowerCase().trim();

  const unrelatedPatterns = [
    // Programming
    /\bjava\b/,
    /\bpython\b/,
    /\bjavascript\b/,
    /\btypescript\b/,
    /\breact\b/,
    /\bnext\.?\s*js\b/,
    /\bnode\.?\s*js\b/,
    /\bangular\b/,
    /\bvue\.?js\b/,
    /\bphp\b/,
    /\bc\+\+\b/,
    /\bc#\b/,
    /\bruby\b/,
    /\bswift\b/,
    /\bkotlin\b/,
    /\bprogramming\b/,
    /\bprogrammer\b/,
    /\bcoding\b/,
    /\bcode\b/,
    /\bdebug\b/,
    /\bdebugging\b/,
    /\bsoftware development\b/,
    /\bapi development\b/,
    /\bhtml\b/,
    /\bcss\b/,
    /\btailwind\b/,
    /\bgithub\b/,
    /\bgit\b/,
    /\bdocker\b/,
    /\bkubernetes\b/,
    /\bsql\b/,
    /\bdatabase\b/,
    /\bpostgres\b/,
    /\bsupabase\b/,

    // Technology
    /\bcomputer\b/,
    /\blaptop\b/,
    /\boperating system\b/,
    /\bwindows\b/,
    /\blinux\b/,
    /\bmacos\b/,
    /\biphone\b/,
    /\bandroid development\b/,

    // Entertainment / gaming
    /\bvideo game\b/,
    /\bvideo games\b/,
    /\bgaming\b/,
    /\bplaystation\b/,
    /\bxbox\b/,
    /\bnintendo\b/,

    // Unrelated academic/general subjects
    /\bsolve this equation\b/,
    /\bmathematics homework\b/,
    /\bphysics homework\b/,
    /\bchemistry homework\b/,
    /\bwrite an essay about\b/,
    /\bwrite my assignment\b/,
  ];

  return unrelatedPatterns.some((pattern) => pattern.test(text));
}

/* -------------------------------------------------------------------------- */
/* Restaurant search detection                                                */
/*                                                                            */
/* Only classify as restaurant-search when the user wants nearby/local       */
/* restaurants. General restaurant nutrition questions should still go to   */
/* the nutrition/meal flow.                                                  */
/* -------------------------------------------------------------------------- */

function isRestaurantSearchRequest(message: string): boolean {
  const text = message.toLowerCase().trim();

  const patterns = [
    /\brestaurant near me\b/,
    /\brestaurants near me\b/,
    /\bnearby restaurant\b/,
    /\bnearby restaurants\b/,
    /\bhealthy restaurant near me\b/,
    /\bhealthy restaurants near me\b/,
    /\bfood near me\b/,
    /\bhealthy food near me\b/,
    /\beat near me\b/,
    /\bplace to eat near me\b/,
    /\bcafe near me\b/,
    /\bcafes near me\b/,
    /\bwhere can i eat near me\b/,
    /\bwhere should i eat near me\b/,
    /\bfind.*restaurant\b/,
    /\bfind.*restaurants\b/,
    /\bfind.*food.*near\b/,
    /\brestaurants nearby\b/,
    /\bfood nearby\b/,
    /\bplaces to eat nearby\b/,
  ];

  return patterns.some((pattern) => pattern.test(text));
}

/* -------------------------------------------------------------------------- */
/* Intent detection                                                           */
/* -------------------------------------------------------------------------- */

function detectIntent(message: string): CoachIntent {
  const text = message.toLowerCase().trim();

  /* ---------------------------------------------------------------------- */
  /* Obvious unrelated questions                                            */
  /* ---------------------------------------------------------------------- */

  if (isObviouslyUnrelated(message)) {
    return "unrelated";
  }

  /* ---------------------------------------------------------------------- */
  /* Nearby restaurant search                                               */
  /* ---------------------------------------------------------------------- */

  if (isRestaurantSearchRequest(message)) {
    return "restaurant";
  }

  /* ---------------------------------------------------------------------- */
  /* Meal questions                                                         */
  /* ---------------------------------------------------------------------- */

  if (
    /\bwhat should i eat\b/.test(text) ||
    /\bwhat can i eat\b/.test(text) ||
    /\bwhat to eat\b/.test(text) ||
    /\bmeal\b/.test(text) ||
    /\bdinner\b/.test(text) ||
    /\blunch\b/.test(text) ||
    /\bbreakfast\b/.test(text) ||
    /\bsnack\b/.test(text) ||
    /\bfood\b/.test(text) ||
    /\beat\b/.test(text) ||
    /\brecipe\b/.test(text) ||
    /\bchicken\b/.test(text) ||
    /\beggs?\b/.test(text) ||
    /\bpaneer\b/.test(text) ||
    /\bvegetarian\b/.test(text) ||
    /\bvegan\b/.test(text)
  ) {
    return "meal";
  }

  /* ---------------------------------------------------------------------- */
  /* Nutrition                                                              */
  /* ---------------------------------------------------------------------- */

  if (
    /\bcalorie\b/.test(text) ||
    /\bcalories\b/.test(text) ||
    /\bprotein\b/.test(text) ||
    /\bcarbs?\b/.test(text) ||
    /\bcarbohydrate\b/.test(text) ||
    /\bfat\b/.test(text) ||
    /\bfiber\b/.test(text) ||
    /\bmacro\b/.test(text) ||
    /\bmacros\b/.test(text) ||
    /\bnutrition\b/.test(text) ||
    /\bnutrient\b/.test(text) ||
    /\bvitamin\b/.test(text) ||
    /\bmineral\b/.test(text) ||
    /\bhealthy diet\b/.test(text)
  ) {
    return "nutrition";
  }

  /* ---------------------------------------------------------------------- */
  /* Weight                                                                 */
  /* ---------------------------------------------------------------------- */

  if (
    /\bweight\b/.test(text) ||
    /\blose weight\b/.test(text) ||
    /\bweight loss\b/.test(text) ||
    /\bgain weight\b/.test(text) ||
    /\bweight gain\b/.test(text) ||
    /\blose fat\b/.test(text) ||
    /\bbody fat\b/.test(text) ||
    /\bcutting\b/.test(text) ||
    /\bbulking\b/.test(text)
  ) {
    return "weight";
  }

  /* ---------------------------------------------------------------------- */
  /* Fitness                                                                */
  /* ---------------------------------------------------------------------- */

  if (
    /\bworkout\b/.test(text) ||
    /\bexercise\b/.test(text) ||
    /\bgym\b/.test(text) ||
    /\btraining\b/.test(text) ||
    /\brunning\b/.test(text) ||
    /\bwalking\b/.test(text) ||
    /\bcardio\b/.test(text) ||
    /\bstrength\b/.test(text) ||
    /\blifting\b/.test(text) ||
    /\bmuscle\b/.test(text) ||
    /\bfitness\b/.test(text) ||
    /\bwork out\b/.test(text)
  ) {
    return "fitness";
  }

  /* ---------------------------------------------------------------------- */
  /* Progress / NutriTrack records                                         */
  /* ---------------------------------------------------------------------- */

  if (
    /\btoday\b/.test(text) ||
    /\bthis month\b/.test(text) ||
    /\bprogress\b/.test(text) ||
    /\bmy meals\b/.test(text) ||
    /\bwhat did i eat\b/.test(text) ||
    /\bhow much did i eat\b/.test(text) ||
    /\bmy calories\b/.test(text) ||
    /\bmy protein\b/.test(text) ||
    /\bmy fiber\b/.test(text) ||
    /\bmy weight history\b/.test(text) ||
    /\bmy activity\b/.test(text) ||
    /\bmy workout\b/.test(text) ||
    /\bhow am i doing\b/.test(text)
  ) {
    return "progress";
  }

  /* ---------------------------------------------------------------------- */
  /* General health                                                         */
  /* ---------------------------------------------------------------------- */

  if (
    /\bhealth\b/.test(text) ||
    /\bsymptom\b/.test(text) ||
    /\bsymptoms\b/.test(text) ||
    /\bpain\b/.test(text) ||
    /\btired\b/.test(text) ||
    /\bfatigue\b/.test(text) ||
    /\bsleep\b/.test(text) ||
    /\bstress\b/.test(text) ||
    /\bhydration\b/.test(text) ||
    /\bdehydration\b/.test(text) ||
    /\bblood pressure\b/.test(text) ||
    /\bcholesterol\b/.test(text) ||
    /\bdiabetes\b/.test(text) ||
    /\bdigestion\b/.test(text) ||
    /\bconstipation\b/.test(text) ||
    /\bheadache\b/.test(text) ||
    /\bwellness\b/.test(text)
  ) {
    return "health";
  }

  /* ---------------------------------------------------------------------- */
  /* Default                                                                */
  /* ---------------------------------------------------------------------- */

  return "general_nutrition";
}

/* -------------------------------------------------------------------------- */
/* Out-of-scope response                                                     */
/* -------------------------------------------------------------------------- */

function getOutOfScopeResponse(): string {
  return `I'm **NutriTrack Coach**, so I can help with:

- 🍎 Nutrition and food
- 🥗 Meal planning
- 🔥 Calories and macros
- 💪 Protein and fiber
- 🏃 Exercise and workouts
- ⚖️ Weight loss, gain, or maintenance
- ❤️ General health and wellness
- 📊 Your NutriTrack progress
- 🍽️ Nearby restaurant options

I can't help with programming, coding, or unrelated topics.

Try asking me something like:

- "What should I eat for dinner?"
- "How much protein do I need?"
- "Is eating eggs every day healthy?"
- "Why am I tired after my workout?"
- "How many calories have I eaten today?"
- "Find a healthy restaurant near me"`;
}

/* -------------------------------------------------------------------------- */
/* System prompt                                                              */
/* -------------------------------------------------------------------------- */

function buildSystemPrompt(
  context: unknown,
  intent: CoachIntent
): string {
  return `
You are **NutriTrack Coach**, a personalized AI nutrition, fitness, and wellness assistant.

Your job is NOT to be a general-purpose chatbot.

Your supported areas are:

- Nutrition
- Food
- Meals
- Calories
- Protein
- Carbohydrates
- Fat
- Fiber
- Weight loss
- Weight gain
- Weight maintenance
- Exercise
- Fitness
- Workouts
- Recovery
- General health and wellness
- Nearby restaurant and food options
- The user's NutriTrack data

Current detected intent:
${intent}

==================================================
STRICT SCOPE
==================================================

Only answer questions related to NutriTrack's purpose.

Do NOT answer questions about:

- Programming
- Java
- Python
- JavaScript
- TypeScript
- React
- Next.js
- Node.js
- HTML/CSS
- Git/GitHub
- Databases
- Software development
- Technology troubleshooting
- Gaming
- Politics
- Unrelated school/homework questions
- Other unrelated topics

If the question is unrelated, politely redirect the user to nutrition, fitness, meals, weight management, or health.

Do not provide code for unrelated programming questions.

==================================================
USER DATA
==================================================

The following is the user's real NutriTrack data.

Use this data when answering personalized questions.

IMPORTANT:

- Never invent meals.
- Never invent calories.
- Never invent protein.
- Never invent activities.
- Never invent weight records.
- Never invent nutrition targets.
- Never claim the user ate something unless it exists in the supplied data.
- If today's meals are empty, say that no meals have been logged today.
- If today's activities are empty, say that no activities have been logged today.
- If a value is unavailable, say that it is unavailable.
- Do not silently create fake database records.

USER CONTEXT:

${JSON.stringify(context, null, 2)}

==================================================
NUTRITION RECOMMENDATIONS
==================================================

When recommending food:

1. Consider the user's goal.
2. Consider their daily calorie target.
3. Consider calories already consumed.
4. Consider calories remaining.
5. Consider protein consumed and remaining.
6. Consider carbohydrates and fat.
7. Consider fiber.
8. Consider today's meals.
9. Consider today's activities.
10. Give realistic serving sizes.

When giving nutrition numbers for food that has not been logged:

Clearly label them as:

"Estimated"

Do not present estimates as database records.

Example:

Estimated nutrition:
- Calories: ~600 kcal
- Protein: ~50 g
- Carbs: ~55 g
- Fat: ~18 g
- Fiber: ~8 g

==================================================
PERSONALIZATION
==================================================

If the user asks:

"What should I eat for dinner?"

Use today's actual NutriTrack records and nutrition targets.

If no meals have been logged today, say that clearly.

Then recommend a dinner based on their profile and target.

If they have already eaten today, calculate the recommendation around their remaining nutrition.

If the user asks:

"How much protein do I have left?"

Use the actual target minus today's actual intake.

If the user asks:

"How am I doing this month?"

Use the current month's actual records supplied in the context.

Consider:

- Meals
- Calories
- Protein
- Carbohydrates
- Fat
- Fiber
- Activities
- Exercise calories
- Weight history
- Nutrition targets

Do not invent missing monthly data.

==================================================
HEALTH QUESTIONS
==================================================

General health and wellness questions ARE allowed.

Examples:

- "Why am I tired after exercising?"
- "Is eating eggs every day healthy?"
- "How much water should I drink?"
- "Why am I hungry at night?"
- "What foods are high in fiber?"
- "Why am I not losing weight?"

However:

- Do not diagnose medical conditions.
- Do not claim certainty about symptoms.
- Do not prescribe prescription medication.
- For serious symptoms or potentially dangerous situations, recommend appropriate professional medical care.
- If symptoms could represent an emergency, advise the user to seek urgent medical attention.

==================================================
RESTAURANTS
==================================================

Nearby restaurant results are searched separately by the NutriTrack application.

If restaurant results are supplied:

- Only use the supplied restaurant results.
- Never invent restaurant names.
- Never invent addresses.
- Never invent distances.
- Never invent ratings.
- Never invent opening hours.
- Never invent prices.
- Never invent menu items.
- Never claim a restaurant is healthy unless reliable menu/nutrition information supports that claim.

The application may provide nearby restaurants from OpenStreetMap data.

The "Get Directions" button opens Google Maps.

Do not invent restaurant information.

If no restaurant results are supplied, explain that nearby restaurant data is unavailable.

==================================================
RESPONSE STYLE
==================================================

Be conversational, helpful, and concise.

Do not start every answer with:

"As an AI..."

Use Markdown.

Use headings when useful.

Use bullet points for recommendations.

For meal recommendations, show:

### Recommended Meal

Meal description

**Estimated nutrition**
- Calories
- Protein
- Carbs
- Fat
- Fiber

Then briefly explain why it fits the user's goal.

Avoid unnecessarily repeating the user's entire profile.

If the question is simple, answer directly.

==================================================
IMPORTANT
==================================================

You are NutriTrack Coach.

Your purpose is to help the user make better decisions about:

food + nutrition + fitness + weight + health + wellness.

Do not become a general chatbot.
`;
}

/* -------------------------------------------------------------------------- */
/* POST                                                                       */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  try {
    /* ---------------------------------------------------------------------- */
    /* 1. Authentication                                                      */
    /* ---------------------------------------------------------------------- */

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "Please log in to use NutriTrack Coach.",
        },
        { status: 401 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 2. Read request                                                        */
    /* ---------------------------------------------------------------------- */

    const body = (await request.json()) as CoachRequest;

    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a message.",
        },
        { status: 400 }
      );
    }

    const latitude =
      typeof body.latitude === "number"
        ? body.latitude
        : undefined;

    const longitude =
      typeof body.longitude === "number"
        ? body.longitude
        : undefined;

    /* ---------------------------------------------------------------------- */
    /* 3. Detect intent                                                       */
    /* ---------------------------------------------------------------------- */

    const intent = detectIntent(message);

    console.log(
      "[NutriTrack Coach] Intent:",
      intent
    );

    console.log(
      "[NutriTrack Coach] Message:",
      message
    );

    /* ---------------------------------------------------------------------- */
    /* 4. Reject obvious unrelated questions                                  */
    /* ---------------------------------------------------------------------- */

    if (intent === "unrelated") {
      return NextResponse.json({
        success: true,
        reply: getOutOfScopeResponse(),
        intent: "unrelated",
        restaurants: [],
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 5. Restaurant search                                                   */
    /*                                                                        */
    /* Restaurant requests do NOT go through Gemini.                         */
    /* The app finds real nearby places and returns them directly.            */
    /* ---------------------------------------------------------------------- */

    if (intent === "restaurant") {
      if (
        typeof latitude !== "number" ||
        typeof longitude !== "number" ||
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        return NextResponse.json({
          success: true,
          reply:
            "I need your location to find nearby restaurants. Please allow location access in your browser and try again.",
          intent: "restaurant",
          restaurants: [],
        });
      }

      console.log(
        "[NutriTrack Coach] Restaurant location:",
        {
          latitude,
          longitude,
        }
      );

      try {
        const restaurants =
          await searchRestaurants(
            latitude,
            longitude
          );

        console.log(
          "[NutriTrack Coach] Restaurants found:",
          restaurants.length
        );

        if (restaurants.length === 0) {
          return NextResponse.json({
            success: true,
            reply:
              "I couldn't find nearby restaurants at your current location. Try again from a different location.",
            intent: "restaurant",
            restaurants: [],
          });
        }

        return NextResponse.json({
          success: true,
          reply:
            "Here are some nearby restaurant options. You can open Google Maps for directions to any of them.",
          intent: "restaurant",
          restaurants,
        });
      } catch (error) {
        console.error(
          "[NutriTrack Coach] Restaurant search error:",
          error
        );

        return NextResponse.json({
          success: true,
          reply:
            "I couldn't search for nearby restaurants right now. Please try again in a moment.",
          intent: "restaurant",
          restaurants: [],
        });
      }
    }

    /* ---------------------------------------------------------------------- */
    /* 6. Get fresh NutriTrack data                                           */
    /* ---------------------------------------------------------------------- */

    const coachContextResult =
      await getCoachContext();

    if (!coachContextResult.authenticated) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your session has expired. Please log in again.",
        },
        { status: 401 }
      );
    }

    const context =
      coachContextResult.context;

    /* ---------------------------------------------------------------------- */
    /* 7. Gemini API key                                                      */
    /* ---------------------------------------------------------------------- */

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error(
        "[NutriTrack Coach] GEMINI_API_KEY is missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "AI Coach is not configured correctly. GEMINI_API_KEY is missing.",
        },
        { status: 500 }
      );
    }

    const model =
      process.env.GEMINI_MODEL ||
      "gemini-2.5-flash";

    /* ---------------------------------------------------------------------- */
    /* 8. System prompt                                                       */
    /* ---------------------------------------------------------------------- */

    const systemPrompt =
      buildSystemPrompt(
        context,
        intent
      );

    /* ---------------------------------------------------------------------- */
    /* 9. Conversation history                                                */
    /* ---------------------------------------------------------------------- */

    const previousMessages =
      Array.isArray(
        body.conversation
      )
        ? body.conversation.slice(-10)
        : [];

    const contents = [
      ...previousMessages.map(
        (item) => ({
          role:
            item.role === "assistant"
              ? "model"
              : "user",

          parts: [
            {
              text: item.content,
            },
          ],
        })
      ),

      {
        role: "user",

        parts: [
          {
            text: message,
          },
        ],
      },
    ];

    /* ---------------------------------------------------------------------- */
    /* 10. Call Gemini                                                        */
    /* ---------------------------------------------------------------------- */

    const geminiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `${model}:generateContent?key=${apiKey}`;

    const geminiResponse =
      await fetch(geminiUrl, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },

          contents,

          generationConfig: {
            temperature: 0.65,
            topP: 0.9,
            maxOutputTokens: 1200,
          },
        }),

        cache: "no-store",
      });

    /* ---------------------------------------------------------------------- */
    /* 11. Gemini errors                                                      */
    /* ---------------------------------------------------------------------- */

    if (!geminiResponse.ok) {
      const errorText =
        await geminiResponse.text();

      console.error(
        "[NutriTrack Coach] Gemini error:",
        geminiResponse.status,
        errorText
      );

      if (
        geminiResponse.status === 429
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "NutriTrack Coach is temporarily unavailable because the AI service rate limit has been reached. Please try again later.",
          },
          { status: 429 }
        );
      }

      if (
        geminiResponse.status === 401 ||
        geminiResponse.status === 403
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "NutriTrack Coach could not authenticate with the AI service. Please check the Gemini API configuration.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error:
            "NutriTrack Coach could not process your request right now.",
        },
        { status: 502 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 12. Parse Gemini response                                              */
    /* ---------------------------------------------------------------------- */

    const result =
      await geminiResponse.json();

    const reply =
      result?.candidates?.[0]?.content?.parts
        ?.map(
          (part: {
            text?: string;
          }) => part.text || ""
        )
        .join("")
        .trim();

    if (!reply) {
      console.error(
        "[NutriTrack Coach] Empty Gemini response:",
        JSON.stringify(result)
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "NutriTrack Coach returned an empty response. Please try again.",
        },
        { status: 502 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 13. Return response                                                    */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json({
      success: true,
      reply,
      intent,
      restaurants: [],
    });
  } catch (error) {
    console.error(
      "[NutriTrack Coach] Unexpected error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while contacting NutriTrack Coach. Please try again.",
      },
      { status: 500 }
    );
  }
}