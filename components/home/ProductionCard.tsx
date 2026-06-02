"use client";

type ProductionCardProps = {
  title: string;
  projectTypeLabel: string;
  city: string | null;
  statusLabel: string;
  openCallsCount: number;
  onClick: () => void;
};

export function ProductionCard({
  title,
  projectTypeLabel,
  city,
  statusLabel,
  openCallsCount,
  onClick,
}: ProductionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-card bg-card p-5 text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted">{projectTypeLabel}</p>
      <p className="mt-1 text-sm text-muted">
        {city || "Cidade não informada"}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-background px-2 py-1 text-xs text-muted">
          {statusLabel}
        </span>
        <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
          {openCallsCount}{" "}
          {openCallsCount === 1 ? "chamada aberta" : "chamadas abertas"}
        </span>
      </div>
    </button>
  );
}