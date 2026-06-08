"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { auth as authCopy } from "@/lib/copy";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(authCopy.login.invalid);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-4 rounded-2xl border border-card bg-card p-8"
    >
      <h1 className="text-h2 text-2xl text-foreground">
        {authCopy.login.title}
      </h1>
      <p className="text-sm text-muted">{authCopy.login.subtitle}</p>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="email">
          {authCopy.login.email}
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="password">
          {authCopy.login.password}
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
      >
        {loading ? authCopy.login.submitting : authCopy.login.submit}
      </button>

      <p className="text-center text-sm text-muted">
        {authCopy.login.noAccount}{" "}
        <Link
          href="/register"
          className="text-primary hover:text-primary-hover"
        >
          {authCopy.login.createAccount}
        </Link>
      </p>
    </form>
  );
}
