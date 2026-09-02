import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaButton } from "@/components/cta-button"

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-accent-strong">
            Erro 404
          </p>
          <h1 className="text-3xl font-bold text-balance text-secondary md:text-4xl">
            Não encontramos esta página
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            O endereço pode ter mudado. Volte para a Home ou fale direto sobre o
            seu projeto.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton href="/" local="404" variant="outline">
              Voltar para a Home
            </CtaButton>
            <CtaButton href="/avaliar-projeto" local="404">
              Avaliar meu projeto
            </CtaButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
