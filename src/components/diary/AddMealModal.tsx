// "use client";

// import {
//   useState,
//   type FormEvent,
// } from "react";

// import {
//   X,
//   Utensils,
//   Loader2,
// } from "lucide-react";

// import { addMeal } from "@/app/diary/actions";

// type MealType =
//   | "breakfast"
//   | "lunch"
//   | "snack"
//   | "dinner";

// interface AddMealModalProps {
//   open: boolean;
//   onClose: () => void;
//   defaultMealType?: MealType;
// }

// export default function AddMealModal({
//   open,
//   onClose,
//   defaultMealType = "breakfast",
// }: AddMealModalProps) {
//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   if (!open) {
//     return null;
//   }

//   async function handleSubmit(
//     event: FormEvent<HTMLFormElement>
//   ) {
//     event.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       const formData =
//         new FormData(
//           event.currentTarget
//         );

//       const result =
//         await addMeal(formData);

//       if (!result.success) {
//         setError(
//           result.error ||
//             "Unable to add meal."
//         );

//         return;
//       }

//       event.currentTarget.reset();

//       onClose();
//     } catch (err) {
//       console.error(
//         "Add meal error:",
//         err
//       );

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong while adding the meal."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div
//       className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
//       onMouseDown={(event) => {
//         if (
//           event.target ===
//           event.currentTarget
//         ) {
//           onClose();
//         }
//       }}
//     >
//       <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-[#e5e9e8] px-5 py-4 sm:px-6">

//           <div className="flex items-center gap-3">

//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dff8f5] text-[#004e47]">
//               <Utensils size={20} />
//             </div>

//             <div>
//               <h2 className="text-lg font-bold text-[#191c1d]">
//                 Add Meal
//               </h2>

//               <p className="text-xs text-[#64706d]">
//                 Add your meal and nutrition details.
//               </p>
//             </div>

//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#56615f] transition hover:bg-[#f1f4f3] hover:text-[#191c1d]"
//             aria-label="Close"
//           >
//             <X size={20} />
//           </button>

//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5 p-5 sm:p-6"
//         >

//           {/* Error */}
//           {error && (
//             <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//               {error}
//             </div>
//           )}

//           {/* Meal Type */}
//           <div>
//             <label
//               htmlFor="modal-meal-type"
//               className="mb-2 block text-sm font-medium text-[#191c1d]"
//             >
//               Meal Type
//             </label>

//             <select
//               id="modal-meal-type"
//               name="meal_type"
//               defaultValue={
//                 defaultMealType
//               }
//               required
//               className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 outline-none transition focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//             >
//               <option value="breakfast">
//                 Breakfast
//               </option>

//               <option value="lunch">
//                 Lunch
//               </option>

//               <option value="snack">
//                 Snack
//               </option>

//               <option value="dinner">
//                 Dinner
//               </option>
//             </select>
//           </div>

//           {/* Meal Name */}
//           <div>
//             <label
//               htmlFor="modal-meal-name"
//               className="mb-2 block text-sm font-medium text-[#191c1d]"
//             >
//               Meal Name
//             </label>

//             <input
//               id="modal-meal-name"
//               name="name"
//               type="text"
//               required
//               placeholder="Chicken Biryani"
//               className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 outline-none transition placeholder:text-gray-400 focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label
//               htmlFor="modal-meal-description"
//               className="mb-2 block text-sm font-medium text-[#191c1d]"
//             >
//               Description
//             </label>

//             <textarea
//               id="modal-meal-description"
//               name="description"
//               rows={3}
//               placeholder="Optional description..."
//               className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//             />
//           </div>

//           {/* Nutrition */}
//           <div>
//             <label className="mb-3 block text-sm font-medium text-[#191c1d]">
//               Nutrition
//             </label>

//             <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

//               {/* Calories */}
//               <NutritionInput
//                 label="Calories"
//                 name="calories"
//                 suffix="kcal"
//                 step="1"
//               />

//               {/* Protein */}
//               <NutritionInput
//                 label="Protein"
//                 name="protein_g"
//                 suffix="g"
//                 step="0.1"
//               />

//               {/* Carbs */}
//               <NutritionInput
//                 label="Carbs"
//                 name="carbs_g"
//                 suffix="g"
//                 step="0.1"
//               />

//               {/* Fat */}
//               <NutritionInput
//                 label="Fat"
//                 name="fat_g"
//                 suffix="g"
//                 step="0.1"
//               />

//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">

//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="min-h-12 flex-1 cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-5 font-semibold text-[#34403d] transition hover:bg-[#f5f7f6] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="min-h-12 flex-1 cursor-pointer rounded-xl bg-[#004e47] px-5 font-semibold text-white transition hover:bg-[#00685f] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <Loader2
//                     size={18}
//                     className="animate-spin"
//                   />
//                   Adding...
//                 </span>
//               ) : (
//                 "Add Meal"
//               )}
//             </button>

//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    NUTRITION INPUT
// ============================================================ */

// function NutritionInput({
//   label,
//   name,
//   suffix,
//   step,
// }: {
//   label: string;
//   name: string;
//   suffix: string;
//   step: string;
// }) {
//   return (
//     <div>
//       <label
//         htmlFor={`nutrition-${name}`}
//         className="mb-2 block text-xs font-medium text-[#46514f]"
//       >
//         {label}
//       </label>

//       <div className="relative">
//         <input
//           id={`nutrition-${name}`}
//           type="number"
//           name={name}
//           min="0"
//           step={step}
//           defaultValue="0"
//           className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 pr-10 outline-none transition focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//         />

//         <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
//           {suffix}
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import {
  X,
  Utensils,
} from "lucide-react";

import {
  addMeal,
  type ActionState,
} from "@/app/diary/actions";

interface AddMealModalProps {
  open: boolean;
  onClose: () => void;
  defaultMealType?:
    | "breakfast"
    | "lunch"
    | "snack"
    | "dinner";
}

const initialState: ActionState = {
  success: false,
  error: "",
};

export default function AddMealModal({
  open,
  onClose,
  defaultMealType = "breakfast",
}: AddMealModalProps) {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    addMeal,
    initialState
  );

  const [
    mealType,
    setMealType,
  ] = useState<
    "breakfast" | "lunch" | "snack" | "dinner"
  >(defaultMealType);

  /*
   * Update meal type whenever
   * the section changes.
   */
  useEffect(() => {
    setMealType(defaultMealType);
  }, [defaultMealType]);

  /*
   * Successful submission
   *
   * IMPORTANT:
   * We do NOT use formRef.current.reset().
   *
   * The server action already saved the
   * data successfully. We simply close
   * the modal.
   */
  useEffect(() => {
    if (!state.success) {
      return;
    }

    onClose();
  }, [state.success, onClose]);

  /*
   * Don't render anything when closed.
   */
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-5">

      {/* Modal */}
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[22px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#e1e5e4] px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e4f4f2] text-[#004e47]">
              <Utensils size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#191c1d]">
                Add Meal
              </h2>

              <p className="text-sm text-[#687370]">
                Add your meal and nutrition details.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#687370] transition hover:bg-[#f1f4f3] hover:text-[#191c1d] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X size={22} />
          </button>

        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto">

          <form
            action={formAction}
            className="space-y-5 px-5 py-5 sm:px-6 sm:py-6"
          >

            {/* Server error */}
            {state.error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {state.error}
              </div>
            )}

            {/* Meal Type */}
            <div>

              <label
                htmlFor="meal_type"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Meal Type
              </label>

              <select
                id="meal_type"
                name="meal_type"
                value={mealType}
                onChange={(event) =>
                  setMealType(
                    event.target.value as
                      | "breakfast"
                      | "lunch"
                      | "snack"
                      | "dinner"
                  )
                }
                disabled={isPending}
                className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 text-sm text-[#191c1d] outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:cursor-not-allowed disabled:bg-[#f5f6f6]"
              >

                <option value="breakfast">
                  Breakfast
                </option>

                <option value="lunch">
                  Lunch
                </option>

                <option value="snack">
                  Snack
                </option>

                <option value="dinner">
                  Dinner
                </option>

              </select>

            </div>

            {/* Meal Name */}
            <div>

              <label
                htmlFor="meal_name"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Meal Name
              </label>

              <input
                id="meal_name"
                name="name"
                type="text"
                required
                disabled={isPending}
                placeholder="Chicken Biryani"
                className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 text-sm text-[#191c1d] outline-none transition placeholder:text-[#8a9492] focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:cursor-not-allowed disabled:bg-[#f5f6f6]"
              />

            </div>

            {/* Description */}
            <div>

              <label
                htmlFor="meal_description"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Description
              </label>

              <textarea
                id="meal_description"
                name="description"
                rows={3}
                disabled={isPending}
                placeholder="Optional description..."
                className="w-full resize-none rounded-xl border border-[#bec9c6] bg-white px-4 py-3 text-sm text-[#191c1d] outline-none transition placeholder:text-[#8a9492] focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:cursor-not-allowed disabled:bg-[#f5f6f6]"
              />

            </div>

            {/* Nutrition */}
            <div>

              <h3 className="mb-3 text-sm font-semibold text-[#191c1d]">
                Nutrition
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                {/* Calories */}
                <div>

                  <label
                    htmlFor="calories"
                    className="mb-2 block text-xs font-medium text-[#687370]"
                  >
                    Calories
                  </label>

                  <div className="relative">

                    <input
                      id="calories"
                      name="calories"
                      type="number"
                      min="0"
                      step="1"
                      defaultValue="0"
                      disabled={isPending}
                      className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-3 pr-12 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:bg-[#f5f6f6]"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
                      kcal
                    </span>

                  </div>

                </div>

                {/* Protein */}
                <div>

                  <label
                    htmlFor="protein_g"
                    className="mb-2 block text-xs font-medium text-[#687370]"
                  >
                    Protein
                  </label>

                  <div className="relative">

                    <input
                      id="protein_g"
                      name="protein_g"
                      type="number"
                      min="0"
                      step="0.1"
                      defaultValue="0"
                      disabled={isPending}
                      className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-3 pr-8 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:bg-[#f5f6f6]"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
                      g
                    </span>

                  </div>

                </div>

                {/* Carbs */}
                <div>

                  <label
                    htmlFor="carbs_g"
                    className="mb-2 block text-xs font-medium text-[#687370]"
                  >
                    Carbs
                  </label>

                  <div className="relative">

                    <input
                      id="carbs_g"
                      name="carbs_g"
                      type="number"
                      min="0"
                      step="0.1"
                      defaultValue="0"
                      disabled={isPending}
                      className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-3 pr-8 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:bg-[#f5f6f6]"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
                      g
                    </span>

                  </div>

                </div>

                {/* Fat */}
                <div>

                  <label
                    htmlFor="fat_g"
                    className="mb-2 block text-xs font-medium text-[#687370]"
                  >
                    Fat
                  </label>

                  <div className="relative">

                    <input
                      id="fat_g"
                      name="fat_g"
                      type="number"
                      min="0"
                      step="0.1"
                      defaultValue="0"
                      disabled={isPending}
                      className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-3 pr-8 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:bg-[#f5f6f6]"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
                      g
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">

              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="min-h-12 cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-5 text-sm font-semibold text-[#191c1d] transition hover:bg-[#f6f8f7] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="min-h-12 cursor-pointer rounded-xl bg-[#004e47] px-5 text-sm font-semibold text-white transition hover:bg-[#003f3a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending
                  ? "Adding Meal..."
                  : "Add Meal"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}