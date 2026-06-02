import Link from "next/link";
import { AuthLinks } from "@/components/auth/AuthLinks";

const navLink =
  "text-sm text-muted transition-colors hover:text-primary";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-card bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground"
            >
              Cine<span className="text-primary">Cast</span>
            </Link>

            <nav className="flex flex-wrap items-center gap-4">
              <Link href="/" className={navLink}>
                Explorar
              </Link>
              <Link href="/me/productions" className={navLink}>
                Minhas produções
              </Link>
              <Link
                href="/productions/new"
                className="text-sm text-primary transition-colors hover:text-primary-hover"
              >
                Nova produção
              </Link>
              <Link href="/profile" className={navLink}>
                Perfil
              </Link>
            </nav>
          </div>

          <AuthLinks />
        </div>
      </div>
    </header>
  );
}