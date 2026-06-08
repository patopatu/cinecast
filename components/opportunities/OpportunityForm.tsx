"use client";

import { useState } from "react";
import { createOpportunity } from "@/actions/opportunities";
import { opportunityForm as opportunityFormCopy } from "@/lib/copy";

type OpportunityFormProps = {
  productionId: string;
  productionSlug: string;
};

const inputClass =
  "w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary";

export function OpportunityForm({
  productionId,
  productionSlug,
}: OpportunityFormProps) {
  const [type, setType] = useState("cast");
  const showCast = type === "cast" || type === "extra";
  const showCrew = !showCast;

  const opportunityTypes = [
    { value: "cast", label: "Elenco" },
    { value: "crew", label: "Equipe técnica" },
    { value: "extra", label: "Extra" },
    { value: "internship", label: "Estágio" },
    { value: "volunteer", label: "Voluntário" },
  ];

  return (
    <form
      action={createOpportunity}
      className="mx-auto w-full max-w-2xl space-y-5 rounded-2xl border border-card bg-card p-8"
    >
      <input type="hidden" name="production_id" value={productionId} />
      <input type="hidden" name="production_slug" value={productionSlug} />

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="title">
          {opportunityFormCopy.title.label}
        </label>
        <input
          id="title"
          name="title"
          required
          placeholder={opportunityFormCopy.title.placeholder}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="type">
            {opportunityFormCopy.type}
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
            {opportunityFormCopy.status}
          </label>
          <select
            id="status"
            name="status"
            defaultValue="open"
            className={inputClass}
          >
            <option value="open">{opportunityFormCopy.statusOpen}</option>
            <option value="draft">{opportunityFormCopy.statusDraft}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="description">
          {opportunityFormCopy.description}
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
          {opportunityFormCopy.requirements}
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
        {opportunityFormCopy.paid}
      </label>

      {showCast && (
        <div className="space-y-4 rounded-xl border border-background p-4">
          <h3 className="font-display text-foreground">
            {opportunityFormCopy.cast.section}
          </h3>

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="character_name"
            >
              {opportunityFormCopy.cast.characterName}
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
              <label
                className="mb-1 block text-sm text-muted"
                htmlFor="age_range"
              >
                {opportunityFormCopy.cast.ageRange}
              </label>
              <input
                id="age_range"
                name="age_range"
                placeholder={opportunityFormCopy.cast.ageRangePlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm text-muted"
                htmlFor="gender"
              >
                {opportunityFormCopy.cast.gender}
              </label>
              <select
                id="gender"
                name="gender"
                defaultValue="any"
                className={inputClass}
              >
                <option value="any">{opportunityFormCopy.cast.genderAny}</option>
                <option value="female">
                  {opportunityFormCopy.cast.genderFemale}
                </option>
                <option value="male">
                  {opportunityFormCopy.cast.genderMale}
                </option>
                <option value="non_binary">
                  {opportunityFormCopy.cast.genderNonBinary}
                </option>
                <option value="not_specified">
                  {opportunityFormCopy.cast.genderNotSpecified}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="personality"
            >
              {opportunityFormCopy.cast.personality}
            </label>
            <textarea
              id="personality"
              name="personality"
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="observations"
            >
              {opportunityFormCopy.cast.observations}
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
          <h3 className="font-display text-foreground">
            {opportunityFormCopy.crew.section}
          </h3>

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="position"
            >
              {opportunityFormCopy.crew.position}
            </label>
            <input
              id="position"
              name="position"
              required={showCrew}
              placeholder={opportunityFormCopy.crew.positionPlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="experience_level"
            >
              {opportunityFormCopy.crew.experience}
            </label>
            <select
              id="experience_level"
              name="experience_level"
              defaultValue="intermediate"
              className={inputClass}
            >
              <option value="beginner">
                {opportunityFormCopy.crew.experienceBeginner}
              </option>
              <option value="intermediate">
                {opportunityFormCopy.crew.experienceIntermediate}
              </option>
              <option value="advanced">
                {opportunityFormCopy.crew.experienceAdvanced}
              </option>
              <option value="professional">
                {opportunityFormCopy.crew.experienceProfessional}
              </option>
            </select>
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="crew_observations"
            >
              {opportunityFormCopy.crew.observations}
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
        {opportunityFormCopy.submit}
      </button>
    </form>
  );
}
