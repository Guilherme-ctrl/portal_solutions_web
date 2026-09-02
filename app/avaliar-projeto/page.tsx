import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectForm } from "@/components/project-form"
import { PRECO_MINIMO_PROJETO } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Avaliar meu projeto",
  description:
    "Conte qual processo da sua empresa precisa virar software. Avaliamos o problema, o estágio e o escopo antes de marcar uma conversa.",
  alternates: { canonical: "/avaliar-projeto" },
  openGraph: {
    url: "/avaliar-projeto",
    title: "Avaliar meu projeto | Portal Solutions",
    description:
      "Conte qual processo da sua empresa precisa virar software. Avaliamos antes de marcar uma conversa.",
  },
}

const etapas = [
  "Você responde algumas perguntas sobre o problema e o estágio do projeto.",
  "As respostas viram uma mensagem pronta no WhatsApp — você revisa e envia.",
  "Lemos antes de responder. Se fizer sentido para os dois lados, marcamos a conversa.",
]

export default function AvaliarProjeto() {
  return (
    <>
      <Header />

      <main>
        <section className="border-b border-border bg-card px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold leading-[1.1] text-balance text-secondary md:text-5xl">
              Avaliar meu projeto
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
              Antes de marcarmos uma conversa, conte um pouco sobre o problema
              que sua empresa precisa resolver. São poucos minutos, e servem para
              que a primeira conversa já seja sobre a sua operação — e não sobre
              o básico.
            </p>

            <ol className="mt-10 space-y-3">
              {etapas.map((etapa, indice) => (
                <li
                  key={etapa}
                  className="flex gap-3 leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-accent-strong"
                  >
                    {indice + 1}
                  </span>
                  {etapa}
                </li>
              ))}
            </ol>

            {/* Aparece automaticamente ao preencher PRECO_MINIMO_PROJETO em lib/site-config.ts */}
            {PRECO_MINIMO_PROJETO ? (
              <p className="mt-8 rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                Projetos de software sob medida a partir de{" "}
                {PRECO_MINIMO_PROJETO}.
              </p>
            ) : null}
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <ProjectForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
