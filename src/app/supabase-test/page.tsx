import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-[#004e47]">
          Supabase Connection Test
        </h1>

        <div className="mt-6 rounded-xl bg-gray-100 p-4">
          {user ? (
            <div>
              <p className="font-semibold text-green-700">
                ✓ Supabase connected
              </p>

              <p className="mt-2 text-sm">
                Logged in as:
              </p>

              <p className="font-medium">
                {user.email}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-[#004e47]">
                ✓ Supabase connected
              </p>

              <p className="mt-2 text-sm text-gray-600">
                No user is currently logged in.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}