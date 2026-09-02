import { SectionHeader } from "@/components/section-header"

const problemas = [
  {
    titulo: "A operação depende de planilhas",
    texto:
      "Um processo importante roda em arquivos que só uma pessoa sabe manter, sem histórico, sem permissão e sem controle de versão.",
  },
  {
    titulo: "Etapas críticas são feitas manualmente",
    texto:
      "Conferência, aprovação e repasse de informação passam por e-mail, WhatsApp e papel — e cada erro só aparece depois.",
  },
  {
    titulo: "Os sistemas não conversam entre si",
    texto:
      "O mesmo dado é digitado em dois ou três lugares porque nenhuma ferramenta troca informação com a outra.",
  },
  {
    titulo: "A equipe repete o mesmo trabalho",
    texto:
      "Boa parte do tempo do time vai para tarefas previsíveis que poderiam estar acontecendo sozinhas.",
  },
  {
    titulo: "O software pronto não atende às regras do negócio",
    texto:
      "A ferramenta de prateleira cobre 70% da operação e o restante volta para a planilha ou vira exceção manual.",
  },
  {
    titulo: "O negócio cresceu e o processo não acompanhou",
    texto:
      "O que funcionava com dez clientes trava com duzentos, e o gargalo passou a ser o controle, não a demanda.",
  },
]

export function Problemas() {
  return (
    <section id="problemas" className="scroll-mt-24 px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Problemas que resolvemos"
          titulo="Quando as ferramentas deixam de acompanhar a operação"
          descricao="Se algum destes cenários descreve a sua empresa, existe um projeto de software concreto por trás — e ele começa por entender o processo, não por escolher tecnologia."
        />

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 lg:grid-cols-3">
          {problemas.map((problema) => (
            <li key={problema.titulo} className="bg-card p-7">
              <h3 className="mb-2 text-lg font-bold leading-snug text-secondary text-balance">
                {problema.titulo}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {problema.texto}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
