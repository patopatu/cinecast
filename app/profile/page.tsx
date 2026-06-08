import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { profile as profileCopy, success as successCopy } from "@/lib/copy";

type ProfileRow = {
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
};

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
    .maybeSingle<ProfileRow>();

  const fullName = profile?.full_name ?? "Profissional do audiovisual";
  const bio = profile?.bio ?? "";
  const avatarUrl = profile?.avatar_url ?? "";
  const hasIncompleteProfile = !profile?.bio || !profile?.avatar_url;

  return (
    <div className="pb-16">
      {/* ===================== HERO COMPACTO ===================== */}
      <section className="border-b border-white/5 bg-gradient-to-b from-night-blue to-deep-black pt-8 pb-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 sm:px-6 md:flex-row md:items-center md:gap-6 lg:px-8">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-deep-black bg-card text-2xl font-display text-cream shadow-lg shadow-black/60 md:h-24 md:w-24"
            aria-label="Foto de perfil"
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              fullName.slice(0, 1).toUpperCase()
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl text-foreground sm:text-3xl md:text-4xl">
              {fullName}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {profileCopy.subtitleTemplate(
                "Profissional do audiovisual",
                "—",
                profileCopy.availability.available
              )}
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-2 md:w-auto">
            <Link href="#contato" className="btn-primary text-sm">
              {profileCopy.cta.contact}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/profile/edit" className="btn-secondary text-sm">
              {profileCopy.cta.edit}
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== BANNERS ===================== */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {query.saved === "1" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
            <span className="status-dot bg-success" />
            <span className="font-medium">
              {successCopy.profileUpdated.title}
            </span>
            <span className="text-success/80">
              {" "}— {successCopy.profileUpdated.description}
            </span>
          </div>
        )}

        {hasIncompleteProfile && (
          <div className="mb-6 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm">
            <p className="font-medium text-foreground">
              {profileCopy.empty.incomplete.title}
            </p>
            <p className="mt-0.5 text-muted">
              {profileCopy.empty.incomplete.description}
            </p>
          </div>
        )}
      </div>

      {/* ===================== CONTEÚDO RESUMIDO ===================== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* COLUNA PRINCIPAL */}
          <div className="space-y-8 lg:col-span-2">
            {/* SOBRE */}
            <section>
              <h2 className="text-eyebrow mb-3">
                {profileCopy.sections.about}
              </h2>
              <h3 className="text-h1 mb-3 text-xl text-foreground sm:text-2xl">
                Sobre
              </h3>
              {bio ? (
                <p className="font-display text-lg leading-relaxed text-foreground/90">
                  {bio}
                </p>
              ) : (
                <div className="rounded-xl border border-dashed border-white/10 bg-card/30 px-5 py-6 text-center">
                  <p className="text-sm text-foreground">
                    {profileCopy.empty.bio.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {profileCopy.empty.bio.description}
                  </p>
                  <Link
                    href="/profile/edit"
                    className="btn-secondary mt-3 text-xs"
                  >
                    {profileCopy.empty.bio.cta}
                  </Link>
                </div>
              )}
            </section>

            {/* FILMOGRAFIA */}
            <section>
              <h2 className="text-eyebrow mb-3">
                {profileCopy.sections.filmography}
              </h2>
              <h3 className="text-h1 mb-3 text-xl text-foreground sm:text-2xl">
                {profileCopy.filmography.title}
              </h3>
              <div className="rounded-xl border border-dashed border-white/10 bg-card/30 px-5 py-10 text-center">
                <p className="font-display text-base text-foreground">
                  {profileCopy.filmography.emptyTitle}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {profileCopy.filmography.emptyDescription}
                </p>
              </div>
            </section>

            {/* CRÉDITOS */}
            <section>
              <h2 className="text-eyebrow mb-3">
                {profileCopy.sections.credits}
              </h2>
              <h3 className="text-h1 mb-3 text-xl text-foreground sm:text-2xl">
                {profileCopy.credits.title}
              </h3>
              <div className="rounded-xl border border-dashed border-white/10 bg-card/30 px-5 py-8 text-center">
                <p className="font-display text-base text-foreground">
                  {profileCopy.credits.emptyTitle}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {profileCopy.credits.emptyDescription}
                </p>
              </div>
            </section>
          </div>

          {/* COLUNA LATERAL */}
          <aside className="space-y-8">
            {/* ESPECIALIDADES */}
            <section>
              <h2 className="text-eyebrow mb-3">
                {profileCopy.sections.specialties}
              </h2>
              <h3 className="text-h1 mb-3 text-lg text-foreground">
                {profileCopy.specialties.title}
              </h3>
              <div className="rounded-xl border border-dashed border-white/10 bg-card/30 px-4 py-5 text-center">
                <p className="text-xs text-muted">
                  {profileCopy.specialties.emptyDescription}
                </p>
              </div>
            </section>

            {/* FORMAÇÃO + FESTIVAIS */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <section>
                <h2 className="text-eyebrow mb-3">
                  {profileCopy.sections.education}
                </h2>
                <h3 className="text-h1 mb-3 text-lg text-foreground">
                  {profileCopy.education.title}
                </h3>
                <div className="rounded-xl border border-dashed border-white/10 bg-card/30 px-4 py-5 text-center">
                  <p className="text-xs text-muted">
                    {profileCopy.education.emptyDescription}
                  </p>
                </div>
              </section>
              <section>
                <h2 className="text-eyebrow mb-3">
                  {profileCopy.sections.awards}
                </h2>
                <h3 className="text-h1 mb-3 text-lg text-foreground">
                  {profileCopy.awards.title}
                </h3>
                <div className="rounded-xl border border-dashed border-white/10 bg-card/30 px-4 py-5 text-center">
                  <p className="text-xs text-muted">
                    {profileCopy.awards.emptyDescription}
                  </p>
                </div>
              </section>
            </div>

            {/* CONTATO */}
            <section id="contato" className="scroll-mt-20">
              <h2 className="text-eyebrow mb-3">
                {profileCopy.sections.contact}
              </h2>
              <h3 className="text-h1 mb-3 text-lg text-foreground">
                {profileCopy.contact.title}
              </h3>
              <div className="rounded-xl border border-white/5 bg-card p-5">
                <p className="text-sm text-foreground/90">
                  {profileCopy.contact.description}
                </p>
                <a
                  href={`mailto:${user.email}`}
                  className="btn-primary mt-4 w-full justify-center text-sm"
                >
                  {profileCopy.cta.contact}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
