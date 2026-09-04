"use client";

import {
  ExternalLink,
  MapPin,
  Utensils,
} from "lucide-react";

import type {
  Restaurant,
} from "./CoachMessage";

interface RestaurantResultsProps {
  restaurants: Restaurant[];
}

export default function RestaurantResults({
  restaurants,
}: RestaurantResultsProps) {
  if (!restaurants.length) {
    return (
      <div className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <MapPin
            size={20}
            className="mt-0.5 shrink-0 text-gray-500"
          />

          <div>
            <p className="font-semibold text-gray-900">
              No nearby restaurants found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try again from a different location.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {restaurants.map(
        (restaurant) => (
          <div
            key={restaurant.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <Utensils
                  size={19}
                  className="text-gray-700"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900">
                  {restaurant.name}
                </h3>

                <div className="mt-1 flex items-start gap-1.5">
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-gray-400"
                  />

                  <p className="text-sm leading-5 text-gray-500">
                    {restaurant.address}
                  </p>
                </div>

                {restaurant.cuisine && (
                  <p className="mt-2 text-xs capitalize text-gray-400">
                    {restaurant.cuisine
                      .replaceAll(";", ", ")
                      .replaceAll("_", " ")}
                  </p>
                )}

                <a
                  href={
                    restaurant.directionsUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#004e47] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003f3a]"
                >
                  <MapPin size={16} />

                  Get Directions

                  <ExternalLink
                    size={14}
                  />
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}