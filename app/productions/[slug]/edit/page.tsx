import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProduction } from "@/actions/productions";
import { ProductionForm } from "@/components/productions/ProductionForm";

export default async function EditProductionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: production } = await supabase
    .from("productions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!production) notFound();

  if (production.user_id !== user.id) redirect(`/productions/${slug}`);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Editar produção</h1>
      <ProductionForm
        action={updateProduction}
        submitLabel="Salvar alterações"
        productionId={production.id}
        currentSlug={production.slug}
        defaultValues={{
          title: production.title,
          project_type: production.project_type,
          city: production.city ?? "",
          synopsis: production.synopsis ?? "",
          instagram: production.instagram ?? "",
          website: production.website ?? "",
          cover_image: production.cover_image ?? "",
          status: production.status,
        }}
      />
    </div>
  );
}