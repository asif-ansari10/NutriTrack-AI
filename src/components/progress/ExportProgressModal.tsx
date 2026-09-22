"use client";

import {
  Download,
  FileDown,
  Loader2,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

function getTodayIndia() {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
    }
  ).format(new Date());
}

function getMonthStart() {
  const today =
    getTodayIndia();

  return `${today.slice(
    0,
    8
  )}01`;
}

export default function ExportProgressModal({
  open,
  onClose,
}: Props) {
  const [fromDate, setFromDate] =
    useState(getMonthStart);

  const [toDate, setToDate] =
    useState(getTodayIndia);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open) {
    return null;
  }

  async function handleExport() {
    setError("");

    if (!fromDate || !toDate) {
      setError(
        "Please select both dates."
      );

      return;
    }

    if (fromDate > toDate) {
      setError(
        "From date cannot be after the to date."
      );

      return;
    }

    try {
      setLoading(true);

      const query =
        new URLSearchParams({
          from: fromDate,
          to: toDate,
        });

      const response =
        await fetch(
          `/api/progress/export?${query.toString()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      if (!response.ok) {
        let message =
          "Unable to generate PDF.";

        try {
          const result =
            await response.json();

          if (result?.error) {
            message =
              result.error;
          }
        } catch {
          // Ignore JSON parse error.
        }

        throw new Error(
          message
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        `NutriTrack-AI-Progress-${fromDate}-to-${toDate}.pdf`;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );

      onClose();
    } catch (error) {
      console.error(
        "PDF export error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to generate PDF."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/45
        p-4
      "
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-progress-title"
        className="
          flex
          max-h-[calc(100dvh-32px)]
          w-full
          max-w-md
          flex-col
          overflow-hidden
          rounded-[24px]
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-[#e5e8e7]
            px-5
            py-4
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#e8f5f3]
                text-[#004e47]
              "
            >
              <FileDown size={21} />
            </div>

            <div>
              <h2
                id="export-progress-title"
                className="
                  text-lg
                  font-bold
                  text-[#191c1d]
                  sm:text-xl
                "
              >
                Export Progress
              </h2>

              <p
                className="
                  text-sm
                  text-[#6e7977]
                "
              >
                Download your health report.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[#6e7977]
              transition-colors
              hover:bg-[#f2f4f3]
              hover:text-[#191c1d]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={21} />
          </button>
        </div>

        {/* BODY */}

        <div
          className="
            min-h-0
            overflow-y-auto
            p-5
            sm:p-6
          "
        >
          <div className="space-y-5">
            {/* FROM */}

            <div>
              <label
                htmlFor="export-from-date"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#191c1d]
                "
              >
                From Date
              </label>

              <input
                id="export-from-date"
                type="date"
                value={fromDate}
                max={toDate}
                disabled={loading}
                onChange={(event) =>
                  setFromDate(
                    event.target.value
                  )
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#bec9c6]
                  bg-white
                  px-4
                  text-base
                  text-[#191c1d]
                  outline-none
                  transition-colors
                  focus:border-[#004e47]
                  disabled:bg-[#f5f6f6]
                "
              />
            </div>

            {/* TO */}

            <div>
              <label
                htmlFor="export-to-date"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#191c1d]
                "
              >
                To Date
              </label>

              <input
                id="export-to-date"
                type="date"
                value={toDate}
                min={fromDate}
                max={getTodayIndia()}
                disabled={loading}
                onChange={(event) =>
                  setToDate(
                    event.target.value
                  )
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#bec9c6]
                  bg-white
                  px-4
                  text-base
                  text-[#191c1d]
                  outline-none
                  transition-colors
                  focus:border-[#004e47]
                  disabled:bg-[#f5f6f6]
                "
              />
            </div>

            {/* INFORMATION */}

            <div
              className="
                rounded-xl
                border
                border-[#dcebe8]
                bg-[#f3fafa]
                px-4
                py-4
              "
            >
              <p
                className="
                  text-sm
                  font-semibold
                  text-[#004e47]
                "
              >
                Your PDF will contain
              </p>

              <ul
                className="
                  mt-2
                  space-y-1.5
                  text-xs
                  leading-5
                  text-[#6e7977]
                "
              >
                <li>
                  • Progress summary
                </li>

                <li>
                  • Daily calories and protein
                </li>

                <li>
                  • Carbs, fat and fiber
                </li>

                <li>
                  • Meal history
                </li>

                <li>
                  • Activity history
                </li>

                <li>
                  • Weight history
                </li>
              </ul>
            </div>

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-600
                "
              >
                {error}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            shrink-0
            flex-col-reverse
            gap-3
            border-t
            border-[#e5e8e7]
            bg-white
            p-4
            sm:flex-row
            sm:justify-end
            sm:px-6
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              min-h-12
              w-full
              rounded-xl
              border
              border-[#bec9c6]
              px-5
              text-sm
              font-semibold
              text-[#3e4947]
              transition-colors
              hover:bg-[#f5f7f6]
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
              sm:min-w-[110px]
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={loading}
            className="
              inline-flex
              min-h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#004e47]
              px-5
              text-sm
              font-semibold
              text-white
              transition-colors
              hover:bg-[#00685f]
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
              sm:min-w-[165px]
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Creating PDF...
              </>
            ) : (
              <>
                <Download
                  size={17}
                />

                Download PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}