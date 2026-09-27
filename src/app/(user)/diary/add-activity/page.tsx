import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { addActivityForm } from "../actions";

interface Props {
  searchParams: Promise<{
    date?: string;
  }>;
}

function getTodayIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export default async function AddActivityPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const date =
    params.date && /^\d{4}-\d{2}-\d{2}$/.test(params.date)
      ? params.date
      : getTodayIndia();

  return (
    <main className="min-h-screen bg-[#f8f9fa] px-4 py-6 text-[#191c1d] sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href={`/diary?date=${date}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#004e47] hover:text-[#00685f]"
        >
          <ArrowLeft size={18} />
          Back to Diary
        </Link>

        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-8">
          <h1 className="text-2xl font-bold">
            Add Activity
          </h1>

          <p className="mt-1 text-sm text-[#3e4947]">
            Record your exercise or physical activity.
          </p>

          <form
            action={addActivityForm}
            className="mt-7 space-y-5"
          >
            <input
              type="hidden"
              name="activity_date"
              value={date}
            />

            <div>
              <label
                htmlFor="activity_type"
                className="mb-2 block text-sm font-medium"
              >
                Activity Type
              </label>

              <select
                id="activity_type"
                name="activity_type"
                defaultValue="gym"
                className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 text-base outline-none focus:border-[#004e47]"
              >
                <option value="gym">Gym</option>
                <option value="walking">Walking</option>
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
                <option value="sports">Sports</option>
                <option value="strength">Strength Training</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="activity_name"
                className="mb-2 block text-sm font-medium"
              >
                Activity Name
              </label>

              <input
                id="activity_name"
                name="activity_name"
                type="text"
                required
                placeholder="Morning Gym"
                className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base outline-none placeholder:text-gray-400 focus:border-[#004e47]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="duration_minutes"
                  className="mb-2 block text-sm font-medium"
                >
                  Duration (minutes)
                </label>

                <input
                  id="duration_minutes"
                  type="number"
                  name="duration_minutes"
                  min="1"
                  required
                  inputMode="numeric"
                  placeholder="45"
                  className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base outline-none focus:border-[#004e47]"
                />
              </div>

              <div>
                <label
                  htmlFor="calories_burned"
                  className="mb-2 block text-sm font-medium"
                >
                  Calories Burned
                </label>

                <input
                  id="calories_burned"
                  type="number"
                  name="calories_burned"
                  min="0"
                  required
                  inputMode="numeric"
                  placeholder="250"
                  className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base outline-none focus:border-[#004e47]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="note"
                className="mb-2 block text-sm font-medium"
              >
                Note
              </label>

              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="Optional note about your activity..."
                className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 text-base outline-none placeholder:text-gray-400 focus:border-[#004e47]"
              />
            </div>

            <button
              type="submit"
              className="min-h-[52px] w-full rounded-xl bg-[#004e47] px-5 text-base font-semibold text-white hover:bg-[#00685f]"
            >
              Add Activity
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
