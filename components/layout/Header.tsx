import Link from "next/link";
import { AuthLinks } from "@/components/auth/AuthLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-card bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Cine<span className="text-primary">Cast</span>
        </Link>

        <AuthLinks />
      </div>
    </header>
  );
}