import { CASE_CLIENTE_NOME } from "@/lib/site-config"

const numeros = [
  { valor: "3", label: "perfis de usuário" },
  { valor: "3", label: "plataformas: web, iOS e Android" },
  { valor: "0", label: "itens fora do escopo entraram sem aditivo aprovado" },
]

export function Case() {
  const titulo = CASE_CLIENTE_NOME
    ? `${CASE_CLIENTE_NOME}: locação de equipamentos, do WhatsApp à plataforma`
    : "Locação de equipamentos: do WhatsApp à plataforma"

  return (
    <section id="case" className="py-16 md:py-24 px-4 md:px-8 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
          Um trabalho recente
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 text-balance">
          {titulo}
        </h2>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h3 className="text-lg font-bold text-secondary mb-2">O problema</h3>
            <p>
              Locadoras de equipamento para construção civil controlavam catálogo,
              disponibilidade e pedidos por telefone, planilha e WhatsApp. Funciona até o
              volume crescer — a partir daí, equipamento alugado duas vezes e pedido perdido
              deixam de ser exceção.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-secondary mb-2">O que construímos</h3>
            <p>
              Um marketplace B2B ligando locadoras a clientes finais: catálogo de
              equipamentos, gestão de disponibilidade, solicitação e aprovação de locação,
              com perfis distintos para cliente, locadora e administração da plataforma.
              Aplicativo Flutter para Android e iOS, painel web em React e backend próprio
              em .NET com PostgreSQL.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-secondary mb-2">A decisão que segurou o prazo</h3>
            <p>
              Pagamento online, assinatura digital, emissão de nota e integração com ERP
              ficaram explicitamente fora do MVP, registrados como fases seguintes. A
              arquitetura foi preparada para recebê-las depois — mas nenhuma delas entrou
              em desenvolvimento sem aditivo aprovado. É esse tipo de guardrail escrito que
              impede um projeto de dobrar de tamanho no meio do caminho.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {numeros.map((n) => (
            <div key={n.label} className="bg-card rounded-xl p-6">
              <p className="text-3xl font-bold text-primary mb-1">{n.valor}</p>
              <p className="text-sm text-muted-foreground leading-snug">{n.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
