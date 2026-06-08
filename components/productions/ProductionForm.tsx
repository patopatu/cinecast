import { newProduction as newProductionCopy } from "@/lib/copy";

type ProductionFormValues = {
  title: string;
  project_type: string;
  city: string;
  synopsis: string;
  instagram: string;
  website: string;
  cover_image: string;
  status: string;
};

type ProductionFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: Partial<ProductionFormValues>;
  productionId?: string;
  currentSlug?: string;
};

const projectTypes = [
  { value: "film", label: "Filme" },
  { value: "series", label: "Série" },
  { value: "short", label: "Curta-metragem" },
  { value: "documentary", label: "Documentário" },
  { value: "commercial", label: "Comercial / Vídeo" },
  { value: "other", label: "Outro" },
];

const statuses = [
  { value: "development", label: "Em desenvolvimento" },
  { value: "pre_production", label: "Pré-produção" },
  { value: "production", label: "Em produção" },
  { value: "post_production", label: "Pós-produção" },
  { value: "released", label: "Lançado" },
];

export function ProductionForm({
  action,
  submitLabel,
  defaultValues,
  productionId,
  currentSlug,
}: ProductionFormProps) {
  const v: ProductionFormValues = {
    title: defaultValues?.title ?? "",
    project_type: defaultValues?.project_type ?? "film",
    city: defaultValues?.city ?? "",
    synopsis: defaultValues?.synopsis ?? "",
    instagram: defaultValues?.instagram ?? "",
    website: defaultValues?.website ?? "",
    cover_image: defaultValues?.cover_image ?? "",
    status: defaultValues?.status ?? "development",
  };

  const inputClass =
    "w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary";

  return (
    <form
      action={action}
      className="mx-auto w-full max-w-2xl space-y-5 rounded-2xl border border-card bg-card p-8"
    >
      {productionId && (
        <>
          <input type="hidden" name="id" value={productionId} />
          <input type="hidden" name="current_slug" value={currentSlug ?? ""} />
        </>
      )}

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="title">
          {newProductionCopy.form.title}
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={v.title}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="mb-1 block text-sm text-muted"
            htmlFor="project_type"
          >
            {newProductionCopy.form.projectType}
          </label>
          <select
            id="project_type"
            name="project_type"
            defaultValue={v.project_type}
            className={inputClass}
          >
            {projectTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="status">
            {newProductionCopy.form.status}
          </label>
          <select
            id="status"
            name="status"
            defaultValue={v.status}
            className={inputClass}
          >
            {statuses.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="city">
          {newProductionCopy.form.city}
        </label>
        <input
          id="city"
          name="city"
          defaultValue={v.city}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="synopsis">
          {newProductionCopy.form.synopsis}
        </label>
        <textarea
          id="synopsis"
          name="synopsis"
          rows={5}
          defaultValue={v.synopsis}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="instagram">
            {newProductionCopy.form.instagram}
          </label>
          <input
            id="instagram"
            name="instagram"
            placeholder="@filme ou link"
            defaultValue={v.instagram}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="website">
            {newProductionCopy.form.website}
          </label>
          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            defaultValue={v.website}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="cover_image">
          {newProductionCopy.form.cover}
        </label>
        <input
          id="cover_image"
          name="cover_image"
          type="url"
          placeholder="https://..."
          defaultValue={v.cover_image}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-muted">
          {newProductionCopy.form.coverHint}
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        {submitLabel}
      </button>
    </form>
  );
}
