"use client";

import {
  useActionState,
  useEffect,
} from "react";

import {
  X,
  Plus,
  Loader2,
} from "lucide-react";

import {
  addActivity,
} from "@/app/diary/actions";

interface AddActivityModalProps {
  open: boolean;
  onClose: () => void;
}

const initialState = {
  success: false,
  error: "",
};

export default function AddActivityModal({
  open,
  onClose,
}: AddActivityModalProps) {

  const [
    state,
    formAction,
    pending,
  ] = useActionState(
    addActivity,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [
    state.success,
    onClose,
  ]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">

      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-[24px] sm:p-7">

        <div className="mb-6 flex items-start justify-between">

          <div>
            <h2 className="text-xl font-bold text-[#191c1d] sm:text-2xl">
              Add Activity
            </h2>

            <p className="mt-1 text-sm text-[#6e7977]">
              Log your workout or daily movement.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#6e7977] transition hover:bg-[#f3f4f5]"
          >
            <X size={20} />
          </button>

        </div>

        <form
          action={formAction}
          className="space-y-5"
        >

          {/* Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
              Activity Type
            </label>

            <select
              name="activity_type"
              defaultValue="workout"
              className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
            >
              <option value="workout">
                Workout
              </option>

              <option value="walking">
                Walking
              </option>

              <option value="running">
                Running
              </option>

              <option value="cycling">
                Cycling
              </option>

              <option value="sports">
                Sports
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
              Activity Name
            </label>

            <input
              type="text"
              name="activity_name"
              required
              placeholder="e.g. Morning Gym"
              className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
            />
          </div>

          {/* Duration + calories */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
                Duration
              </label>

              <div className="relative">

                <input
                  type="number"
                  name="duration_minutes"
                  min="1"
                  required
                  placeholder="45"
                  className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 pr-12 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a9492]">
                  min
                </span>

              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
                Calories Burned
              </label>

              <div className="relative">

                <input
                  type="number"
                  name="calories_burned"
                  min="0"
                  required
                  placeholder="250"
                  className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 pr-12 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a9492]">
                  kcal
                </span>

              </div>
            </div>

          </div>

          {/* Note */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
              Note
              <span className="ml-1 font-normal text-[#8a9492]">
                optional
              </span>
            </label>

            <textarea
              name="note"
              rows={3}
              placeholder="e.g. Chest + shoulders"
              className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
            />
          </div>

          {/* Error */}
          {state.error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {state.error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="flex min-h-[50px] w-full items-center justify-center rounded-xl bg-[#004e47] px-5 text-sm font-bold text-white transition hover:bg-[#00685f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2
                  size={18}
                  className="mr-2 animate-spin"
                />

                Adding Activity...
              </>
            ) : (
              <>
                <Plus
                  size={18}
                  className="mr-2"
                />

                Add Activity
              </>
            )}
          </button>

        </form>

      </div>

    </div>
  );
}