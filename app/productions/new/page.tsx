import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createProduction } from "@/actions/productions";
import { ProductionForm } from "@/components/productions/ProductionForm";

export default async function NewProductionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Nova produção</h1>
      <ProductionForm action={createProduction} submitLabel="Criar produção" />
    </div>
  );
}