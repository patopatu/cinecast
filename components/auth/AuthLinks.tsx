"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { SignOutButton } from "@/components/auth/SignOutButton";

export function AuthLinks() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <span className="text-sm text-muted">...</span>;
  }

  if (email) {
    return (
      <div className="flex items-center gap-4">
        <span className="max-w-[180px] truncate text-sm text-muted">
          {email}
        </span>
        <SignOutButton />
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-4 text-sm text-muted">
      <Link href="/login" className="transition-colors hover:text-primary">
        Entrar
      </Link>
      <Link
        href="/register"
        className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Criar conta
      </Link>
    </nav>
  );
}