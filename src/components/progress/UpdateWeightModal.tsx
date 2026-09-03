"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Scale, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface UpdateWeightModalProps {
  currentWeight?: number | null;
  onClose: () => void;
}

export default function UpdateWeightModal({
  currentWeight,
  onClose,
}: UpdateWeightModalProps) {
  const router = useRouter();

  const [weight, setWeight] = useState(
    currentWeight !== null &&
      currentWeight !== undefined
      ? String(currentWeight)
      : ""
  );

  const [note, setNote] = useState("");

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // LOCK BODY SCROLL WHILE MODAL IS OPEN
  // =========================================================

  useEffect(() => {
    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, []);

  // =========================================================
  // SAVE WEIGHT
  // =========================================================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const numericWeight = Number(weight);

    if (!weight.trim()) {
      setError("Please enter your weight.");
      return;
    }

    if (!Number.isFinite(numericWeight)) {
      setError("Please enter a valid weight.");
      return;
    }

    if (
      numericWeight < 20 ||
      numericWeight > 500
    ) {
      setError(
        "Please enter a weight between 20 and 500 kg."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/progress/weight",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            weight: numericWeight,
            note: note.trim() || null,
          }),
        }
      );

      const rawResponse = await response.text();

      let result: {
        success?: boolean;
        error?: string;
      } = {};

      try {
        result = rawResponse
          ? JSON.parse(rawResponse)
          : {};
      } catch {
        result = {
          error:
            rawResponse ||
            "Unable to update your weight.",
        };
      }

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Failed to update your weight."
        );
      }

      // Close modal first
      onClose();

      // Refresh server-side Progress data
      router.refresh();
    } catch (error) {
      console.error(
        "Update weight error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving your weight."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // CLOSE WITH ESCAPE
  // =========================================================

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape" && !saving) {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose, saving]);

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/40
        px-4
        py-6
      "
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !saving
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-weight-title"
        className="
          w-full max-w-[460px]
          overflow-hidden
          rounded-[24px]
          bg-white
          shadow-[0_25px_80px_rgba(0,0,0,0.22)]
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex items-center justify-between
            border-b border-[#e1e3e4]
            px-5 py-5
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11
                shrink-0 items-center justify-center
                rounded-full
                bg-[#e7f8f5]
                text-[#005049]
              "
            >
              <Scale
                size={21}
                strokeWidth={2}
              />
            </div>

            <div>
              <h2
                id="update-weight-title"
                className="
                  text-lg font-bold
                  text-[#191c1d]
                "
              >
                Update Weight
              </h2>

              <p className="mt-0.5 text-xs text-[#6e7977]">
                Keep your progress up to date
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            disabled={saving}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              text-[#5f6967]
              transition-colors duration-150
              hover:bg-[#f1f3f3]
              hover:text-[#191c1d]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={21} />
          </button>
        </div>

        {/* =====================================================
            FORM
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6"
        >
          {/* WEIGHT */}

          <div>
            <label
              htmlFor="progress-weight"
              className="
                mb-2 block
                text-sm font-semibold
                text-[#3e4947]
              "
            >
              Current Weight
            </label>

            <div className="relative">
              <input
                id="progress-weight"
                name="weight"
                type="number"
                inputMode="decimal"
                min="20"
                max="500"
                step="0.1"
                value={weight}
                onChange={(event) => {
                  setWeight(event.target.value);
                  setError("");
                }}
                placeholder="e.g. 112.5"
                autoFocus
                disabled={saving}
                className="
                  h-14 w-full
                  rounded-xl
                  border border-[#bec9c6]
                  bg-white
                  px-4 pr-16
                  text-lg font-semibold
                  text-[#191c1d]
                  outline-none
                  transition-colors
                  placeholder:text-[#a0aaa7]
                  focus:border-[#00685f]
                  focus:ring-2
                  focus:ring-[#00685f]/15
                  disabled:cursor-not-allowed
                  disabled:bg-[#f4f6f5]
                "
              />

              <span
                className="
                  pointer-events-none
                  absolute right-4 top-1/2
                  -translate-y-1/2
                  text-sm font-medium
                  text-[#6e7977]
                "
              >
                kg
              </span>
            </div>

            {currentWeight !== null &&
              currentWeight !== undefined && (
                <p className="mt-2 text-xs text-[#6e7977]">
                  Previous weight:{" "}
                  <span className="font-semibold text-[#3e4947]">
                    {Number(currentWeight).toFixed(
                      1
                    )}{" "}
                    kg
                  </span>
                </p>
              )}
          </div>

          {/* NOTE */}

          <div className="mt-5">
            <label
              htmlFor="progress-weight-note"
              className="
                mb-2 block
                text-sm font-semibold
                text-[#3e4947]
              "
            >
              Note{" "}
              <span className="font-normal text-[#89928f]">
                (optional)
              </span>
            </label>

            <textarea
              id="progress-weight-note"
              value={note}
              onChange={(event) =>
                setNote(event.target.value)
              }
              rows={3}
              disabled={saving}
              placeholder="e.g. Morning weight"
              className="
                w-full resize-none
                rounded-xl
                border border-[#bec9c6]
                bg-white
                px-4 py-3
                text-sm
                text-[#191c1d]
                outline-none
                transition-colors
                placeholder:text-[#9aa3a1]
                focus:border-[#00685f]
                focus:ring-2
                focus:ring-[#00685f]/15
                disabled:cursor-not-allowed
                disabled:bg-[#f4f6f5]
              "
            />
          </div>

          {/* ERROR */}

          {error && (
            <div
              role="alert"
              className="
                mt-4
                rounded-xl
                border border-red-200
                bg-red-50
                px-4 py-3
                text-sm leading-5
                text-red-700
              "
            >
              {error}
            </div>
          )}

          {/* ACTIONS */}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="
                flex min-h-[50px]
                w-full items-center justify-center
                rounded-xl
                border border-[#cbd5d3]
                bg-white
                px-5
                text-sm font-semibold
                text-[#3e4947]
                transition-colors duration-150
                hover:border-[#9eaba8]
                hover:bg-[#f5f8f7]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:flex-1
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                flex min-h-[50px]
                w-full items-center justify-center
                gap-2
                rounded-xl
                bg-[#004e47]
                px-5
                text-sm font-bold
                text-white
                shadow-[0_5px_16px_rgba(0,78,71,0.18)]
                transition-all duration-150
                hover:bg-[#003f3a]
                hover:shadow-[0_7px_20px_rgba(0,78,71,0.22)]
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:shadow-none
                sm:flex-1
              "
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Weight
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}