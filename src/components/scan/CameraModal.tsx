"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Camera,
  X,
  RotateCcw,
  Check,
  AlertCircle,
} from "lucide-react";

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export default function CameraModal({
  open,
  onClose,
  onCapture,
}: CameraModalProps) {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const [error, setError] =
    useState("");

  const [facingMode, setFacingMode] =
    useState<"user" | "environment">(
      "environment"
    );

  const [starting, setStarting] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Stop camera
  |--------------------------------------------------------------------------
  */

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Start camera
  |--------------------------------------------------------------------------
  */

  const startCamera = useCallback(async () => {
    if (!open) {
      return;
    }

    setStarting(true);
    setError("");

    try {
      stopCamera();

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Camera access is not supported by this browser."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: facingMode,
            },

            width: {
              ideal: 1280,
            },

            height: {
              ideal: 1280,
            },

            aspectRatio: {
              ideal: 1,
            },
          },

          audio: false,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject =
          stream;

        await videoRef.current.play();
      }
    } catch (err) {
      console.error(
        "CAMERA START ERROR:",
        err
      );

      let message =
        "Unable to access the camera.";

      if (
        err instanceof DOMException
      ) {
        if (
          err.name ===
          "NotAllowedError"
        ) {
          message =
            "Camera permission was denied. Please allow camera access in your browser settings.";
        } else if (
          err.name ===
          "NotFoundError"
        ) {
          message =
            "No camera was found on this device.";
        } else if (
          err.name ===
          "NotReadableError"
        ) {
          message =
            "The camera is already being used by another application.";
        } else if (
          err.name ===
          "SecurityError"
        ) {
          message =
            "Camera access is blocked by the browser.";
        }
      }

      setError(message);
    } finally {
      setStarting(false);
    }
  }, [
    facingMode,
    open,
    stopCamera,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Start / stop camera when modal opens
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!open) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [
    open,
    startCamera,
    stopCamera,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Capture photo
  |--------------------------------------------------------------------------
  */

  const handleCapture =
    useCallback(() => {
      const video =
        videoRef.current;

      if (!video) {
        return;
      }

      if (
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        setError(
          "Camera is not ready yet. Please try again."
        );

        return;
      }

      /*
       * Keep the source reasonably sized.
       * The actual image processing is handled
       * separately in ScanPage.
       */

      const maxDimension = 1600;

      let width =
        video.videoWidth;

      let height =
        video.videoHeight;

      if (width > maxDimension) {
        const ratio =
          maxDimension / width;

        width = maxDimension;
        height =
          Math.round(
            height * ratio
          );
      }

      if (height > maxDimension) {
        const ratio =
          maxDimension / height;

        height = maxDimension;
        width =
          Math.round(
            width * ratio
          );
      }

      const canvas =
        document.createElement(
          "canvas"
        );

      canvas.width = width;
      canvas.height = height;

      const context =
        canvas.getContext("2d");

      if (!context) {
        setError(
          "Unable to capture the photo."
        );

        return;
      }

      context.drawImage(
        video,
        0,
        0,
        width,
        height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError(
              "Unable to create the photo."
            );

            return;
          }

          const file =
            new File(
              [
                blob,
              ],
              `nutritrack-camera-${Date.now()}.jpg`,
              {
                type: "image/jpeg",
                lastModified:
                  Date.now(),
              }
            );

          stopCamera();

          onCapture(file);

          onClose();
        },
        "image/jpeg",
        0.82
      );
    }, [
      onCapture,
      onClose,
      stopCamera,
    ]);

  /*
  |--------------------------------------------------------------------------
  | Switch camera
  |--------------------------------------------------------------------------
  */

  const switchCamera =
    useCallback(() => {
      setFacingMode(
        (current) =>
          current ===
          "environment"
            ? "user"
            : "environment"
      );
    }, []);

  /*
  |--------------------------------------------------------------------------
  | Close
  |--------------------------------------------------------------------------
  */

  const handleClose =
    useCallback(() => {
      stopCamera();
      onClose();
    }, [
      onClose,
      stopCamera,
    ]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Camera"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-[24px] bg-black shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between bg-black px-4 py-4 text-white">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Camera
                size={20}
              />
            </div>

            <div>
              <h2 className="text-base font-semibold">
                Take a photo
              </h2>

              <p className="text-xs text-white/60">
                Position your meal inside the frame
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close camera"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
          >
            <X size={21} />
          </button>

        </div>

        {/* Camera */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-full w-full object-cover"
          />

          {/* Camera guide */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

            <div className="relative h-[65%] w-[80%]">

              {/* Top left */}
              <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-white/90" />

              {/* Top right */}
              <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-white/90" />

              {/* Bottom left */}
              <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-white/90" />

              {/* Bottom right */}
              <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-white/90" />

            </div>

          </div>

          {/* Loading */}
          {starting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">

              <div className="rounded-2xl bg-black/60 px-5 py-4 text-center text-white backdrop-blur">

                <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                <p className="text-sm">
                  Starting camera...
                </p>

              </div>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="absolute inset-x-4 bottom-4">

              <div className="flex items-start gap-3 rounded-2xl border border-red-300/30 bg-red-950/80 px-4 py-3 text-sm text-white backdrop-blur">

                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-red-300"
                />

                <p>
                  {error}
                </p>

              </div>

            </div>
          )}

        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 bg-black px-6 py-6">

          {/* Switch */}
          <button
            type="button"
            onClick={
              switchCamera
            }
            disabled={
              starting
            }
            aria-label="Switch camera"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95 disabled:opacity-40"
          >
            <RotateCcw
              size={21}
            />
          </button>

          {/* Capture */}
          <button
            type="button"
            onClick={
              handleCapture
            }
            disabled={
              starting
            }
            aria-label="Take photo"
            className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[5px] border-white/80 bg-white transition active:scale-90 disabled:opacity-50"
          >
            <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#004e47]">
              <Check
                size={28}
                strokeWidth={2.5}
                className="text-white"
              />
            </span>
          </button>

          {/* Spacer */}
          <div className="h-12 w-12" />

        </div>

      </div>
    </div>
  );
}