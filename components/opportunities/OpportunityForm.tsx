"use client";

import { useState } from "react";
import { createOpportunity } from "@/actions/opportunities";

type OpportunityFormProps = {
  productionId: string;
  productionSlug: string;
};

const opportunityTypes = [
  { value: "cast", label: "Elenco" },
  { value: "crew", label: "Equipe técnica" },
  { value: "extra", label: "Extra" },
  { value: "internship", label: "Estágio" },
  { value: "volunteer", label: "Voluntário" },
];

const inputClass =
  "w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary";

export function OpportunityForm({
  productionId,
  productionSlug,
}: OpportunityFormProps) {
  const [type, setType] = useState("cast");
  const showCast = type === "cast" || type === "extra";
  const showCrew = !showCast;

  return (
    <form
      action={createOpportunity}
      className="mx-auto w-full max-w-2xl space-y-5 rounded-2xl border border-card bg-card p-8"
    >
      <input type="hidden" name="production_id" value={productionId} />
      <input type="hidden" name="production_slug" value={productionSlug} />

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="title">
          Título da chamada *
        </label>
        <input
          id="title"
          name="title"
          required
          placeholder="Ex.: Atriz 25–35 anos"
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="type">
            Tipo *
          </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputClass}
          >
            {opportunityTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="status">
            Status
          </label>
          <select id="status" name="status" defaultValue="open" className={inputClass}>
            <option value="open">Aberta</option>
            <option value="draft">Rascunho</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="description">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="requirements">
          Requisitos
        </label>
        <textarea
          id="requirements"
          name="requirements"
          rows={3}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-muted">
        <input type="checkbox" name="is_paid" className="rounded" />
        Vaga remunerada
      </label>

      {showCast && (
        <div className="space-y-4 rounded-xl border border-background p-4">
          <h3 className="font-semibold text-foreground">Detalhes — Elenco</h3>

          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="character_name">
              Nome da personagem *
            </label>
            <input
              id="character_name"
              name="character_name"
              required={showCast}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-muted" htmlFor="age_range">
                Faixa etária
              </label>
              <input
                id="age_range"
                name="age_range"
                placeholder="Ex.: 25–35"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted" htmlFor="gender">
                Gênero
              </label>
              <select id="gender" name="gender" defaultValue="any" className={inputClass}>
                <option value="any">Qualquer</option>
                <option value="female">Feminino</option>
                <option value="male">Masculino</option>
                <option value="non_binary">Não binário</option>
                <option value="not_specified">Não especificado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="personality">
              Personalidade
            </label>
            <textarea
              id="personality"
              name="personality"
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="observations">
              Observações
            </label>
            <textarea
              id="observations"
              name="observations"
              rows={2}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {showCrew && (
        <div className="space-y-4 rounded-xl border border-background p-4">
          <h3 className="font-semibold text-foreground">Detalhes — Equipe</h3>

          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="position">
              Cargo *
            </label>
            <input
              id="position"
              name="position"
              required={showCrew}
              placeholder="Ex.: Diretor de fotografia"
              className={inputClass}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="experience_level"
            >
              Experiência necessária
            </label>
            <select
              id="experience_level"
              name="experience_level"
              defaultValue="intermediate"
              className={inputClass}
            >
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
              <option value="professional">Profissional</option>
            </select>
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="crew_observations"
            >
              Observações
            </label>
            <textarea
              id="crew_observations"
              name="crew_observations"
              rows={2}
              className={inputClass}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Publicar chamada
      </button>
    </form>
  );
}