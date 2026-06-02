import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10 rounded-2xl border border-card bg-card p-8 text-center md:p-10">
        <h1 className="text-3xl font-bold md:text-4xl">
          Projetos audiovisuais,{" "}
          <span className="text-primary">elenco</span> e equipe
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Descubra produções, chamadas abertas e candidate-se em um só lugar.
        </p>
        {user && (
          <Link
            href="/productions/new"
            className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Nova produção
          </Link>
        )}
      </section>

      <h2 className="mb-4 text-xl font-semibold text-foreground">
        Produções em destaque
      </h2>

      {productions.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-card p-10 text-center text-muted">
          Ainda não há produções publicadas.
          {user ? " Crie a primeira com o botão acima." : ""}
        </p>
      ) : (
        <ProductionExplorer productions={productions} />
      )}
    </div>
  );
}