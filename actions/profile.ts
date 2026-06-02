"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const full_name = String(formData.get("full_name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const avatar_url = String(formData.get("avatar_url") ?? "").trim();

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: full_name || null,
    bio: bio || null,
    avatar_url: avatar_url || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/profile?saved=1");
}