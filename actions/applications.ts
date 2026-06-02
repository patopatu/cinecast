"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
    throw new Error("Mensagem é obrigatória.");
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

  const production = opportunity?.productions as
    | { slug: string; user_id: string }
    | null
    | undefined;

  if (!opportunity || opportunity.status !== "open") {
    throw new Error("Esta chamada não está aberta.");
  }

  if (production?.user_id === user.id) {
    throw new Error("Você não pode se candidatar à sua própria produção.");
  }

  const { data: existing } = await supabase
    .from("applications")
    .select("id")
    .eq("opportunity_id", opportunityId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    throw new Error("Você já se candidatou a esta vaga.");
  }

  const { error } = await supabase.from("applications").insert({
    opportunity_id: opportunityId,
    user_id: user.id,
    message,
    portfolio_url: portfolioUrl || null,
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error("Você já se candidatou a esta vaga.");
    }
    throw new Error(error.message);
  }

  redirect(`/productions/${productionSlug}?applied=1`);
}