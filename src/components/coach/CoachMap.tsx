"use client";

import type {
  Restaurant,
} from "./CoachMessage";

interface CoachMapProps {
  restaurants: Restaurant[];
}

export default function CoachMap({
  restaurants,
}: CoachMapProps) {
  if (
    restaurants.length === 0
  ) {
    return null;
  }

  const first =
    restaurants[0];

  if (
    first.latitude === undefined ||
    first.longitude === undefined
  ) {
    return (
      <div className="flex h-52 items-center justify-center bg-[#f3f4f5] px-4 text-center text-sm text-[#6e7977]">
        Map location is not available
        for these restaurants.
      </div>
    );
  }

  const mapUrl =
    `https://www.google.com/maps/search/?api=1&query=${first.latitude},${first.longitude}`;

  return (
    <div className="relative h-56 bg-[#e7eeee]">
      <iframe
        title="Nearby healthy restaurants"
        src={`https://www.google.com/maps?q=${first.latitude},${first.longitude}&z=14&output=embed`}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#00685f] shadow-md"
      >
        Open in Maps
      </a>
    </div>
  );
}