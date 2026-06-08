import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { myProductions as myProductionsCopy } from "@/lib/copy";

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

export default async function MyProductionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/me/productions");

  const { data: productions } = await supabase
    .from("productions")
    .select("id, title, slug, city, project_type, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 text-3xl text-foreground sm:text-4xl">
            {myProductionsCopy.title}
          </h1>
          <p className="mt-2 text-muted">{myProductionsCopy.subtitle}</p>
        </div>
        <Link
          href="/productions/new"
          className="btn-primary"
        >
          {myProductionsCopy.newProduction}
        </Link>
      </div>

      {!productions?.length && (
        <p className="rounded-2xl border border-dashed border-card p-10 text-center text-muted">
          {myProductionsCopy.empty}{" "}
          <Link
            href="/productions/new"
            className="text-primary hover:text-primary-hover"
          >
            {myProductionsCopy.emptyCta}
          </Link>
        </p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {productions?.map((production) => (
          <li
            key={production.id}
            className="rounded-2xl border border-card bg-card p-5"
          >
            <h2 className="text-lg font-display text-foreground">
              {production.title}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {projectTypeLabels[production.project_type] ??
                production.project_type}
              {production.city ? ` · ${production.city}` : ""}
            </p>
            <p className="mt-1 text-xs text-primary">
              {statusLabels[production.status] ?? production.status}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/productions/${production.slug}`}
                className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-hover"
              >
                {myProductionsCopy.viewPage}
              </Link>
              <Link
                href={`/productions/${production.slug}/edit`}
                className="rounded-lg border border-background px-3 py-1.5 text-sm text-foreground hover:border-primary hover:text-primary"
              >
                {myProductionsCopy.edit}
              </Link>
              <Link
                href={`/productions/${production.slug}/opportunities/new`}
                className="rounded-lg border border-background px-3 py-1.5 text-sm text-muted hover:text-primary"
              >
                {myProductionsCopy.newCall}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
