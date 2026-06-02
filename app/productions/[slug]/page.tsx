import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const projectTypeLabels: Record<string, string> = {
  film: "Filme",
  series: "Série",
  short: "Curta-metragem",
  documentary: "Documentário",
  commercial: "Comercial / Vídeo",
  other: "Outro",
};

const statusLabels: Record<string, string> = {
  development: "Em desenvolvimento",
  pre_production: "Pré-produção",
  production: "Em produção",
  post_production: "Pós-produção",
  released: "Lançado",
};

const opportunityTypeLabels: Record<string, string> = {
  cast: "Elenco",
  crew: "Equipe",
  extra: "Extra",
  internship: "Estágio",
  volunteer: "Voluntário",
};

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
      `
      id,
      title,
      type,
      description,
      is_paid,
      status,
      created_at,
      cast_roles ( character_name, age_range, gender ),
      crew_roles ( position, experience_level )
    `
    )
    .eq("production_id", production.id)
    .order("created_at", { ascending: false });

  const openCount =
    opportunities?.filter((o) => o.status === "open").length ?? 0;

  // IDs das vagas em que ESTE usuário já se candidatou
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

  // Candidaturas de outras pessoas (só o dono da produção vê)
  const applicationsByOpportunity: Record<string, ApplicationRow[]> = {};

  if (isOwner && opportunities && opportunities.length > 0) {
    const opportunityIds = opportunities.map((o) => o.id);
    const { data: applications } = await supabase
      .from("applications")
      .select(
        `
        id,
        opportunity_id,
        message,
        portfolio_url,
        created_at,
        profiles ( full_name )
      `
      )
      .in("opportunity_id", opportunityIds)
      .order("created_at", { ascending: false });

    for (const app of (applications ?? []) as ApplicationRow[]) {
      if (!applicationsByOpportunity[app.opportunity_id]) {
        applicationsByOpportunity[app.opportunity_id] = [];
      }
      applicationsByOpportunity[app.opportunity_id].push(app);
    }
  }

  const showAppliedBanner = query.applied === "1";
  const showAlreadyAppliedBanner = query.already_applied === "1";

  return (
    <div className="pb-16">
      {production.cover_image ? (
        <div
          className="h-64 w-full bg-cover bg-center md:h-80"
          style={{ backgroundImage: `url(${production.cover_image})` }}
        />
      ) : (
        <div className="h-48 w-full bg-card" />
      )}

      <div className="mx-auto max-w-4xl px-4 py-10">
        {showAppliedBanner && (
          <p className="mb-6 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
            Candidatura enviada com sucesso!
          </p>
        )}

        {showAlreadyAppliedBanner && (
          <p className="mb-6 rounded-lg bg-card px-4 py-3 text-sm text-muted">
            Você já se candidatou a uma vaga desta produção.
          </p>
        )}

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              {production.title}
            </h1>
            <p className="mt-2 text-muted">
              {projectTypeLabels[production.project_type] ??
                production.project_type}
              {production.city ? ` · ${production.city}` : ""}
            </p>
            <p className="mt-1 text-sm text-primary">
              {statusLabels[production.status] ?? production.status}
            </p>
            <p className="mt-2 text-sm text-muted">
              {openCount} chamada(s) aberta(s)
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {isOwner && (
              <>
                <Link
                  href={`/productions/${production.slug}/opportunities/new`}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  Nova chamada
                </Link>
                <Link
                  href={`/productions/${production.slug}/edit`}
                  className="rounded-lg border border-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Editar produção
                </Link>
              </>
            )}
          </div>
        </div>

        {production.synopsis && (
          <section className="mb-8 rounded-2xl border border-card bg-card p-6">
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Sinopse
            </h2>
            <p className="whitespace-pre-line text-muted">
              {production.synopsis}
            </p>
          </section>
        )}

        <section className="mb-8 rounded-2xl border border-card bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Redes e site
          </h2>
          <ul className="space-y-2 text-sm text-muted">
            {production.instagram && (
              <li>
                Instagram:{" "}
                <span className="text-foreground">{production.instagram}</span>
              </li>
            )}
            {production.website && (
              <li>
                Site:{" "}
                <a
                  href={production.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-primary-hover"
                >
                  {production.website}
                </a>
              </li>
            )}
            {!production.instagram && !production.website && (
              <li>Nenhum link informado.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-card bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Chamadas
          </h2>

          {!opportunities?.length && (
            <p className="text-sm text-muted">
              Nenhuma chamada publicada ainda.
              {isOwner ? " Clique em Nova chamada para começar." : ""}
            </p>
          )}

          <ul className="space-y-4">
            {opportunities?.map((opp) => {
              const cast = opp.cast_roles?.[0];
              const crew = opp.crew_roles?.[0];
              const alreadyApplied = appliedOpportunityIds.has(opp.id);
              const receivedApplications =
                applicationsByOpportunity[opp.id] ?? [];

              const canApply =
                opp.status === "open" &&
                user &&
                !isOwner &&
                !alreadyApplied;

              return (
                <li
                  key={opp.id}
                  className="rounded-xl border border-background p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-medium text-foreground">{opp.title}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        opp.status === "open"
                          ? "bg-primary/20 text-primary"
                          : "bg-background text-muted"
                      }`}
                    >
                      {opp.status === "open" ? "Aberta" : "Rascunho"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted">
                    {opportunityTypeLabels[opp.type] ?? opp.type}
                    {opp.is_paid ? " · Remunerada" : ""}
                  </p>

                  {cast && (
                    <p className="mt-2 text-sm text-foreground">
                      Personagem: {cast.character_name}
                      {cast.age_range ? ` · ${cast.age_range}` : ""}
                    </p>
                  )}

                  {crew && (
                    <p className="mt-2 text-sm text-foreground">
                      Cargo: {crew.position}
                    </p>
                  )}

                  {opp.description && (
                    <p className="mt-2 line-clamp-3 text-sm text-muted">
                      {opp.description}
                    </p>
                  )}

                  {/* Candidatar-se (visitante logado) */}
                  {canApply && (
                    <Link
                      href={`/opportunities/${opp.id}/apply`}
                      className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                    >
                      Candidatar-se
                    </Link>
                  )}

                  {opp.status === "open" && !user && (
                    <p className="mt-3 text-sm text-muted">
                      <Link
                        href="/login"
                        className="text-primary hover:text-primary-hover"
                      >
                        Faça login
                      </Link>{" "}
                      para se candidatar.
                    </p>
                  )}

                  {alreadyApplied && !isOwner && (
                    <p className="mt-3 text-sm text-primary">
                      Você já se candidatou a esta vaga.
                    </p>
                  )}

                  {/* Candidaturas recebidas (dono) */}
                  {isOwner && receivedApplications.length > 0 && (
                    <div className="mt-4 border-t border-background pt-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                        Candidaturas recebidas ({receivedApplications.length})
                      </p>
                      <ul className="space-y-2">
                        {receivedApplications.map((app) => (
                          <li
                            key={app.id}
                            className="rounded-lg bg-background p-3 text-sm"
                          >
                            <p className="font-medium text-foreground">
                              {app.profiles?.full_name ?? "Usuário"}
                            </p>
                            {app.message && (
                              <p className="mt-1 text-muted">{app.message}</p>
                            )}
                            {app.portfolio_url && (
                              <a
                                href={app.portfolio_url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-1 inline-block text-primary hover:text-primary-hover"
                              >
                                Ver portfólio
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
                      <p className="mt-3 text-xs text-muted">
                        Nenhuma candidatura ainda.
                      </p>
                    )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}