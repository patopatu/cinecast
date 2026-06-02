"use client";

import Link from "next/link";
import type { HomeProduction } from "./ProductionExplorer";

type ProductionModalProps = {
  production: HomeProduction | null;
  onClose: () => void;
  projectTypeLabels: Record<string, string>;
  opportunityTypeLabels: Record<string, string>;
};

export function ProductionModal({
  production,
  onClose,
  projectTypeLabels,
  opportunityTypeLabels,
}: ProductionModalProps) {
  if (!production) return null;

  const openOpportunities = production.opportunities.filter(
    (o) => o.status === "open"
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-card bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {production.title}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {projectTypeLabels[production.project_type] ??
                production.project_type}
              {production.city ? ` · ${production.city}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-foreground"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {production.synopsis && (
          <section className="mb-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              Sinopse
            </h3>
            <p className="text-sm text-muted whitespace-pre-line">
              {production.synopsis}
            </p>
          </section>
        )}

        <section className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Redes e site
          </h3>
          <ul className="space-y-1 text-sm text-muted">
            {production.instagram && (
              <li>Instagram: {production.instagram}</li>
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

        <section className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Chamadas abertas
          </h3>
          {openOpportunities.length === 0 && (
            <p className="text-sm text-muted">Nenhuma chamada aberta no momento.</p>
          )}
          <ul className="space-y-2">
            {openOpportunities.map((opp) => {
              const cast = opp.cast_roles?.[0];
              const crew = opp.crew_roles?.[0];
              return (
                <li
                  key={opp.id}
                  className="rounded-lg border border-background p-3 text-sm"
                >
                  <p className="font-medium text-foreground">{opp.title}</p>
                  <p className="text-muted">
                    {opportunityTypeLabels[opp.type] ?? opp.type}
                  </p>
                  {cast && (
                    <p className="mt-1 text-muted">
                      Personagem: {cast.character_name}
                    </p>
                  )}
                  {crew && (
                    <p className="mt-1 text-muted">Cargo: {crew.position}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <Link
          href={`/productions/${production.slug}`}
          className="block w-full rounded-lg bg-primary py-2 text-center font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Ver produção completa
        </Link>
      </div>
    </div>
  );
}