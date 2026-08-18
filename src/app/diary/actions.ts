// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// import { createClient } from "@/lib/supabase/server";

// export interface ActionState {
//   success: boolean;
//   error: string;
// }

// /*
// |--------------------------------------------------------------------------
// | Get authenticated user
// |--------------------------------------------------------------------------
// */

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

// /*
// |--------------------------------------------------------------------------
// | Get today's date
// |--------------------------------------------------------------------------
// |
// | We always use today's date.
// | Diary does NOT use ?date=...
// |
// */

// function getTodayIndia() {
//   return new Intl.DateTimeFormat("en-CA", {
//     timeZone: "Asia/Kolkata",
//   }).format(new Date());
// }

// /*
// |--------------------------------------------------------------------------
// | Normalize FormData
// |--------------------------------------------------------------------------
// |
// | This supports BOTH:
// |
// | 1. <form action={addMeal}>
// |
// |    addMeal receives:
// |    FormData
// |
// | 2. useActionState(addMeal, initialState)
// |
// |    addMeal receives:
// |    previousState, FormData
// |
// |--------------------------------------------------------------------------
// */

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

// /*
// |--------------------------------------------------------------------------
// | ADD MEAL
// |--------------------------------------------------------------------------
// */

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

//   const {
//     supabase,
//     user,
//   } = await getAuthenticatedUser();

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

//   const validMealTypes = [
//     "breakfast",
//     "lunch",
//     "snack",
//     "dinner",
//   ];

//   /*
//   |--------------------------------------------------------------------------
//   | Validation
//   |--------------------------------------------------------------------------
//   */

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
//     !Number.isFinite(fat)
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
//     fat < 0
//   ) {
//     return {
//       success: false,
//       error: "Nutrition values cannot be negative.",
//     };
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | Insert meal
//   |--------------------------------------------------------------------------
//   |
//   | IMPORTANT:
//   | image_url is intentionally NOT included.
//   |
//   */

//   const {
//     error,
//   } = await supabase
//     .from("meals")
//     .insert({
//       user_id: user.id,
//       meal_date: getTodayIndia(),
//       meal_type: mealType,
//       name,
//       description: description || null,
//       calories: Math.round(calories),
//       protein_g: protein,
//       carbs_g: carbs,
//       fat_g: fat,
//       ai_analyzed: false,
//     });

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

//   /*
//   |--------------------------------------------------------------------------
//   | Refresh diary/dashboard
//   |--------------------------------------------------------------------------
//   */

//   revalidatePath("/diary");
//   revalidatePath("/");

//   return {
//     success: true,
//     error: "",
//   };
// }

// /*
// |--------------------------------------------------------------------------
// | DELETE MEAL
// |--------------------------------------------------------------------------
// */

// export async function deleteMeal(
//   formData: FormData
// ) {
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

//   const {
//     error,
//   } = await supabase
//     .from("meals")
//     .delete()
//     .eq("id", id)
//     .eq("user_id", user.id);

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

// /*
// |--------------------------------------------------------------------------
// | ADD ACTIVITY
// |--------------------------------------------------------------------------
// */

// export async function addActivity(
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

//   const {
//     supabase,
//     user,
//   } = await getAuthenticatedUser();

//   const activityType = String(
//     formData.get("activity_type") ?? ""
//   ).trim();

//   const activityName = String(
//     formData.get("activity_name") ?? ""
//   ).trim();

//   const duration = Number(
//     formData.get("duration_minutes") ?? 0
//   );

//   const caloriesBurned = Number(
//     formData.get("calories_burned") ?? 0
//   );

//   const note = String(
//     formData.get("note") ?? ""
//   ).trim();

//   /*
//   |--------------------------------------------------------------------------
//   | Validation
//   |--------------------------------------------------------------------------
//   */

//   if (!activityName) {
//     return {
//       success: false,
//       error: "Please enter an activity name.",
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
//     !Number.isFinite(caloriesBurned) ||
//     caloriesBurned < 0
//   ) {
//     return {
//       success: false,
//       error:
//         "Please enter valid calories burned.",
//     };
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | Insert activity
//   |--------------------------------------------------------------------------
//   */

//   const {
//     error,
//   } = await supabase
//     .from("activities")
//     .insert({
//       user_id: user.id,
//       activity_date: getTodayIndia(),
//       activity_type:
//         activityType || "other",
//       activity_name:
//         activityName,
//       duration_minutes:
//         Math.round(duration),
//       calories_burned:
//         Math.round(caloriesBurned),
//       note: note || null,
//     });

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

//   /*
//   |--------------------------------------------------------------------------
//   | Refresh
//   |--------------------------------------------------------------------------
//   */

//   revalidatePath("/diary");
//   revalidatePath("/");

//   return {
//     success: true,
//     error: "",
//   };
// }

// /*
// |--------------------------------------------------------------------------
// | DELETE ACTIVITY
// |--------------------------------------------------------------------------
// */

// export async function deleteActivity(
//   formData: FormData
// ) {
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

//   const {
//     error,
//   } = await supabase
//     .from("activities")
//     .delete()
//     .eq("id", id)
//     .eq("user_id", user.id);

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

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface ActionState {
  success: boolean;
  error: string;
}

/*
|--------------------------------------------------------------------------
| Get authenticated user
|--------------------------------------------------------------------------
*/

async function getAuthenticatedUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return {
    supabase,
    user,
  };
}

/*
|--------------------------------------------------------------------------
| Get today's date - India
|--------------------------------------------------------------------------
*/

function getTodayIndia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function getString(
  formData: FormData,
  key: string
): string {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(
  formData: FormData,
  key: string
): number {
  const value = Number(formData.get(key) ?? 0);

  return Number.isFinite(value) ? value : 0;
}

/*
|--------------------------------------------------------------------------
| ADD MEAL
|--------------------------------------------------------------------------
|
| Used directly by:
|
| <form action={addMeal}>
|
| Therefore this action accepts FormData and returns Promise<void>.
|
|--------------------------------------------------------------------------
*/

export async function addMeal(
  formData: FormData
): Promise<void> {
  const {
    supabase,
    user,
  } = await getAuthenticatedUser();

  /*
  |--------------------------------------------------------------------------
  | Read form data
  |--------------------------------------------------------------------------
  */

  const mealType = getString(
    formData,
    "meal_type"
  );

  const name = getString(
    formData,
    "name"
  );

  const description = getString(
    formData,
    "description"
  );

  const calories = getNumber(
    formData,
    "calories"
  );

  const protein = getNumber(
    formData,
    "protein_g"
  );

  const carbs = getNumber(
    formData,
    "carbs_g"
  );

  const fat = getNumber(
    formData,
    "fat_g"
  );

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  const validMealTypes = [
    "breakfast",
    "lunch",
    "snack",
    "dinner",
  ];

  if (!validMealTypes.includes(mealType)) {
    redirect(
      `/diary/add-meal?error=${encodeURIComponent(
        "Please select a valid meal type."
      )}`
    );
  }

  if (!name) {
    redirect(
      `/diary/add-meal?error=${encodeURIComponent(
        "Please enter the meal name."
      )}`
    );
  }

  if (
    calories < 0 ||
    protein < 0 ||
    carbs < 0 ||
    fat < 0
  ) {
    redirect(
      `/diary/add-meal?error=${encodeURIComponent(
        "Nutrition values cannot be negative."
      )}`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Insert meal
  |--------------------------------------------------------------------------
  */

  const { error } = await supabase
    .from("meals")
    .insert({
      user_id: user.id,

      meal_date: getTodayIndia(),

      meal_type: mealType,

      name,

      description:
        description || null,

      calories: Math.round(calories),

      protein_g: protein,

      carbs_g: carbs,

      fat_g: fat,

      ai_analyzed: false,
    });

  /*
  |--------------------------------------------------------------------------
  | Supabase error
  |--------------------------------------------------------------------------
  */

  if (error) {
    console.error(
      "ADD MEAL SUPABASE ERROR:",
      error
    );

    redirect(
      `/diary/add-meal?error=${encodeURIComponent(
        error.message ||
          "Unable to add meal."
      )}`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Refresh pages
  |--------------------------------------------------------------------------
  */

  revalidatePath("/diary");
  revalidatePath("/");
  revalidatePath("/progress");

  /*
  |--------------------------------------------------------------------------
  | Return to diary
  |--------------------------------------------------------------------------
  */

  redirect("/diary");
}

/*
|--------------------------------------------------------------------------
| DELETE MEAL
|--------------------------------------------------------------------------
*/

export async function deleteMeal(
  formData: FormData
): Promise<void> {
  const {
    supabase,
    user,
  } = await getAuthenticatedUser();

  const id = getString(
    formData,
    "id"
  );

  if (!id) {
    return;
  }

  const { error } = await supabase
    .from("meals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "DELETE MEAL ERROR:",
      error
    );

    return;
  }

  revalidatePath("/diary");
  revalidatePath("/");
  revalidatePath("/progress");
}

/*
|--------------------------------------------------------------------------
| ADD ACTIVITY
|--------------------------------------------------------------------------
|
| Used directly by:
|
| <form action={addActivity}>
|
|--------------------------------------------------------------------------
*/

export async function addActivity(
  formData: FormData
): Promise<void> {
  const {
    supabase,
    user,
  } = await getAuthenticatedUser();

  /*
  |--------------------------------------------------------------------------
  | Read form data
  |--------------------------------------------------------------------------
  */

  const activityType = getString(
    formData,
    "activity_type"
  );

  const activityName = getString(
    formData,
    "activity_name"
  );

  const duration = getNumber(
    formData,
    "duration_minutes"
  );

  const caloriesBurned = getNumber(
    formData,
    "calories_burned"
  );

  const note = getString(
    formData,
    "note"
  );

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  if (!activityName) {
    redirect(
      `/diary/add-activity?error=${encodeURIComponent(
        "Please enter an activity name."
      )}`
    );
  }

  if (
    !Number.isFinite(duration) ||
    duration <= 0
  ) {
    redirect(
      `/diary/add-activity?error=${encodeURIComponent(
        "Please enter a valid duration."
      )}`
    );
  }

  if (
    !Number.isFinite(caloriesBurned) ||
    caloriesBurned < 0
  ) {
    redirect(
      `/diary/add-activity?error=${encodeURIComponent(
        "Please enter valid calories burned."
      )}`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Insert activity
  |--------------------------------------------------------------------------
  */

  const { error } = await supabase
    .from("activities")
    .insert({
      user_id: user.id,

      activity_date:
        getTodayIndia(),

      activity_type:
        activityType || "other",

      activity_name:
        activityName,

      duration_minutes:
        Math.round(duration),

      calories_burned:
        Math.round(caloriesBurned),

      note:
        note || null,
    });

  /*
  |--------------------------------------------------------------------------
  | Supabase error
  |--------------------------------------------------------------------------
  */

  if (error) {
    console.error(
      "ADD ACTIVITY SUPABASE ERROR:",
      error
    );

    redirect(
      `/diary/add-activity?error=${encodeURIComponent(
        error.message ||
          "Unable to add activity."
      )}`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Refresh
  |--------------------------------------------------------------------------
  */

  revalidatePath("/diary");
  revalidatePath("/");
  revalidatePath("/progress");

  /*
  |--------------------------------------------------------------------------
  | Return to diary
  |--------------------------------------------------------------------------
  */

  redirect("/diary");
}

/*
|--------------------------------------------------------------------------
| DELETE ACTIVITY
|--------------------------------------------------------------------------
*/

export async function deleteActivity(
  formData: FormData
): Promise<void> {
  const {
    supabase,
    user,
  } = await getAuthenticatedUser();

  const id = getString(
    formData,
    "id"
  );

  if (!id) {
    return;
  }

  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "DELETE ACTIVITY ERROR:",
      error
    );

    return;
  }

  revalidatePath("/diary");
  revalidatePath("/");
  revalidatePath("/progress");
}