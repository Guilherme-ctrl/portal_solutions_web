import { DIAGNOSTICO_PRECO } from "@/lib/site-config"

export function Hero() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-secondary text-balance leading-tight mb-6">
          Software sob medida para empresas que já operam
        </h1>

        <p className="text-lg md:text-2xl text-muted-foreground text-balance mb-4">
          Escopo, prazo e preço fechados antes da primeira linha de código.
        </p>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Não vendemos horas nem promessas. Começamos mapeando o processo que hoje
          trava a sua operação e entregamos, por escrito, o que vai ser construído,
          em quanto tempo e por quanto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#diagnostico"
            className="px-8 py-4 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-semibold text-lg"
          >
            Começar pelo Diagnóstico
          </a>
          <a
            href="#metodo"
            className="px-8 py-4 rounded-full border border-secondary/30 text-secondary hover:bg-secondary/5 transition-colors font-semibold text-lg"
          >
            Como trabalhamos
          </a>
        </div>

        {DIAGNOSTICO_PRECO ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Diagnóstico de Escopo a partir de {DIAGNOSTICO_PRECO}. Abatido no valor do projeto.
          </p>
        ) : null}
      </div>
    </section>
  )
}
