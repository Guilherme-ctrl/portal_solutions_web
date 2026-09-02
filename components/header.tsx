import Link from "next/link"
import Image from "next/image"
import { CtaButton } from "@/components/cta-button"
import { CASE_URL, SITE_NOME } from "@/lib/site-config"

const links = [
  { href: "/#problemas", label: "Problemas que resolvemos" },
  { href: "/#processo", label: "Como trabalhamos" },
  { href: CASE_URL, label: "Case" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 md:h-20 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label={`${SITE_NOME} — início`}
        >
          <Image
            src="/icon-portal.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-8 w-8 sm:h-9 sm:w-9"
          />
          <span className="text-base font-bold leading-none tracking-tight text-secondary sm:text-lg">
            Portal<span className="text-accent-strong"> Solutions</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <CtaButton
          href="/avaliar-projeto"
          local="header"
          className="whitespace-nowrap px-4 py-2.5 text-sm sm:px-5"
        >
          Avaliar meu projeto
        </CtaButton>
      </div>
    </header>
  )
}
