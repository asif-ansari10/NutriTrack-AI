// "use client";

// import {
//   Camera,
//   X,
//   Loader2,
//   Sparkles,
//   Check,
//   CalendarDays,
//   Utensils,
//   Pencil,
//   AlertCircle,
//   RotateCcw,
//   Image as ImageIcon,
// } from "lucide-react";

// import {
//   ChangeEvent,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// interface AnalysisResult {
//   meal_type: string;
//   meal_date: string;
//   name: string;
//   description: string;
//   calories: number;
//   protein_g: number;
//   carbs_g: number;
//   fat_g: number;
//   serving_size?: string;
//   confidence: number;
// }

// const MEAL_TYPES = [
//   "breakfast",
//   "lunch",
//   "snack",
//   "dinner",
// ];

// function getToday() {
//   const now = new Date();

//   const year = now.getFullYear();

//   const month = String(
//     now.getMonth() + 1
//   ).padStart(2, "0");

//   const day = String(
//     now.getDate()
//   ).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }

// /* --------------------------------
//    CAMERA ERROR
// -------------------------------- */

// function getCameraErrorMessage(
//   error: unknown
// ) {
//   if (error instanceof DOMException) {
//     switch (error.name) {
//       case "NotAllowedError":
//         return "Camera permission was denied. Please allow camera access in your browser.";

//       case "NotFoundError":
//         return "No camera was found on this device.";

//       case "NotReadableError":
//         return "The camera could not be started. It may already be in use by another application.";

//       case "OverconstrainedError":
//         return "The requested camera is not available.";

//       case "SecurityError":
//         return "Camera access was blocked by the browser.";

//       case "AbortError":
//         return "Camera startup was interrupted. Please try again.";

//       default:
//         return `Could not open the camera (${error.name}).`;
//     }
//   }

//   if (error instanceof Error) {
//     return error.message;
//   }

//   return "Could not open the camera.";
// }

// /* --------------------------------
//    BASE64 HELPER
// -------------------------------- */

// function fileToBase64(
//   file: File
// ): Promise<string> {
//   return new Promise(
//     (resolve, reject) => {
//       const reader =
//         new FileReader();

//       reader.onload = () => {
//         const result =
//           reader.result;

//         if (
//           typeof result !== "string"
//         ) {
//           reject(
//             new Error(
//               "Could not read image."
//             )
//           );

//           return;
//         }

//         /*
//          * FileReader returns:
//          *
//          * data:image/jpeg;base64,XXXX
//          *
//          * Gemini endpoint expects only:
//          *
//          * XXXX
//          */

//         const base64 =
//           result.split(",")[1];

//         if (!base64) {
//           reject(
//             new Error(
//               "Invalid image data."
//             )
//           );

//           return;
//         }

//         resolve(base64);
//       };

//       reader.onerror = () => {
//         reject(
//           new Error(
//             "Could not read image."
//           )
//         );
//       };

//       reader.readAsDataURL(file);
//     }
//   );
// }

// /* --------------------------------
//    MAIN COMPONENT
// -------------------------------- */

// export default function ScanPage() {
//   /* --------------------------------
//      FILE INPUTS
//   -------------------------------- */

//   const cameraInputRef =
//     useRef<HTMLInputElement>(null);

//   const galleryInputRef =
//     useRef<HTMLInputElement>(null);

//   /* --------------------------------
//      CAMERA
     
//      IMPORTANT:
//      Use REF instead of state for
//      MediaStream.

//      This prevents React state changes
//      from accidentally stopping the
//      active camera stream.
//   -------------------------------- */

//   const videoRef =
//     useRef<HTMLVideoElement>(null);

//   const cameraStreamRef =
//     useRef<MediaStream | null>(null);

//   const [cameraOpen, setCameraOpen] =
//     useState(false);

//   const [cameraLoading, setCameraLoading] =
//     useState(false);

//   const [cameraError, setCameraError] =
//     useState("");

//   /* --------------------------------
//      IMAGE
//   -------------------------------- */

//   const [imageFile, setImageFile] =
//     useState<File | null>(null);

//   const [imagePreview, setImagePreview] =
//     useState<string | null>(null);

//   /* --------------------------------
//      FORM
//   -------------------------------- */

//   const [mealType, setMealType] =
//     useState("breakfast");

//   const [mealDate, setMealDate] =
//     useState(getToday());

//   const [description, setDescription] =
//     useState("");

//   /* --------------------------------
//      AI
//   -------------------------------- */

//   const [analysis, setAnalysis] =
//     useState<AnalysisResult | null>(
//       null
//     );

//   const [analyzing, setAnalyzing] =
//     useState(false);

//   const [saving, setSaving] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   const [success, setSuccess] =
//     useState("");

//   const [editing, setEditing] =
//     useState(false);

//   /* --------------------------------
//      CAMERA START

//      IMPORTANT FIX:
//      This function uses cameraStreamRef,
//      NOT state.

//      Also no dependency on cameraStream.
//   -------------------------------- */

//   async function startCamera() {
//     setCameraLoading(true);
//     setCameraError("");

//     try {
//       if (
//         typeof window === "undefined"
//       ) {
//         return;
//       }

//       if (
//         !navigator.mediaDevices ||
//         !navigator.mediaDevices
//           .getUserMedia
//       ) {
//         throw new Error(
//           "Camera access is not supported by this browser."
//         );
//       }

//       /*
//        * Stop an old camera stream first.
//        */

//       if (
//         cameraStreamRef.current
//       ) {
//         cameraStreamRef.current
//           .getTracks()
//           .forEach((track) => {
//             track.stop();
//           });

//         cameraStreamRef.current =
//           null;
//       }

//       /*
//        * Wait until the video element
//        * exists in the DOM.
//        */

//       await new Promise<void>(
//         (resolve) => {
//           requestAnimationFrame(
//             () => resolve()
//           );
//         }
//       );

//       /*
//        * Laptop/Desktop:
//        * Do NOT force "environment".
//        *
//        * On a laptop there is normally
//        * only one webcam.
//        */

//       const stream =
//         await navigator.mediaDevices.getUserMedia(
//           {
//             video: {
//               width: {
//                 ideal: 1280,
//               },
//               height: {
//                 ideal: 720,
//               },
//               frameRate: {
//                 ideal: 30,
//               },
//             },
//             audio: false,
//           }
//         );

//       cameraStreamRef.current =
//         stream;

//       const video =
//         videoRef.current;

//       if (!video) {
//         stream
//           .getTracks()
//           .forEach((track) =>
//             track.stop()
//           );

//         cameraStreamRef.current =
//           null;

//         throw new Error(
//           "Camera video element is not ready."
//         );
//       }

//       /*
//        * Attach stream to video.
//        */

//       video.srcObject = stream;

//       video.muted = true;

//       video.autoplay = true;

//       video.playsInline = true;

//       /*
//        * Wait for video metadata.
//        */

//       await new Promise<void>(
//         (resolve) => {
//           if (
//             video.readyState >= 2
//           ) {
//             resolve();

//             return;
//           }

//           const handleLoaded =
//             () => {
//               video.removeEventListener(
//                 "loadedmetadata",
//                 handleLoaded
//               );

//               resolve();
//             };

//           video.addEventListener(
//             "loadedmetadata",
//             handleLoaded
//           );
//         }
//       );

//       /*
//        * Start playback.
//        */

//       await video.play();

//       setCameraLoading(false);
//     } catch (err) {
//       console.error(
//         "Camera error:",
//         err
//       );

//       /*
//        * Clean failed stream.
//        */

//       if (
//         cameraStreamRef.current
//       ) {
//         cameraStreamRef.current
//           .getTracks()
//           .forEach((track) =>
//             track.stop()
//           );

//         cameraStreamRef.current =
//           null;
//       }

//       if (videoRef.current) {
//         videoRef.current.srcObject =
//           null;
//       }

//       setCameraLoading(false);

//       setCameraError(
//         getCameraErrorMessage(err)
//       );
//     }
//   }

//   /* --------------------------------
//      OPEN CAMERA
//   -------------------------------- */

//   async function handleTakePhoto() {
//     setError("");
//     setSuccess("");
//     setCameraError("");

//     /*
//      * On mobile devices:
//      *
//      * Use native camera.
//      *
//      * This gives Android/iPhone the
//      * best camera experience.
//      */

//     const isMobile =
//       /Android|iPhone|iPad|iPod/i.test(
//         navigator.userAgent
//       );

//     if (isMobile) {
//       cameraInputRef.current?.click();

//       return;
//     }

//     /*
//      * Desktop/Laptop:
//      *
//      * Open webcam using getUserMedia.
//      */

//     setCameraOpen(true);

//     /*
//      * Wait for modal/video element
//      * to render before requesting camera.
//      */

//     setTimeout(() => {
//       startCamera();
//     }, 50);
//   }

//   /* --------------------------------
//      CLOSE CAMERA
//   -------------------------------- */

//   function closeCamera() {
//     /*
//      * Stop actual camera tracks.
//      */

//     if (
//       cameraStreamRef.current
//     ) {
//       cameraStreamRef.current
//         .getTracks()
//         .forEach((track) => {
//           track.stop();
//         });

//       cameraStreamRef.current =
//         null;
//     }

//     /*
//      * Detach video.
//      */

//     if (videoRef.current) {
//       videoRef.current.pause();

//       videoRef.current.srcObject =
//         null;
//     }

//     setCameraLoading(false);
//     setCameraError("");
//     setCameraOpen(false);
//   }

//   /* --------------------------------
//      CAPTURE PHOTO
//   -------------------------------- */

//   function capturePhoto() {
//     const video =
//       videoRef.current;

//     if (!video) {
//       setCameraError(
//         "Camera is not ready."
//       );

//       return;
//     }

//     /*
//      * Make sure camera actually
//      * produced video frames.
//      */

//     if (
//       video.videoWidth === 0 ||
//       video.videoHeight === 0
//     ) {
//       setCameraError(
//         "Camera is not ready yet. Please wait a moment."
//       );

//       return;
//     }

//     const canvas =
//       document.createElement(
//         "canvas"
//       );

//     canvas.width =
//       video.videoWidth;

//     canvas.height =
//       video.videoHeight;

//     const context =
//       canvas.getContext("2d");

//     if (!context) {
//       setCameraError(
//         "Could not capture image."
//       );

//       return;
//     }

//     context.drawImage(
//       video,
//       0,
//       0,
//       canvas.width,
//       canvas.height
//     );

//     canvas.toBlob(
//       (blob) => {
//         if (!blob) {
//           setCameraError(
//             "Could not create image."
//           );

//           return;
//         }

//         const file =
//           new File(
//             [blob],
//             `meal-${Date.now()}.jpg`,
//             {
//               type: "image/jpeg",
//             }
//           );

//         /*
//          * Save captured photo.
//          */

//         handleImage(file);

//         /*
//          * Close camera.
//          */

//         closeCamera();
//       },
//       "image/jpeg",
//       0.9
//     );
//   }

//   /* --------------------------------
//      HANDLE IMAGE
//   -------------------------------- */

//   function handleImage(
//     file: File
//   ) {
//     setError("");
//     setSuccess("");
//     setAnalysis(null);

//     if (
//       !file.type.startsWith("image/")
//     ) {
//       setError(
//         "Please select an image file."
//       );

//       return;
//     }

//     if (
//       file.size >
//       10 * 1024 * 1024
//     ) {
//       setError(
//         "Image must be smaller than 10MB."
//       );

//       return;
//     }

//     /*
//      * Remove previous preview.
//      */

//     if (imagePreview) {
//       URL.revokeObjectURL(
//         imagePreview
//       );
//     }

//     const preview =
//       URL.createObjectURL(file);

//     setImageFile(file);

//     setImagePreview(preview);
//   }

//   /* --------------------------------
//      FILE INPUT
//   -------------------------------- */

//   function handleFileChange(
//     event: ChangeEvent<HTMLInputElement>
//   ) {
//     const file =
//       event.target.files?.[0];

//     if (file) {
//       handleImage(file);
//     }

//     /*
//      * Reset input so selecting the
//      * same image again still triggers
//      * onChange.
//      */

//     event.target.value = "";
//   }

//   /* --------------------------------
//      REMOVE IMAGE
//   -------------------------------- */

//   function removeImage() {
//     if (imagePreview) {
//       URL.revokeObjectURL(
//         imagePreview
//       );
//     }

//     setImageFile(null);
//     setImagePreview(null);
//     setAnalysis(null);
//   }

//   /* --------------------------------
//      ANALYZE MEAL
     
//      IMPORTANT FIX:
     
//      Your /api/scan/analyze route
//      expects JSON:
     
//      {
//        image,
//        mimeType,
//        description
//      }
     
//      NOT FormData.
//   -------------------------------- */

//   async function analyzeMeal() {
//     setError("");
//     setSuccess("");

//     if (!imageFile) {
//       setError(
//         "Please take or upload a meal photo."
//       );

//       return;
//     }

//     if (!description.trim()) {
//       setError(
//         "Please describe what you ate."
//       );

//       return;
//     }

//     if (!mealDate) {
//       setError(
//         "Please select a meal date."
//       );

//       return;
//     }

//     try {
//       setAnalyzing(true);

//       /*
//        * Convert image to base64.
//        */

//       const base64 =
//         await fileToBase64(
//           imageFile
//         );

//       /*
//        * Your existing API expects
//        * JSON.
//        */

//       const response =
//         await fetch(
//           "/api/scan/analyze",
//           {
//             method: "POST",

//             headers: {
//               "Content-Type":
//                 "application/json",
//             },

//             body: JSON.stringify({
//               image: base64,

//               mimeType:
//                 imageFile.type,

//               description:
//                 description.trim(),

//               meal_type:
//                 mealType,

//               meal_date:
//                 mealDate,
//             }),
//           }
//         );

//       const result =
//         await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.error ||
//             "Meal analysis failed."
//         );
//       }

//       /*
//        * IMPORTANT:
//        *
//        * Your current API returns
//        * the parsed Gemini object
//        * directly.
//        *
//        * Therefore:
//        *
//        * result
//        *
//        * NOT:
//        *
//        * result.data
//        */

//       const data =
//         result as AnalysisResult;

//       if (!data) {
//         throw new Error(
//           "No analysis returned."
//         );
//       }

//       /*
//        * Normalize meal type.
//        */

//       const returnedMealType =
//         MEAL_TYPES.includes(
//           data.meal_type
//         )
//           ? data.meal_type
//           : mealType;

//       /*
//        * Use selected date if API
//        * doesn't return one.
//        */

//       const returnedDate =
//         data.meal_date ||
//         mealDate;

//       const normalized: AnalysisResult =
//         {
//           meal_type:
//             returnedMealType,

//           meal_date:
//             returnedDate,

//           name:
//             data.name ||
//             "Meal",

//           description:
//             data.description ||
//             description,

//           calories:
//             Math.max(
//               0,
//               Number(
//                 data.calories
//               ) || 0
//             ),

//           protein_g:
//             Math.max(
//               0,
//               Number(
//                 data.protein_g
//               ) || 0
//             ),

//           carbs_g:
//             Math.max(
//               0,
//               Number(
//                 data.carbs_g
//               ) || 0
//             ),

//           fat_g:
//             Math.max(
//               0,
//               Number(
//                 data.fat_g
//               ) || 0
//             ),

//           serving_size:
//             data.serving_size ||
//             "",

//           confidence:
//             Math.min(
//               1,
//               Math.max(
//                 0,
//                 Number(
//                   data.confidence
//                 ) || 0
//               )
//             ),
//         };

//       setAnalysis(
//         normalized
//       );

//       setMealType(
//         returnedMealType
//       );

//       setMealDate(
//         returnedDate
//       );

//       setEditing(false);
//     } catch (err) {
//       console.error(
//         "Analysis error:",
//         err
//       );

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Could not analyze meal."
//       );
//     } finally {
//       setAnalyzing(false);
//     }
//   }

//   /* --------------------------------
//      UPDATE ANALYSIS
//   -------------------------------- */

//   function updateAnalysis(
//     field: keyof AnalysisResult,
//     value: string | number
//   ) {
//     if (!analysis) {
//       return;
//     }

//     setAnalysis({
//       ...analysis,
//       [field]: value,
//     });
//   }

//   /* --------------------------------
//      SAVE MEAL
     
//      Uses your existing:
     
//      POST /api/scan/save
//   -------------------------------- */

//   async function saveMeal() {
//     if (!analysis) {
//       return;
//     }

//     setError("");
//     setSuccess("");

//     try {
//       setSaving(true);

//       const response =
//         await fetch(
//           "/api/scan/save",
//           {
//             method: "POST",

//             headers: {
//               "Content-Type":
//                 "application/json",
//             },

//             body: JSON.stringify({
//               meal_type:
//                 analysis.meal_type,

//               meal_date:
//                 analysis.meal_date,

//               name:
//                 analysis.name,

//               description:
//                 analysis.description,

//               calories:
//                 Number(
//                   analysis.calories
//                 ),

//               protein_g:
//                 Number(
//                   analysis.protein_g
//                 ),

//               carbs_g:
//                 Number(
//                   analysis.carbs_g
//                 ),

//               fat_g:
//                 Number(
//                   analysis.fat_g
//                 ),

//               serving_size:
//                 analysis.serving_size ||
//                 "",

//               ai_analyzed: true,

//               ai_confidence:
//                 Number(
//                   analysis.confidence
//                 ),
//             }),
//           }
//         );

//       const result =
//         await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.error ||
//             "Could not save meal."
//         );
//       }

//       setSuccess(
//         "Meal added to your diary successfully."
//       );

//       /*
//        * Remove preview.
//        */

//       if (imagePreview) {
//         URL.revokeObjectURL(
//           imagePreview
//         );
//       }

//       setImageFile(null);
//       setImagePreview(null);

//       setDescription("");

//       setMealType(
//         "breakfast"
//       );

//       setMealDate(
//         getToday()
//       );

//       setAnalysis(null);
//       setEditing(false);
//     } catch (err) {
//       console.error(
//         "Save error:",
//         err
//       );

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Could not save meal."
//       );
//     } finally {
//       setSaving(false);
//     }
//   }

//   /* --------------------------------
//      ANALYZE ANOTHER
//   -------------------------------- */

//   function analyzeAnother() {
//     if (imagePreview) {
//       URL.revokeObjectURL(
//         imagePreview
//       );
//     }

//     setImageFile(null);
//     setImagePreview(null);
//     setDescription("");
//     setAnalysis(null);
//     setError("");
//     setSuccess("");
//     setEditing(false);
//     setMealType("breakfast");
//     setMealDate(getToday());
//   }

//   /* --------------------------------
//      CAMERA CLEANUP
     
//      IMPORTANT:
     
//      Only cleanup on component
//      unmount.
     
//      NOT when camera stream changes.
//   -------------------------------- */

//   useEffect(() => {
//     return () => {
//       if (
//         cameraStreamRef.current
//       ) {
//         cameraStreamRef.current
//           .getTracks()
//           .forEach((track) =>
//             track.stop()
//           );

//         cameraStreamRef.current =
//           null;
//       }

//       if (videoRef.current) {
//         videoRef.current.srcObject =
//           null;
//       }
//     };
//   }, []);

//   /* --------------------------------
//      IMAGE PREVIEW CLEANUP
//   -------------------------------- */

//   useEffect(() => {
//     return () => {
//       if (imagePreview) {
//         URL.revokeObjectURL(
//           imagePreview
//         );
//       }
//     };
//   }, [imagePreview]);

//   /* --------------------------------
//      UI
//   -------------------------------- */

//   return (
//     <main className="min-h-screen bg-[#f7f8f8]">
//       <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

//         {/* HEADER */}

//         <div className="mb-6 sm:mb-8">
//           <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#3e4947]">
//             AI Nutrition Scanner
//           </p>

//           <h1 className="text-3xl font-bold tracking-tight text-[#191c1d] sm:text-4xl">
//             Scan Your Meal
//           </h1>

//           <p className="mt-2 max-w-2xl text-sm text-[#3e4947] sm:text-base">
//             Take a photo or choose one
//             from your device, describe your
//             meal, and let AI estimate its
//             nutrition.
//           </p>
//         </div>

//         {/* ERROR */}

//         {error && (
//           <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//             <AlertCircle
//               size={20}
//               className="mt-0.5 shrink-0"
//             />

//             <p>{error}</p>
//           </div>
//         )}

//         {/* SUCCESS */}

//         {success && (
//           <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
//             <Check
//               size={20}
//               className="mt-0.5 shrink-0"
//             />

//             <p>{success}</p>
//           </div>
//         )}

//         {/* =================================
//             BEFORE ANALYSIS
//         ================================= */}

//         {!analysis && (
//           <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

//             {/* PHOTO CARD */}

//             <section className="rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-7">

//               <div className="mb-5">
//                 <h2 className="text-xl font-bold text-[#191c1d]">
//                   Meal Photo
//                 </h2>

//                 <p className="mt-1 text-sm text-[#3e4947]">
//                   Take a photo or choose one
//                   from your device.
//                 </p>
//               </div>

//               {/* IMAGE PREVIEW */}

//               {imagePreview ? (
//                 <div className="relative overflow-hidden rounded-2xl border border-[#e1e3e4] bg-black">

//                   <img
//                     src={imagePreview}
//                     alt="Selected meal"
//                     className="max-h-[420px] w-full object-contain"
//                   />

//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white backdrop-blur"
//                   >
//                     <X size={19} />
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={
//                     handleTakePhoto
//                   }
//                   className="flex min-h-[320px] w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#b8c4c2] bg-[#fafbfb] transition hover:bg-[#f4f7f6]"
//                 >
//                   <div className="px-5 text-center">

//                     <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#004e47]/10 text-[#004e47]">
//                       <Camera
//                         size={28}
//                       />
//                     </div>

//                     <h3 className="font-semibold text-[#191c1d]">
//                       Add a meal photo
//                     </h3>

//                     <p className="mt-1 text-xs text-[#3e4947]">
//                       JPG, PNG or WebP
//                     </p>

//                   </div>
//                 </button>
//               )}

//               {/* MOBILE CAMERA INPUT */}

//               <input
//                 ref={cameraInputRef}
//                 type="file"
//                 accept="image/*"
//                 capture="environment"
//                 className="hidden"
//                 onChange={
//                   handleFileChange
//                 }
//               />

//               {/* GALLERY INPUT */}

//               <input
//                 ref={galleryInputRef}
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp"
//                 className="hidden"
//                 onChange={
//                   handleFileChange
//                 }
//               />

//               {/* BUTTONS */}

//               <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

//                 <button
//                   type="button"
//                   onClick={
//                     handleTakePhoto
//                   }
//                   className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-4 text-sm font-semibold text-white transition hover:bg-[#003d37]"
//                 >
//                   <Camera
//                     size={19}
//                   />

//                   Take Photo
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     galleryInputRef.current?.click()
//                   }
//                   className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#004e47]/20 bg-[#004e47]/5 px-4 text-sm font-semibold text-[#004e47] transition hover:bg-[#004e47]/10"
//                 >
//                   <ImageIcon
//                     size={19}
//                   />

//                   Gallery
//                 </button>

//               </div>

//               {imagePreview && (
//                 <button
//                   type="button"
//                   onClick={
//                     handleTakePhoto
//                   }
//                   className="mt-3 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#004e47]/20 text-sm font-semibold text-[#004e47]"
//                 >
//                   <Camera size={17} />
//                   Retake Photo
//                 </button>
//               )}

//             </section>

//             {/* FORM CARD */}

//             <section className="rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-7">

//               <div className="mb-5">
//                 <h2 className="text-xl font-bold text-[#191c1d]">
//                   Describe Your Meal
//                 </h2>

//                 <p className="mt-1 text-sm text-[#3e4947]">
//                   Tell AI what you ate and
//                   roughly how much.
//                 </p>
//               </div>

//               <div className="space-y-5">

//                 {/* MEAL TYPE */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
//                     Meal Type
//                   </label>

//                   <div className="relative">

//                     <Utensils
//                       size={18}
//                       className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#004e47]"
//                     />

//                     <select
//                       value={mealType}
//                       onChange={(event) =>
//                         setMealType(
//                           event.target
//                             .value
//                         )
//                       }
//                       className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-[#cbd5d3] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
//                     >
//                       {MEAL_TYPES.map(
//                         (type) => (
//                           <option
//                             key={type}
//                             value={type}
//                           >
//                             {type
//                               .charAt(
//                                 0
//                               )
//                               .toUpperCase() +
//                               type.slice(
//                                 1
//                               )}
//                           </option>
//                         )
//                       )}
//                     </select>
//                   </div>
//                 </div>

//                 {/* DATE */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
//                     Meal Date
//                   </label>

//                   <div className="relative">

//                     <CalendarDays
//                       size={18}
//                       className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#004e47]"
//                     />

//                     <input
//                       type="date"
//                       value={mealDate}
//                       max={getToday()}
//                       onChange={(event) =>
//                         setMealDate(
//                           event.target
//                             .value
//                         )
//                       }
//                       className="h-12 w-full cursor-pointer rounded-xl border border-[#cbd5d3] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
//                     />

//                   </div>

//                   <p className="mt-2 text-xs text-[#3e4947]">
//                     You can change the date
//                     before saving the meal.
//                   </p>
//                 </div>

//                 {/* DESCRIPTION */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
//                     What did you eat?
//                   </label>

//                   <textarea
//                     value={description}
//                     onChange={(event) =>
//                       setDescription(
//                         event.target
//                           .value
//                       )
//                     }
//                     rows={6}
//                     placeholder="Example: One plate of chicken biryani with two pieces of chicken and a small bowl of raita."
//                     className="w-full resize-none rounded-xl border border-[#cbd5d3] bg-white p-4 text-sm outline-none placeholder:text-[#899391] focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
//                   />
//                 </div>

//                 {/* ANALYZE */}

//                 <button
//                   type="button"
//                   onClick={
//                     analyzeMeal
//                   }
//                   disabled={
//                     analyzing ||
//                     !imageFile ||
//                     !description.trim()
//                   }
//                   className="flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-5 text-sm font-bold text-white transition hover:bg-[#003d37] disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   {analyzing ? (
//                     <>
//                       <Loader2
//                         size={20}
//                         className="animate-spin"
//                       />

//                       Analyzing Meal...
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles
//                         size={20}
//                       />

//                       Analyze Meal
//                     </>
//                   )}
//                 </button>

//               </div>
//             </section>

//           </div>
//         )}

//         {/* =================================
//             AI RESULT
//         ================================= */}

//         {analysis && (
//           <section className="rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-7">

//             {/* HEADER */}

//             <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//               <div>

//                 <div className="mb-1 flex items-center gap-2">

//                   <Sparkles
//                     size={20}
//                     className="text-[#004e47]"
//                   />

//                   <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#004e47]">
//                     AI Analysis
//                   </p>

//                 </div>

//                 <h2 className="text-2xl font-bold text-[#191c1d]">
//                   Review Your Meal
//                 </h2>

//                 <p className="mt-1 text-sm text-[#3e4947]">
//                   Check and edit the AI
//                   estimate before adding it
//                   to your diary.
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setEditing(
//                     !editing
//                   )
//                 }
//                 className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#004e47]/20 px-4 text-sm font-semibold text-[#004e47]"
//               >
//                 <Pencil
//                   size={16}
//                 />

//                 {editing
//                   ? "Done Editing"
//                   : "Edit Details"}
//               </button>

//             </div>

//             {/* RESULT */}

//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

//               {/* IMAGE */}

//               {imagePreview && (
//                 <div className="overflow-hidden rounded-2xl bg-[#f5f7f7]">

//                   <img
//                     src={imagePreview}
//                     alt="Analyzed meal"
//                     className="max-h-[450px] w-full object-contain"
//                   />

//                 </div>
//               )}

//               {/* DETAILS */}

//               <div className="space-y-5">

//                 {/* TYPE */}

//                 <div>
//                   <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
//                     Meal Type
//                   </label>

//                   {editing ? (
//                     <select
//                       value={
//                         analysis.meal_type
//                       }
//                       onChange={(event) =>
//                         updateAnalysis(
//                           "meal_type",
//                           event.target
//                             .value
//                         )
//                       }
//                       className="h-12 w-full cursor-pointer rounded-xl border border-[#cbd5d3] px-4 text-sm outline-none focus:border-[#004e47]"
//                     >
//                       {MEAL_TYPES.map(
//                         (type) => (
//                           <option
//                             key={type}
//                             value={type}
//                           >
//                             {type
//                               .charAt(
//                                 0
//                               )
//                               .toUpperCase() +
//                               type.slice(
//                                 1
//                               )}
//                           </option>
//                         )
//                       )}
//                     </select>
//                   ) : (
//                     <div className="rounded-xl bg-[#f3f6f5] p-3 text-sm font-semibold capitalize text-[#004e47]">
//                       {
//                         analysis.meal_type
//                       }
//                     </div>
//                   )}
//                 </div>

//                 {/* DATE */}

//                 <div>
//                   <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
//                     Meal Date
//                   </label>

//                   {editing ? (
//                     <input
//                       type="date"
//                       value={
//                         analysis.meal_date
//                       }
//                       max={getToday()}
//                       onChange={(event) =>
//                         updateAnalysis(
//                           "meal_date",
//                           event.target
//                             .value
//                         )
//                       }
//                       className="h-12 w-full cursor-pointer rounded-xl border border-[#cbd5d3] px-4 text-sm outline-none focus:border-[#004e47]"
//                     />
//                   ) : (
//                     <div className="rounded-xl bg-[#f3f6f5] p-3 text-sm font-semibold text-[#191c1d]">
//                       {
//                         analysis.meal_date
//                       }
//                     </div>
//                   )}
//                 </div>

//                 {/* NAME */}

//                 <div>
//                   <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
//                     Meal Name
//                   </label>

//                   {editing ? (
//                     <input
//                       value={
//                         analysis.name
//                       }
//                       onChange={(event) =>
//                         updateAnalysis(
//                           "name",
//                           event.target
//                             .value
//                         )
//                       }
//                       className="h-12 w-full rounded-xl border border-[#cbd5d3] px-4 text-sm outline-none focus:border-[#004e47]"
//                     />
//                   ) : (
//                     <h3 className="text-xl font-bold text-[#191c1d]">
//                       {analysis.name}
//                     </h3>
//                   )}
//                 </div>

//                 {/* DESCRIPTION */}

//                 <div>
//                   <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
//                     Description
//                   </label>

//                   {editing ? (
//                     <textarea
//                       value={
//                         analysis.description
//                       }
//                       onChange={(event) =>
//                         updateAnalysis(
//                           "description",
//                           event.target
//                             .value
//                         )
//                       }
//                       rows={4}
//                       className="w-full resize-none rounded-xl border border-[#cbd5d3] p-4 text-sm outline-none focus:border-[#004e47]"
//                     />
//                   ) : (
//                     <p className="text-sm leading-6 text-[#3e4947]">
//                       {
//                         analysis.description
//                       }
//                     </p>
//                   )}
//                 </div>

//                 {/* SERVING SIZE */}

//                 {analysis.serving_size && (
//                   <div>
//                     <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
//                       Serving Size
//                     </label>

//                     {editing ? (
//                       <input
//                         value={
//                           analysis.serving_size
//                         }
//                         onChange={(event) =>
//                           updateAnalysis(
//                             "serving_size",
//                             event.target
//                               .value
//                           )
//                         }
//                         className="h-12 w-full rounded-xl border border-[#cbd5d3] px-4 text-sm outline-none focus:border-[#004e47]"
//                       />
//                     ) : (
//                       <div className="rounded-xl bg-[#f3f6f5] p-3 text-sm text-[#191c1d]">
//                         {
//                           analysis.serving_size
//                         }
//                       </div>
//                     )}
//                   </div>
//                 )}

//               </div>
//             </div>

//             {/* NUTRITION */}

//             <div className="mt-7">

//               <div className="mb-4 flex items-center justify-between">

//                 <h3 className="text-sm font-bold uppercase tracking-wider text-[#3e4947]">
//                   Estimated Nutrition
//                 </h3>

//                 <span className="text-xs text-[#3e4947]">
//                   You can edit these
//                   values
//                 </span>

//               </div>

//               <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

//                 <NutritionField
//                   label="Calories"
//                   value={
//                     analysis.calories
//                   }
//                   unit="kcal"
//                   editing={editing}
//                   onChange={(value) =>
//                     updateAnalysis(
//                       "calories",
//                       Number(value)
//                     )
//                   }
//                 />

//                 <NutritionField
//                   label="Protein"
//                   value={
//                     analysis.protein_g
//                   }
//                   unit="g"
//                   editing={editing}
//                   onChange={(value) =>
//                     updateAnalysis(
//                       "protein_g",
//                       Number(value)
//                     )
//                   }
//                 />

//                 <NutritionField
//                   label="Carbs"
//                   value={
//                     analysis.carbs_g
//                   }
//                   unit="g"
//                   editing={editing}
//                   onChange={(value) =>
//                     updateAnalysis(
//                       "carbs_g",
//                       Number(value)
//                     )
//                   }
//                 />

//                 <NutritionField
//                   label="Fat"
//                   value={
//                     analysis.fat_g
//                   }
//                   unit="g"
//                   editing={editing}
//                   onChange={(value) =>
//                     updateAnalysis(
//                       "fat_g",
//                       Number(value)
//                     )
//                   }
//                 />

//               </div>
//             </div>

//             {/* CONFIDENCE */}

//             <div className="mt-5 rounded-xl bg-[#f3f6f5] p-4">

//               <p className="text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
//                 AI Confidence
//               </p>

//               <div className="mt-2 flex items-center gap-3">

//                 <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#dfe5e3]">

//                   <div
//                     className="h-full rounded-full bg-[#006a61]"
//                     style={{
//                       width: `${Math.round(
//                         analysis.confidence *
//                           100
//                       )}%`,
//                     }}
//                   />

//                 </div>

//                 <span className="text-sm font-bold text-[#004e47]">
//                   {Math.round(
//                     analysis.confidence *
//                       100
//                   )}
//                   %
//                 </span>

//               </div>
//             </div>

//             {/* ACTIONS */}

//             {/* <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

//               <button
//                 type="button"
//                 onClick={
//                   analyzeAnother
//                 }
//                 disabled={saving}
//                 className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#cbd5d3] text-sm font-semibold text-[#3e4947]"
//               >
//                 <RotateCcw
//                   size={18}
//                 />

//                 Analyze Another
//               </button>

//               <button
//                 type="button"
//                 onClick={saveMeal}
//                 disabled={saving}
//                 className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] text-sm font-bold text-white transition hover:bg-[#003d37] disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {saving ? (
//                   <>
//                     <Loader2
//                       size={19}
//                       className="animate-spin"
//                     />

//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Check
//                       size={19}
//                     />

//                     Confirm & Add to
//                     Diary
//                   </>
//                 )}
//               </button>

//             </div> */}

// {/* ACTIONS */}

// <div className="mt-7 flex flex-col gap-3 sm:flex-row">

//   {/* CONFIRM */}
//   <button
//     type="button"
//     onClick={saveMeal}
//     disabled={saving}
//     className="
//       order-1
//       flex
//       min-h-[52px]
//       w-full
//       items-center
//       justify-center
//       gap-2.5
//       rounded-2xl
//       bg-[#004e47]
//       px-5
//       text-[15px]
//       font-bold
//       text-white
//       shadow-[0_6px_18px_rgba(0,78,71,0.18)]
//       transition-all
//       duration-200
//       hover:bg-[#003d37]
//       hover:shadow-[0_8px_22px_rgba(0,78,71,0.24)]
//       active:scale-[0.98]
//       disabled:cursor-not-allowed
//       disabled:opacity-50
//       disabled:shadow-none
//       sm:order-2
//       sm:flex-1
//     "
//   >
//     {saving ? (
//       <>
//         <Loader2
//           size={20}
//           className="animate-spin"
//         />

//         <span>
//           Saving...
//         </span>
//       </>
//     ) : (
//       <>
//         <Check
//           size={20}
//           strokeWidth={2.5}
//         />

//         <span>
//           Confirm & Add to Diary
//         </span>
//       </>
//     )}
//   </button>

//   {/* ANALYZE ANOTHER */}
//   <button
//     type="button"
//     onClick={analyzeAnother}
//     disabled={saving}
//     className="
//       order-2
//       flex
//       min-h-[48px]
//       w-full
//       items-center
//       justify-center
//       gap-2.5
//       rounded-2xl
//       border
//       border-[#cbd5d3]
//       bg-white
//       px-5
//       text-[15px]
//       font-semibold
//       text-[#3e4947]
//       transition-all
//       duration-200
//       hover:border-[#004e47]/40
//       hover:bg-[#f5f9f8]
//       hover:text-[#004e47]
//       active:scale-[0.98]
//       disabled:cursor-not-allowed
//       disabled:opacity-50
//       sm:order-1
//       sm:flex-1
//     "
//   >
//     <RotateCcw
//       size={19}
//       strokeWidth={2}
//     />

//     <span>
//       Analyze Another
//     </span>
//   </button>

// </div>

//           </section>
//         )}

//       </div>

//       {/* =================================
//           DESKTOP CAMERA MODAL
//       ================================= */}

//       {cameraOpen && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4">

//           <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-black shadow-2xl">

//             {/* HEADER */}

//             <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">

//               <div>
//                 <h2 className="font-bold text-white">
//                   Take Meal Photo
//                 </h2>

//                 <p className="text-xs text-white/70">
//                   Position your meal inside
//                   the frame
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={
//                   closeCamera
//                 }
//                 className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white"
//               >
//                 <X size={20} />
//               </button>

//             </div>

//             {/* VIDEO */}

//             <div className="relative flex min-h-[60vh] items-center justify-center bg-black">

//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 muted
//                 className="h-auto max-h-[75vh] w-full object-contain"
//               />

//               {/* LOADING */}

//               {cameraLoading && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white">

//                   <Loader2
//                     size={42}
//                     className="animate-spin"
//                   />

//                   <p className="mt-4 text-sm font-medium">
//                     Starting camera...
//                   </p>

//                 </div>
//               )}

//               {/* CAMERA ERROR */}

//               {cameraError && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 px-6 text-center">

//                   <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400">
//                     <Camera
//                       size={30}
//                     />
//                   </div>

//                   <p className="max-w-md text-sm leading-6 text-white">
//                     {cameraError}
//                   </p>

//                   <button
//                     type="button"
//                     onClick={
//                       startCamera
//                     }
//                     className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
//                   >
//                     <RotateCcw
//                       size={17}
//                     />

//                     Try Again
//                   </button>

//                 </div>
//               )}

//               {/* CAMERA FRAME */}

//               {!cameraLoading &&
//                 !cameraError && (
//                   <div className="pointer-events-none absolute inset-8 rounded-2xl border-2 border-white/60" />
//                 )}

//             </div>

//             {/* CONTROLS */}

//             <div className="flex items-center justify-center gap-4 bg-black p-5">

//               <button
//                 type="button"
//                 onClick={
//                   closeCamera
//                 }
//                 className="h-12 cursor-pointer rounded-xl border border-white/30 px-6 text-sm font-semibold text-white"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={
//                   capturePhoto
//                 }
//                 disabled={
//                   cameraLoading ||
//                   !!cameraError
//                 }
//                 className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-[#004e47] text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
//                 aria-label="Capture photo"
//               >
//                 <Camera
//                   size={25}
//                 />
//               </button>

//             </div>

//           </div>
//         </div>
//       )}

//     </main>
//   );
// }

// /* =================================
//    NUTRITION FIELD
// ================================= */

// interface NutritionFieldProps {
//   label: string;
//   value: number;
//   unit: string;
//   editing: boolean;
//   onChange: (
//     value: string
//   ) => void;
// }

// function NutritionField({
//   label,
//   value,
//   unit,
//   editing,
//   onChange,
// }: NutritionFieldProps) {
//   return (
//     <div className="rounded-2xl border border-[#e1e3e4] bg-[#fafbfb] p-4">

//       <p className="text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
//         {label}
//       </p>

//       {editing ? (
//         <div className="mt-2 flex items-center gap-2">

//           <input
//             type="number"
//             min="0"
//             step="0.1"
//             value={value}
//             onChange={(event) =>
//               onChange(
//                 event.target.value
//               )
//             }
//             className="w-full bg-transparent text-2xl font-bold text-[#191c1d] outline-none"
//           />

//           <span className="text-xs text-[#3e4947]">
//             {unit}
//           </span>

//         </div>
//       ) : (
//         <p className="mt-2 text-2xl font-bold text-[#004e47]">
//           {value}

//           <span className="ml-1 text-xs font-normal text-[#3e4947]">
//             {unit}
//           </span>
//         </p>
//       )}

//     </div>
//   );
// }


"use client";

import {
  Camera,
  X,
  Loader2,
  Sparkles,
  Check,
  CalendarDays,
  Utensils,
  Pencil,
  AlertCircle,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";

import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

interface AnalysisResult {
  meal_type: string;
  meal_date: string;
  name: string;
  description: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  serving_size?: string;
  confidence: number;
}

const MEAL_TYPES = [
  "breakfast",
  "lunch",
  "snack",
  "dinner",
];

function getToday() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* --------------------------------
   CAMERA ERROR
-------------------------------- */

function getCameraErrorMessage(
  error: unknown
) {
  if (error instanceof DOMException) {
    switch (error.name) {
      case "NotAllowedError":
        return "Camera permission was denied. Please allow camera access in your browser.";

      case "NotFoundError":
        return "No camera was found on this device.";

      case "NotReadableError":
        return "The camera could not be started. It may already be in use by another application.";

      case "OverconstrainedError":
        return "The requested camera is not available.";

      case "SecurityError":
        return "Camera access was blocked by the browser.";

      case "AbortError":
        return "Camera startup was interrupted. Please try again.";

      default:
        return `Could not open the camera (${error.name}).`;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Could not open the camera.";
}

/* --------------------------------
   BASE64 HELPER
-------------------------------- */

function fileToBase64(
  file: File
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        const result =
          reader.result;

        if (
          typeof result !== "string"
        ) {
          reject(
            new Error(
              "Could not read image."
            )
          );

          return;
        }

        /*
         * FileReader returns:
         *
         * data:image/jpeg;base64,XXXX
         *
         * Gemini endpoint expects only:
         *
         * XXXX
         */

        const base64 =
          result.split(",")[1];

        if (!base64) {
          reject(
            new Error(
              "Invalid image data."
            )
          );

          return;
        }

        resolve(base64);
      };

      reader.onerror = () => {
        reject(
          new Error(
            "Could not read image."
          )
        );
      };

      reader.readAsDataURL(file);
    }
  );
}

/* --------------------------------
   IMAGE PROCESSING
-------------------------------- */

/*
 * Mobile phones often produce very large
 * HEIC/JPEG/PNG images. Before sending the
 * image to the AI API, resize it and convert
 * it to a predictable JPEG.
 *
 * This keeps the existing API contract:
 *   image    -> base64 string
 *   mimeType -> "image/jpeg"
 *
 * It also prevents unnecessarily large
 * request bodies on Android/iPhone.
 */

const MAX_IMAGE_DIMENSION = 1600;
const JPEG_QUALITY = 0.8;

async function processImageForUpload(
  file: File
): Promise<File> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        URL.revokeObjectURL(objectUrl);

        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (!width || !height) {
          reject(
            new Error(
              "Could not read the image dimensions."
            )
          );
          return;
        }

        /*
         * Keep the aspect ratio while reducing
         * large phone images.
         */
        if (
          width > MAX_IMAGE_DIMENSION ||
          height > MAX_IMAGE_DIMENSION
        ) {
          const scale = Math.min(
            MAX_IMAGE_DIMENSION / width,
            MAX_IMAGE_DIMENSION / height
          );

          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context =
          canvas.getContext("2d");

        if (!context) {
          reject(
            new Error(
              "Could not process the image."
            )
          );
          return;
        }

        /*
         * JPEG has no transparency. A white
         * background keeps transparent PNG/WebP
         * images from becoming black.
         */
        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          0,
          width,
          height
        );

        context.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  "Could not compress the image."
                )
              );
              return;
            }

            resolve(
              new File(
                [blob],
                `meal-${Date.now()}.jpg`,
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              )
            );
          },
          "image/jpeg",
          JPEG_QUALITY
        );
      } catch (err) {
        URL.revokeObjectURL(objectUrl);

        reject(
          err instanceof Error
            ? err
            : new Error(
                "Could not process the image."
              )
        );
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);

      reject(
        new Error(
          "This image format could not be read by the browser."
        )
      );
    };

    img.src = objectUrl;
  });
}

/* --------------------------------
   SAFE JSON RESPONSE
-------------------------------- */

/*
 * Some server/proxy errors return plain text
 * instead of JSON. Calling response.json()
 * directly then produces errors such as:
 *
 *   Unexpected token 'R' ...
 *
 * Read the response as text first so the user
 * sees the actual server error instead.
 */
async function readJsonResponse(
  response: Response
): Promise<any> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      text.length > 300
        ? text.slice(0, 300)
        : text
    );
  }
}

/* --------------------------------
   MAIN COMPONENT
-------------------------------- */

export default function ScanPage() {
  /* --------------------------------
     FILE INPUTS
  -------------------------------- */

  const cameraInputRef =
    useRef<HTMLInputElement>(null);

  const galleryInputRef =
    useRef<HTMLInputElement>(null);

  /* --------------------------------
     CAMERA
     
     IMPORTANT:
     Use REF instead of state for
     MediaStream.

     This prevents React state changes
     from accidentally stopping the
     active camera stream.
  -------------------------------- */

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const cameraStreamRef =
    useRef<MediaStream | null>(null);

  const [cameraOpen, setCameraOpen] =
    useState(false);

  const [cameraLoading, setCameraLoading] =
    useState(false);

  const [cameraError, setCameraError] =
    useState("");

  /* --------------------------------
     IMAGE
  -------------------------------- */

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  /* --------------------------------
     FORM
  -------------------------------- */

  const [mealType, setMealType] =
    useState("breakfast");

  const [mealDate, setMealDate] =
    useState(getToday());

  const [description, setDescription] =
    useState("");

  /* --------------------------------
     AI
  -------------------------------- */

  const [analysis, setAnalysis] =
    useState<AnalysisResult | null>(
      null
    );

  const [analyzing, setAnalyzing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [editing, setEditing] =
    useState(false);

  /* --------------------------------
     CAMERA START

     IMPORTANT FIX:
     This function uses cameraStreamRef,
     NOT state.

     Also no dependency on cameraStream.
  -------------------------------- */

  async function startCamera() {
    setCameraLoading(true);
    setCameraError("");

    try {
      if (
        typeof window === "undefined"
      ) {
        return;
      }

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices
          .getUserMedia
      ) {
        throw new Error(
          "Camera access is not supported by this browser."
        );
      }

      /*
       * Stop an old camera stream first.
       */

      if (
        cameraStreamRef.current
      ) {
        cameraStreamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });

        cameraStreamRef.current =
          null;
      }

      /*
       * Wait until the video element
       * exists in the DOM.
       */

      await new Promise<void>(
        (resolve) => {
          requestAnimationFrame(
            () => resolve()
          );
        }
      );

      /*
       * Laptop/Desktop:
       * Do NOT force "environment".
       *
       * On a laptop there is normally
       * only one webcam.
       */

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: {
              width: {
                ideal: 1280,
              },
              height: {
                ideal: 720,
              },
              frameRate: {
                ideal: 30,
              },
            },
            audio: false,
          }
        );

      cameraStreamRef.current =
        stream;

      const video =
        videoRef.current;

      if (!video) {
        stream
          .getTracks()
          .forEach((track) =>
            track.stop()
          );

        cameraStreamRef.current =
          null;

        throw new Error(
          "Camera video element is not ready."
        );
      }

      /*
       * Attach stream to video.
       */

      video.srcObject = stream;

      video.muted = true;

      video.autoplay = true;

      video.playsInline = true;

      /*
       * Wait for video metadata.
       */

      await new Promise<void>(
        (resolve) => {
          if (
            video.readyState >= 2
          ) {
            resolve();

            return;
          }

          const handleLoaded =
            () => {
              video.removeEventListener(
                "loadedmetadata",
                handleLoaded
              );

              resolve();
            };

          video.addEventListener(
            "loadedmetadata",
            handleLoaded
          );
        }
      );

      /*
       * Start playback.
       */

      await video.play();

      setCameraLoading(false);
    } catch (err) {
      console.error(
        "Camera error:",
        err
      );

      /*
       * Clean failed stream.
       */

      if (
        cameraStreamRef.current
      ) {
        cameraStreamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );

        cameraStreamRef.current =
          null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject =
          null;
      }

      setCameraLoading(false);

      setCameraError(
        getCameraErrorMessage(err)
      );
    }
  }

  /* --------------------------------
     OPEN CAMERA
  -------------------------------- */

  async function handleTakePhoto() {
    setError("");
    setSuccess("");
    setCameraError("");

    /*
     * On mobile devices:
     *
     * Use native camera.
     *
     * This gives Android/iPhone the
     * best camera experience.
     */

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      cameraInputRef.current?.click();

      return;
    }

    /*
     * Desktop/Laptop:
     *
     * Open webcam using getUserMedia.
     */

    setCameraOpen(true);

    /*
     * Wait for modal/video element
     * to render before requesting camera.
     */

    setTimeout(() => {
      startCamera();
    }, 50);
  }

  /* --------------------------------
     CLOSE CAMERA
  -------------------------------- */

  function closeCamera() {
    /*
     * Stop actual camera tracks.
     */

    if (
      cameraStreamRef.current
    ) {
      cameraStreamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      cameraStreamRef.current =
        null;
    }

    /*
     * Detach video.
     */

    if (videoRef.current) {
      videoRef.current.pause();

      videoRef.current.srcObject =
        null;
    }

    setCameraLoading(false);
    setCameraError("");
    setCameraOpen(false);
  }

  /* --------------------------------
     CAPTURE PHOTO
  -------------------------------- */

  function capturePhoto() {
    const video =
      videoRef.current;

    if (!video) {
      setCameraError(
        "Camera is not ready."
      );

      return;
    }

    /*
     * Make sure camera actually
     * produced video frames.
     */

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      setCameraError(
        "Camera is not ready yet. Please wait a moment."
      );

      return;
    }

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    const context =
      canvas.getContext("2d");

    if (!context) {
      setCameraError(
        "Could not capture image."
      );

      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError(
            "Could not create image."
          );

          return;
        }

        const file =
          new File(
            [blob],
            `meal-${Date.now()}.jpg`,
            {
              type: "image/jpeg",
            }
          );

        /*
         * Save captured photo.
         */

        handleImage(file);

        /*
         * Close camera.
         */

        closeCamera();
      },
      "image/jpeg",
      0.9
    );
  }

  /* --------------------------------
     HANDLE IMAGE
  -------------------------------- */

  async function handleImage(
    file: File
  ) {
    setError("");
    setSuccess("");
    setAnalysis(null);

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select an image file."
      );

      return;
    }

    try {
      /*
       * Resize/compress the original phone
       * image before keeping it in state.
       */
      const processedFile =
        await processImageForUpload(file);

      /*
       * Final safety check after processing.
       */
      if (
        processedFile.size >
        10 * 1024 * 1024
      ) {
        setError(
          "Image is still too large. Please choose another photo."
        );

        return;
      }

      /*
       * Remove previous preview.
       */
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }

      const preview =
        URL.createObjectURL(
          processedFile
        );

      setImageFile(processedFile);
      setImagePreview(preview);
    } catch (err) {
      console.error(
        "Image processing error:",
        err
      );

      setImageFile(null);
      setImagePreview(null);

      setError(
        err instanceof Error
          ? err.message
          : "Could not process this image."
      );
    }
  }

  /* --------------------------------
     FILE INPUT
  -------------------------------- */

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    /*
     * Reset input so selecting the same
     * image again still triggers onChange.
     */
    event.target.value = "";

    if (!file) {
      return;
    }

    await handleImage(file);
  }

  /* --------------------------------
     REMOVE IMAGE
  -------------------------------- */

  function removeImage() {
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImageFile(null);
    setImagePreview(null);
    setAnalysis(null);
  }

  /* --------------------------------
     ANALYZE MEAL
     
     IMPORTANT FIX:
     
     Your /api/scan/analyze route
     expects JSON:
     
     {
       image,
       mimeType,
       description
     }
     
     NOT FormData.
  -------------------------------- */

  async function analyzeMeal() {
    setError("");
    setSuccess("");

    if (!imageFile) {
      setError(
        "Please take or upload a meal photo."
      );

      return;
    }

    if (!description.trim()) {
      setError(
        "Please describe what you ate."
      );

      return;
    }

    if (!mealDate) {
      setError(
        "Please select a meal date."
      );

      return;
    }

    try {
      setAnalyzing(true);

      /*
       * Convert image to base64.
       */

      const base64 =
        await fileToBase64(
          imageFile
        );

      /*
       * Your existing API expects
       * JSON.
       */

      const response =
        await fetch(
          "/api/scan/analyze",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              image: base64,

              mimeType:
                "image/jpeg",

              description:
                description.trim(),

              meal_type:
                mealType,

              meal_date:
                mealDate,
            }),
          }
        );

      const result =
        await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Meal analysis failed."
        );
      }

      /*
       * IMPORTANT:
       *
       * Your current API returns
       * the parsed Gemini object
       * directly.
       *
       * Therefore:
       *
       * result
       *
       * NOT:
       *
       * result.data
       */

      const data =
        result as AnalysisResult;

      if (!data) {
        throw new Error(
          "No analysis returned."
        );
      }

      /*
       * Normalize meal type.
       */

      const returnedMealType =
        MEAL_TYPES.includes(
          data.meal_type
        )
          ? data.meal_type
          : mealType;

      /*
       * Use selected date if API
       * doesn't return one.
       */

      const returnedDate =
        data.meal_date ||
        mealDate;

      const normalized: AnalysisResult =
        {
          meal_type:
            returnedMealType,

          meal_date:
            returnedDate,

          name:
            data.name ||
            "Meal",

          description:
            data.description ||
            description,

          calories:
            Math.max(
              0,
              Number(
                data.calories
              ) || 0
            ),

          protein_g:
            Math.max(
              0,
              Number(
                data.protein_g
              ) || 0
            ),

          carbs_g:
            Math.max(
              0,
              Number(
                data.carbs_g
              ) || 0
            ),

          fat_g:
            Math.max(
              0,
              Number(
                data.fat_g
              ) || 0
            ),

          serving_size:
            data.serving_size ||
            "",

          confidence:
            Math.min(
              1,
              Math.max(
                0,
                Number(
                  data.confidence
                ) || 0
              )
            ),
        };

      setAnalysis(
        normalized
      );

      setMealType(
        returnedMealType
      );

      setMealDate(
        returnedDate
      );

      setEditing(false);
    } catch (err) {
      console.error(
        "Analysis error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Could not analyze meal."
      );
    } finally {
      setAnalyzing(false);
    }
  }

  /* --------------------------------
     UPDATE ANALYSIS
  -------------------------------- */

  function updateAnalysis(
    field: keyof AnalysisResult,
    value: string | number
  ) {
    if (!analysis) {
      return;
    }

    setAnalysis({
      ...analysis,
      [field]: value,
    });
  }

  /* --------------------------------
     SAVE MEAL
     
     Uses your existing:
     
     POST /api/scan/save
  -------------------------------- */

  async function saveMeal() {
    if (!analysis) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const response =
        await fetch(
          "/api/scan/save",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              meal_type:
                analysis.meal_type,

              meal_date:
                analysis.meal_date,

              name:
                analysis.name,

              description:
                analysis.description,

              calories:
                Number(
                  analysis.calories
                ),

              protein_g:
                Number(
                  analysis.protein_g
                ),

              carbs_g:
                Number(
                  analysis.carbs_g
                ),

              fat_g:
                Number(
                  analysis.fat_g
                ),

              serving_size:
                analysis.serving_size ||
                "",

              ai_analyzed: true,

              ai_confidence:
                Number(
                  analysis.confidence
                ),
            }),
          }
        );

      const result =
        await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Could not save meal."
        );
      }

      setSuccess(
        "Meal added to your diary successfully."
      );

      /*
       * Remove preview.
       */

      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }

      setImageFile(null);
      setImagePreview(null);

      setDescription("");

      setMealType(
        "breakfast"
      );

      setMealDate(
        getToday()
      );

      setAnalysis(null);
      setEditing(false);
    } catch (err) {
      console.error(
        "Save error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Could not save meal."
      );
    } finally {
      setSaving(false);
    }
  }

  /* --------------------------------
     ANALYZE ANOTHER
  -------------------------------- */

  function analyzeAnother() {
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImageFile(null);
    setImagePreview(null);
    setDescription("");
    setAnalysis(null);
    setError("");
    setSuccess("");
    setEditing(false);
    setMealType("breakfast");
    setMealDate(getToday());
  }

  /* --------------------------------
     CAMERA CLEANUP
     
     IMPORTANT:
     
     Only cleanup on component
     unmount.
     
     NOT when camera stream changes.
  -------------------------------- */

  useEffect(() => {
    return () => {
      if (
        cameraStreamRef.current
      ) {
        cameraStreamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );

        cameraStreamRef.current =
          null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject =
          null;
      }
    };
  }, []);

  /* --------------------------------
     IMAGE PREVIEW CLEANUP
  -------------------------------- */

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
  }, [imagePreview]);

  /* --------------------------------
     UI
  -------------------------------- */

  return (
    <main className="min-h-screen bg-[#f7f8f8]">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-6 sm:mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#3e4947]">
            AI Nutrition Scanner
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#191c1d] sm:text-4xl">
            Scan Your Meal
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#3e4947] sm:text-base">
            Take a photo or choose one
            from your device, describe your
            meal, and let AI estimate its
            nutrition.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <Check
              size={20}
              className="mt-0.5 shrink-0"
            />

            <p>{success}</p>
          </div>
        )}

        {/* =================================
            BEFORE ANALYSIS
        ================================= */}

        {!analysis && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* PHOTO CARD */}

            <section className="rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-7">

              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#191c1d]">
                  Meal Photo
                </h2>

                <p className="mt-1 text-sm text-[#3e4947]">
                  Take a photo or choose one
                  from your device.
                </p>
              </div>

              {/* IMAGE PREVIEW */}

              {imagePreview ? (
                <div className="relative overflow-hidden rounded-2xl border border-[#e1e3e4] bg-black">

                  <img
                    src={imagePreview}
                    alt="Selected meal"
                    className="max-h-[420px] w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white backdrop-blur"
                  >
                    <X size={19} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={
                    handleTakePhoto
                  }
                  className="flex min-h-[320px] w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#b8c4c2] bg-[#fafbfb] transition hover:bg-[#f4f7f6]"
                >
                  <div className="px-5 text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#004e47]/10 text-[#004e47]">
                      <Camera
                        size={28}
                      />
                    </div>

                    <h3 className="font-semibold text-[#191c1d]">
                      Add a meal photo
                    </h3>

                    <p className="mt-1 text-xs text-[#3e4947]">
                      JPG, PNG or WebP
                    </p>

                  </div>
                </button>
              )}

              {/* MOBILE CAMERA INPUT */}

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={
                  handleFileChange
                }
              />

              {/* GALLERY INPUT */}

              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={
                  handleFileChange
                }
              />

              {/* BUTTONS */}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={
                    handleTakePhoto
                  }
                  className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-4 text-sm font-semibold text-white transition hover:bg-[#003d37]"
                >
                  <Camera
                    size={19}
                  />

                  Take Photo
                </button>

                <button
                  type="button"
                  onClick={() =>
                    galleryInputRef.current?.click()
                  }
                  className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#004e47]/20 bg-[#004e47]/5 px-4 text-sm font-semibold text-[#004e47] transition hover:bg-[#004e47]/10"
                >
                  <ImageIcon
                    size={19}
                  />

                  Gallery
                </button>

              </div>

              {imagePreview && (
                <button
                  type="button"
                  onClick={
                    handleTakePhoto
                  }
                  className="mt-3 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#004e47]/20 text-sm font-semibold text-[#004e47]"
                >
                  <Camera size={17} />
                  Retake Photo
                </button>
              )}

            </section>

            {/* FORM CARD */}

            <section className="rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-7">

              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#191c1d]">
                  Describe Your Meal
                </h2>

                <p className="mt-1 text-sm text-[#3e4947]">
                  Tell AI what you ate and
                  roughly how much.
                </p>
              </div>

              <div className="space-y-5">

                {/* MEAL TYPE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
                    Meal Type
                  </label>

                  <div className="relative">

                    <Utensils
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#004e47]"
                    />

                    <select
                      value={mealType}
                      onChange={(event) =>
                        setMealType(
                          event.target
                            .value
                        )
                      }
                      className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-[#cbd5d3] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
                    >
                      {MEAL_TYPES.map(
                        (type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type
                              .charAt(
                                0
                              )
                              .toUpperCase() +
                              type.slice(
                                1
                              )}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* DATE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
                    Meal Date
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#004e47]"
                    />

                    <input
                      type="date"
                      value={mealDate}
                      max={getToday()}
                      onChange={(event) =>
                        setMealDate(
                          event.target
                            .value
                        )
                      }
                      className="h-12 w-full cursor-pointer rounded-xl border border-[#cbd5d3] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
                    />

                  </div>

                  <p className="mt-2 text-xs text-[#3e4947]">
                    You can change the date
                    before saving the meal.
                  </p>
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
                    What did you eat?
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(
                        event.target
                          .value
                      )
                    }
                    rows={6}
                    placeholder="Example: One plate of chicken biryani with two pieces of chicken and a small bowl of raita."
                    className="w-full resize-none rounded-xl border border-[#cbd5d3] bg-white p-4 text-sm outline-none placeholder:text-[#899391] focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
                  />
                </div>

                {/* ANALYZE */}

                <button
                  type="button"
                  onClick={
                    analyzeMeal
                  }
                  disabled={
                    analyzing ||
                    !imageFile ||
                    !description.trim()
                  }
                  className="flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-5 text-sm font-bold text-white transition hover:bg-[#003d37] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {analyzing ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Analyzing Meal...
                    </>
                  ) : (
                    <>
                      <Sparkles
                        size={20}
                      />

                      Analyze Meal
                    </>
                  )}
                </button>

              </div>
            </section>

          </div>
        )}

        {/* =================================
            AI RESULT
        ================================= */}

        {analysis && (
          <section className="rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-7">

            {/* HEADER */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="mb-1 flex items-center gap-2">

                  <Sparkles
                    size={20}
                    className="text-[#004e47]"
                  />

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#004e47]">
                    AI Analysis
                  </p>

                </div>

                <h2 className="text-2xl font-bold text-[#191c1d]">
                  Review Your Meal
                </h2>

                <p className="mt-1 text-sm text-[#3e4947]">
                  Check and edit the AI
                  estimate before adding it
                  to your diary.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setEditing(
                    !editing
                  )
                }
                className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#004e47]/20 px-4 text-sm font-semibold text-[#004e47]"
              >
                <Pencil
                  size={16}
                />

                {editing
                  ? "Done Editing"
                  : "Edit Details"}
              </button>

            </div>

            {/* RESULT */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* IMAGE */}

              {imagePreview && (
                <div className="overflow-hidden rounded-2xl bg-[#f5f7f7]">

                  <img
                    src={imagePreview}
                    alt="Analyzed meal"
                    className="max-h-[450px] w-full object-contain"
                  />

                </div>
              )}

              {/* DETAILS */}

              <div className="space-y-5">

                {/* TYPE */}

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
                    Meal Type
                  </label>

                  {editing ? (
                    <select
                      value={
                        analysis.meal_type
                      }
                      onChange={(event) =>
                        updateAnalysis(
                          "meal_type",
                          event.target
                            .value
                        )
                      }
                      className="h-12 w-full cursor-pointer rounded-xl border border-[#cbd5d3] px-4 text-sm outline-none focus:border-[#004e47]"
                    >
                      {MEAL_TYPES.map(
                        (type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type
                              .charAt(
                                0
                              )
                              .toUpperCase() +
                              type.slice(
                                1
                              )}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <div className="rounded-xl bg-[#f3f6f5] p-3 text-sm font-semibold capitalize text-[#004e47]">
                      {
                        analysis.meal_type
                      }
                    </div>
                  )}
                </div>

                {/* DATE */}

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
                    Meal Date
                  </label>

                  {editing ? (
                    <input
                      type="date"
                      value={
                        analysis.meal_date
                      }
                      max={getToday()}
                      onChange={(event) =>
                        updateAnalysis(
                          "meal_date",
                          event.target
                            .value
                        )
                      }
                      className="h-12 w-full cursor-pointer rounded-xl border border-[#cbd5d3] px-4 text-sm outline-none focus:border-[#004e47]"
                    />
                  ) : (
                    <div className="rounded-xl bg-[#f3f6f5] p-3 text-sm font-semibold text-[#191c1d]">
                      {
                        analysis.meal_date
                      }
                    </div>
                  )}
                </div>

                {/* NAME */}

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
                    Meal Name
                  </label>

                  {editing ? (
                    <input
                      value={
                        analysis.name
                      }
                      onChange={(event) =>
                        updateAnalysis(
                          "name",
                          event.target
                            .value
                        )
                      }
                      className="h-12 w-full rounded-xl border border-[#cbd5d3] px-4 text-sm outline-none focus:border-[#004e47]"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-[#191c1d]">
                      {analysis.name}
                    </h3>
                  )}
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
                    Description
                  </label>

                  {editing ? (
                    <textarea
                      value={
                        analysis.description
                      }
                      onChange={(event) =>
                        updateAnalysis(
                          "description",
                          event.target
                            .value
                        )
                      }
                      rows={4}
                      className="w-full resize-none rounded-xl border border-[#cbd5d3] p-4 text-sm outline-none focus:border-[#004e47]"
                    />
                  ) : (
                    <p className="text-sm leading-6 text-[#3e4947]">
                      {
                        analysis.description
                      }
                    </p>
                  )}
                </div>

                {/* SERVING SIZE */}

                {analysis.serving_size && (
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
                      Serving Size
                    </label>

                    {editing ? (
                      <input
                        value={
                          analysis.serving_size
                        }
                        onChange={(event) =>
                          updateAnalysis(
                            "serving_size",
                            event.target
                              .value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-[#cbd5d3] px-4 text-sm outline-none focus:border-[#004e47]"
                      />
                    ) : (
                      <div className="rounded-xl bg-[#f3f6f5] p-3 text-sm text-[#191c1d]">
                        {
                          analysis.serving_size
                        }
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* NUTRITION */}

            <div className="mt-7">

              <div className="mb-4 flex items-center justify-between">

                <h3 className="text-sm font-bold uppercase tracking-wider text-[#3e4947]">
                  Estimated Nutrition
                </h3>

                <span className="text-xs text-[#3e4947]">
                  You can edit these
                  values
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                <NutritionField
                  label="Calories"
                  value={
                    analysis.calories
                  }
                  unit="kcal"
                  editing={editing}
                  onChange={(value) =>
                    updateAnalysis(
                      "calories",
                      Number(value)
                    )
                  }
                />

                <NutritionField
                  label="Protein"
                  value={
                    analysis.protein_g
                  }
                  unit="g"
                  editing={editing}
                  onChange={(value) =>
                    updateAnalysis(
                      "protein_g",
                      Number(value)
                    )
                  }
                />

                <NutritionField
                  label="Carbs"
                  value={
                    analysis.carbs_g
                  }
                  unit="g"
                  editing={editing}
                  onChange={(value) =>
                    updateAnalysis(
                      "carbs_g",
                      Number(value)
                    )
                  }
                />

                <NutritionField
                  label="Fat"
                  value={
                    analysis.fat_g
                  }
                  unit="g"
                  editing={editing}
                  onChange={(value) =>
                    updateAnalysis(
                      "fat_g",
                      Number(value)
                    )
                  }
                />

              </div>
            </div>

            {/* CONFIDENCE */}

            <div className="mt-5 rounded-xl bg-[#f3f6f5] p-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
                AI Confidence
              </p>

              <div className="mt-2 flex items-center gap-3">

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#dfe5e3]">

                  <div
                    className="h-full rounded-full bg-[#006a61]"
                    style={{
                      width: `${Math.round(
                        analysis.confidence *
                          100
                      )}%`,
                    }}
                  />

                </div>

                <span className="text-sm font-bold text-[#004e47]">
                  {Math.round(
                    analysis.confidence *
                      100
                  )}
                  %
                </span>

              </div>
            </div>



{/* ACTIONS */}

<div className="mt-7 flex flex-col gap-3 sm:flex-row">

  {/* CONFIRM */}
  <button
    type="button"
    onClick={saveMeal}
    disabled={saving}
    className="
      order-1
      flex
      min-h-[52px]
      w-full
      items-center
      justify-center
      gap-2.5
      rounded-2xl
      bg-[#004e47]
      px-5
      text-[15px]
      font-bold
      text-white
      shadow-[0_6px_18px_rgba(0,78,71,0.18)]
      transition-all
      duration-200
      hover:bg-[#003d37]
      hover:shadow-[0_8px_22px_rgba(0,78,71,0.24)]
      active:scale-[0.98]
      disabled:cursor-not-allowed
      disabled:opacity-50
      disabled:shadow-none
      sm:order-2
      sm:flex-1
    "
  >
    {saving ? (
      <>
        <Loader2
          size={20}
          className="animate-spin"
        />

        <span>
          Saving...
        </span>
      </>
    ) : (
      <>
        <Check
          size={20}
          strokeWidth={2.5}
        />

        <span>
          Confirm & Add to Diary
        </span>
      </>
    )}
  </button>

  {/* ANALYZE ANOTHER */}
  <button
    type="button"
    onClick={analyzeAnother}
    disabled={saving}
    className="
      order-2
      flex
      min-h-[48px]
      w-full
      items-center
      justify-center
      gap-2.5
      rounded-2xl
      border
      border-[#cbd5d3]
      bg-white
      px-5
      text-[15px]
      font-semibold
      text-[#3e4947]
      transition-all
      duration-200
      hover:border-[#004e47]/40
      hover:bg-[#f5f9f8]
      hover:text-[#004e47]
      active:scale-[0.98]
      disabled:cursor-not-allowed
      disabled:opacity-50
      sm:order-1
      sm:flex-1
    "
  >
    <RotateCcw
      size={19}
      strokeWidth={2}
    />

    <span>
      Analyze Another
    </span>
  </button>

</div>

          </section>
        )}

      </div>

      {/* =================================
          DESKTOP CAMERA MODAL
      ================================= */}

      {cameraOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4">

          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-black shadow-2xl">

            {/* HEADER */}

            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">

              <div>
                <h2 className="font-bold text-white">
                  Take Meal Photo
                </h2>

                <p className="text-xs text-white/70">
                  Position your meal inside
                  the frame
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeCamera
                }
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white"
              >
                <X size={20} />
              </button>

            </div>

            {/* VIDEO */}

            <div className="relative flex min-h-[60vh] items-center justify-center bg-black">

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-auto max-h-[75vh] w-full object-contain"
              />

              {/* LOADING */}

              {cameraLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white">

                  <Loader2
                    size={42}
                    className="animate-spin"
                  />

                  <p className="mt-4 text-sm font-medium">
                    Starting camera...
                  </p>

                </div>
              )}

              {/* CAMERA ERROR */}

              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 px-6 text-center">

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                    <Camera
                      size={30}
                    />
                  </div>

                  <p className="max-w-md text-sm leading-6 text-white">
                    {cameraError}
                  </p>

                  <button
                    type="button"
                    onClick={
                      startCamera
                    }
                    className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
                  >
                    <RotateCcw
                      size={17}
                    />

                    Try Again
                  </button>

                </div>
              )}

              {/* CAMERA FRAME */}

              {!cameraLoading &&
                !cameraError && (
                  <div className="pointer-events-none absolute inset-8 rounded-2xl border-2 border-white/60" />
                )}

            </div>

            {/* CONTROLS */}

            <div className="flex items-center justify-center gap-4 bg-black p-5">

              <button
                type="button"
                onClick={
                  closeCamera
                }
                className="h-12 cursor-pointer rounded-xl border border-white/30 px-6 text-sm font-semibold text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  capturePhoto
                }
                disabled={
                  cameraLoading ||
                  !!cameraError
                }
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-[#004e47] text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Capture photo"
              >
                <Camera
                  size={25}
                />
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}

/* =================================
   NUTRITION FIELD
================================= */

interface NutritionFieldProps {
  label: string;
  value: number;
  unit: string;
  editing: boolean;
  onChange: (
    value: string
  ) => void;
}

function NutritionField({
  label,
  value,
  unit,
  editing,
  onChange,
}: NutritionFieldProps) {
  return (
    <div className="rounded-2xl border border-[#e1e3e4] bg-[#fafbfb] p-4">

      <p className="text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
        {label}
      </p>

      {editing ? (
        <div className="mt-2 flex items-center gap-2">

          <input
            type="number"
            min="0"
            step="0.1"
            value={value}
            onChange={(event) =>
              onChange(
                event.target.value
              )
            }
            className="w-full bg-transparent text-2xl font-bold text-[#191c1d] outline-none"
          />

          <span className="text-xs text-[#3e4947]">
            {unit}
          </span>

        </div>
      ) : (
        <p className="mt-2 text-2xl font-bold text-[#004e47]">
          {value}

          <span className="ml-1 text-xs font-normal text-[#3e4947]">
            {unit}
          </span>
        </p>
      )}

    </div>
  );
}