"use client";

import Link from "next/link";
import { submitApplication } from "@/actions/applications";
import { applyForm as applyFormCopy } from "@/lib/copy";

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
        <h1 className="text-h2 text-2xl text-foreground">
          {opportunityTitle}
        </h1>
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="message">
          {applyFormCopy.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={applyFormCopy.message.placeholder}
          className={inputClass}
        />
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="portfolio_url"
        >
          {applyFormCopy.portfolio}
        </label>
        <input
          id="portfolio_url"
          name="portfolio_url"
          type="url"
          placeholder={applyFormCopy.portfolioPlaceholder}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        {applyFormCopy.submit}
      </button>

      <Link
        href={`/productions/${productionSlug}`}
        className="block text-center text-sm text-primary hover:text-primary-hover"
      >
        ← {applyFormCopy.back}
      </Link>
    </form>
  );
}
