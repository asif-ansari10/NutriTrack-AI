// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// import { createClient } from "@/lib/supabase/server";

// export interface ActionState {
//   success: boolean;
//   error: string;
// }

// /* ============================================================
//    GET AUTHENTICATED USER
// ============================================================ */

// async function getAuthenticatedUser() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   return {
//     supabase,
//     user,
//   };
// }

// /* ============================================================
//    TODAY - INDIA
// ============================================================ */

// function getTodayIndia() {
//   return new Intl.DateTimeFormat("en-CA", {
//     timeZone: "Asia/Kolkata",
//   }).format(new Date());
// }

// /* ============================================================
//    NORMALIZE FORMDATA
// ============================================================ */

// function getFormData(
//   first: FormData | ActionState,
//   second?: FormData
// ): FormData | null {
//   if (second instanceof FormData) {
//     return second;
//   }

//   if (first instanceof FormData) {
//     return first;
//   }

//   return null;
// }

// /* ============================================================
//    ADD MEAL
//    Used by AddMealModal
// ============================================================ */

// export async function addMeal(
//   first: FormData | ActionState,
//   second?: FormData
// ): Promise<ActionState> {
//   const formData = getFormData(first, second);

//   if (!formData) {
//     return {
//       success: false,
//       error: "Invalid form submission.",
//     };
//   }

//   const { supabase, user } =
//     await getAuthenticatedUser();

//   const mealType = String(
//     formData.get("meal_type") ?? ""
//   ).trim();

//   const name = String(
//     formData.get("name") ?? ""
//   ).trim();

//   const description = String(
//     formData.get("description") ?? ""
//   ).trim();

//   const calories = Number(
//     formData.get("calories") ?? 0
//   );

//   const protein = Number(
//     formData.get("protein_g") ?? 0
//   );

//   const carbs = Number(
//     formData.get("carbs_g") ?? 0
//   );

//   const fat = Number(
//     formData.get("fat_g") ?? 0
//   );

//   const fiber = Number(
//   formData.get("fiber_g") ?? 0
// );

// const validMealTypes = [
//   "breakfast",
//   "lunch",
//   "snack",
//   "dinner",
//   "before_workout",
//   "after_workout",
// ];
//   /* ---------------- Validation ---------------- */

//   if (!validMealTypes.includes(mealType)) {
//     return {
//       success: false,
//       error: "Please select a valid meal type.",
//     };
//   }

//   if (!name) {
//     return {
//       success: false,
//       error: "Please enter the meal name.",
//     };
//   }

//   if (
//     !Number.isFinite(calories) ||
//     !Number.isFinite(protein) ||
//     !Number.isFinite(carbs) ||
//     !Number.isFinite(fat) ||
//     !Number.isFinite(fiber)
//   ) {
//     return {
//       success: false,
//       error: "Please enter valid nutrition values.",
//     };
//   }

//   if (
//     calories < 0 ||
//     protein < 0 ||
//     carbs < 0 ||
//     fat < 0 ||
//     fiber < 0
//   ) {
//     return {
//       success: false,
//       error: "Nutrition values cannot be negative.",
//     };
//   }

//   /* ---------------- Insert ---------------- */

//  const { error } = await supabase
//   .from("meals")
//   .insert({
//     user_id: user.id,

//     meal_date: getTodayIndia(),

//     meal_type: mealType,

//     name,

//     description:
//       description || null,

//     calories:
//       Math.round(calories),

//     protein_g: protein,

//     carbs_g: carbs,

//     fat_g: fat,

//     fiber_g: fiber,

//     ai_analyzed: false,
//   });

//   if (error) {
//     console.error(
//       "ADD MEAL SUPABASE ERROR:",
//       error
//     );

//     return {
//       success: false,
//       error:
//         error.message ||
//         "Unable to add meal.",
//     };
//   }

//   revalidatePath("/diary");
//   revalidatePath("/");

//   return {
//     success: true,
//     error: "",
//   };
// }

// /* ============================================================
//    ADD MEAL - NORMAL FORM WRAPPER
//    Used by /diary/add-meal/page.tsx
// ============================================================ */

// export async function addMealForm(
//   formData: FormData
// ): Promise<void> {
//   const result =
//     await addMeal(formData);

//   if (!result.success) {
//     throw new Error(
//       result.error ||
//         "Unable to add meal."
//     );
//   }
// }

// /* ============================================================
//    DELETE MEAL
// ============================================================ */

// export async function deleteMeal(
//   formData: FormData
// ): Promise<void> {
//   const {
//     supabase,
//     user,
//   } = await getAuthenticatedUser();

//   const id = String(
//     formData.get("id") ?? ""
//   );

//   if (!id) {
//     return;
//   }

//   const { error } =
//     await supabase
//       .from("meals")
//       .delete()
//       .eq("id", id)
//       .eq("user_id", user.id);

//   if (error) {
//     console.error(
//       "DELETE MEAL ERROR:",
//       error
//     );

//     return;
//   }

//   revalidatePath("/diary");
//   revalidatePath("/");
// }

// /* ============================================================
//    ADD ACTIVITY
//    Used by AddActivityModal
// ============================================================ */

// export async function addActivity(
//   first: FormData | ActionState,
//   second?: FormData
// ): Promise<ActionState> {
//   const formData = getFormData(
//     first,
//     second
//   );

//   if (!formData) {
//     return {
//       success: false,
//       error: "Invalid form submission.",
//     };
//   }

//   const {
//     supabase,
//     user,
//   } = await getAuthenticatedUser();

//   const activityType = String(
//     formData.get(
//       "activity_type"
//     ) ?? ""
//   ).trim();

//   const activityName = String(
//     formData.get(
//       "activity_name"
//     ) ?? ""
//   ).trim();

//   const duration = Number(
//     formData.get(
//       "duration_minutes"
//     ) ?? 0
//   );

//   const caloriesBurned = Number(
//     formData.get(
//       "calories_burned"
//     ) ?? 0
//   );

//   const note = String(
//     formData.get("note") ?? ""
//   ).trim();

//   /* ---------------- Validation ---------------- */

//   if (!activityName) {
//     return {
//       success: false,
//       error:
//         "Please enter an activity name.",
//     };
//   }

//   if (
//     !Number.isFinite(duration) ||
//     duration <= 0
//   ) {
//     return {
//       success: false,
//       error:
//         "Please enter a valid duration.",
//     };
//   }

//   if (
//     !Number.isFinite(
//       caloriesBurned
//     ) ||
//     caloriesBurned < 0
//   ) {
//     return {
//       success: false,
//       error:
//         "Please enter valid calories burned.",
//     };
//   }

//   /* ---------------- Insert ---------------- */

//   const { error } =
//     await supabase
//       .from("activities")
//       .insert({
//         user_id: user.id,

//         activity_date:
//           getTodayIndia(),

//         activity_type:
//           activityType || "other",

//         activity_name:
//           activityName,

//         duration_minutes:
//           Math.round(duration),

//         calories_burned:
//           Math.round(
//             caloriesBurned
//           ),

//         note:
//           note || null,
//       });

//   if (error) {
//     console.error(
//       "ADD ACTIVITY SUPABASE ERROR:",
//       error
//     );

//     return {
//       success: false,
//       error:
//         error.message ||
//         "Unable to add activity.",
//     };
//   }

//   revalidatePath("/diary");
//   revalidatePath("/");

//   return {
//     success: true,
//     error: "",
//   };
// }

// /* ============================================================
//    ADD ACTIVITY - NORMAL FORM WRAPPER
//    Used by /diary/add-activity/page.tsx
// ============================================================ */

// export async function addActivityForm(
//   formData: FormData
// ): Promise<void> {
//   const result =
//     await addActivity(formData);

//   if (!result.success) {
//     throw new Error(
//       result.error ||
//         "Unable to add activity."
//     );
//   }
// }

// /* ============================================================
//    DELETE ACTIVITY
// ============================================================ */

// export async function deleteActivity(
//   formData: FormData
// ): Promise<void> {
//   const {
//     supabase,
//     user,
//   } = await getAuthenticatedUser();

//   const id = String(
//     formData.get("id") ?? ""
//   );

//   if (!id) {
//     return;
//   }

//   const { error } =
//     await supabase
//       .from("activities")
//       .delete()
//       .eq("id", id)
//       .eq("user_id", user.id);

//   if (error) {
//     console.error(
//       "DELETE ACTIVITY ERROR:",
//       error
//     );

//     return;
//   }

//   revalidatePath("/diary");
//   revalidatePath("/");
// }

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface ActionState {
  success: boolean;
  error: string;
}

const VALID_MEAL_TYPES = [
  "breakfast",
  "lunch",
  "before_workout",
  "snack",
  "after_workout",
  "dinner",
] as const;

function getFormData(
  first: FormData | ActionState,
  second?: FormData
): FormData | null {
  if (second instanceof FormData) return second;
  if (first instanceof FormData) return first;
  return null;
}

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return { supabase, user };
}

function getTodayIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function numberFromForm(formData: FormData, name: string) {
  const value = Number(formData.get(name) ?? 0);
  return Number.isFinite(value) ? value : NaN;
}

/* ============================================================
   ADD MEAL
============================================================ */

export async function addMeal(
  first: FormData | ActionState,
  second?: FormData
): Promise<ActionState> {
  const formData = getFormData(first, second);

  if (!formData) {
    return {
      success: false,
      error: "Invalid form submission.",
    };
  }

  const { supabase, user } = await getAuthenticatedUser();

  const mealType = String(
    formData.get("meal_type") ?? ""
  ).trim();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  const description = String(
    formData.get("description") ?? ""
  ).trim();

  const requestedDate = String(
    formData.get("meal_date") ?? ""
  ).trim();

  const mealDate =
    requestedDate && isValidDate(requestedDate)
      ? requestedDate
      : getTodayIndia();

  const calories = numberFromForm(formData, "calories");
  const protein = numberFromForm(formData, "protein_g");
  const carbs = numberFromForm(formData, "carbs_g");
  const fat = numberFromForm(formData, "fat_g");
  const fiber = numberFromForm(formData, "fiber_g");

  if (!VALID_MEAL_TYPES.includes(mealType as (typeof VALID_MEAL_TYPES)[number])) {
    return {
      success: false,
      error: "Please select a valid meal type.",
    };
  }

  if (!name) {
    return {
      success: false,
      error: "Please enter the meal name.",
    };
  }

  if (
    !Number.isFinite(calories) ||
    !Number.isFinite(protein) ||
    !Number.isFinite(carbs) ||
    !Number.isFinite(fat) ||
    !Number.isFinite(fiber)
  ) {
    return {
      success: false,
      error: "Please enter valid nutrition values.",
    };
  }

  if (
    calories < 0 ||
    protein < 0 ||
    carbs < 0 ||
    fat < 0 ||
    fiber < 0
  ) {
    return {
      success: false,
      error: "Nutrition values cannot be negative.",
    };
  }

  const { error } = await supabase.from("meals").insert({
    user_id: user.id,
    meal_date: mealDate,
    meal_type: mealType,
    name,
    description: description || null,
    calories: Math.round(calories),
    protein_g: Number(protein.toFixed(1)),
    carbs_g: Number(carbs.toFixed(1)),
    fat_g: Number(fat.toFixed(1)),
    fiber_g: Number(fiber.toFixed(1)),
    ai_analyzed: false,
  });

  if (error) {
    console.error("ADD MEAL SUPABASE ERROR:", error);

    return {
      success: false,
      error: error.message || "Unable to add meal.",
    };
  }

  revalidatePath("/diary");
  revalidatePath("/");

  return {
    success: true,
    error: "",
  };
}

export async function addMealForm(
  formData: FormData
): Promise<void> {
  const result = await addMeal(formData);

  if (!result.success) {
    throw new Error(result.error || "Unable to add meal.");
  }
}

/* ============================================================
   DELETE MEAL
============================================================ */

export async function deleteMeal(
  formData: FormData
): Promise<void> {
  const { supabase, user } = await getAuthenticatedUser();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) return;

  const { error } = await supabase
    .from("meals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("DELETE MEAL ERROR:", error);
    return;
  }

  revalidatePath("/diary");
  revalidatePath("/");
}

/* ============================================================
   ADD ACTIVITY
============================================================ */

export async function addActivity(
  first: FormData | ActionState,
  second?: FormData
): Promise<ActionState> {
  const formData = getFormData(first, second);

  if (!formData) {
    return {
      success: false,
      error: "Invalid form submission.",
    };
  }

  const { supabase, user } = await getAuthenticatedUser();

  const activityType = String(
    formData.get("activity_type") ?? ""
  ).trim();

  const activityName = String(
    formData.get("activity_name") ?? ""
  ).trim();

  const requestedDate = String(
    formData.get("activity_date") ?? ""
  ).trim();

  const activityDate =
    requestedDate && isValidDate(requestedDate)
      ? requestedDate
      : getTodayIndia();

  const duration = numberFromForm(
    formData,
    "duration_minutes"
  );

  const caloriesBurned = numberFromForm(
    formData,
    "calories_burned"
  );

  const note = String(
    formData.get("note") ?? ""
  ).trim();

  if (!activityName) {
    return {
      success: false,
      error: "Please enter an activity name.",
    };
  }

  if (!Number.isFinite(duration) || duration <= 0) {
    return {
      success: false,
      error: "Please enter a valid duration.",
    };
  }

  if (
    !Number.isFinite(caloriesBurned) ||
    caloriesBurned < 0
  ) {
    return {
      success: false,
      error: "Please enter valid calories burned.",
    };
  }

  const { error } = await supabase.from("activities").insert({
    user_id: user.id,
    activity_date: activityDate,
    activity_type: activityType || "other",
    activity_name: activityName,
    duration_minutes: Math.round(duration),
    calories_burned: Math.round(caloriesBurned),
    note: note || null,
  });

  if (error) {
    console.error("ADD ACTIVITY SUPABASE ERROR:", error);

    return {
      success: false,
      error: error.message || "Unable to add activity.",
    };
  }

  revalidatePath("/diary");
  revalidatePath("/");

  return {
    success: true,
    error: "",
  };
}

export async function addActivityForm(
  formData: FormData
): Promise<void> {
  const result = await addActivity(formData);

  if (!result.success) {
    throw new Error(
      result.error || "Unable to add activity."
    );
  }
}

/* ============================================================
   DELETE ACTIVITY
============================================================ */

export async function deleteActivity(
  formData: FormData
): Promise<void> {
  const { supabase, user } = await getAuthenticatedUser();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) return;

  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("DELETE ACTIVITY ERROR:", error);
    return;
  }

  revalidatePath("/diary");
  revalidatePath("/");
}
