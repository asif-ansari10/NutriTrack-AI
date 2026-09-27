import { createClient } from "@/lib/supabase/server";
import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
import HelpCenter from "./HelpCenter";

export default async function HelpPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
}) {
  const params = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <ProtectedAppShell>
      <main className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">

          <HelpCenter
            userName={
              profile?.full_name ||
              user.email?.split("@")[0] ||
              "User"
            }
            userEmail={user.email || ""}
            error={params.error}
            success={params.success}
          />

        </div>
      </main>
    </ProtectedAppShell>
  );
}