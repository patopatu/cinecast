"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductionForm } from "@/components/productions/ProductionForm";
import { newProduction as newProductionCopy } from "@/lib/copy";

type Mode = "equipe" | "elenco" | "ambos";

type PublishProductionFlowProps = {
  action: (formData: FormData) => void | Promise<void>;
};

/**
 * Fluxo prático para publicar uma nova produção:
 *  1) Escolha o que você precisa agora: Equipe, Elenco ou Ambos.
 *  2) Preencha a ficha do projeto (sempre os mesmos campos).
 *
 * O tipo de chamada (Equipe/Elenco/etc) é definido na própria
 * produção — depois, em "Nova chamada" dentro da produção, o publicador
 * escolhe o tipo detalhado. Isso evita dois formulários longos e ainda
 * garante que toda a informação essencial seja capturada.
 */
export function PublishProductionFlow({ action }: PublishProductionFlowProps) {
  const [mode, setMode] = useState<Mode | null>(null);

  if (!mode) {
    return (
      <div>
        <h2 className="text-eyebrow mb-3 text-electric">
          O que você precisa publicar agora?
        </h2>
        <p className="mb-6 text-sm text-muted">
          Você poderá abrir chamadas específicas (Elenco, Equipe, Extra, etc.)
          logo após criar a produção. Escolha abaixo apenas o foco principal.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <ModeCard
            active={mode === "equipe"}
            onClick={() => setMode("equipe")}
            title="Equipe técnica"
            description="Direção, fotografia, montagem, som, produção, etc."
          />
          <ModeCard
            active={mode === "elenco"}
            onClick={() => setMode("elenco")}
            title="Elenco"
            description="Atores, atrizes, voz, figuração."
          />
          <ModeCard
            active={mode === "ambos"}
            onClick={() => setMode("ambos")}
            title="Ambos"
            description="Vou abrir chamadas para elenco e equipe."
            highlight
          />
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Dica: você pode publicar a produção primeiro e abrir as chamadas
          depois, em "Minhas produções".
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-eyebrow mb-1 text-electric">
            Ficha do projeto
          </h2>
          <p className="text-sm text-muted">
            Preencha as informações essenciais. Você poderá editar depois.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode(null)}
          className="text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ← Voltar
        </button>
      </div>

      <ProductionForm
        action={action}
        submitLabel={newProductionCopy.submit}
        // Marca o tipo dominante como hint, mas a coluna real do banco
        // é o status; o "mode" fica como hidden para futura filtragem editorial.
      />

      <input type="hidden" name="publish_mode" value={mode} />

      <div className="mt-4 rounded-xl border border-white/5 bg-card/40 p-4 text-xs text-muted">
        <p>
          <span className="font-medium text-foreground">Próximo passo:</span>{" "}
          após publicar, abra a página da produção e clique em{" "}
          <span className="text-electric">+ Nova chamada</span> para abrir
          vagas específicas (
          {mode === "equipe"
            ? "Direção de fotografia, Montagem, Som, etc."
            : mode === "elenco"
            ? "Personagens, Voz, Figuração, etc."
            : "qualquer uma das duas"}
          ).
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        <Link
          href="/me/productions"
          className="text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Cancelar e voltar para Minhas produções
        </Link>
      </p>
    </div>
  );
}

function ModeCard({
  active,
  onClick,
  title,
  description,
  highlight = false,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border p-5 text-left transition-all duration-200",
        active
          ? "border-electric bg-electric/10"
          : highlight
          ? "border-white/15 bg-card/60 hover:border-white/30 hover:bg-card"
          : "border-white/5 bg-card/40 hover:border-white/15 hover:bg-card/60",
      ].join(" ")}
    >
      <p
        className={[
          "font-display text-lg",
          active ? "text-foreground" : "text-foreground",
        ].join(" ")}
      >
        {title}
      </p>
      <p className="mt-1 text-xs text-muted">{description}</p>
      {highlight && !active && (
        <p className="mt-2 text-[10px] uppercase tracking-wider text-electric">
          Recomendado
        </p>
      )}
    </button>
  );
}
