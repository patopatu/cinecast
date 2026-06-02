"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type OpportunityType =
  | "cast"
  | "crew"
  | "extra"
  | "internship"
  | "volunteer";

function isCastType(type: OpportunityType) {
  return type === "cast" || type === "extra";
}

export async function createOpportunity(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const productionId = String(formData.get("production_id") ?? "");
  const productionSlug = String(formData.get("production_slug") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const type = String(formData.get("type") ?? "cast") as OpportunityType;
  const description = String(formData.get("description") ?? "").trim();
  const requirements = String(formData.get("requirements") ?? "").trim();
  const isPaid = formData.get("is_paid") === "on";
  const status = String(formData.get("status") ?? "open");

  if (!productionId || !productionSlug || !title) {
    throw new Error("Preencha os campos obrigatórios.");
  }

  const { data: production } = await supabase
    .from("productions")
    .select("id, user_id")
    .eq("id", productionId)
    .single();

  if (!production || production.user_id !== user.id) {
    throw new Error("Você não pode criar chamadas nesta produção.");
  }

  const { data: opportunity, error: oppError } = await supabase
    .from("opportunities")
    .insert({
      production_id: productionId,
      title,
      type,
      description: description || null,
      requirements: requirements || null,
      is_paid: isPaid,
      status: status === "draft" ? "draft" : "open",
    })
    .select("id")
    .single();

  if (oppError || !opportunity) {
    throw new Error(oppError?.message ?? "Erro ao criar chamada.");
  }

  if (isCastType(type)) {
    const characterName = String(formData.get("character_name") ?? "").trim();
    if (!characterName) {
      throw new Error("Nome da personagem é obrigatório para elenco/extra.");
    }

    const { error: castError } = await supabase.from("cast_roles").insert({
      opportunity_id: opportunity.id,
      character_name: characterName,
      age_range: String(formData.get("age_range") ?? "").trim() || null,
      gender: String(formData.get("gender") ?? "any"),
      personality: String(formData.get("personality") ?? "").trim() || null,
      observations: String(formData.get("observations") ?? "").trim() || null,
    });

    if (castError) throw new Error(castError.message);
  } else {
    const position = String(formData.get("position") ?? "").trim();
    if (!position) {
      throw new Error("Cargo é obrigatório para equipe/estágio/voluntário.");
    }

    const { error: crewError } = await supabase.from("crew_roles").insert({
      opportunity_id: opportunity.id,
      position,
      experience_level: String(formData.get("experience_level") ?? "intermediate"),
      observations: String(formData.get("crew_observations") ?? "").trim() || null,
    });

    if (crewError) throw new Error(crewError.message);
  }

  redirect(`/productions/${productionSlug}`);
}