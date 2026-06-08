"use client";

import Link from "next/link";
import { useEffect } from "react";
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
  // ESC para fechar + trava scroll
  useEffect(() => {
    if (!production) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [production, onClose]);

  if (!production) return null;

  const openOpportunities = production.opportunities.filter(
    (o) => o.status === "open"
  );

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-deep-black/80 p-0 backdrop-blur-md sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="production-modal-title"
    >
      <div
        className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border border-white/5 bg-card shadow-2xl shadow-black/80 sm:max-w-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com gradiente */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/5 bg-card/95 px-6 py-5 backdrop-blur-md sm:px-8">
          <div className="min-w-0 flex-1">
            <p className="text-eyebrow-muted">
              {projectTypeLabels[production.project_type] ??
                production.project_type}
            </p>
            <h2
              id="production-modal-title"
              className="font-display mt-1 truncate text-2xl text-foreground sm:text-3xl"
            >
              {production.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-deep-black/50 text-muted transition-colors hover:border-white/20 hover:text-foreground"
            aria-label="Fechar"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-8 px-6 py-6 sm:px-8 sm:py-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2">
            {production.city && (
              <span className="rounded-full border border-white/10 bg-deep-black/40 px-3 py-1 text-xs text-muted">
                {production.city}
              </span>
            )}
          </div>

          {/* Sinopse */}
          {production.synopsis && (
            <section>
              <h3 className="text-eyebrow-muted mb-3">Sobre o projeto</h3>
              <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
                {production.synopsis}
              </p>
            </section>
          )}

          {/* Redes */}
          {(production.instagram || production.website) && (
            <section>
              <h3 className="text-eyebrow-muted mb-3">Contato de produção</h3>
              <div className="flex flex-wrap gap-2">
                {production.instagram && (
                  <span className="rounded-full border border-white/10 bg-deep-black/40 px-3 py-1.5 text-sm text-foreground">
                    {production.instagram}
                  </span>
                )}
                {production.website && (
                  <a
                    href={production.website}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-deep-black/40 px-3 py-1.5 text-sm text-electric transition-colors hover:border-electric/40"
                  >
                    {production.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Chamadas abertas */}
          <section>
            <h3 className="text-eyebrow-muted mb-3">Vagas abertas</h3>
            {openOpportunities.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 bg-deep-black/30 px-4 py-6 text-center text-sm text-muted">
                Nenhuma vaga aberta no momento.
              </p>
            ) : (
              <ul className="space-y-2">
                {openOpportunities.map((opp) => {
                  const cast = opp.cast_roles?.[0];
                  const crew = opp.crew_roles?.[0];
                  return (
                    <li
                      key={opp.id}
                      className="rounded-2xl border border-white/5 bg-deep-black/40 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display text-lg text-foreground">
                          {opp.title}
                        </p>
                        <span className="rounded-full bg-electric/15 px-2.5 py-0.5 text-xs font-medium text-electric">
                          {opportunityTypeLabels[opp.type] ?? opp.type}
                        </span>
                      </div>
                      {cast && (
                        <p className="mt-1 text-sm text-muted">
                          Personagem:{" "}
                          <span className="text-foreground">
                            {cast.character_name}
                          </span>
                        </p>
                      )}
                      {crew && (
                        <p className="mt-1 text-sm text-muted">
                          Cargo:{" "}
                          <span className="text-foreground">
                            {crew.position}
                          </span>
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        {/* Footer fixo */}
        <div className="sticky bottom-0 border-t border-white/5 bg-card/95 p-4 backdrop-blur-md sm:p-6">
          <Link
            href={`/productions/${production.slug}`}
            className="btn-primary w-full justify-center"
          >
            Ver produção completa
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
