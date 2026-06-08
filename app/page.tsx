import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { home as homeCopy } from "@/lib/copy";
import {
  ProductionExplorer,
  type HomeProduction,
} from "@/components/home/ProductionExplorer";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rows } = await supabase
    .from("productions")
    .select(
      `
      id,
      title,
      slug,
      project_type,
      city,
      synopsis,
      instagram,
      website,
      status,
      opportunities (
        id,
        title,
        type,
        status,
        cast_roles ( character_name ),
        crew_roles ( position )
      )
    `
    )
    .order("created_at", { ascending: false });

  const productions: HomeProduction[] = (rows ?? []).map((row) => {
    const opportunities = row.opportunities ?? [];
    const openCallsCount = opportunities.filter(
      (o) => o.status === "open"
    ).length;

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      project_type: row.project_type,
      city: row.city,
      synopsis: row.synopsis,
      instagram: row.instagram,
      website: row.website,
      status: row.status,
      openCallsCount,
      opportunities,
    };
  });

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative isolate overflow-hidden gradient-hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 gradient-vignette opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-14 sm:pt-14 md:pb-16 md:pt-16 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="status-dot bg-electric shadow-[0_0_12px_var(--color-electric)]" />
              <span className="text-eyebrow">{homeCopy.hero.eyebrow}</span>
            </div>

            <h1 className="text-display text-4xl text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {homeCopy.hero.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
              {homeCopy.hero.subheadline}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              {user ? (
                <Link href="/productions/new" className="btn-primary group">
                  {homeCopy.hero.ctaPrimary}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              ) : (
                <Link href="/register" className="btn-primary group">
                  {homeCopy.hero.ctaPrimary}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              )}
              <Link href="/explore" className="btn-secondary">
                {homeCopy.hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-white/5 pt-6 text-sm text-muted">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl text-foreground">
                  {productions.length}
                </span>
                <span>produções publicadas</span>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-1 w-1 rounded-full bg-white/20 sm:block"
              />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl text-foreground">
                  {productions.reduce(
                    (acc, p) => acc + (p.openCallsCount ?? 0),
                    0
                  )}
                </span>
                <span>chamadas abertas</span>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 gradient-fade-top"
        />
      </section>

      {/* ===================== PRODUÇÕES EM DESTAQUE ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3 md:mb-8">
          <div>
            <span className="text-eyebrow-muted">Em cartaz</span>
            <h2 className="text-h1 mt-2 text-2xl text-foreground sm:text-3xl">
              {homeCopy.featured.title}
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-sm font-medium text-electric transition-colors hover:text-electric-soft"
          >
            Ver catálogo completo →
          </Link>
        </header>

        {productions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-card/40 px-6 py-16 text-center">
            <h3 className="font-display text-2xl text-foreground">
              {homeCopy.featured.empty.title}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-muted">
              {homeCopy.featured.empty.description}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={user ? "/productions/new" : "/register"}
                className="btn-primary"
              >
                {homeCopy.featured.empty.ctaPublish}
              </Link>
              <Link href="/explore" className="btn-secondary">
                {homeCopy.featured.empty.ctaExplore}
              </Link>
            </div>
          </div>
        ) : (
          // Mostrar apenas 6 produções em destaque na home; o resto fica em /explore
          <ProductionExplorer
            productions={productions.slice(0, 6)}
            variant="page"
          />
        )}
      </section>
    </>
  );
}
