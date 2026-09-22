// "use client";

// import { useState } from "react";

// import {
//   Activity,
//   CalendarDays,
//   Flame,
//   Footprints,
//   Plus,
//   Utensils,
// } from "lucide-react";

// import MealSection from "./MealSection";
// import AddMealModal from "./AddMealModal";
// import AddActivityModal from "./AddActivityModal";
// import DeleteConfirmModal from "./DeleteConfirmModal";

// import {
//   deleteMeal,
//   deleteActivity,
// } from "@/app/diary/actions";

// import type {
//   DiaryData,
//   MealType,
// } from "@/lib/diary/getDiaryData";

// interface Props {
//   data: DiaryData;
// }

// /* ============================================================
//    MEAL ORDER
// ============================================================ */

// const MEAL_ORDER: MealType[] = [
//   "before_workout",
//   "after_workout",
//   "breakfast",
//   "lunch",
//   "snack",
//   "dinner",
// ];

// /* ============================================================
//    NUMBER FORMAT
// ============================================================ */

// function formatNumber(value: number) {
//   return Number.isInteger(value)
//     ? String(value)
//     : value.toFixed(1);
// }

// /* ============================================================
//    TODAY
// ============================================================ */

// function formatToday() {
//   return new Intl.DateTimeFormat(
//     "en-IN",
//     {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     }
//   ).format(new Date());
// }

// /* ============================================================
//    DIARY PAGE
// ============================================================ */

// export default function DiaryPage({
//   data,
// }: Props) {
//   /* ==========================================================
//      ADD MEAL
//   ========================================================== */

//   const [
//     addMealType,
//     setAddMealType,
//   ] = useState<MealType | null>(null);

//   /* ==========================================================
//      ADD ACTIVITY
//   ========================================================== */

//   const [
//     showActivityModal,
//     setShowActivityModal,
//   ] = useState(false);

//   /* ==========================================================
//      DELETE MODAL
//   ========================================================== */

//   const [
//     deleteModal,
//     setDeleteModal,
//   ] = useState<{
//     type: "meal" | "activity";
//     id: string;
//     name: string;
//   } | null>(null);

//   const [
//     deleting,
//     setDeleting,
//   ] = useState(false);

//   /* ==========================================================
//      DATA
//   ========================================================== */

//   const {
//     totals,
//     mealGroups,
//     activities,
//   } = data;

//   /* ==========================================================
//      OPEN MEAL DELETE
//   ========================================================== */

//   function handleDeleteMeal(
//     id: string
//   ) {
//     const meal = data.meals.find(
//       (item) => item.id === id
//     );

//     setDeleteModal({
//       type: "meal",
//       id,
//       name:
//         meal?.name ||
//         "this meal",
//     });
//   }

//   /* ==========================================================
//      OPEN ACTIVITY DELETE
//   ========================================================== */

//   function handleDeleteActivity(
//     id: string
//   ) {
//     const activity =
//       activities.find(
//         (item) =>
//           item.id === id
//       );

//     setDeleteModal({
//       type: "activity",
//       id,
//       name:
//         activity?.activity_name ||
//         "this activity",
//     });
//   }

//   /* ==========================================================
//      CLOSE DELETE MODAL
//   ========================================================== */

//   function closeDeleteModal() {
//     if (deleting) {
//       return;
//     }

//     setDeleteModal(null);
//   }

//   /* ==========================================================
//      CONFIRM DELETE
//   ========================================================== */

//   async function confirmDelete() {
//     if (
//       !deleteModal ||
//       deleting
//     ) {
//       return;
//     }

//     setDeleting(true);

//     try {
//       const formData =
//         new FormData();

//       formData.set(
//         "id",
//         deleteModal.id
//       );

//       if (
//         deleteModal.type ===
//         "meal"
//       ) {
//         await deleteMeal(
//           formData
//         );
//       } else {
//         await deleteActivity(
//           formData
//         );
//       }

//       setDeleteModal(null);
//     } catch (error) {
//       console.error(
//         "DELETE ERROR:",
//         error
//       );
//     } finally {
//       setDeleting(false);
//     }
//   }

//   return (
//     <>
//       <div className="mx-auto w-full max-w-[1250px]">

//         {/* ====================================================
//             HEADER
//         ==================================================== */}

//         <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

//           <div>
//             <h1 className="text-[28px] font-bold tracking-tight text-[#191c1d] sm:text-4xl">
//               Food Diary
//             </h1>

//             <p className="mt-1 text-sm text-[#3e4947] sm:text-base">
//               Track your meals and activities for today.
//             </p>
//           </div>

//           <div className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-[#191c1d] shadow-sm">
//             <CalendarDays
//               size={18}
//               className="text-[#00685f]"
//             />

//             Today, {formatToday()}
//           </div>

//         </div>

//         {/* ====================================================
//             NUTRITION SUMMARY
//         ==================================================== */}

//         <section className="mt-6 overflow-hidden rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

//           <div className="grid grid-cols-2 divide-x divide-y divide-[#e1e3e4] lg:grid-cols-5 lg:divide-y-0">

//             <NutritionStat
//               label="Calories"
//               value={formatNumber(
//                 totals.calories
//               )}
//               unit="kcal"
//               primary
//             />

//             <NutritionStat
//               label="Protein"
//               value={formatNumber(
//                 totals.protein
//               )}
//               unit="g"
//             />

//             <NutritionStat
//               label="Carbs"
//               value={formatNumber(
//                 totals.carbs
//               )}
//               unit="g"
//             />

//             <NutritionStat
//               label="Fat"
//               value={formatNumber(
//                 totals.fat
//               )}
//               unit="g"
//             />

//             <NutritionStat
//               label="Fiber"
//               value={formatNumber(
//                 totals.fiber
//               )}
//               unit="g"
//               className="col-span-2 lg:col-span-1"
//             />

//           </div>

//         </section>

//         {/* ====================================================
//             MAIN
//         ==================================================== */}

//         <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

//           {/* ==================================================
//               LEFT - MEALS
//           ================================================== */}

//           <div className="space-y-5">

//             {MEAL_ORDER.map(
//               (type) => (
//                 <MealSection
//                   key={type}
//                   type={type}
//                   meals={
//                     mealGroups[type]
//                   }
//                   onAdd={() =>
//                     setAddMealType(
//                       type
//                     )
//                   }
//                   onDelete={
//                     handleDeleteMeal
//                   }
//                 />
//               )
//             )}

//           </div>

//           {/* ==================================================
//               RIGHT SIDEBAR
//           ================================================== */}

//           <aside className="h-fit space-y-5 xl:sticky xl:top-6">

//             {/* =================================================
//                 ENERGY BALANCE
//             ================================================= */}

//             <EnergyBalance
//               totals={totals}
//             />

//             {/* =================================================
//                 TODAY'S ACTIVITY
//             ================================================= */}

//             <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

//               <div className="flex items-center justify-between">

//                 <div>
//                   <h2 className="text-lg font-bold text-[#191c1d]">
//                     Today's Activity
//                   </h2>

//                   <p className="mt-1 text-xs text-[#6e7977]">
//                     Exercise logged today
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowActivityModal(
//                       true
//                     )
//                   }
//                   className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#e7f8f5] text-[#00685f] transition-colors hover:bg-[#d8f5f0]"
//                   aria-label="Add activity"
//                 >
//                   <Plus size={19} />
//                 </button>

//               </div>

//               {/* =================================================
//                   NO ACTIVITY
//               ================================================= */}

//               {activities.length ===
//               0 ? (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowActivityModal(
//                       true
//                     )
//                   }
//                   className="mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9c8c5] text-sm font-semibold text-[#00685f] transition-colors hover:bg-[#f3fffd]"
//                 >
//                   <Plus size={18} />

//                   Add Activity
//                 </button>
//               ) : (
//                 <div className="mt-4 space-y-3">

//                   {activities.map(
//                     (activity) => (
//                       <div
//                         key={
//                           activity.id
//                         }
//                         className="flex items-center gap-3 rounded-xl bg-[#f7f9f8] p-3"
//                       >

//                         {/* Icon */}

//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f8f5] text-[#00685f]">
//                           <Activity
//                             size={18}
//                           />
//                         </div>

//                         {/* Info */}

//                         <div className="min-w-0 flex-1">

//                           <p className="truncate text-sm font-bold text-[#191c1d]">
//                             {
//                               activity.activity_name
//                             }
//                           </p>

//                           <p className="mt-1 text-xs text-[#6e7977]">
//                             {
//                               activity.duration_minutes
//                             }{" "}
//                             min
//                             {" • "}
//                             {
//                               activity.calories_burned
//                             }{" "}
//                             kcal
//                           </p>

//                         </div>

//                         {/* Delete */}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleDeleteActivity(
//                               activity.id
//                             )
//                           }
//                           className="cursor-pointer text-xs font-semibold text-red-500 transition-colors hover:text-red-700"
//                         >
//                           Delete
//                         </button>

//                       </div>
//                     )
//                   )}

//                   {/* Add another */}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowActivityModal(
//                         true
//                       )
//                     }
//                     className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9c8c5] text-sm font-semibold text-[#00685f] transition-colors hover:bg-[#f3fffd]"
//                   >
//                     <Plus size={17} />

//                     Add Another Activity
//                   </button>

//                 </div>
//               )}

//             </section>

//           </aside>

//         </div>

//       </div>

//       {/* ======================================================
//           ADD MEAL MODAL
//       ====================================================== */}

//       {addMealType && (
//         <AddMealModal
//           mealType={addMealType}
//           onClose={() =>
//             setAddMealType(
//               null
//             )
//           }
//         />
//       )}

//       {/* ======================================================
//           ADD ACTIVITY MODAL
//       ====================================================== */}

// <AddActivityModal
//   open={showActivityModal}
//   onClose={() => setShowActivityModal(false)}
// />

//       {/* ======================================================
//           DELETE CONFIRMATION MODAL
//       ====================================================== */}

//       <DeleteConfirmModal
//         open={
//           deleteModal !== null
//         }
//         title={
//           deleteModal?.type ===
//           "activity"
//             ? "Delete Activity"
//             : "Delete Meal"
//         }
//         message={
//           deleteModal
//             ? `Are you sure you want to delete ${deleteModal.name}?`
//             : ""
//         }
//         deleting={deleting}
//         onClose={
//           closeDeleteModal
//         }
//         onConfirm={
//           confirmDelete
//         }
//       />
//     </>
//   );
// }

// /* ============================================================
//    NUTRITION STAT
// ============================================================ */

// function NutritionStat({
//   label,
//   value,
//   unit,
//   primary = false,
//   className = "",
// }: {
//   label: string;
//   value: string;
//   unit: string;
//   primary?: boolean;
//   className?: string;
// }) {
//   return (
//     <div
//       className={`min-h-[88px] px-4 py-4 sm:px-6 sm:py-5 ${className}`}
//     >
//       <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#66726f]">
//         {label}
//       </p>

//       <p
//         className={`mt-2 text-[23px] font-bold leading-none ${
//           primary
//             ? "text-[#00685f]"
//             : "text-[#191c1d]"
//         }`}
//       >
//         {value}

//         <span className="ml-1 text-xs font-medium text-[#6e7977]">
//           {unit}
//         </span>
//       </p>
//     </div>
//   );
// }

// /* ============================================================
//    ENERGY BALANCE
// ============================================================ */

// function EnergyBalance({
//   totals,
// }: {
//   totals: DiaryData["totals"];
// }) {
//   return (
//     <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

//       <h2 className="text-xl font-bold text-[#191c1d]">
//         Energy Balance
//       </h2>

//       <div className="mt-5 space-y-0">

//         <BalanceRow
//           icon={<Utensils size={19} />}
//           label="Food Intake"
//           value={`${totals.calories} kcal`}
//         />

//         <BalanceRow
//           icon={<Flame size={19} />}
//           label="Baseline Burn"
//           value={`${totals.baselineBurn} kcal`}
//         />

//         <BalanceRow
//           icon={<Footprints size={19} />}
//           label="Logged Exercise"
//           value={`+${totals.exerciseCalories} kcal`}
//           positive
//         />

//       </div>

//       {/* Total burn */}

//       <div className="mt-5 border-t border-[#e1e3e4] pt-5">

//         <div className="flex items-center justify-between">

//           <span className="text-sm font-bold text-[#191c1d]">
//             Est. Total Burn
//           </span>

//           <span className="text-sm font-bold text-[#191c1d]">
//             {totals.totalBurn} kcal
//           </span>

//         </div>

//       </div>

//       {/* Deficit */}

//       <div className="mt-5 rounded-2xl bg-[#eef9f7] p-4">

//         <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#66726f]">
//           Estimated Deficit
//         </p>

//         <p className="mt-1 text-3xl font-bold tracking-tight text-[#00685f]">

//           {totals.estimatedDeficit >
//           0
//             ? `+${totals.estimatedDeficit}`
//             : totals.estimatedDeficit}

//           <span className="ml-1 text-sm font-normal text-[#6e7977]">
//             kcal
//           </span>

//         </p>

//       </div>

//     </section>
//   );
// }

// /* ============================================================
//    BALANCE ROW
// ============================================================ */

// function BalanceRow({
//   icon,
//   label,
//   value,
//   positive = false,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   positive?: boolean;
// }) {
//   return (
//     <div className="flex items-center justify-between border-b border-[#edf0ef] py-4 last:border-b-0">

//       <div className="flex min-w-0 items-center gap-3">

//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f4f3] text-[#00685f]">
//           {icon}
//         </div>

//         <span className="truncate text-sm text-[#3e4947]">
//           {label}
//         </span>

//       </div>

//       <span
//         className={`shrink-0 text-sm font-semibold ${
//           positive
//             ? "text-[#00685f]"
//             : "text-[#191c1d]"
//         }`}
//       >
//         {value}
//       </span>

//     </div>
//   );
// }

"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Activity,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flame,
  Footprints,
  Plus,
  Utensils,
} from "lucide-react";

import MealSection from "./MealSection";
import AddMealModal from "./AddMealModal";
import AddActivityModal from "./AddActivityModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

import {
  deleteMeal,
  deleteActivity,
} from "@/app/diary/actions";

import type {
  DiaryData,
  MealType,
} from "@/lib/diary/getDiaryData";

interface Props {
  date: string;
  data: DiaryData;
}

/* ============================================================
   MEAL ORDER
============================================================ */

const MEAL_ORDER: MealType[] = [
  "before_workout",
  "after_workout",
  "breakfast",
  "lunch",
  "snack",
  "dinner",
];

/* ============================================================
   INDIA TODAY
============================================================ */

function getTodayIndia(): string {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
    }
  ).format(new Date());
}

/* ============================================================
   DATE VALIDATION
============================================================ */

function isValidDate(
  value: string
) {
  return /^\d{4}-\d{2}-\d{2}$/.test(
    value
  );
}

/* ============================================================
   DATE SHIFT
============================================================ */

function shiftDate(
  date: string,
  days: number
) {
  const current = new Date(
    `${date}T00:00:00`
  );

  current.setDate(
    current.getDate() + days
  );

  return `${current.getFullYear()}-${String(
    current.getMonth() + 1
  ).padStart(2, "0")}-${String(
    current.getDate()
  ).padStart(2, "0")}`;
}

/* ============================================================
   FORMAT DATE
============================================================ */

function formatDiaryDate(
  date: string
) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(
    new Date(`${date}T00:00:00`)
  );
}

/* ============================================================
   FORMAT NUMBER
============================================================ */

function formatNumber(
  value: number
) {
  return Number.isInteger(value)
    ? String(value)
    : value.toFixed(1);
}

/* ============================================================
   DIARY PAGE
============================================================ */

export default function DiaryPage({
  date,
  data,
}: Props) {
  const today =
    getTodayIndia();

  const [calendarOpen, setCalendarOpen] =
    useState(false);

  /* ==========================================================
     MODALS
  ========================================================== */

  const [
    addMealType,
    setAddMealType,
  ] =
    useState<MealType | null>(
      null
    );

  const [
    showActivityModal,
    setShowActivityModal,
  ] = useState(false);

  /* ==========================================================
     DELETE MODAL
  ========================================================== */

  const [
    deleteModal,
    setDeleteModal,
  ] = useState<{
    type:
      | "meal"
      | "activity";
    id: string;
    name: string;
  } | null>(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  /* ==========================================================
     DATE
  ========================================================== */

  const selectedDate =
    isValidDate(date)
      ? date
      : today;

  const isToday =
    selectedDate === today;

  const formattedSelectedDate =
    useMemo(
      () =>
        formatDiaryDate(
          selectedDate
        ),
      [selectedDate]
    );

  /* ==========================================================
     NAVIGATE DATE
  ========================================================== */

  function navigateToDate(
    nextDate: string
  ) {
    if (
      !isValidDate(nextDate)
    ) {
      return;
    }

    if (nextDate > today) {
      return;
    }

    setCalendarOpen(false);

    /*
     * Full navigation is intentional.
     * It makes the Server Component load
     * Supabase data for the selected date.
     */
    window.location.href =
      `/diary?date=${nextDate}`;
  }

  /* ==========================================================
     PREVIOUS
  ========================================================== */

  function goPreviousDay() {
    navigateToDate(
      shiftDate(
        selectedDate,
        -1
      )
    );
  }

  /* ==========================================================
     NEXT
  ========================================================== */

  function goNextDay() {
    if (isToday) {
      return;
    }

    const next =
      shiftDate(
        selectedDate,
        1
      );

    if (next <= today) {
      navigateToDate(next);
    }
  }

  /* ==========================================================
     TODAY
  ========================================================== */

  function goToday() {
    navigateToDate(today);
  }

  /* ==========================================================
     DELETE MEAL
  ========================================================== */

  function handleDeleteMeal(
    id: string
  ) {
    const meal =
      data.meals.find(
        (item) =>
          item.id === id
      );

    setDeleteModal({
      type: "meal",
      id,
      name:
        meal?.name ||
        "this meal",
    });
  }

  /* ==========================================================
     DELETE ACTIVITY
  ========================================================== */

  function handleDeleteActivity(
    id: string
  ) {
    const activity =
      data.activities.find(
        (item) =>
          item.id === id
      );

    setDeleteModal({
      type: "activity",
      id,
      name:
        activity?.activity_name ||
        "this activity",
    });
  }

  /* ==========================================================
     CLOSE DELETE
  ========================================================== */

  function closeDeleteModal() {
    if (deleting) {
      return;
    }

    setDeleteModal(null);
  }

  /* ==========================================================
     CONFIRM DELETE
  ========================================================== */

  async function confirmDelete() {
    if (
      !deleteModal ||
      deleting
    ) {
      return;
    }

    setDeleting(true);

    try {
      const formData =
        new FormData();

      formData.set(
        "id",
        deleteModal.id
      );

      if (
        deleteModal.type ===
        "meal"
      ) {
        await deleteMeal(
          formData
        );
      } else {
        await deleteActivity(
          formData
        );
      }

      setDeleteModal(null);

      /*
       * Reload current selected date.
       */
      window.location.reload();
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error
      );
    } finally {
      setDeleting(false);
    }
  }

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <>
      <div className="mx-auto w-full max-w-[1250px]">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#191c1d] sm:text-4xl">
              Food Diary
            </h1>

            <p className="mt-1 text-sm text-[#3e4947] sm:text-base">
              Track your meals and activities for this date.
            </p>
          </div>

          {/* ==================================================
              DATE SELECTOR
          ================================================== */}

          <div className="relative">

            <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm">

              {/* PREVIOUS */}

              <button
                type="button"
                onClick={
                  goPreviousDay
                }
                aria-label="Previous day"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#3e4947] transition-colors hover:bg-[#e7f8f5] hover:text-[#00685f]"
              >
                <ChevronLeft
                  size={19}
                />
              </button>

              {/* DATE */}

              <button
                type="button"
                onClick={() =>
                  setCalendarOpen(
                    (value) =>
                      !value
                  )
                }
                className="flex min-w-[190px] cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#191c1d] transition-colors hover:bg-[#f3f6f5]"
              >
                <CalendarDays
                  size={18}
                  className="shrink-0 text-[#00685f]"
                />

                <span>
                  {isToday
                    ? `Today, ${formattedSelectedDate}`
                    : formattedSelectedDate}
                </span>
              </button>

              {/* NEXT */}

              <button
                type="button"
                onClick={
                  goNextDay
                }
                disabled={isToday}
                aria-label="Next day"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#3e4947] transition-colors hover:bg-[#e7f8f5] hover:text-[#00685f] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight
                  size={19}
                />
              </button>

            </div>

            {/* =================================================
                DATE DROPDOWN
            ================================================= */}

            {calendarOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(320px,calc(100vw-32px))] rounded-2xl border border-[#e1e3e4] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">

                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="text-sm font-bold text-[#191c1d]">
                      Select date
                    </p>

                    <p className="mt-1 text-xs text-[#6e7977]">
                      View your diary history
                    </p>
                  </div>

                  {!isToday && (
                    <button
                      type="button"
                      onClick={
                        goToday
                      }
                      className="rounded-lg bg-[#e7f8f5] px-3 py-1.5 text-xs font-bold text-[#00685f] hover:bg-[#d8f5f0]"
                    >
                      Today
                    </button>
                  )}

                </div>

                <div className="mt-4">

                  <label
                    htmlFor="diary-date"
                    className="mb-2 block text-xs font-semibold text-[#3e4947]"
                  >
                    Date
                  </label>

                  <input
                    id="diary-date"
                    type="date"
                    value={
                      selectedDate
                    }
                    max={today}
                    onChange={(
                      event
                    ) =>
                      navigateToDate(
                        event.target
                          .value
                      )
                    }
                    className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-3 text-base text-[#191c1d] outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                  />

                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">

                  <button
                    type="button"
                    onClick={
                      goPreviousDay
                    }
                    className="flex h-10 items-center justify-center gap-1 rounded-xl border border-[#d7dfdd] text-xs font-semibold text-[#3e4947] hover:bg-[#f4f7f6]"
                  >
                    <ChevronLeft
                      size={16}
                    />
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={
                      goToday
                    }
                    disabled={isToday}
                    className="h-10 rounded-xl border border-[#d7dfdd] text-xs font-semibold text-[#3e4947] hover:bg-[#f4f7f6] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Today
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>

        {/* ==================================================
            SELECTED DATE NOTICE
        ================================================== */}

        {!isToday && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#dce8e5] bg-[#eef9f7] px-4 py-3 text-sm text-[#005049]">

            <CalendarDays
              size={17}
              className="shrink-0"
            />

            <span>
              Showing diary for{" "}
              <strong>
                {formattedSelectedDate}
              </strong>
            </span>

            <button
              type="button"
              onClick={
                goToday
              }
              className="ml-auto font-semibold underline underline-offset-2"
            >
              Today
            </button>

          </div>
        )}

        {/* ==================================================
            NUTRITION SUMMARY
        ================================================== */}

        <section className="mt-6 overflow-hidden rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

          <div className="grid grid-cols-2 divide-x divide-y divide-[#e1e3e4] lg:grid-cols-5 lg:divide-y-0">

            <NutritionStat
              label="Calories"
              value={formatNumber(
                data.totals
                  .calories
              )}
              unit="kcal"
              primary
            />

            <NutritionStat
              label="Protein"
              value={formatNumber(
                data.totals
                  .protein
              )}
              unit="g"
            />

            <NutritionStat
              label="Carbs"
              value={formatNumber(
                data.totals
                  .carbs
              )}
              unit="g"
            />

            <NutritionStat
              label="Fat"
              value={formatNumber(
                data.totals
                  .fat
              )}
              unit="g"
            />

            <NutritionStat
              label="Fiber"
              value={formatNumber(
                data.totals
                  .fiber
              )}
              unit="g"
              className="col-span-2 lg:col-span-1"
            />

          </div>
        </section>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

          {/* ==================================================
              MEALS
          ================================================== */}

          <div className="space-y-5">

            {MEAL_ORDER.map(
              (type) => (
                <MealSection
                  key={type}
                  type={type}
                  meals={
                    data.mealGroups[
                      type
                    ]
                  }
                  onAdd={() =>
                    setAddMealType(
                      type
                    )
                  }
                  onDelete={
                    handleDeleteMeal
                  }
                />
              )
            )}

          </div>

          {/* ==================================================
              RIGHT
          ================================================== */}

          <aside className="h-fit space-y-5 xl:sticky xl:top-6">

            {/* ENERGY */}

            <EnergyBalance
              totals={
                data.totals
              }
            />

            {/* ACTIVITY */}

            <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold text-[#191c1d]">
                    {isToday
                      ? "Today's Activity"
                      : "Activity"}
                  </h2>

                  <p className="mt-1 text-xs text-[#6e7977]">
                    Exercise logged for{" "}
                    {isToday
                      ? "today"
                      : formattedSelectedDate}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowActivityModal(
                      true
                    )
                  }
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#e7f8f5] text-[#00685f] hover:bg-[#d8f5f0]"
                  aria-label="Add activity"
                >
                  <Plus
                    size={19}
                  />
                </button>

              </div>

              {data.activities
                .length === 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowActivityModal(
                      true
                    )
                  }
                  className="mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9c8c5] text-sm font-semibold text-[#00685f] hover:bg-[#f3fffd]"
                >
                  <Plus
                    size={18}
                  />
                  Add Activity
                </button>
              ) : (
                <div className="mt-4 space-y-3">

                  {data.activities.map(
                    (activity) => (
                      <div
                        key={
                          activity.id
                        }
                        className="flex items-center gap-3 rounded-xl bg-[#f7f9f8] p-3"
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f8f5] text-[#00685f]">
                          <Activity
                            size={18}
                          />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-bold text-[#191c1d]">
                            {
                              activity.activity_name
                            }
                          </p>

                          <p className="mt-1 text-xs text-[#6e7977]">
                            {
                              activity.duration_minutes
                            }{" "}
                            min
                            {" • "}
                            {
                              activity.calories_burned
                            }{" "}
                            kcal
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteActivity(
                              activity.id
                            )
                          }
                          className="cursor-pointer text-xs font-semibold text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>

                      </div>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setShowActivityModal(
                        true
                      )
                    }
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9c8c5] text-sm font-semibold text-[#00685f] hover:bg-[#f3fffd]"
                  >
                    <Plus
                      size={17}
                    />
                    Add Another Activity
                  </button>

                </div>
              )}

            </section>

          </aside>
        </div>
      </div>

      {/* ======================================================
          ADD MEAL
      ====================================================== */}

      {addMealType && (
        <AddMealModal
          mealType={
            addMealType
          }
          selectedDate={
            selectedDate
          }
          onClose={() =>
            setAddMealType(
              null
            )
          }
        />
      )}

      {/* ======================================================
          ADD ACTIVITY
      ====================================================== */}

      <AddActivityModal
        open={
          showActivityModal
        }
        selectedDate={
          selectedDate
        }
        onClose={() =>
          setShowActivityModal(
            false
          )
        }
      />

      {/* ======================================================
          DELETE
      ====================================================== */}

      <DeleteConfirmModal
        open={
          deleteModal !== null
        }
        title={
          deleteModal?.type ===
          "activity"
            ? "Delete Activity"
            : "Delete Meal"
        }
        message={
          deleteModal
            ? `Are you sure you want to delete ${deleteModal.name}?`
            : ""
        }
        deleting={deleting}
        onClose={
          closeDeleteModal
        }
        onConfirm={
          confirmDelete
        }
      />
    </>
  );
}

/* ============================================================
   NUTRITION STAT
============================================================ */

function NutritionStat({
  label,
  value,
  unit,
  primary = false,
  className = "",
}: {
  label: string;
  value: string;
  unit: string;
  primary?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`min-h-[88px] px-4 py-4 sm:px-6 sm:py-5 ${className}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#66726f]">
        {label}
      </p>

      <p
        className={`mt-2 text-[23px] font-bold leading-none ${
          primary
            ? "text-[#00685f]"
            : "text-[#191c1d]"
        }`}
      >
        {value}

        <span className="ml-1 text-xs font-medium text-[#6e7977]">
          {unit}
        </span>
      </p>
    </div>
  );
}

/* ============================================================
   ENERGY BALANCE
============================================================ */

function EnergyBalance({
  totals,
}: {
  totals: DiaryData["totals"];
}) {
  return (
    <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

      <h2 className="text-xl font-bold text-[#191c1d]">
        Energy Balance
      </h2>

      <div className="mt-5">

        <BalanceRow
          icon={
            <Utensils
              size={19}
            />
          }
          label="Food Intake"
          value={`${totals.calories} kcal`}
        />

        <BalanceRow
          icon={
            <Flame
              size={19}
            />
          }
          label="Baseline Burn"
          value={`${totals.baselineBurn} kcal`}
        />

        <BalanceRow
          icon={
            <Footprints
              size={19}
            />
          }
          label="Logged Exercise"
          value={`+${totals.exerciseCalories} kcal`}
          positive
        />

      </div>

      <div className="mt-5 border-t border-[#e1e3e4] pt-5">

        <div className="flex items-center justify-between">

          <span className="text-sm font-bold text-[#191c1d]">
            Est. Total Burn
          </span>

          <span className="text-sm font-bold text-[#191c1d]">
            {totals.totalBurn} kcal
          </span>

        </div>

      </div>

      <div className="mt-5 rounded-2xl bg-[#eef9f7] p-4">

        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#66726f]">
          Estimated Deficit
        </p>

        <p className="mt-1 text-3xl font-bold tracking-tight text-[#00685f]">

          {totals.estimatedDeficit >
          0
            ? `+${totals.estimatedDeficit}`
            : totals.estimatedDeficit}

          <span className="ml-1 text-sm font-normal text-[#6e7977]">
            kcal
          </span>

        </p>

      </div>

    </section>
  );
}

/* ============================================================
   BALANCE ROW
============================================================ */

function BalanceRow({
  icon,
  label,
  value,
  positive = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#edf0ef] py-4 last:border-b-0">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f4f3] text-[#00685f]">
          {icon}
        </div>

        <span className="truncate text-sm text-[#3e4947]">
          {label}
        </span>

      </div>

      <span
        className={`shrink-0 text-sm font-semibold ${
          positive
            ? "text-[#00685f]"
            : "text-[#191c1d]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}