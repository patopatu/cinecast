"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthLinks } from "@/components/auth/AuthLinks";
import { navbar as navbarCopy } from "@/lib/copy";

const navLinks = [
  { href: "/explore", label: navbarCopy.links.explore },
  { href: "/me/productions", label: "Minhas produções" },
  { href: "/productions/new", label: navbarCopy.ctaPublish },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-white/5 bg-deep-black/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="relative mx-auto flex h-[64px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {/* Logo à esquerda */}
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-0.5"
            aria-label="CineCast — página inicial"
          >
            <span className="font-display text-xl font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-cream">
              Cine
            </span>
            <span className="font-display text-xl tracking-tight text-cream">
              Cast
            </span>
          </Link>

          {/* Nav centralizada */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-electric transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Ações (sino + perfil) à direita */}
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <button
              type="button"
              aria-label="Notificações"
              title="Notificações em breve"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 2a5 5 0 00-5 5v3.5L3.5 13h13L15 10.5V7a5 5 0 00-5-5zM7.5 15a2.5 2.5 0 005 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <AuthLinks variant="navbar" />
          </div>

          {/* Hambúrguer (mobile) */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/5 md:hidden"
            aria-label={navbarCopy.openMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-deep-black/80 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col border-l border-white/5 bg-night-blue px-6 py-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-baseline gap-0.5"
              >
                <span className="font-display text-xl font-medium tracking-tight text-foreground">
                  Cine
                </span>
                <span className="font-display text-xl font-medium tracking-tight text-cream">
                  Cast
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                aria-label={navbarCopy.closeMenu}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/5 py-4 font-display text-2xl text-foreground transition-colors hover:text-electric"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <AuthLinks
                variant="mobile"
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
