// // src/lib/coach/restaurantSearch.ts

// export interface Restaurant {
//   id: string;
//   name: string;
//   address: string;
//   latitude: number | null;
//   longitude: number | null;
//   cuisine: string | null;
//   directionsUrl: string;
// }

// /**
//  * Create a Google Maps directions URL.
//  *
//  * This does NOT use the Google Maps API.
//  * It simply opens Google Maps in the app/browser.
//  */
// export function createGoogleMapsDirectionsUrl(
//   restaurant: Restaurant
// ): string {
//   const destination =
//     restaurant.latitude !== null &&
//     restaurant.longitude !== null
//       ? `${restaurant.latitude},${restaurant.longitude}`
//       : restaurant.address;

//   const params = new URLSearchParams({
//     api: "1",
//     destination,
//     travelmode: "driving",
//   });

//   return `https://www.google.com/maps/dir/?${params.toString()}`;
// }

// /**
//  * Search nearby restaurants using OpenStreetMap Overpass API.
//  *
//  * No API key.
//  * No Google billing.
//  */
// export async function searchRestaurants(
//   latitude: number,
//   longitude: number
// ): Promise<Restaurant[]> {
//   if (
//     !Number.isFinite(latitude) ||
//     !Number.isFinite(longitude)
//   ) {
//     return [];
//   }

//   /*
//    * Search within approximately 5 km.
//    *
//    * We search:
//    * - restaurants
//    * - fast food
//    * - cafes
//    *
//    * but return them as restaurant options.
//    */
//   const radius = 5000;

//   const query = `
// [out:json][timeout:15];

// (
//   node["amenity"="restaurant"](around:${radius},${latitude},${longitude});
//   way["amenity"="restaurant"](around:${radius},${latitude},${longitude});
//   relation["amenity"="restaurant"](around:${radius},${latitude},${longitude});

//   node["amenity"="fast_food"](around:${radius},${latitude},${longitude});
//   way["amenity"="fast_food"](around:${radius},${latitude},${longitude});

//   node["amenity"="cafe"](around:${radius},${latitude},${longitude});
//   way["amenity"="cafe"](around:${radius},${latitude},${longitude});
// );

// out center tags;
// `;

//   try {
//     const response = await fetch(
//       "https://overpass-api.de/api/interpreter",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type":
//             "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           data: query,
//         }).toString(),
//         cache: "no-store",
//       }
//     );

//     if (!response.ok) {
//       console.error(
//         "Overpass restaurant search failed:",
//         response.status,
//         response.statusText
//       );

//       return [];
//     }

//     const data = await response.json();

//     if (!Array.isArray(data?.elements)) {
//       return [];
//     }

//     const restaurants: Restaurant[] = [];

//     for (const element of data.elements) {
//       const tags = element.tags || {};

//       const name =
//         typeof tags.name === "string"
//           ? tags.name.trim()
//           : "";

//       /*
//        * Skip places without names.
//        */
//       if (!name) {
//         continue;
//       }

//       /*
//        * Nodes have lat/lon directly.
//        * Ways/relations normally have a center.
//        */
//       const elementLatitude =
//         typeof element.lat === "number"
//           ? element.lat
//           : typeof element.center?.lat === "number"
//             ? element.center.lat
//             : null;

//       const elementLongitude =
//         typeof element.lon === "number"
//           ? element.lon
//           : typeof element.center?.lon === "number"
//             ? element.center.lon
//             : null;

//       if (
//         elementLatitude === null ||
//         elementLongitude === null
//       ) {
//         continue;
//       }

//       const address = buildAddress(tags);

//       const cuisine =
//         typeof tags.cuisine === "string"
//           ? tags.cuisine
//           : null;

//       const id = `osm-${element.type}-${element.id}`;

//       const restaurant: Restaurant = {
//         id,
//         name,
//         address,
//         latitude: elementLatitude,
//         longitude: elementLongitude,
//         cuisine,
//         directionsUrl: "",
//       };

//       restaurant.directionsUrl =
//         createGoogleMapsDirectionsUrl(
//           restaurant
//         );

//       restaurants.push(restaurant);
//     }

//     /*
//      * Remove duplicate names/locations.
//      */
//     const unique = new Map<
//       string,
//       Restaurant
//     >();

//     for (const restaurant of restaurants) {
//       const key =
//         `${restaurant.name.toLowerCase()}-${restaurant.latitude}-${restaurant.longitude}`;

//       if (!unique.has(key)) {
//         unique.set(key, restaurant);
//       }
//     }

//     /*
//      * Sort by distance from user.
//      */
//     const sorted = Array.from(
//       unique.values()
//     ).sort((a, b) => {
//       const distanceA = distanceInKm(
//         latitude,
//         longitude,
//         a.latitude!,
//         a.longitude!
//       );

//       const distanceB = distanceInKm(
//         latitude,
//         longitude,
//         b.latitude!,
//         b.longitude!
//       );

//       return distanceA - distanceB;
//     });

//     /*
//      * Return a reasonable number of options.
//      */
//     return sorted.slice(0, 10);
//   } catch (error) {
//     console.error(
//       "Restaurant search error:",
//       error
//     );

//     return [];
//   }
// }

// /**
//  * Build a readable address from OSM tags.
//  */
// function buildAddress(
//   tags: Record<string, string>
// ): string {
//   const parts: string[] = [];

//   if (tags["addr:housenumber"]) {
//     parts.push(
//       tags["addr:housenumber"]
//     );
//   }

//   if (tags["addr:street"]) {
//     parts.push(tags["addr:street"]);
//   }

//   if (tags["addr:suburb"]) {
//     parts.push(tags["addr:suburb"]);
//   }

//   if (tags["addr:city"]) {
//     parts.push(tags["addr:city"]);
//   }

//   if (tags["addr:state"]) {
//     parts.push(tags["addr:state"]);
//   }

//   if (tags["addr:postcode"]) {
//     parts.push(tags["addr:postcode"]);
//   }

//   if (parts.length > 0) {
//     return parts.join(", ");
//   }

//   /*
//    * Some OSM places have no structured address.
//    * Return a useful fallback.
//    */
//   return "Address not available";
// }

// /**
//  * Haversine distance.
//  */
// function distanceInKm(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number
// ): number {
//   const earthRadiusKm = 6371;

//   const dLat =
//     degreesToRadians(lat2 - lat1);

//   const dLon =
//     degreesToRadians(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(degreesToRadians(lat1)) *
//       Math.cos(degreesToRadians(lat2)) *
//       Math.sin(dLon / 2) ** 2;

//   const c =
//     2 *
//     Math.atan2(
//       Math.sqrt(a),
//       Math.sqrt(1 - a)
//     );

//   return earthRadiusKm * c;
// }

// function degreesToRadians(
//   degrees: number
// ): number {
//   return (degrees * Math.PI) / 180;
// }

/* ========================================================================== */
/* Nearby Restaurant Search                                                   */
/* ========================================================================== */

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  cuisine: string | null;
  directionsUrl: string;
}

/* -------------------------------------------------------------------------- */
/* Google Maps directions URL                                                 */
/* -------------------------------------------------------------------------- */

export function createGoogleMapsDirectionsUrl(
  restaurant: Restaurant
): string {
  const destination =
    restaurant.latitude !== null &&
    restaurant.longitude !== null
      ? `${restaurant.latitude},${restaurant.longitude}`
      : restaurant.address;

  const params = new URLSearchParams({
    api: "1",
    destination,
    travelmode: "driving",
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/* -------------------------------------------------------------------------- */
/* Distance calculation                                                       */
/* -------------------------------------------------------------------------- */

function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusKm = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(
      (lat1 * Math.PI) / 180
    ) *
      Math.cos(
        (lat2 * Math.PI) / 180
      ) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
}

/* -------------------------------------------------------------------------- */
/* Address builder                                                            */
/* -------------------------------------------------------------------------- */

function buildAddress(
  tags: Record<string, string | undefined>
): string {
  /* ------------------------------------------------------------------------ */
  /* Full address if OSM has one                                             */
  /* ------------------------------------------------------------------------ */

  if (tags["addr:full"]) {
    return tags["addr:full"]!;
  }

  const parts = [
    tags["addr:housenumber"],
    tags["addr:street"],
    tags["addr:suburb"],
    tags["addr:neighbourhood"],
    tags["addr:city"],
    tags["addr:state"],
    tags["addr:postcode"],
  ].filter(
    (value): value is string =>
      Boolean(value && value.trim())
  );

  if (parts.length > 0) {
    return parts.join(", ");
  }

  return "Address not available";
}

/* -------------------------------------------------------------------------- */
/* Search restaurants                                                         */
/* -------------------------------------------------------------------------- */

export async function searchRestaurants(
  latitude: number,
  longitude: number
): Promise<Restaurant[]> {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return [];
  }

  const radius = 5000;

  const query = `
[out:json][timeout:20];

(
  node["amenity"="restaurant"](around:${radius},${latitude},${longitude});
  way["amenity"="restaurant"](around:${radius},${latitude},${longitude});
  relation["amenity"="restaurant"](around:${radius},${latitude},${longitude});

  node["amenity"="fast_food"](around:${radius},${latitude},${longitude});
  way["amenity"="fast_food"](around:${radius},${latitude},${longitude});

  node["amenity"="cafe"](around:${radius},${latitude},${longitude});
  way["amenity"="cafe"](around:${radius},${latitude},${longitude});
);

out center tags;
`;

  try {
    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8",

          Accept:
            "application/json",

          /*
           * Some public Overpass infrastructure expects a useful
           * User-Agent rather than an anonymous server request.
           */
          "User-Agent":
            "NutriTrackAI/1.0",
        },

        body: new URLSearchParams({
          data: query,
        }).toString(),

        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Overpass restaurant search failed:",
        response.status,
        response.statusText,
        errorText.slice(0, 500)
      );

      return [];
    }

    const data =
      (await response.json()) as {
        elements?: Array<{
          type: string;
          id: number;
          lat?: number;
          lon?: number;
          center?: {
            lat?: number;
            lon?: number;
          };
          tags?: Record<
            string,
            string | undefined
          >;
        }>;
      };

    const elements =
      Array.isArray(data.elements)
        ? data.elements
        : [];

    const restaurants: Restaurant[] =
      [];

    const seen = new Set<string>();

    for (const element of elements) {
      const tags =
        element.tags || {};

      const name =
        tags.name?.trim();

      /*
       * Ignore unnamed places.
       */
      if (!name) {
        continue;
      }

      /*
       * Node coordinates.
       */
      let restaurantLatitude =
        typeof element.lat === "number"
          ? element.lat
          : null;

      let restaurantLongitude =
        typeof element.lon === "number"
          ? element.lon
          : null;

      /*
       * Way/relation coordinates.
       */
      if (
        restaurantLatitude === null ||
        restaurantLongitude === null
      ) {
        restaurantLatitude =
          typeof element.center?.lat ===
          "number"
            ? element.center.lat
            : null;

        restaurantLongitude =
          typeof element.center?.lon ===
          "number"
            ? element.center.lon
            : null;
      }

      /*
       * We need coordinates for proper distance sorting and
       * Google Maps directions.
       */
      if (
        restaurantLatitude === null ||
        restaurantLongitude === null
      ) {
        continue;
      }

      const distanceKm =
        calculateDistanceKm(
          latitude,
          longitude,
          restaurantLatitude,
          restaurantLongitude
        );

      /*
       * Deduplicate the same place.
       */
      const uniqueKey =
        `${name.toLowerCase()}-${restaurantLatitude.toFixed(
          5
        )}-${restaurantLongitude.toFixed(
          5
        )}`;

      if (seen.has(uniqueKey)) {
        continue;
      }

      seen.add(uniqueKey);

      const address =
        buildAddress(tags);

      const restaurant: Restaurant =
        {
          id: `${element.type}-${element.id}`,

          name,

          address,

          latitude:
            restaurantLatitude,

          longitude:
            restaurantLongitude,

          cuisine:
            tags.cuisine?.trim() ||
            null,

          directionsUrl: "",
        };

      restaurant.directionsUrl =
        createGoogleMapsDirectionsUrl(
          restaurant
        );

      /*
       * Temporary distance property for sorting.
       */
      (
        restaurant as Restaurant & {
          _distanceKm?: number;
        }
      )._distanceKm =
        distanceKm;

      restaurants.push(
        restaurant
      );
    }

    restaurants.sort(
      (a, b) =>
        (
          a as Restaurant & {
            _distanceKm?: number;
          }
        )._distanceKm! -
        (
          b as Restaurant & {
            _distanceKm?: number;
          }
        )._distanceKm!
    );

    /*
     * Remove internal sorting property before returning.
     */
    return restaurants
      .slice(0, 10)
      .map(
        (restaurant) => {
          const cleanRestaurant = {
            ...restaurant,
          } as Restaurant & {
            _distanceKm?: number;
          };

          delete cleanRestaurant._distanceKm;

          return cleanRestaurant;
        }
      );
  } catch (error) {
    console.error(
      "Overpass restaurant search exception:",
      error
    );

    return [];
  }
}