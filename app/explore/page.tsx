import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { home as homeCopy } from "@/lib/copy";
import {
  ProductionExplorer,
  type HomeProduction,
} from "@/components/home/ProductionExplorer";

export default async function ExplorePage() {
  const supabase = await createClient();

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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <header className="mb-8">
        <span className="text-eyebrow-muted">Catálogo</span>
        <h1 className="text-h1 mt-2 text-3xl text-foreground sm:text-4xl">
          Explorar produções
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
          {productions.length === 0
            ? "Ainda não há produções publicadas no catálogo."
            : `${productions.length} produç${productions.length === 1 ? "ão publicada" : "ões publicadas"}. Filtre por tipo, fase e cidade para encontrar o que faz sentido para você.`}
        </p>
      </header>

      {productions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-card/40 px-6 py-16 text-center">
          <h3 className="font-display text-2xl text-foreground">
            {homeCopy.featured.empty.title}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-muted">
            {homeCopy.featured.empty.description}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/productions/new" className="btn-primary">
              {homeCopy.featured.empty.ctaPublish}
            </Link>
            <Link href="/" className="btn-secondary">
              Voltar à home
            </Link>
          </div>
        </div>
      ) : (
        <ProductionExplorer productions={productions} variant="page" />
      )}
    </div>
  );
}
