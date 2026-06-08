"use client";

import { useMemo, useState } from "react";
import { explorer as explorerCopy, productionPage } from "@/lib/copy";
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

const statusLabels: Record<string, string> = productionPage.status;
const opportunityTypeLabels: Record<string, string> =
  productionPage.opportunityTypes;

type ProductionExplorerProps = {
  productions: HomeProduction[];
  /** Quando true (página dedicada), os filtros viram dropdowns compactos */
  variant?: "inline" | "page";
};

export function ProductionExplorer({
  productions,
  variant = "inline",
}: ProductionExplorerProps) {
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

  const hasFilters =
    cityFilter !== "all" || typeFilter !== "all" || statusFilter !== "all";

  function clearFilters() {
    setCityFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setSearch("");
  }

  if (variant === "page") {
    return (
      <>
        {/* === BARRA DE BUSCA + FILTROS (DROPDOWNS COMPACTOS) === */}
        <section className="mb-8">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto_auto] sm:items-center">
            {/* Search */}
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 17a8 8 0 100-16 8 8 0 000 16zM17 17l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={explorerCopy.searchPlaceholder}
                className="w-full rounded-xl border border-white/10 bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-electric"
                aria-label="Buscar produções"
              />
            </div>

            <FilterDropdown
              label={explorerCopy.filters.type}
              value={typeFilter}
              onChange={setTypeFilter}
              options={projectTypeLabels}
              allLabel={explorerCopy.filters.allTypes}
            />
            <FilterDropdown
              label={explorerCopy.filters.status}
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusLabels}
              allLabel={explorerCopy.filters.allPhases}
            />
            <FilterDropdown
              label={explorerCopy.filters.city}
              value={cityFilter}
              onChange={setCityFilter}
              options={Object.fromEntries(cities.map((c) => [c, c]))}
              allLabel={explorerCopy.filters.all}
            />
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-electric transition-colors hover:text-electric-soft"
              >
                Limpar
              </button>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-muted">
              <span className="font-display text-lg text-foreground">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1
                ? explorerCopy.results(1).singular
                : explorerCopy.results(filtered.length).plural}
            </p>
          </div>
        </section>

        {/* === GRID === */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-card/40 px-6 py-16 text-center">
            <p className="font-display text-2xl text-foreground">
              {explorerCopy.empty.title}
            </p>
            <p className="mt-2 text-sm text-muted">
              {explorerCopy.empty.description}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="btn-secondary mt-5"
              >
                {explorerCopy.empty.cta}
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
                compact
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

  // variant === "inline" (home) — mantém os chips originais
  return (
    <>
      <section className="mb-8 space-y-5">
        {/* Search */}
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 17a8 8 0 100-16 8 8 0 000 16zM17 17l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={explorerCopy.searchPlaceholder}
            className="w-full rounded-2xl border border-white/10 bg-card py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-electric"
            aria-label="Buscar produções"
          />
        </div>

        {/* Chips de filtro */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="shrink-0 text-eyebrow-muted">
              {explorerCopy.filters.type}
            </span>
            <Chip
              active={typeFilter === "all"}
              onClick={() => setTypeFilter("all")}
            >
              {explorerCopy.filters.allTypes}
            </Chip>
            {Object.entries(projectTypeLabels).map(([value, label]) => (
              <Chip
                key={value}
                active={typeFilter === value}
                onClick={() => setTypeFilter(value)}
              >
                {label}
              </Chip>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="shrink-0 text-eyebrow-muted">
              {explorerCopy.filters.status}
            </span>
            <Chip
              active={statusFilter === "all"}
              onClick={() => setStatusFilter("all")}
            >
              {explorerCopy.filters.allPhases}
            </Chip>
            {Object.entries(statusLabels).map(([value, label]) => (
              <Chip
                key={value}
                active={statusFilter === value}
                onClick={() => setStatusFilter(value)}
              >
                {label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <p className="text-sm text-muted">
            <span className="font-display text-base text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1
              ? explorerCopy.results(1).singular
              : explorerCopy.results(filtered.length).plural}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-electric transition-colors hover:text-electric-soft"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-card/40 px-6 py-14 text-center">
          <p className="font-display text-xl text-foreground">
            {explorerCopy.empty.title}
          </p>
          <p className="mt-2 text-sm text-muted">
            {explorerCopy.empty.description}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="btn-secondary mt-5"
            >
              {explorerCopy.empty.cta}
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
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

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
        active
          ? "bg-foreground text-deep-black"
          : "border border-white/10 bg-card text-muted hover:border-white/20 hover:text-foreground",
      ].join(" ")}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function FilterDropdown({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Record<string, string>;
  allLabel: string;
}) {
  const display = value === "all" ? allLabel : options[value] ?? value;
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-white/10 bg-card py-2.5 pl-4 pr-9 text-sm font-medium text-foreground outline-none transition-colors focus:border-electric"
      >
        <option value="all">{allLabel}</option>
        {Object.entries(options).map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
