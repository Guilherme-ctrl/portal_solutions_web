import { Search, Hammer, PackageCheck } from "lucide-react"
import { DIAGNOSTICO_PRECO } from "@/lib/site-config"

const etapas = [
  {
    icon: Search,
    numero: "01",
    title: "Diagnóstico",
    description:
      "Uma a duas semanas mapeando o processo real, não o processo ideal. Sai daqui um documento de requisitos, as decisões de arquitetura, o escopo travado e a estimativa de prazo e preço.",
    entrega: "Documento de escopo + estimativa",
  },
  {
    icon: Hammer,
    numero: "02",
    title: "Construção",
    description:
      "Entregas parciais em ciclos curtos, sempre integradas e testadas. O que ficou de fora do escopo continua fora até virar um aditivo aprovado — nada entra em silêncio.",
    entrega: "Software rodando, em ciclos",
  },
  {
    icon: PackageCheck,
    numero: "03",
    title: "Entrega",
    description:
      "Uma feature só é considerada pronta quando está integrada ao backend real, com tratamento de erro, teste automatizado do fluxo principal e validação funcional. Isso é escrito antes de começar.",
    entrega: "Critério de pronto definido no contrato",
  },
]

export function Metodo() {
  return (
    <section id="metodo" className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-4">
          Como trabalhamos
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto leading-relaxed">
          A maior parte dos projetos de software não estoura por falta de tecnologia.
          Estoura porque ninguém escreveu, antes de começar, o que estava dentro e o que
          estava fora. Nosso processo existe para resolver isso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {etapas.map((etapa) => (
            <div
              key={etapa.title}
              className="bg-card rounded-2xl p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <etapa.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-mono text-muted-foreground">{etapa.numero}</span>
              </div>

              <h3 className="text-2xl font-bold text-secondary mb-3">{etapa.title}</h3>
              <p className="text-muted-foreground leading-relaxed flex-1">{etapa.description}</p>

              <p className="mt-6 pt-4 border-t border-border text-sm font-medium text-primary">
                {etapa.entrega}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-secondary rounded-2xl p-8 md:p-10 text-center">
          <h3 className="text-2xl font-bold text-secondary-foreground mb-3">
            Comece pelo Diagnóstico
          </h3>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-6">
            Uma conversa e um documento: você sai com o escopo, a arquitetura e a
            estimativa por escrito, mesmo que decida construir com outra pessoa.
            {DIAGNOSTICO_PRECO ? ` A partir de ${DIAGNOSTICO_PRECO}, abatido no valor do projeto.` : ""}
          </p>
          <a
            href="#diagnostico"
            className="inline-block px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
          >
            Solicitar Diagnóstico
          </a>
        </div>
      </div>
    </section>
  )
}
