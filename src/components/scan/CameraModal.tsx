"use client";

import {
  Camera,
  X,
  RotateCcw,
  Check,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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
    useRef<HTMLVideoElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [facingMode, setFacingMode] =
    useState<"user" | "environment">(
      "environment"
    );

  useEffect(() => {
    if (!open) return;

    startCamera();

    return () => {
      stopCamera();
    };
  }, [open, facingMode]);

  async function startCamera() {
    setLoading(true);
    setError("");

    try {
      stopCamera();

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is not supported by this browser."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
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
        "Camera error:",
        err
      );

      if (
        err instanceof DOMException &&
        err.name === "NotAllowedError"
      ) {
        setError(
          "Camera permission was denied. Please allow camera access and try again."
        );
      } else if (
        err instanceof DOMException &&
        err.name === "NotFoundError"
      ) {
        setError(
          "No camera was found on this device."
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to access camera."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }
  }

  function closeCamera() {
    stopCamera();
    onClose();
  }

  function capturePhoto() {
    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      setError(
        "Camera is not ready yet. Please wait a moment."
      );

      return;
    }

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    const context =
      canvas.getContext("2d");

    if (!context) {
      setError(
        "Could not capture photo."
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
          setError(
            "Could not create image."
          );

          return;
        }

        const file = new File(
          [blob],
          `meal-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        stopCamera();

        onCapture(file);
        onClose();
      },
      "image/jpeg",
      0.9
    );
  }

  function switchCamera() {
    setFacingMode((current) =>
      current === "environment"
        ? "user"
        : "environment"
    );
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black">

      {/* Header */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">

        <button
          type="button"
          onClick={closeCamera}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white"
        >
          <X size={22} />
        </button>

        <p className="text-sm font-semibold text-white">
          Take Meal Photo
        </p>

        <button
          type="button"
          onClick={switchCamera}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white"
          disabled={loading}
        >
          <RotateCcw size={21} />
        </button>

      </div>

      {/* Camera */}
      <div className="flex h-full w-full items-center justify-center">

        {loading ? (
          <div className="text-center text-white">

            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />

            <p>
              Starting camera...
            </p>

          </div>
        ) : error ? (
          <div className="max-w-sm px-6 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              <Camera size={30} />
            </div>

            <p className="text-sm leading-6 text-white">
              {error}
            </p>

            <button
              type="button"
              onClick={startCamera}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Try Again
            </button>

          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        )}

      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gradient-to-t from-black/90 to-transparent pb-10 pt-16">

        <button
          type="button"
          onClick={capturePhoto}
          disabled={
            loading || Boolean(error)
          }
          className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-white bg-[#004e47] shadow-xl disabled:opacity-50"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#004e47]">
            <Camera size={28} />
          </div>
        </button>

      </div>

      <canvas
        ref={canvasRef}
        className="hidden"
      />

    </div>
  );
}