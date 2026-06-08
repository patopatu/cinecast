"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type SignOutButtonProps = {
  onSignedOut?: () => void;
  className?: string;
  children?: React.ReactNode;
};

export function SignOutButton({
  onSignedOut,
  className,
  children,
}: SignOutButtonProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    onSignedOut?.();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className={
        className ??
        "text-sm text-muted transition-colors hover:text-foreground"
      }
    >
      {children ?? "Sair"}
    </button>
  );
}
