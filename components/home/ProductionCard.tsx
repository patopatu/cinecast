"use client";

import { useMemo } from "react";

type ProductionCardProps = {
  title: string;
  projectTypeLabel: string;
  city: string | null;
  statusLabel: string;
  openCallsCount: number;
  onClick: () => void;
  compact?: boolean;
};

/**
 * Gera um gradiente determinístico baseado no hash do título.
 * Cada produção sempre terá o mesmo pôster-placeholder.
 */
function getPosterGradient(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  const a = Math.abs(hash);
  const palettes = [
    ["#0a1a2f", "#1a3a5c", "#0d1f33"],
    ["#1a0f2e", "#3d1d5c", "#0f0820"],
    ["#0f1f1a", "#1f3d33", "#0a1a14"],
    ["#2e1a0a", "#5c3d1d", "#1a0f08"],
    ["#0a1f2e", "#1d3d5c", "#08141a"],
    ["#1f0a1a", "#5c1d3d", "#1a0810"],
    ["#0a2e1a", "#1d5c3d", "#081a10"],
    ["#2e0a0a", "#5c1d1d", "#1a0808"],
  ];
  return palettes[a % palettes.length];
}

function getInitials(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function ProductionCard({
  title,
  projectTypeLabel,
  city,
  statusLabel,
  openCallsCount,
  onClick,
  compact = false,
}: ProductionCardProps) {
  const [from, to, accent] = useMemo(() => getPosterGradient(title), [title]);
  const initials = useMemo(() => getInitials(title), [title]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative flex w-full flex-col overflow-hidden rounded-lg border border-white/5 bg-card text-left transition-all duration-300",
        compact
          ? "hover:-translate-y-0.5 hover:border-white/15 hover:shadow-[0_8px_20px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,140,255,0.15)]"
          : "hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,140,255,0.2)]",
      ].join(" ")}
    >
      {/* Pôster placeholder (2:3) — menor em compact */}
      <div
        className={[
          "relative w-full overflow-hidden",
          compact ? "aspect-[3/2]" : "aspect-[2/3]",
        ].join(" ")}
        style={{
          background: `linear-gradient(135deg, ${from} 0%, ${accent} 50%, ${to} 100%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(255,255,255,0.08), transparent 60%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={[
              "font-display font-medium tracking-tighter text-white/15",
              compact
                ? "text-5xl sm:text-6xl"
                : "text-7xl sm:text-8xl",
            ].join(" ")}
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            {initials}
          </span>
        </div>

        <div className="absolute left-3 top-3">
          <span
            className={[
              "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 font-semibold uppercase tracking-wider text-cream backdrop-blur-md",
              compact
                ? "px-2 py-0.5 text-[9px]"
                : "px-2.5 py-1 text-[10px]",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-electric"
            />
            {projectTypeLabel}
          </span>
        </div>

        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <span
            className={[
              "font-medium uppercase tracking-wider text-white/70",
              compact ? "text-[9px]" : "text-[10px]",
            ].join(" ")}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Info abaixo do pôster */}
      <div
        className={[
          "flex flex-col",
          compact ? "gap-1 p-3" : "gap-3 p-5",
        ].join(" ")}
      >
        <h3
          className={[
            "font-display font-medium leading-tight text-foreground line-clamp-2 transition-colors group-hover:text-cream",
            compact ? "text-sm" : "text-lg",
          ].join(" ")}
        >
          {title}
        </h3>
        <p
          className={[
            "text-muted",
            compact ? "text-[11px]" : "text-xs",
          ].join(" ")}
        >
          {city || "Cidade não informada"}
        </p>

        <div
          className={[
            "mt-1 flex items-center justify-between border-t border-white/5",
            compact ? "pt-2" : "pt-3",
          ].join(" ")}
        >
          <div className="flex items-center gap-2">
            {openCallsCount > 0 ? (
              <>
                <span
                  className="relative flex h-1.5 w-1.5"
                  aria-hidden="true"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                <span
                  className={[
                    "font-medium text-foreground",
                    compact ? "text-[11px]" : "text-xs",
                  ].join(" ")}
                >
                  {openCallsCount}{" "}
                  {openCallsCount === 1 ? "vaga aberta" : "vagas abertas"}
                </span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                <span
                  className={[
                    "text-muted",
                    compact ? "text-[11px]" : "text-xs",
                  ].join(" ")}
                >
                  Sem vagas
                </span>
              </>
            )}
          </div>
          <span
            aria-hidden="true"
            className={[
              "text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-electric",
            ].join(" ")}
          >
            →
          </span>
        </div>
      </div>
    </button>
  );
}
