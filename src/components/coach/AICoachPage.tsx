// "use client";

// import {
//   Brain,
//   Loader2,
//   MapPin,
// } from "lucide-react";

// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import CoachMessage from "./CoachMessage";
// import CoachInput from "./CoachInput";
// import CoachSummary from "./CoachSummary";

// import type {
//   Restaurant,
// } from "./CoachMessage";

// interface Message {
//   id: string;

//   role:
//     | "user"
//     | "assistant";

//   content: string;

//   restaurants?: Restaurant[];
// }

// interface CoachContextResponse {
//   profile: {
//     full_name: string;

//     daily_calorie_target: number;
//     protein_target_g: number;
//     carbs_target_g: number;
//     fat_target_g: number;
//     fiber_target_g: number;
//   } | null;

//   todayTotals: {
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//     fiber: number;
//     exerciseCalories: number;
//   };

//   remaining: {
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//     fiber: number;
//   };
// }

// const suggestions = [
//   "What should I eat for dinner?",
//   "How much protein do I have left?",
//   "How am I doing this month?",
//   "Find a healthy restaurant near me",
// ];

// export default function AICoachPage() {
//   const [messages, setMessages] =
//     useState<Message[]>([]);

//   const [input, setInput] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [context, setContext] =
//     useState<CoachContextResponse | null>(
//       null
//     );

//   const [location, setLocation] =
//     useState<{
//       latitude: number;
//       longitude: number;
//     } | null>(null);

//   const messagesRef =
//     useRef<HTMLDivElement>(null);

//   /* ====================================================================== */
//   /* LOAD CONTEXT                                                           */
//   /* ====================================================================== */

//   useEffect(() => {
//     async function loadContext() {
//       try {
//         const response =
//           await fetch(
//             "/api/coach/context",
//             {
//               cache: "no-store",
//             }
//           );

//         const result =
//           await response.json();

//         if (
//           response.ok &&
//           result.success
//         ) {
//           setContext(
//             result.context
//           );
//         } else {
//           console.error(
//             "Coach context error:",
//             result.error
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Coach context error:",
//           error
//         );
//       }
//     }

//     loadContext();

//     setMessages([
//       {
//         id: "welcome",
//         role: "assistant",
//         content:
//           "Hi! I'm your NutriTrack Coach. I can use your meals, activities, nutrition targets, weight history and monthly records to help you make better decisions.",
//       },
//     ]);
//   }, []);

//   /* ====================================================================== */
//   /* AUTO SCROLL                                                             */
//   /* ====================================================================== */

//   useEffect(() => {
//     messagesRef.current?.scrollTo({
//       top:
//         messagesRef.current
//           .scrollHeight,
//       behavior: "smooth",
//     });
//   }, [
//     messages,
//     loading,
//   ]);

//   /* ====================================================================== */
//   /* LOCATION                                                                */
//   /* ====================================================================== */

//   function getLocation(): Promise<{
//     latitude: number;
//     longitude: number;
//   } | null> {
//     return new Promise(
//       (resolve) => {
//         if (
//           !navigator.geolocation
//         ) {
//           resolve(null);
//           return;
//         }

//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const coords = {
//               latitude:
//                 position.coords
//                   .latitude,

//               longitude:
//                 position.coords
//                   .longitude,
//             };

//             setLocation(
//               coords
//             );

//             resolve(coords);
//           },

//           () => {
//             resolve(null);
//           },

//           {
//             enableHighAccuracy:
//               true,

//             timeout: 10000,

//             maximumAge:
//               300000,
//           }
//         );
//       }
//     );
//   }

//   /* ====================================================================== */
//   /* SEND MESSAGE                                                            */
//   /* ====================================================================== */

//   async function sendMessage(
//     message?: string
//   ) {
//     const text = (
//       message ?? input
//     ).trim();

//     if (
//       !text ||
//       loading
//     ) {
//       return;
//     }

//     const userMessage: Message = {
//       id: crypto.randomUUID(),
//       role: "user",
//       content: text,
//     };

//     setMessages(
//       (previous) => [
//         ...previous,
//         userMessage,
//       ]
//     );

//     setInput("");
//     setLoading(true);

//     try {
//       const wantsRestaurant =
//         isRestaurantQuestion(
//           text
//         );

//       let currentLocation =
//         location;

//       if (
//         wantsRestaurant &&
//         !currentLocation
//       ) {
//         currentLocation =
//           await getLocation();
//       }

//       const response =
//         await fetch(
//           "/api/coach",
//           {
//             method: "POST",

//             headers: {
//               "Content-Type":
//                 "application/json",
//             },

//             body: JSON.stringify({
//               message: text,

//               /*
//                * Correct API field name.
//                */
//               conversation:
//                 messages
//                   .slice(-10)
//                   .map(
//                     (item) => ({
//                       role:
//                         item.role,

//                       content:
//                         item.content,
//                     })
//                   ),

//               /*
//                * Correct location format.
//                */
//               latitude:
//                 currentLocation
//                   ?.latitude,

//               longitude:
//                 currentLocation
//                   ?.longitude,
//             }),
//           }
//         );

//       const result =
//         await response.json();

//       if (
//         !response.ok ||
//         !result.success
//       ) {
//         throw new Error(
//           result.error ||
//             "Unable to contact your AI Coach."
//         );
//       }

//       setMessages(
//         (previous) => [
//           ...previous,

//           {
//             id:
//               crypto.randomUUID(),

//             role:
//               "assistant",

//             /*
//              * API now returns reply.
//              */
//             content:
//               result.reply ||
//               result.answer ||
//               "I couldn't generate a response.",

//             restaurants:
//               result.restaurants ||
//               [],
//           },
//         ]
//       );
//     } catch (error) {
//       console.error(
//         "Coach request error:",
//         error
//       );

//       setMessages(
//         (previous) => [
//           ...previous,

//           {
//             id:
//               crypto.randomUUID(),

//             role:
//               "assistant",

//             content:
//               error instanceof
//               Error
//                 ? error.message
//                 : "Something went wrong. Please try again.",
//           },
//         ]
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* ====================================================================== */
//   /* UI                                                                      */
//   /* ====================================================================== */

//   return (
//     <div className="flex min-h-[calc(100dvh-72px)] flex-col overflow-hidden bg-[#f8f9fa] xl:h-screen xl:flex-row">

//       {/* ================================================================== */}
//       {/* SUMMARY                                                            */}
//       {/* ================================================================== */}

//       {context && (
//         <CoachSummary
//           calories={
//             context
//               .todayTotals
//               .calories
//           }

//           calorieTarget={
//             context.profile
//               ?.daily_calorie_target ||
//             0
//           }

//           protein={
//             context
//               .todayTotals
//               .protein
//           }

//           proteinTarget={
//             context.profile
//               ?.protein_target_g ||
//             0
//           }

//           carbs={
//             context
//               .todayTotals
//               .carbs
//           }

//           carbsTarget={
//             context.profile
//               ?.carbs_target_g ||
//             0
//           }

//           fat={
//             context
//               .todayTotals
//               .fat
//           }

//           fatTarget={
//             context.profile
//               ?.fat_target_g ||
//             0
//           }

//           fiber={
//             context
//               .todayTotals
//               .fiber
//           }

//           fiberTarget={
//             context.profile
//               ?.fiber_target_g ||
//             0
//           }

//           exerciseCalories={
//             context
//               .todayTotals
//               .exerciseCalories
//           }
//         />
//       )}

//       {/* ================================================================== */}
//       {/* CHAT                                                               */}
//       {/* ================================================================== */}

//       <section className="flex min-h-0 flex-1 flex-col">

//         {/* HEADER */}

//         <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e1e3e4] bg-white px-4 sm:px-6">

//           <div className="flex items-center gap-3">

//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00685f] text-white">
//               <Brain size={21} />
//             </div>

//             <div>
//               <h1 className="text-base font-semibold text-[#191c1d]">
//                 NutriTrack Coach
//               </h1>

//               <p className="text-xs text-[#6e7977]">
//                 Your personal nutrition assistant
//               </p>
//             </div>

//           </div>

//           <button
//             type="button"
//             onClick={getLocation}
//             className="flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#00685f] hover:bg-[#e7f8f5]"
//           >
//             <MapPin size={17} />

//             <span className="hidden sm:inline">
//               {location
//                 ? "Location ready"
//                 : "Location"}
//             </span>
//           </button>

//         </header>

//         {/* ================================================================== */}
//         {/* MESSAGES                                                           */}
//         {/* ================================================================== */}

//         <div
//           ref={messagesRef}
//           className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8"
//         >
//           <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">

//             {messages.map(
//               (message) => (
//                 <CoachMessage
//                   key={
//                     message.id
//                   }
//                   role={
//                     message.role
//                   }
//                   content={
//                     message.content
//                   }
//                   restaurants={
//                     message.restaurants
//                   }
//                 />
//               )
//             )}

//             {loading && (
//               <div className="flex gap-3">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00685f] text-white">
//                   <Brain size={18} />
//                 </div>

//                 <div className="rounded-2xl rounded-tl-sm border border-[#e1e3e4] bg-white px-4 py-3">
//                   <Loader2
//                     size={18}
//                     className="animate-spin text-[#00685f]"
//                   />
//                 </div>

//               </div>
//             )}

//           </div>
//         </div>

//         {/* ================================================================== */}
//         {/* INPUT                                                              */}
//         {/* ================================================================== */}

//         <div className="shrink-0 border-t border-[#e1e3e4] bg-white px-3 pb-3 pt-2 sm:px-6 sm:pb-5">

//           <div className="mx-auto max-w-4xl">

//             <div className="mb-2 flex gap-2 overflow-x-auto pb-1">

//               {suggestions.map(
//                 (suggestion) => (
//                   <button
//                     key={
//                       suggestion
//                     }
//                     type="button"
//                     disabled={
//                       loading
//                     }
//                     onClick={() =>
//                       sendMessage(
//                         suggestion
//                       )
//                     }
//                     className="shrink-0 rounded-full border border-[#e1e3e4] bg-[#f3f4f5] px-3 py-2 text-xs font-medium text-[#3e4947] hover:bg-[#e7e8e9] disabled:opacity-50 sm:text-sm"
//                   >
//                     {suggestion}
//                   </button>
//                 )
//               )}

//             </div>

//             <CoachInput
//               value={input}
//               loading={loading}
//               onChange={
//                 setInput
//               }
//               onSend={() =>
//                 sendMessage()
//               }
//             />

//             <p className="mt-2 text-center text-[10px] text-[#6e7977]">
//               NutriTrack Coach uses
//               your NutriTrack records
//               to personalize
//               recommendations.
//             </p>

//           </div>

//         </div>

//       </section>
//     </div>
//   );
// }

// /* ========================================================================== */
// /* RESTAURANT QUESTION                                                        */
// /* ========================================================================== */

// function isRestaurantQuestion(
//   message: string
// ) {
//   const text =
//     message.toLowerCase();

//   return [
//     "restaurant",
//     "restaurants",
//     "healthy restaurant",
//     "healthy food near",
//     "food near me",
//     "restaurant near me",
//     "restaurants near me",
//     "near me",
//     "nearby restaurant",
//     "nearby food",
//     "place to eat",
//     "where can i eat",
//     "cafe near me",
//   ].some(
//     (keyword) =>
//       text.includes(keyword)
//   );
// }


"use client";

import {
  Brain,
  Loader2,
  MapPin,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import CoachMessage from "./CoachMessage";
import CoachInput from "./CoachInput";
import CoachSummary from "./CoachSummary";

import type {
  Restaurant,
} from "./CoachMessage";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Message {
  id: string;

  role:
    | "user"
    | "assistant";

  content: string;

  restaurants?: Restaurant[];
}

interface CoachContextResponse {
  profile: {
    full_name: string;

    daily_calorie_target: number;
    protein_target_g: number;
    carbs_target_g: number;
    fat_target_g: number;
    fiber_target_g: number;
  } | null;

  todayTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    exerciseCalories: number;
  };

  remaining: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

/* -------------------------------------------------------------------------- */
/* Suggestions                                                                */
/* -------------------------------------------------------------------------- */

const suggestions = [
  "What should I eat for dinner?",
  "How much protein do I have left?",
  "How am I doing this month?",
  "Find a healthy restaurant near me",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function AICoachPage() {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [context, setContext] =
    useState<CoachContextResponse | null>(
      null
    );

  const [location, setLocation] =
    useState<LocationCoordinates | null>(
      null
    );

  const messagesRef =
    useRef<HTMLDivElement>(null);

  /* ======================================================================== */
  /* LOAD CONTEXT                                                             */
  /* ======================================================================== */

  useEffect(() => {
    async function loadContext() {
      try {
        const response =
          await fetch(
            "/api/coach/context",
            {
              cache: "no-store",
            }
          );

        const result =
          await response.json();

        if (
          response.ok &&
          result.success
        ) {
          setContext(
            result.context
          );
        } else {
          console.error(
            "Coach context error:",
            result.error
          );
        }
      } catch (error) {
        console.error(
          "Coach context error:",
          error
        );
      }
    }

    loadContext();

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your NutriTrack Coach. I can use your meals, activities, nutrition targets, weight history and monthly records to help you make better decisions.",
      },
    ]);
  }, []);

  /* ======================================================================== */
  /* AUTO SCROLL                                                              */
  /* ======================================================================== */

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top:
        messagesRef.current
          .scrollHeight,

      behavior: "smooth",
    });
  }, [
    messages,
    loading,
  ]);

  /* ======================================================================== */
  /* LOCATION                                                                 */
  /* ======================================================================== */

  function getLocation(): Promise<LocationCoordinates> {
    return new Promise(
      (resolve, reject) => {
        if (
          !navigator.geolocation
        ) {
          reject(
            new Error(
              "Geolocation is not supported by this browser."
            )
          );

          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coordinates: LocationCoordinates =
              {
                latitude:
                  position.coords
                    .latitude,

                longitude:
                  position.coords
                    .longitude,
              };

            console.log(
              "[NutriTrack Coach] Browser location:",
              coordinates
            );

            /*
             * Save it for future restaurant searches.
             */
            setLocation(
              coordinates
            );

            /*
             * IMPORTANT:
             *
             * Return the coordinates immediately.
             *
             * React state updates are asynchronous, so we must NOT depend
             * on `location` immediately after calling setLocation().
             */
            resolve(
              coordinates
            );
          },

          (error) => {
            console.error(
              "[NutriTrack Coach] Geolocation error:",
              error
            );

            let message =
              "Unable to get your location.";

            switch (error.code) {
              case error.PERMISSION_DENIED:
                message =
                  "Location permission was denied. Please allow location access for NutriTrack and try again.";
                break;

              case error.POSITION_UNAVAILABLE:
                message =
                  "Your location is currently unavailable. Please try again.";
                break;

              case error.TIMEOUT:
                message =
                  "The location request timed out. Please try again.";
                break;

              default:
                message =
                  "Unable to get your location. Please try again.";
            }

            reject(
              new Error(message)
            );
          },

          {
            enableHighAccuracy:
              true,

            timeout: 10000,

            maximumAge:
              300000,
          }
        );
      }
    );
  }

  /* ======================================================================== */
  /* SEND MESSAGE                                                             */
  /* ======================================================================== */

  async function sendMessage(
    message?: string
  ) {
    const text = (
      message ?? input
    ).trim();

    if (
      !text ||
      loading
    ) {
      return;
    }

    /* ---------------------------------------------------------------------- */
    /* Add user message immediately                                           */
    /* ---------------------------------------------------------------------- */

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages(
      (previous) => [
        ...previous,
        userMessage,
      ]
    );

    setInput("");
    setLoading(true);

    try {
      /* -------------------------------------------------------------------- */
      /* Check whether this is a nearby restaurant request                    */
      /* -------------------------------------------------------------------- */

      const wantsRestaurant =
        isRestaurantQuestion(
          text
        );

      /*
       * Start with already-known location.
       */
      let locationForRequest =
        location;

      /*
       * If restaurant search is requested and we don't have a location,
       * request it from the browser.
       */
      if (
        wantsRestaurant &&
        !locationForRequest
      ) {
        try {
          locationForRequest =
            await getLocation();
        } catch (error) {
          console.error(
            "[NutriTrack Coach] Location request failed:",
            error
          );

          setMessages(
            (previous) => [
              ...previous,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content:
                  error instanceof Error
                    ? error.message
                    : "I need your location to find nearby restaurants. Please allow location access and try again.",
              },
            ]
          );

          return;
        }
      }

      /* -------------------------------------------------------------------- */
      /* Send request                                                         */
      /* -------------------------------------------------------------------- */

      const response =
        await fetch(
          "/api/coach",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message: text,

              /*
               * Send recent conversation history.
               */
              conversation:
                messages
                  .slice(-10)
                  .map(
                    (item) => ({
                      role:
                        item.role,

                      content:
                        item.content,
                    })
                  ),

              /*
               * IMPORTANT:
               *
               * Use locationForRequest rather than `location`.
               *
               * When getLocation() has just completed, React may not have
               * updated the location state yet.
               */
              latitude:
                locationForRequest
                  ?.latitude,

              longitude:
                locationForRequest
                  ?.longitude,
            }),
          }
        );

      const result =
        await response.json();

      console.log(
        "[NutriTrack Coach] API response:",
        result
      );

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            "Unable to contact your AI Coach."
        );
      }

      /* -------------------------------------------------------------------- */
      /* Add assistant response                                               */
      /* -------------------------------------------------------------------- */

      const assistantMessage: Message =
        {
          id: crypto.randomUUID(),

          role: "assistant",

          content:
            result.reply ||
            result.answer ||
            "I couldn't generate a response.",

          /*
           * Restaurant results come directly from our backend.
           */
          restaurants:
            Array.isArray(
              result.restaurants
            )
              ? result.restaurants
              : [],
        };

      setMessages(
        (previous) => [
          ...previous,
          assistantMessage,
        ]
      );
    } catch (error) {
      console.error(
        "[NutriTrack Coach] Request error:",
        error
      );

      setMessages(
        (previous) => [
          ...previous,

          {
            id: crypto.randomUUID(),

            role: "assistant",

            content:
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.",
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  }

  /* ======================================================================== */
  /* UI                                                                       */
  /* ======================================================================== */

  return (
    <div className="flex min-h-[calc(100dvh-72px)] flex-col overflow-hidden bg-[#f8f9fa] xl:h-screen xl:flex-row">
      {/* ================================================================== */}
      {/* SUMMARY                                                            */}
      {/* ================================================================== */}

      {context && (
        <CoachSummary
          calories={
            context
              .todayTotals
              .calories
          }

          calorieTarget={
            context.profile
              ?.daily_calorie_target ||
            0
          }

          protein={
            context
              .todayTotals
              .protein
          }

          proteinTarget={
            context.profile
              ?.protein_target_g ||
            0
          }

          carbs={
            context
              .todayTotals
              .carbs
          }

          carbsTarget={
            context.profile
              ?.carbs_target_g ||
            0
          }

          fat={
            context
              .todayTotals
              .fat
          }

          fatTarget={
            context.profile
              ?.fat_target_g ||
            0
          }

          fiber={
            context
              .todayTotals
              .fiber
          }

          fiberTarget={
            context.profile
              ?.fiber_target_g ||
            0
          }

          exerciseCalories={
            context
              .todayTotals
              .exerciseCalories
          }
        />
      )}

      {/* ================================================================== */}
      {/* CHAT                                                               */}
      {/* ================================================================== */}

      <section className="flex min-h-0 flex-1 flex-col">
        {/* ================================================================= */}
        {/* HEADER                                                            */}
        {/* ================================================================= */}

        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e1e3e4] bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00685f] text-white">
              <Brain size={21} />
            </div>

            <div>
              <h1 className="text-base font-semibold text-[#191c1d]">
                NutriTrack Coach
              </h1>

              <p className="text-xs text-[#6e7977]">
                Your personal nutrition assistant
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Location button                                                 */}
          {/* ---------------------------------------------------------------- */}

          <button
            type="button"
            onClick={async () => {
              try {
                await getLocation();
              } catch (error) {
                console.error(
                  "Location error:",
                  error
                );
              }
            }}
            className="flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#00685f] transition-colors hover:bg-[#e7f8f5]"
          >
            <MapPin size={17} />

            <span className="hidden sm:inline">
              {location
                ? "Location ready"
                : "Location"}
            </span>
          </button>
        </header>

        {/* ================================================================= */}
        {/* MESSAGES                                                          */}
        {/* ================================================================= */}

        <div
          ref={messagesRef}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
            {messages.map(
              (message) => (
                <CoachMessage
                  key={
                    message.id
                  }
                  role={
                    message.role
                  }
                  content={
                    message.content
                  }
                  restaurants={
                    message.restaurants
                  }
                />
              )
            )}

            {/* -------------------------------------------------------------- */}
            {/* Loading                                                         */}
            {/* -------------------------------------------------------------- */}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00685f] text-white">
                  <Brain size={18} />
                </div>

                <div className="rounded-2xl rounded-tl-sm border border-[#e1e3e4] bg-white px-4 py-3">
                  <Loader2
                    size={18}
                    className="animate-spin text-[#00685f]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* INPUT                                                             */}
        {/* ================================================================= */}

        <div className="shrink-0 border-t border-[#e1e3e4] bg-white px-3 pb-3 pt-2 sm:px-6 sm:pb-5">
          <div className="mx-auto max-w-4xl">
            {/* -------------------------------------------------------------- */}
            {/* Suggestions                                                    */}
            {/* -------------------------------------------------------------- */}

            <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
              {suggestions.map(
                (suggestion) => (
                  <button
                    key={
                      suggestion
                    }
                    type="button"
                    disabled={
                      loading
                    }
                    onClick={() =>
                      sendMessage(
                        suggestion
                      )
                    }
                    className="shrink-0 rounded-full border border-[#e1e3e4] bg-[#f3f4f5] px-3 py-2 text-xs font-medium text-[#3e4947] transition-colors hover:bg-[#e7e8e9] disabled:opacity-50 sm:text-sm"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>

            {/* -------------------------------------------------------------- */}
            {/* Input                                                          */}
            {/* -------------------------------------------------------------- */}

            <CoachInput
              value={input}
              loading={loading}
              onChange={
                setInput
              }
              onSend={() =>
                sendMessage()
              }
            />

            <p className="mt-2 text-center text-[10px] text-[#6e7977]">
              NutriTrack Coach uses
              your NutriTrack records
              to personalize
              recommendations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========================================================================== */
/* RESTAURANT QUESTION                                                        */
/* ========================================================================== */

function isRestaurantQuestion(
  message: string
): boolean {
  const text =
    message.toLowerCase().trim();

  /*
   * Only request browser location when the user is actually asking for
   * nearby/local places.
   *
   * This prevents questions such as:
   *
   * "Is restaurant food healthy?"
   *
   * from unnecessarily asking for location.
   */
  const patterns = [
    "restaurant near me",
    "restaurants near me",
    "nearby restaurant",
    "nearby restaurants",
    "healthy restaurant near me",
    "healthy restaurants near me",
    "food near me",
    "healthy food near me",
    "eat near me",
    "place to eat near me",
    "cafe near me",
    "cafes near me",
    "restaurants nearby",
    "food nearby",
    "places to eat nearby",
    "find a restaurant",
    "find restaurants",
    "find food near",
  ];

  return patterns.some(
    (keyword) =>
      text.includes(keyword)
  );
}