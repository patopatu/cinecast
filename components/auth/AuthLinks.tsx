"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { navbar as navbarCopy } from "@/lib/copy";

type Variant = "navbar" | "mobile";

type AuthLinksProps = {
  variant?: Variant;
  onNavigate?: () => void;
};

export function AuthLinks({ variant = "navbar", onNavigate }: AuthLinksProps) {
  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setEmail(user?.email ?? null);
      setFullName(
        (user?.user_metadata?.full_name as string | undefined) ?? null
      );
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setEmail(user?.email ?? null);
      setFullName(
        (user?.user_metadata?.full_name as string | undefined) ?? null
      );
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Loading — evita layout shift
  if (loading) {
    if (variant === "mobile") {
      return <div className="h-10" aria-hidden="true" />;
    }
    return (
      <div
        className="h-9 w-32 animate-pulse rounded-full bg-white/5"
        aria-hidden="true"
      />
    );
  }

  // Não logado
  if (!email) {
    if (variant === "mobile") {
      return (
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            onClick={onNavigate}
            className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-white/5"
          >
            {navbarCopy.signIn}
          </Link>
          <Link
            href="/register"
            onClick={onNavigate}
            className="rounded-full bg-electric px-6 py-3 text-center text-sm font-medium text-deep-black transition-colors hover:bg-electric-soft"
          >
            {navbarCopy.createAccount}
          </Link>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          {navbarCopy.signIn}
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-electric px-4 py-2 text-sm font-medium text-deep-black transition-colors hover:bg-electric-soft"
        >
          {navbarCopy.createAccount}
        </Link>
      </div>
    );
  }

  // Logado
  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/20 text-sm font-semibold text-electric">
            {(fullName || email).slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {fullName || "Usuário"}
            </p>
            <p className="truncate text-xs text-muted">{email}</p>
          </div>
        </div>
        <Link
          href="/profile"
          onClick={onNavigate}
          className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-white/5"
        >
          {navbarCopy.myProfile}
        </Link>
        <Link
          href="/me/productions"
          onClick={onNavigate}
          className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-white/5"
        >
          {navbarCopy.myProductions}
        </Link>
        <SignOutButton
          onSignedOut={onNavigate}
          className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
        >
          {navbarCopy.signOut}
        </SignOutButton>
      </div>
    );
  }

  // Logado — navbar desktop
  const initials = (fullName || email).slice(0, 1).toUpperCase();
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-card py-1 pl-1 pr-3 transition-all duration-200 hover:border-white/20 hover:bg-card/80"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-electric/20 text-xs font-semibold text-electric">
          {initials}
        </span>
        <span className="hidden max-w-[140px] truncate text-sm font-medium text-foreground sm:block">
          {fullName || email.split("@")[0]}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-muted transition-transform duration-200 ${
            menuOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {menuOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/60"
        >
          <div className="border-b border-white/5 px-4 py-3">
            <p className="truncate text-sm font-medium text-foreground">
              {fullName || "Usuário"}
            </p>
            <p className="truncate text-xs text-muted">{email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => {
                setMenuOpen(false);
                onNavigate?.();
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-white/5"
              role="menuitem"
            >
              <span className="text-muted">●</span> {navbarCopy.myProfile}
            </Link>
            <Link
              href="/me/productions"
              onClick={() => {
                setMenuOpen(false);
                onNavigate?.();
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-white/5"
              role="menuitem"
            >
              <span className="text-muted">●</span> {navbarCopy.myProductions}
            </Link>
            <Link
              href="/productions/new"
              onClick={() => {
                setMenuOpen(false);
                onNavigate?.();
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-white/5"
              role="menuitem"
            >
              <span className="text-muted">●</span> {navbarCopy.ctaPublish}
            </Link>
          </div>
          <div className="border-t border-white/5 py-1">
            <SignOutButton
              onSignedOut={() => {
                setMenuOpen(false);
                onNavigate?.();
                router.refresh();
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            />
          </div>
        </div>
      )}
    </div>
  );
}
