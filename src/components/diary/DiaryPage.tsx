"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import {
  Activity,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flame,
  Footprints,
  Loader2,
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

/* ============================================================
   TYPES
============================================================ */

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

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/* ============================================================
   DATE SHIFT
============================================================ */

function shiftDate(
  date: string,
  days: number
): string {
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
): string {
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
): string {
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
  const router = useRouter();

  const today = getTodayIndia();

  /* ==========================================================
     DATE LOADING
  ========================================================== */

  const [isDateLoading, setIsDateLoading] =
    useState(false);

  const [calendarOpen, setCalendarOpen] =
    useState(false);

  /* ==========================================================
     MODALS
  ========================================================== */

  const [
    addMealType,
    setAddMealType,
  ] = useState<MealType | null>(null);

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
     RESET DATE LOADING
     
     When Next.js finishes loading the new
     Server Component, the `date` prop changes.
  ========================================================== */

  useEffect(() => {
    setIsDateLoading(false);
  }, [date]);

  /* ==========================================================
     NAVIGATE DATE
  ========================================================== */

  function navigateToDate(
    nextDate: string
  ) {
    if (!isValidDate(nextDate)) {
      return;
    }

    if (nextDate > today) {
      return;
    }

    /*
     * Prevent repeated clicks while
     * the previous navigation is loading.
     */
    if (isDateLoading) {
      return;
    }

    /*
     * No need to navigate to
     * the currently selected date.
     */
    if (nextDate === selectedDate) {
      setCalendarOpen(false);
      return;
    }

    /*
     * Close calendar first.
     */
    setCalendarOpen(false);

    /*
     * Show loading immediately.
     */
    setIsDateLoading(true);

    /*
     * Navigate through Next.js.
     *
     * requestAnimationFrame gives the browser
     * an opportunity to render the loading state
     * before the navigation begins.
     */
    requestAnimationFrame(() => {
      router.push(
        `/diary?date=${nextDate}`
      );
    });
  }

  /* ==========================================================
     PREVIOUS
  ========================================================== */

  function goPreviousDay() {
    if (isDateLoading) {
      return;
    }

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
    if (
      isToday ||
      isDateLoading
    ) {
      return;
    }

    const next = shiftDate(
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
    if (isDateLoading) {
      return;
    }

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
       * Reload current selected date
       * after deleting the item.
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
      {/* ======================================================
          DATE LOADING BAR
      ====================================================== */}

      {isDateLoading && (
        <div
          className="fixed left-0 right-0 top-0 z-[9999] h-1 overflow-hidden bg-[#dff7f3]"
          aria-hidden="true"
        >
          <div className="diary-loading-bar h-full w-1/3 rounded-full bg-[#00685f]" />
        </div>
      )}

      {/* ======================================================
          MAIN
      ====================================================== */}

      <div
        className={`mx-auto w-full max-w-[1250px] transition-opacity duration-200 ${
          isDateLoading
            ? "opacity-80"
            : "opacity-100"
        }`}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          {/* ==================================================
              TITLE
          ================================================== */}

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

            {/* ==================================================
                DATE NAVIGATION BAR
            ================================================== */}

            <div
              className={`flex items-center gap-1 rounded-full bg-white p-1 shadow-sm transition-all duration-200 ${
                isDateLoading
                  ? "opacity-90"
                  : ""
              }`}
            >

              {/* ==================================================
                  PREVIOUS
              ================================================== */}

              <button
                type="button"
                onClick={
                  goPreviousDay
                }
                disabled={
                  isDateLoading
                }
                aria-label="Previous day"
                aria-busy={
                  isDateLoading
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#3e4947] transition-all duration-200 hover:bg-[#e7f8f5] hover:text-[#00685f] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isDateLoading ? (
                  <Loader2
                    size={19}
                    className="animate-spin text-[#00685f]"
                  />
                ) : (
                  <ChevronLeft
                    size={19}
                  />
                )}
              </button>

              {/* ==================================================
                  DATE
              ================================================== */}

              <button
                type="button"
                onClick={() => {
                  if (
                    !isDateLoading
                  ) {
                    setCalendarOpen(
                      (value) =>
                        !value
                    );
                  }
                }}
                disabled={
                  isDateLoading
                }
                aria-busy={
                  isDateLoading
                }
                className={`flex min-w-[190px] items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#191c1d] transition-all duration-200 ${
                  isDateLoading
                    ? "cursor-wait bg-[#f3f7f6]"
                    : "cursor-pointer hover:bg-[#f3f6f5]"
                }`}
              >
                {isDateLoading ? (
                  <>
                    <Loader2
                      size={18}
                      className="shrink-0 animate-spin text-[#00685f]"
                    />

                    <span className="text-[#00685f]">
                      Loading...
                    </span>
                  </>
                ) : (
                  <>
                    <CalendarDays
                      size={18}
                      className="shrink-0 text-[#00685f]"
                    />

                    <span>
                      {isToday
                        ? `Today, ${formattedSelectedDate}`
                        : formattedSelectedDate}
                    </span>
                  </>
                )}
              </button>

              {/* ==================================================
                  NEXT
              ================================================== */}

              <button
                type="button"
                onClick={
                  goNextDay
                }
                disabled={
                  isToday ||
                  isDateLoading
                }
                aria-label="Next day"
                aria-busy={
                  isDateLoading
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#3e4947] transition-all duration-200 hover:bg-[#e7f8f5] hover:text-[#00685f] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30"
              >
                {isDateLoading ? (
                  <Loader2
                    size={19}
                    className="animate-spin text-[#00685f]"
                  />
                ) : (
                  <ChevronRight
                    size={19}
                  />
                )}
              </button>

            </div>

            {/* =================================================
                DATE DROPDOWN
            ================================================= */}

            {calendarOpen &&
              !isDateLoading && (
                <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(320px,calc(100vw-32px))] rounded-2xl border border-[#e1e3e4] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">

                  {/* ==================================================
                      DROPDOWN HEADER
                  ================================================== */}

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
                        disabled={
                          isDateLoading
                        }
                        className="rounded-lg bg-[#e7f8f5] px-3 py-1.5 text-xs font-bold text-[#00685f] transition-colors hover:bg-[#d8f5f0] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Today
                      </button>
                    )}

                  </div>

                  {/* ==================================================
                      DATE INPUT
                  ================================================== */}

                  <div className="mt-4">

                    <label
                      htmlFor="diary-date"
                      className="mb-2 block text-xs font-semibold text-[#3e4947]"
                    >
                      Date
                    </label>

                    <div className="relative">

                      <input
                        id="diary-date"
                        type="date"
                        value={
                          selectedDate
                        }
                        max={today}
                        disabled={
                          isDateLoading
                        }
                        onChange={(
                          event
                        ) =>
                          navigateToDate(
                            event
                              .target
                              .value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-3 text-base text-[#191c1d] outline-none transition-all focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10 disabled:cursor-not-allowed disabled:bg-[#f4f7f6] disabled:opacity-60"
                      />

                      {isDateLoading && (
                        <Loader2
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#00685f]"
                        />
                      )}

                    </div>

                  </div>

                  {/* ==================================================
                      QUICK BUTTONS
                  ================================================== */}

                  <div className="mt-4 grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      onClick={
                        goPreviousDay
                      }
                      disabled={
                        isDateLoading
                      }
                      className="flex h-10 items-center justify-center gap-1 rounded-xl border border-[#d7dfdd] text-xs font-semibold text-[#3e4947] transition-colors hover:bg-[#f4f7f6] disabled:cursor-not-allowed disabled:opacity-40"
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
                      disabled={
                        isToday ||
                        isDateLoading
                      }
                      className="flex h-10 items-center justify-center rounded-xl border border-[#d7dfdd] text-xs font-semibold text-[#3e4947] transition-colors hover:bg-[#f4f7f6] disabled:cursor-not-allowed disabled:opacity-40"
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
              disabled={
                isDateLoading
              }
              className="ml-auto font-semibold underline underline-offset-2 transition-opacity disabled:pointer-events-none disabled:opacity-40"
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
                data.totals.calories
              )}
              unit="kcal"
              primary
            />

            <NutritionStat
              label="Protein"
              value={formatNumber(
                data.totals.protein
              )}
              unit="g"
            />

            <NutritionStat
              label="Carbs"
              value={formatNumber(
                data.totals.carbs
              )}
              unit="g"
            />

            <NutritionStat
              label="Fat"
              value={formatNumber(
                data.totals.fat
              )}
              unit="g"
            />

            <NutritionStat
              label="Fiber"
              value={formatNumber(
                data.totals.fiber
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
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="h-fit space-y-5 xl:sticky xl:top-6">

            {/* ==================================================
                ENERGY BALANCE
            ================================================== */}

            <EnergyBalance
              totals={
                data.totals
              }
            />

            {/* ==================================================
                ACTIVITY
            ================================================== */}

            <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

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
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#e7f8f5] text-[#00685f] transition-colors hover:bg-[#d8f5f0]"
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
                  className="mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9c8c5] text-sm font-semibold text-[#00685f] transition-colors hover:bg-[#f3fffd]"
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
                          className="cursor-pointer text-xs font-semibold text-red-500 transition-colors hover:text-red-700"
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
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9c8c5] text-sm font-semibold text-[#00685f] transition-colors hover:bg-[#f3fffd]"
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
        deleting={
          deleting
        }
        onClose={
          closeDeleteModal
        }
        onConfirm={
          confirmDelete
        }
      />

      {/* ======================================================
          LOADING ANIMATION
      ====================================================== */}

      <style jsx global>{`
        @keyframes diaryLoading {
          0% {
            transform: translateX(-130%);
          }

          50% {
            transform: translateX(180%);
          }

          100% {
            transform: translateX(430%);
          }
        }

        .diary-loading-bar {
          animation: diaryLoading 1s
            ease-in-out infinite;
        }
      `}</style>
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
  icon: ReactNode;
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