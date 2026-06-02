import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OpportunityForm } from "@/components/opportunities/OpportunityForm";

export default async function NewOpportunityPage({
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
    .select("id, title, user_id, slug")
    .eq("slug", slug)
    .single();

  if (!production) notFound();

  if (production.user_id !== user.id) {
    redirect(`/productions/${slug}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Link
        href={`/productions/${slug}`}
        className="mb-6 inline-block text-sm text-primary hover:text-primary-hover"
      >
        ← Voltar para {production.title}
      </Link>
      <h1 className="mb-8 text-3xl font-bold text-foreground">Nova chamada</h1>
      <OpportunityForm
        productionId={production.id}
        productionSlug={production.slug}
      />
    </div>
  );
}