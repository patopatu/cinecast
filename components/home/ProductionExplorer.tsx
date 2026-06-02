"use client";

import { useMemo, useState } from "react";
import { ProductionCard } from "./ProductionCard";
import { ProductionModal } from "./ProductionModal";

export type HomeOpportunity = {
  id: string;
  title: string;
  type: string;
  status: string;
  cast_roles?: { character_name: string }[];
  crew_roles?: { position: string }[];
};

export type HomeProduction = {
  id: string;
  title: string;
  slug: string;
  project_type: string;
  city: string | null;
  synopsis: string | null;
  instagram: string | null;
  website: string | null;
  status: string;
  openCallsCount: number;
  opportunities: HomeOpportunity[];
};

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

type ProductionExplorerProps = {
  productions: HomeProduction[];
};

export function ProductionExplorer({ productions }: ProductionExplorerProps) {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<HomeProduction | null>(null);

  const cities = useMemo(() => {
    const set = new Set<string>();
    productions.forEach((p) => {
      if (p.city?.trim()) set.add(p.city.trim());
    });
    return Array.from(set).sort();
  }, [productions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return productions.filter((p) => {
      if (cityFilter !== "all" && p.city !== cityFilter) return false;
      if (typeFilter !== "all" && p.project_type !== typeFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!q) return true;
      const haystack = [p.title, p.city, p.synopsis]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [productions, search, cityFilter, typeFilter, statusFilter]);

  const inputClass =
    "w-full rounded-lg border border-card bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

  return (
    <>
      <section className="mb-8 space-y-4 rounded-2xl border border-card bg-card p-4 md:p-6">
        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="search">
            Buscar
          </label>
          <input
            id="search"
            type="search"
            placeholder="Nome, cidade, sinopse..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="city">
              Cidade
            </label>
            <select
              id="city"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className={inputClass}
            >
              <option value="all">Todas</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="type">
              Tipo
            </label>
            <select
              id="type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={inputClass}
            >
              <option value="all">Todos</option>
              {Object.entries(projectTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={inputClass}
            >
              <option value="all">Todos</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-muted">
          {filtered.length} produção{filtered.length !== 1 ? "ões" : ""}{" "}
          encontrada{filtered.length !== 1 ? "s" : ""}
        </p>
      </section>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-card p-10 text-center text-muted">
          Nenhuma produção encontrada com esses filtros.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((production) => (
            <ProductionCard
              key={production.id}
              title={production.title}
              projectTypeLabel={
                projectTypeLabels[production.project_type] ??
                production.project_type
              }
              city={production.city}
              statusLabel={
                statusLabels[production.status] ?? production.status
              }
              openCallsCount={production.openCallsCount}
              onClick={() => setSelected(production)}
            />
          ))}
        </div>
      )}

      <ProductionModal
        production={selected}
        onClose={() => setSelected(null)}
        projectTypeLabels={projectTypeLabels}
        opportunityTypeLabels={opportunityTypeLabels}
      />
    </>
  );
}