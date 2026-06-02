import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ApplyForm } from "@/components/opportunities/ApplyForm";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/opportunities/${id}/apply`);

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select(
      `
      id,
      title,
      status,
      productions ( title, slug, user_id )
    `
    )
    .eq("id", id)
    .single();

  if (!opportunity) notFound();

  const production = opportunity.productions as {
    title: string;
    slug: string;
    user_id: string;
  } | null;

  if (!production) notFound();

  if (opportunity.status !== "open") {
    redirect(`/productions/${production.slug}`);
  }

  if (production.user_id === user.id) {
    redirect(`/productions/${production.slug}`);
  }

  const { data: existing } = await supabase
    .from("applications")
    .select("id")
    .eq("opportunity_id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    redirect(`/productions/${production.slug}?already_applied=1`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <ApplyForm
        opportunityId={opportunity.id}
        opportunityTitle={opportunity.title}
        productionSlug={production.slug}
        productionTitle={production.title}
      />
    </div>
  );
}