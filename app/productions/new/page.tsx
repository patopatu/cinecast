import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createProduction } from "@/actions/productions";
import { newProduction as newProductionCopy } from "@/lib/copy";
import { PublishProductionFlow } from "@/components/productions/PublishProductionFlow";

export default async function NewProductionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <header className="mb-8">
        <span className="text-eyebrow-muted">Publicar</span>
        <h1 className="text-h1 mt-2 text-3xl text-foreground sm:text-4xl">
          {newProductionCopy.title}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Comece escolhendo o que você precisa publicar. O formulário se adapta
          à sua escolha.
        </p>
      </header>

      <PublishProductionFlow action={createProduction} />
    </div>
  );
}
