import { CtaButton } from "@/components/cta-button"
import { CASE_URL, PRECO_MINIMO_PROJETO } from "@/lib/site-config"

export function Hero() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold leading-[1.1] text-balance text-secondary md:text-6xl">
          Software sob medida para operações reais
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
          Transformamos processos, regras de negócio e operações complexas em
          sistemas web e mobile preparados para evoluir junto com a empresa.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <CtaButton href="/avaliar-projeto" local="hero" className="w-full sm:w-auto">
            Avaliar meu projeto
          </CtaButton>
          <CtaButton
            href={CASE_URL}
            local="hero"
            variant="outline"
            className="w-full sm:w-auto"
          >
            Conhecer um case
          </CtaButton>
        </div>

        {/* Aparece automaticamente ao preencher PRECO_MINIMO_PROJETO em lib/site-config.ts */}
        {PRECO_MINIMO_PROJETO ? (
          <p className="mt-8 text-sm text-muted-foreground">
            Projetos de software sob medida a partir de {PRECO_MINIMO_PROJETO}.
          </p>
        ) : null}
      </div>
    </section>
  )
}
