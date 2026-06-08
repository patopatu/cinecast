import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { productionPage as copy } from "@/lib/copy";

type ApplicationRow = {
  id: string;
  opportunity_id: string;
  message: string | null;
  portfolio_url: string | null;
  created_at: string;
  profiles: { full_name: string | null } | null;
};

export default async function ProductionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ applied?: string; already_applied?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const supabase = await createClient();

  const { data: production } = await supabase
    .from("productions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!production) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user?.id === production.user_id;

  const { data: opportunities } = await supabase
    .from("opportunities")
    .select(
      `id, title, type, description, is_paid, status, created_at,
       cast_roles ( character_name, age_range, gender ),
       crew_roles ( position, experience_level )`
    )
    .eq("production_id", production.id)
    .order("created_at", { ascending: false });

  const openCount =
    opportunities?.filter((o) => o.status === "open").length ?? 0;

  const appliedOpportunityIds = new Set<string>();
  if (user && !isOwner && opportunities && opportunities.length > 0) {
    const opportunityIds = opportunities.map((o) => o.id);
    const { data: myApplications } = await supabase
      .from("applications")
      .select("opportunity_id")
      .eq("user_id", user.id)
      .in("opportunity_id", opportunityIds);
    for (const row of myApplications ?? []) {
      appliedOpportunityIds.add(row.opportunity_id);
    }
  }

  const applicationsByOpportunity: Record<string, ApplicationRow[]> = {};
  if (isOwner && opportunities && opportunities.length > 0) {
    const opportunityIds = opportunities.map((o) => o.id);
    const { data: applications } = await supabase
      .from("applications")
      .select(
        `id, opportunity_id, message, portfolio_url, created_at,
         profiles ( full_name )`
      )
      .in("opportunity_id", opportunityIds)
      .order("created_at", { ascending: false });
    for (const app of (applications ?? []) as unknown as ApplicationRow[]) {
      if (!applicationsByOpportunity[app.opportunity_id]) {
        applicationsByOpportunity[app.opportunity_id] = [];
      }
      applicationsByOpportunity[app.opportunity_id].push(app);
    }
  }

  const showAppliedBanner = query.applied === "1";
  const showAlreadyAppliedBanner = query.already_applied === "1";

  return (
    <div className="pb-24">
      {/* BANNER */}
      <div className="relative">
        {production.cover_image ? (
          <div
            className="aspect-[16/9] w-full bg-cover bg-center md:aspect-[21/7]"
            style={{ backgroundImage: `url(${production.cover_image})` }}
          />
        ) : (
          <div
            className="aspect-[16/9] w-full md:aspect-[21/7]"
            style={{
              background:
                "linear-gradient(135deg, #0a1a2f 0%, #1a3a5c 50%, #07111F 100%)",
            }}
            aria-hidden="true"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.7) 70%, rgba(5,5,5,1) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 md:pb-12 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-eyebrow-muted">
                <span>
                  {copy.types[
                    production.project_type as keyof typeof copy.types
                  ] ?? production.project_type}
                </span>
                {production.city && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{production.city}</span>
                  </>
                )}
              </div>
              <h1
                className="text-display text-4xl text-foreground sm:text-6xl md:text-7xl"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
              >
                {production.title}
              </h1>
              <p className="mt-2 text-sm text-muted">
                {production.title} {copy.titleSuffix}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 md:pt-12 lg:px-8">
        {showAppliedBanner && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-electric/30 bg-electric/10 px-5 py-4 text-sm text-electric">
            <span className="status-dot bg-electric" />
            {copy.applied.success}
          </div>
        )}
        {showAlreadyAppliedBanner && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-card px-5 py-4 text-sm text-muted">
            <span className="status-dot bg-muted" />
            {copy.applied.alreadyApplied}
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-[300px_1fr] md:gap-12 lg:grid-cols-[340px_1fr]">
          {/* SIDEBAR */}
          <aside className="space-y-6 md:sticky md:top-24 md:self-start">
            <div className="surface-card space-y-5 p-6">
              <div>
                <p className="text-eyebrow-muted mb-2">{copy.meta.phase}</p>
                <p className="font-display text-lg text-foreground">
                  {copy.status[
                    production.status as keyof typeof copy.status
                  ] ?? production.status}
                </p>
              </div>
              <div className="border-t border-white/5 pt-5">
                <p className="text-eyebrow-muted mb-2">
                  {copy.sections.calls.title}
                </p>
                <p className="font-display text-3xl text-foreground">
                  {openCount}{" "}
                  <span className="font-sans text-sm font-normal text-muted">
                    {openCount === 1
                      ? copy.sections.calls.singular
                      : copy.sections.calls.plural}
                  </span>
                </p>
              </div>
              {isOwner && (
                <div className="flex flex-col gap-2 border-t border-white/5 pt-5">
                  <Link
                    href={`/productions/${production.slug}/opportunities/new`}
                    className="btn-primary w-full justify-center"
                  >
                    {copy.cta.newCall}
                  </Link>
                  <Link
                    href={`/productions/${production.slug}/edit`}
                    className="btn-secondary w-full justify-center"
                  >
                    {copy.cta.edit}
                  </Link>
                </div>
              )}
            </div>

            {(production.instagram || production.website) && (
              <div className="surface-card p-6">
                <p className="text-eyebrow-muted mb-4">
                  {copy.meta.productionContact}
                </p>
                <ul className="space-y-3 text-sm">
                  {production.instagram && (
                    <li className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-deep-black/40 text-muted">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm5 8a5 5 0 11-10 0 5 5 0 0110 0z" />
                        </svg>
                      </span>
                      <span className="truncate text-foreground">
                        {production.instagram}
                      </span>
                    </li>
                  )}
                  {production.website && (
                    <li>
                      <a
                        href={production.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-electric transition-colors hover:text-electric-soft"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-deep-black/40">
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M11 3h6v6M17 3l-7 7M13 11v6H3V7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="truncate">
                          {production.website.replace(/^https?:\/\//, "")}
                        </span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {!isOwner && user && (
              <button
                type="button"
                disabled
                className="btn-secondary w-full justify-center opacity-60"
                title="Em breve"
              >
                {copy.cta.share}
              </button>
            )}
          </aside>

          {/* PRINCIPAL */}
          <div className="space-y-12">
            {/* SOBRE */}
            {production.synopsis && (
              <section>
                <h2 className="text-eyebrow-muted mb-3">Sobre o projeto</h2>
                <p className="mb-4 text-sm text-muted">
                  {copy.sections.about.intro}
                </p>
                <p className="font-display text-xl leading-relaxed text-foreground/95 sm:text-2xl">
                  {production.synopsis}
                </p>
              </section>
            )}

            {/* CHAMADAS */}
            <section>
              <header className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-eyebrow-muted mb-2">
                    {copy.sections.calls.heading}
                  </h2>
                  <h3 className="font-display text-3xl text-foreground sm:text-4xl">
                    {copy.sections.calls.intro}
                  </h3>
                </div>
                {opportunities && opportunities.length > 0 && (
                  <span className="rounded-full border border-white/10 bg-card px-3 py-1 text-xs text-muted">
                    {opportunities.length}{" "}
                    {opportunities.length === 1
                      ? copy.sections.calls.singular
                      : copy.sections.calls.plural}
                  </span>
                )}
              </header>
              <p className="mb-6 text-sm text-muted">
                {copy.sections.calls.microcopy}
              </p>

              {!opportunities?.length && (
                <div className="rounded-3xl border border-dashed border-white/10 bg-card/40 px-6 py-16 text-center">
                  <p className="font-display text-xl text-foreground">
                    Nenhuma vaga aberta neste projeto.
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {isOwner
                      ? copy.sections.calls.empty.owner
                      : copy.sections.calls.empty.visitor}
                  </p>
                </div>
              )}

              <ul className="space-y-4">
                {opportunities?.map((opp) => {
                  const cast = opp.cast_roles?.[0];
                  const crew = opp.crew_roles?.[0];
                  const alreadyApplied = appliedOpportunityIds.has(opp.id);
                  const receivedApplications =
                    applicationsByOpportunity[opp.id] ?? [];
                  const canApply =
                    opp.status === "open" && user && !isOwner && !alreadyApplied;

                  return (
                    <li
                      key={opp.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card p-6 transition-all duration-200 hover:border-white/15"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                                opp.status === "open"
                                  ? "bg-success/15 text-success"
                                  : "bg-white/5 text-muted"
                              }`}
                            >
                              {opp.status === "open"
                                ? copy.opportunityStatus.open
                                : copy.opportunityStatus.draft}
                            </span>
                            <span className="rounded-full bg-electric/15 px-2.5 py-0.5 text-[11px] font-medium text-electric">
                              {copy.opportunityTypes[
                                opp.type as keyof typeof copy.opportunityTypes
                              ] ?? opp.type}
                            </span>
                            {opp.is_paid && (
                              <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-medium text-gold">
                                {copy.paidTag}
                              </span>
                            )}
                          </div>
                          <h4 className="font-display text-2xl text-foreground sm:text-3xl">
                            {opp.title}
                          </h4>
                          {cast && (
                            <p className="mt-2 text-sm text-muted">
                              Personagem:{" "}
                              <span className="text-foreground">
                                {cast.character_name}
                              </span>
                              {cast.age_range ? ` · ${cast.age_range}` : ""}
                            </p>
                          )}
                          {crew && (
                            <p className="mt-2 text-sm text-muted">
                              Cargo:{" "}
                              <span className="text-foreground">
                                {crew.position}
                              </span>
                            </p>
                          )}
                          {opp.description && (
                            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/80">
                              {opp.description}
                            </p>
                          )}
                        </div>

                        {canApply && (
                          <Link
                            href={`/opportunities/${opp.id}/apply`}
                            className="btn-primary shrink-0"
                          >
                            {copy.cta.apply}
                            <span aria-hidden="true">→</span>
                          </Link>
                        )}
                      </div>

                      {!canApply && opp.status === "open" && !user && (
                        <p className="mt-4 border-t border-white/5 pt-4 text-sm text-muted">
                          <Link
                            href="/login"
                            className="text-electric transition-colors hover:text-electric-soft"
                          >
                            {copy.loginToApply}
                          </Link>{" "}
                          {copy.loginToApplySuffix}
                        </p>
                      )}

                      {alreadyApplied && !isOwner && (
                        <p className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4 text-sm text-electric">
                          <span className="status-dot bg-electric" />
                          {copy.youApplied}
                        </p>
                      )}

                      {isOwner && receivedApplications.length > 0 && (
                        <div className="mt-6 border-t border-white/5 pt-5">
                          <p className="text-eyebrow-muted mb-3">
                            {copy.applicationsReceived(
                              receivedApplications.length
                            )}
                          </p>
                          <ul className="space-y-2">
                            {receivedApplications.map((app) => (
                              <li
                                key={app.id}
                                className="rounded-xl border border-white/5 bg-deep-black/40 p-4 text-sm"
                              >
                                <p className="font-display text-base text-foreground">
                                  {app.profiles?.full_name ?? "Profissional"}
                                </p>
                                {app.message && (
                                  <p className="mt-1.5 text-muted">
                                    {app.message}
                                  </p>
                                )}
                                {app.portfolio_url && (
                                  <a
                                    href={app.portfolio_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-2 inline-flex items-center gap-1.5 text-electric transition-colors hover:text-electric-soft"
                                  >
                                    {copy.viewPortfolio} →
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {isOwner &&
                        receivedApplications.length === 0 &&
                        opp.status === "open" && (
                          <p className="mt-4 border-t border-white/5 pt-4 text-xs text-muted">
                            {copy.noApplications}
                          </p>
                        )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
