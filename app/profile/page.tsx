import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const query = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/profile");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, bio, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {query.saved === "1" && (
        <p className="mb-6 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
          Perfil salvo com sucesso!
        </p>
      )}

      <ProfileForm
        email={user.email ?? ""}
        defaultValues={{
          full_name: profile?.full_name ?? "",
          bio: profile?.bio ?? "",
          avatar_url: profile?.avatar_url ?? "",
        }}
      />
    </div>
  );
}