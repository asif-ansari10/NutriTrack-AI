// "use client";

// import {
//   Send,
//   Mic,
// } from "lucide-react";

// interface CoachInputProps {
//   value: string;
//   loading: boolean;
//   onChange: (
//     value: string
//   ) => void;
//   onSend: () => void;
// }

// export default function CoachInput({
//   value,
//   loading,
//   onChange,
//   onSend,
// }: CoachInputProps) {
//   return (
//     <form
//       onSubmit={(event) => {
//         event.preventDefault();

//         if (!loading && value.trim()) {
//           onSend();
//         }
//       }}
//       className="flex items-end gap-2 rounded-[20px] border border-[#bcc9c6] bg-white p-2 shadow-sm focus-within:border-[#00685f] focus-within:ring-1 focus-within:ring-[#00685f]"
//     >
//       <button
//         type="button"
//         aria-label="Voice input"
//         className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#3e4947] transition-colors hover:bg-[#e7f8f5] sm:flex"
//       >
//         <Mic size={20} />
//       </button>

//       <textarea
//         value={value}
//         onChange={(event) =>
//           onChange(
//             event.target.value
//           )
//         }
//         onKeyDown={(event) => {
//           if (
//             event.key ===
//               "Enter" &&
//             !event.shiftKey
//           ) {
//             event.preventDefault();

//             if (
//               value.trim() &&
//               !loading
//             ) {
//               onSend();
//             }
//           }
//         }}
//         rows={1}
//         disabled={loading}
//         placeholder="Ask your coach anything..."
//         className="min-h-11 max-h-32 flex-1 resize-none border-none bg-transparent px-2 py-2.5 text-base text-[#191c1d] outline-none placeholder:text-[#6e7977] focus:ring-0 disabled:opacity-60"
//       />

//       <button
//         type="submit"
//         disabled={
//           loading ||
//           !value.trim()
//         }
//         aria-label="Send message"
//         className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00685f] text-white transition-colors hover:bg-[#005049] disabled:cursor-not-allowed disabled:opacity-40"
//       >
//         <Send size={19} />
//       </button>
//     </form>
//   );
// }

"use client";

import { ArrowUp, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface CoachInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function CoachInput({
  value,
  loading,
  onChange,
  onSend,
}: CoachInputProps) {
  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  /*
   * Automatically grow textarea as the user types.
   */
  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      160
    )}px`;
  }, [value]);

  return (
    <div
      className="
        flex
        items-end
        gap-2
        rounded-[22px]
        border
        border-[#cbd5d3]
        bg-white
        p-2
        shadow-sm
        transition
        focus-within:border-[#00685f]
        focus-within:ring-2
        focus-within:ring-[#00685f]/10
      "
    >
      {/* =====================================================
          TEXTAREA
      ===================================================== */}

      <textarea
        ref={textareaRef}
        value={value}
        disabled={loading}
        rows={1}
        placeholder="Ask your NutriTrack Coach..."
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onKeyDown={(event) => {
          /*
           * IMPORTANT:
           *
           * Enter = new line
           * Shift + Enter = new line
           *
           * We intentionally DO NOT send here.
           *
           * User must click the Send button.
           */
          if (event.key === "Enter") {
            return;
          }
        }}
        className="
          max-h-[160px]
          min-h-[48px]
          flex-1
          resize-none
          overflow-y-auto
          border-0
          bg-transparent
          px-3
          py-3
          text-base
          leading-6
          text-[#191c1d]
          outline-none
          placeholder:text-[#899391]
          focus:border-0
          focus:ring-0
          disabled:opacity-60
        "
      />

      {/* =====================================================
          SEND BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={onSend}
        disabled={
          loading ||
          !value.trim()
        }
        aria-label="Send message"
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#00685f]
          text-white
          transition
          hover:bg-[#005049]
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        {loading ? (
          <Loader2
            size={19}
            className="animate-spin"
          />
        ) : (
          <ArrowUp size={19} />
        )}
      </button>
    </div>
  );
}