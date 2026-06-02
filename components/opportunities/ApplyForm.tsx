"use client";

import Link from "next/link";
import { submitApplication } from "@/actions/applications";

type ApplyFormProps = {
  opportunityId: string;
  opportunityTitle: string;
  productionSlug: string;
  productionTitle: string;
};

const inputClass =
  "w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary";

export function ApplyForm({
  opportunityId,
  opportunityTitle,
  productionSlug,
  productionTitle,
}: ApplyFormProps) {
  return (
    <form
      action={submitApplication}
      className="mx-auto w-full max-w-lg space-y-4 rounded-2xl border border-card bg-card p-8"
    >
      <input type="hidden" name="opportunity_id" value={opportunityId} />
      <input type="hidden" name="production_slug" value={productionSlug} />

      <div>
        <p className="text-sm text-muted">{productionTitle}</p>
        <h1 className="text-2xl font-bold text-foreground">{opportunityTitle}</h1>
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="message">
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Conte por que você é ideal para esta vaga..."
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="portfolio_url">
          Link do portfólio
        </label>
        <input
          id="portfolio_url"
          name="portfolio_url"
          type="url"
          placeholder="https://"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Enviar candidatura
      </button>

      <Link
        href={`/productions/${productionSlug}`}
        className="block text-center text-sm text-primary hover:text-primary-hover"
      >
        ← Voltar para a produção
      </Link>
    </form>
  );
}