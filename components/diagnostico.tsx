import { DiagnosticoForm } from "@/components/diagnostico-form"
import { DIAGNOSTICO_PRECO } from "@/lib/site-config"

export function Diagnostico() {
  return (
    <section id="diagnostico" className="py-16 md:py-24 px-4 md:px-8 bg-card/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 text-balance">
          Solicitar um Diagnóstico de Escopo
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Cinco perguntas. Elas existem para que a primeira conversa já seja sobre o seu
          processo, e não sobre o básico.
          {DIAGNOSTICO_PRECO
            ? ` O Diagnóstico parte de ${DIAGNOSTICO_PRECO} e é abatido no valor do projeto, se houver projeto.`
            : ""}
        </p>

        <div className="bg-card rounded-2xl p-6 md:p-10 shadow-sm">
          <DiagnosticoForm />
        </div>
      </div>
    </section>
  )
}
