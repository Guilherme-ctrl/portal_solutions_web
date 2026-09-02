import { CtaButton } from "@/components/cta-button"
import { PRECO_MINIMO_PROJETO } from "@/lib/site-config"

type Props = {
  titulo?: string
  texto?: string
  botao?: string
  /** Identifica a origem do clique no GA4. */
  local: string
}

export function CtaFinal({
  titulo = "Tem uma operação para digitalizar?",
  texto = "Conte o que precisa ser resolvido. Respondemos com uma avaliação do que faz sentido construir — e do que não faz.",
  botao = "Avaliar meu projeto",
  local,
}: Props) {
  return (
    <section className="px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card px-6 py-14 text-center md:px-12">
        <h2 className="text-3xl font-bold leading-tight text-balance text-secondary md:text-4xl">
          {titulo}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {texto}
        </p>

        <CtaButton href="/avaliar-projeto" local={local} className="mt-8">
          {botao}
        </CtaButton>

        {/* Aparece automaticamente ao preencher PRECO_MINIMO_PROJETO em lib/site-config.ts */}
        {PRECO_MINIMO_PROJETO ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Projetos de software sob medida a partir de {PRECO_MINIMO_PROJETO}.
          </p>
        ) : null}
      </div>
    </section>
  )
}
