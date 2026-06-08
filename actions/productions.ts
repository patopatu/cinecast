"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { errors as errorsCopy } from "@/lib/copy";

type ProjectType =
  | "film"
  | "series"
  | "short"
  | "documentary"
  | "commercial"
  | "other";

type ProductionStatus =
  | "development"
  | "pre_production"
  | "production"
  | "post_production"
  | "released";

async function ensureUniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  baseSlug: string
) {
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const { data } = await supabase
      .from("productions")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!data) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

function readProductionFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    project_type: String(formData.get("project_type") ?? "other") as ProjectType,
    city: String(formData.get("city") ?? "").trim(),
    synopsis: String(formData.get("synopsis") ?? "").trim(),
    instagram: String(formData.get("instagram") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim(),
    cover_image: String(formData.get("cover_image") ?? "").trim(),
    status: String(formData.get("status") ?? "development") as ProductionStatus,
  };
}

export async function createProduction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const fields = readProductionFields(formData);

  if (!fields.title) {
    throw new Error(errorsCopy.titleRequired);
  }

  const baseSlug = slugify(fields.title) || "producao";
  const slug = await ensureUniqueSlug(supabase, baseSlug);

  const { error } = await supabase.from("productions").insert({
    user_id: user.id,
    title: fields.title,
    slug,
    project_type: fields.project_type,
    city: fields.city || null,
    synopsis: fields.synopsis || null,
    instagram: fields.instagram || null,
    website: fields.website || null,
    cover_image: fields.cover_image || null,
    status: fields.status,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/productions/${slug}`);
}

export async function updateProduction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  const currentSlug = String(formData.get("current_slug") ?? "");
  const fields = readProductionFields(formData);

  if (!id || !fields.title) {
    throw new Error(errorsCopy.invalidData);
  }

  const { data: existing } = await supabase
    .from("productions")
    .select("id, user_id, slug")
    .eq("id", id)
    .single();

  if (!existing || existing.user_id !== user.id) {
    throw new Error(errorsCopy.cannotEdit);
  }

  let slug = existing.slug;
  const newSlugBase = slugify(fields.title);

  if (newSlugBase && newSlugBase !== slugify(existing.slug)) {
    slug = await ensureUniqueSlug(supabase, newSlugBase);
  }

  const { error } = await supabase
    .from("productions")
    .update({
      title: fields.title,
      slug,
      project_type: fields.project_type,
      city: fields.city || null,
      synopsis: fields.synopsis || null,
      instagram: fields.instagram || null,
      website: fields.website || null,
      cover_image: fields.cover_image || null,
      status: fields.status,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/productions/${slug}`);
}
