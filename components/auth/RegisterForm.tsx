"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { auth as authCopy } from "@/lib/copy";

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user && !data.session) {
      setMessage(authCopy.register.emailSent);
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
        {authCopy.register.title}
      </h1>
      <p className="text-sm text-muted">{authCopy.register.subtitle}</p>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {message && (
        <p className="rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
          {message}
        </p>
      )}

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="fullName">
          {authCopy.register.fullName}
        </label>
        <input
          id="fullName"
          type="text"
          required
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="email">
          {authCopy.register.email}
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
          {authCopy.register.password}
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
        />
        <p className="mt-1 text-xs text-muted">
          {authCopy.register.passwordHint}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
      >
        {loading ? authCopy.register.submitting : authCopy.register.submit}
      </button>

      <p className="text-center text-sm text-muted">
        {authCopy.register.haveAccount}{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary-hover"
        >
          {authCopy.register.signIn}
        </Link>
      </p>
    </form>
  );
}
