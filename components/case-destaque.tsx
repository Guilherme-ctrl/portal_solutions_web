import { CtaButton } from "@/components/cta-button"
import { CASE_TITULO, CASE_URL } from "@/lib/site-config"

const camadas = [
  {
    camada: "Mobile",
    detalhe: "Android e iOS a partir de uma base única em Flutter",
  },
  {
    camada: "Web",
    detalhe: "Área do cliente, operação e painel administrativo",
  },
  {
    camada: "Backend",
    detalhe: "API própria, regras de negócio e PostgreSQL",
  },
  {
    camada: "Operação",
    detalhe: "Catálogo, solicitações, localização, workflows e gestão",
  },
]

export function CaseDestaque() {
  return (
    <section
      id="case"
      className="scroll-mt-24 border-y border-border bg-secondary px-4 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-on-dark">
              Case
            </p>

            <h2 className="text-3xl font-bold leading-tight text-balance text-secondary-foreground md:text-4xl">
              {CASE_TITULO}
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-pretty text-secondary-foreground/80">
              Uma operação que precisava conectar fornecedores, clientes e
              administração em um mesmo ecossistema digital — com catálogo,
              solicitações, regras comerciais e acompanhamento do fluxo.
            </p>

            <p className="mt-4 leading-relaxed text-secondary-foreground/70">
              Web, mobile e backend construídos como um produto só, entregues
              primeiro como MVP e evoluídos a partir do uso real.
            </p>

            <CtaButton href={CASE_URL} local="case_home" variant="onDark" className="mt-8">
              Ver como estruturamos essa solução
            </CtaButton>
          </div>

          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2">
            {camadas.map((item) => (
              <div key={item.camada} className="bg-secondary p-6">
                <dt className="mb-1.5 font-bold text-accent-on-dark">
                  {item.camada}
                </dt>
                <dd className="text-sm leading-relaxed text-secondary-foreground/75">
                  {item.detalhe}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
