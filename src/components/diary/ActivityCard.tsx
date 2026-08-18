import {
  Activity as ActivityIcon,
  Dumbbell,
  Footprints,
  Bike,
  Trash2,
} from "lucide-react";

import type {
  DiaryActivity,
} from "@/lib/diary/getDiaryData";

import {
  deleteActivity,
} from "@/app/diary/actions";

interface ActivityCardProps {
  activity: DiaryActivity;
}

function getActivityIcon(
  type: string
) {
  const value =
    type.toLowerCase();

  if (
    value.includes("walk")
  ) {
    return Footprints;
  }

  if (
    value.includes("gym") ||
    value.includes("weight") ||
    value.includes("strength")
  ) {
    return Dumbbell;
  }

  if (
    value.includes("cycle") ||
    value.includes("bike")
  ) {
    return Bike;
  }

  return ActivityIcon;
}

export default function ActivityCard({
  activity,
}: ActivityCardProps) {
  const Icon =
    getActivityIcon(
      activity.activity_type
    );

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#e1e3e4] bg-[#f7f8f8] p-3 sm:gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00685f] text-white">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-sm font-bold text-[#191c1d]">
          {activity.activity_name}
        </p>

        <p className="mt-0.5 truncate text-xs text-[#6e7977]">
          {activity.duration_minutes || 0} min
          {" • "}
          {activity.activity_type}
        </p>

      </div>

      <div className="flex shrink-0 items-center gap-1">

        <span className="text-xs font-bold text-[#004e47] sm:text-sm">
          {Number(
            activity.calories_burned || 0
          ).toLocaleString()}{" "}
          kcal
        </span>

        <form
          action={deleteActivity}
        >
          <input
            type="hidden"
            name="id"
            value={activity.id}
          />

          <button
            type="submit"
            aria-label="Delete activity"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#8a9492] transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </form>

      </div>

    </div>
  );
}