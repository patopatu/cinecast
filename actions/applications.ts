"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { normalizeOne } from "@/lib/utils";
import { errors as errorsCopy } from "@/lib/copy";

export async function submitApplication(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const opportunityId = String(formData.get("opportunity_id") ?? "");
  const productionSlug = String(formData.get("production_slug") ?? "");
  const message = String(formData.get("message") ?? "").trim();
  const portfolioUrl = String(formData.get("portfolio_url") ?? "").trim();

  if (!opportunityId || !message) {
    throw new Error(errorsCopy.messageRequired);
  }

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select(
      `
      id,
      status,
      production_id,
      productions ( slug, user_id )
    `
    )
    .eq("id", opportunityId)
    .single();

  const production = normalizeOne(opportunity?.productions);

  if (!opportunity || opportunity.status !== "open") {
    throw new Error(errorsCopy.callClosed);
  }

  if (production?.user_id === user.id) {
    throw new Error(errorsCopy.ownProduction);
  }

  const { data: existing } = await supabase
    .from("applications")
    .select("id")
    .eq("opportunity_id", opportunityId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    throw new Error(errorsCopy.alreadyApplied);
  }

  const { error } = await supabase.from("applications").insert({
    opportunity_id: opportunityId,
    user_id: user.id,
    message,
    portfolio_url: portfolioUrl || null,
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error(errorsCopy.alreadyApplied);
    }
    throw new Error(error.message);
  }

  const slug = production?.slug || productionSlug;
  if (!slug) redirect("/");

  redirect(`/productions/${slug}?applied=1`);
}
