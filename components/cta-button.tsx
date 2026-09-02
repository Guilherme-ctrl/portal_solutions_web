"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { trackCta } from "@/lib/analytics"

type Props = {
  href: string
  children: React.ReactNode
  /** Onde o botão está na página. Vai para o GA4 como cta_location. */
  local: string
  variant?: "primary" | "outline" | "onDark"
  className?: string
}

const estilos = {
  primary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
  outline:
    "border border-secondary/25 text-secondary hover:bg-secondary/5 hover:border-secondary/40",
  onDark:
    "bg-white text-secondary hover:bg-white/90 shadow-sm",
}

/**
 * CTA rastreável. Todo botão comercial do site passa por aqui para que o
 * clique gere evento no GA4 — pré-requisito para medir campanhas do Ads.
 */
export function CtaButton({
  href,
  children,
  local,
  variant = "primary",
  className,
}: Props) {
  const label = typeof children === "string" ? children : local

  return (
    <Link
      href={href}
      onClick={() => trackCta(label, local)}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold transition-colors",
        estilos[variant],
        className,
      )}
    >
      {children}
    </Link>
  )
}
