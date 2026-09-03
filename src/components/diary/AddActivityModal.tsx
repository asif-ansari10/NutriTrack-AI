"use client";

import { useActionState, useEffect } from "react";
import {
  Check,
  Dumbbell,
  Loader2,
  X,
} from "lucide-react";

import {
  addActivity,
  type ActionState,
} from "@/app/diary/actions";

interface Props {
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  error: "",
};

function getTodayIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export default function AddActivityModal({
  onClose,
}: Props) {
  const [state, formAction, pending] =
    useActionState(
      addActivity,
      initialState
    );

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-3 py-4 sm:px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-activity-title"
    >
      <button
        type="button"
        aria-label="Close"
        disabled={pending}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative z-10 flex max-h-[calc(100dvh-32px)] w-full max-w-[600px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.22)]">
        <div className="flex shrink-0 items-center justify-between border-b border-[#e1e3e4] px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f8f5] text-[#00685f]">
              <Dumbbell size={21} />
            </div>

            <div>
              <h2
                id="add-activity-title"
                className="text-lg font-bold text-[#191c1d] sm:text-xl"
              >
                Add Activity
              </h2>

              <p className="text-xs text-[#6e7977] sm:text-sm">
                Record your exercise or physical activity.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#687370] hover:bg-[#f1f3f3] disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        <form
          action={formAction}
          className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6"
        >
          <input
            type="hidden"
            name="activity_date"
            value={getTodayIndia()}
          />

          <div className="space-y-5">
            <div>
              <label
                htmlFor="modal-activity-type"
                className="mb-2 block text-sm font-semibold"
              >
                Activity Type
              </label>

              <select
                id="modal-activity-type"
                name="activity_type"
                defaultValue="gym"
                className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 text-base text-[#191c1d] outline-none focus:border-[#004e47]"
              >
                <option value="gym">Gym</option>
                <option value="walking">Walking</option>
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
                <option value="sports">Sports</option>
                <option value="strength">Strength Training</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="modal-activity-name"
                className="mb-2 block text-sm font-semibold"
              >
                Activity Name
              </label>

              <input
                id="modal-activity-name"
                name="activity_name"
                type="text"
                required
                placeholder="Morning Gym"
                className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base text-[#191c1d] outline-none placeholder:text-gray-400 focus:border-[#004e47]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="modal-duration"
                  className="mb-2 block text-sm font-semibold"
                >
                  Duration (minutes)
                </label>

                <input
                  id="modal-duration"
                  type="number"
                  name="duration_minutes"
                  min="1"
                  required
                  inputMode="numeric"
                  placeholder="45"
                  className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base text-[#191c1d] outline-none focus:border-[#004e47]"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-calories-burned"
                  className="mb-2 block text-sm font-semibold"
                >
                  Calories Burned
                </label>

                <input
                  id="modal-calories-burned"
                  type="number"
                  name="calories_burned"
                  min="0"
                  required
                  inputMode="numeric"
                  placeholder="250"
                  className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base text-[#191c1d] outline-none focus:border-[#004e47]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="modal-activity-note"
                className="mb-2 block text-sm font-semibold"
              >
                Note
              </label>

              <textarea
                id="modal-activity-note"
                name="note"
                rows={3}
                placeholder="Optional note about your activity..."
                className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 text-base text-[#191c1d] outline-none placeholder:text-gray-400 focus:border-[#004e47]"
              />
            </div>

            {state.error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {state.error}
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#edf0ef] pt-5 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="min-h-[52px] w-full rounded-xl border border-[#cbd5d3] bg-white px-5 text-base font-semibold text-[#3e4947] hover:bg-[#f5f7f7] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#004e47] px-5 text-base font-bold text-white hover:bg-[#003f3a] disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={19} />
                  Add Activity
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
