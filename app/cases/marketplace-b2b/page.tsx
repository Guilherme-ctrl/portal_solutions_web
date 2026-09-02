import type { Metadata } from "next"
import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaFinal } from "@/components/cta-final"
import { CASE_TITULO, CASE_URL } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${CASE_TITULO} — case de desenvolvimento`,
  description:
    "Como estruturamos um marketplace B2B de locação com aplicativo Flutter para Android e iOS, aplicação web, painel administrativo, API própria e PostgreSQL.",
  alternates: { canonical: CASE_URL },
  openGraph: {
    type: "article",
    url: CASE_URL,
    title: `${CASE_TITULO} — case de desenvolvimento`,
    description:
      "Uma operação com múltiplos perfis, catálogo, geolocalização e workflows transformada em produto digital: web, mobile e backend.",
  },
}

const arquitetura = [
  {
    titulo: "Mobile",
    itens: ["Flutter para Android e iOS", "Base de código única", "Publicação nas duas lojas"],
  },
  {
    titulo: "Web",
    itens: ["Aplicação para o cliente", "Área da operação", "Painel administrativo"],
  },
  {
    titulo: "Backend",
    itens: ["API própria", "Regras de negócio no servidor", "PostgreSQL"],
  },
]

const complexidade = [
  {
    titulo: "Múltiplos perfis",
    texto:
      "Permissões e telas distintas para quem oferta, quem contrata e quem administra a plataforma.",
  },
  {
    titulo: "Catálogo",
    texto:
      "Cadastro, disponibilidade e condições comerciais mantidos por cada fornecedor.",
  },
  {
    titulo: "Geolocalização",
    texto:
      "Proximidade e área de atendimento como critério real de disponibilidade.",
  },
  {
    titulo: "Busca",
    texto:
      "Filtros combinados sobre catálogo, localização e disponibilidade.",
  },
  {
    titulo: "Regras comerciais",
    texto:
      "Cálculo de condições e validações que antes viviam na cabeça de quem atendia.",
  },
  {
    titulo: "Workflows de aprovação",
    texto:
      "Solicitação, análise, aceite e recusa como estados explícitos, com histórico.",
  },
  {
    titulo: "Administração",
    texto:
      "Gestão de usuários, moderação de cadastros e acompanhamento da operação.",
  },
  {
    titulo: "Comunicação",
    texto:
      "Troca de mensagens entre os perfis dentro do fluxo da solicitação.",
  },
]

export default function CaseMarketplaceB2B() {
  return (
    <>
      <Header />

      <main>
        <article>
          <header className="border-b border-border bg-card px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-3xl">
              <nav aria-label="Trilha de navegação" className="mb-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-secondary"
                >
                  ← Voltar para a Home
                </Link>
              </nav>

              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-strong">
                Case
              </p>

              <h1 className="text-4xl font-bold leading-[1.1] text-balance text-secondary md:text-5xl">
                {CASE_TITULO}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
                Uma operação que precisava conectar fornecedores, clientes e
                administração em um mesmo ecossistema digital.
              </p>

              <p className="mt-6 text-sm text-muted-foreground">
                Case publicado de forma anônima, a pedido do cliente. Descrevemos
                a arquitetura e o problema resolvido, sem identificar a empresa
                nem expor dados do projeto.
              </p>
            </div>
          </header>

          <section className="px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-secondary md:text-4xl">
                O desafio
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-pretty text-muted-foreground">
                <p>
                  Construir uma plataforma capaz de conectar diferentes perfis em
                  uma operação com catálogo, localização, solicitações, regras
                  comerciais, administração e acompanhamento do fluxo.
                </p>
                <p>
                  O processo já existia e funcionava fora do software — por
                  telefone, planilha e mensagem. O problema não era inventar um
                  negócio, era transformar um negócio que já rodava em algo que
                  suportasse volume, controle e histórico.
                </p>
              </div>
            </div>
          </section>

          <section className="border-y border-border bg-card px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-secondary md:text-4xl">
                  A solução
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
                  Um produto só, em três camadas, com as regras de negócio
                  concentradas no backend para que web e mobile se comportem da
                  mesma forma.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {arquitetura.map((bloco) => (
                  <div
                    key={bloco.titulo}
                    className="rounded-2xl border border-border p-7"
                  >
                    <h3 className="mb-4 text-xl font-bold text-secondary">
                      {bloco.titulo}
                    </h3>
                    <ul className="space-y-2.5">
                      {bloco.itens.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 leading-relaxed text-muted-foreground"
                        >
                          <span aria-hidden="true" className="text-accent-strong">
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-secondary md:text-4xl">
                  Complexidade resolvida
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
                  Cada item abaixo é uma regra que existia na operação e precisou
                  virar comportamento de sistema.
                </p>
              </div>

              <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
                {complexidade.map((item) => (
                  <li key={item.titulo} className="bg-card p-6">
                    <h3 className="mb-1.5 font-bold text-secondary">
                      {item.titulo}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {item.texto}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="border-y border-border bg-secondary px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-secondary-foreground md:text-4xl">
                Produto preparado para evoluir
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-pretty text-secondary-foreground/80">
                <p>
                  A plataforma foi estruturada primeiro como um MVP: o conjunto
                  mínimo capaz de colocar a operação inteira em uso real, sem
                  simulação e sem etapa manual escondida.
                </p>
                <p>
                  A partir daí, cada validação com o cliente virou entrada para o
                  ciclo seguinte. Funcionalidades que ficaram fora do MVP foram
                  registradas como fases posteriores, e a arquitetura foi montada
                  para recebê-las sem reescrita.
                </p>
              </div>
            </div>
          </section>

          <section className="px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-secondary md:text-4xl">
                O que esse projeto demonstra
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
                Software sob medida não é apenas desenvolver telas. É entender uma
                operação, transformar regras de negócio em software e construir
                uma base que possa continuar evoluindo.
              </p>
            </div>
          </section>
        </article>

        <CtaFinal
          local="case_final"
          titulo="Tenho um problema parecido"
          texto="Não precisa ser o mesmo setor. Se a sua empresa tem uma operação que precisa ser digitalizada, conte como ela funciona hoje."
          botao="Avaliar meu projeto"
        />
      </main>

      <Footer />
    </>
  )
}
