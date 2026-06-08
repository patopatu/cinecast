import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { profile as profileCopy } from "@/lib/copy";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";

type ProfileRow = {
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
};

export default async function ProfileEditPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/profile/edit");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, bio, avatar_url")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <header className="mb-10">
        <span className="text-eyebrow-muted">Perfil profissional</span>
        <h1 className="text-h1 mt-2 text-3xl text-foreground sm:text-4xl">
          Editar informações
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          Atualize sua apresentação, foto e biografia. Esses dados são
          públicos e aparecem no seu cartão profissional.
        </p>
      </header>

      <div className="surface-card p-6 sm:p-8">
        <ProfileEditForm
          email={user.email ?? ""}
          defaultValues={{
            full_name: profile?.full_name ?? "",
            bio: profile?.bio ?? "",
            avatar_url: profile?.avatar_url ?? "",
          }}
        />
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        {profileCopy.form.avatarHint}
      </p>
    </div>
  );
}
