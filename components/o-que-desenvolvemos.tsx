import {
  Boxes,
  Cable,
  LayoutDashboard,
  Server,
  Smartphone,
  Store,
} from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const itens = [
  {
    icon: LayoutDashboard,
    titulo: "Sistemas web sob medida",
    texto: "Construídos em cima das regras da sua operação, não de um template.",
  },
  {
    icon: Smartphone,
    titulo: "Aplicações mobile",
    texto: "Android e iOS a partir de uma base única, para equipe ou cliente final.",
  },
  {
    icon: Boxes,
    titulo: "Plataformas B2B e marketplaces",
    texto: "Múltiplos perfis, catálogo, solicitações e workflows de aprovação.",
  },
  {
    icon: Store,
    titulo: "Portais e sistemas internos",
    texto: "O controle que hoje vive em planilha, com permissão e histórico.",
  },
  {
    icon: Server,
    titulo: "Backends e APIs",
    texto: "Modelagem de dados e regras de negócio preparadas para escalar.",
  },
  {
    icon: Cable,
    titulo: "Integrações entre sistemas",
    texto: "Para que o dado seja digitado uma vez e circule sozinho.",
  },
]

export function OQueDesenvolvemos() {
  return (
    <section
      id="o-que-desenvolvemos"
      className="scroll-mt-24 border-y border-border bg-card px-4 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="O que desenvolvemos"
          titulo="Web, mobile e backend, conforme a operação exigir"
          descricao="A escolha entre um sistema web, um aplicativo ou uma integração é consequência do processo — nunca o ponto de partida."
        />

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item) => (
            <li key={item.titulo} className="flex gap-4">
              <div
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10"
              >
                <item.icon className="h-5 w-5 text-accent-strong" />
              </div>
              <div>
                <h3 className="mb-1.5 font-bold text-secondary">{item.titulo}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {item.texto}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
