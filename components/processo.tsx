import { SectionHeader } from "@/components/section-header"

const etapas = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    texto:
      "Entendemos o processo, o problema, os usuários, as restrições e os objetivos antes de começar a desenvolver.",
  },
  {
    numero: "02",
    titulo: "Construção",
    texto:
      "Transformamos o escopo priorizado em um MVP ou produto funcional, trabalhando web, mobile, backend e integrações conforme necessário.",
  },
  {
    numero: "03",
    titulo: "Evolução",
    texto:
      "Depois da solução em uso, evoluímos com base em dados, feedback e novas necessidades da operação.",
  },
]

export function Processo() {
  return (
    <section id="processo" className="scroll-mt-24 px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Como trabalhamos"
          titulo="Diagnóstico, construção e evolução"
          descricao="Sem metodologia proprietária e sem nome de fantasia. Três etapas, na ordem em que fazem sentido."
        />

        <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {etapas.map((etapa, indice) => (
            <li key={etapa.numero} className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-mono text-sm font-semibold text-secondary-foreground">
                {etapa.numero}
              </span>

              {/* Liga esta etapa à seguinte. Some na última e no mobile,
                  onde as etapas ficam empilhadas. */}
              {indice < etapas.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-14 right-[-2rem] top-[1.375rem] hidden h-px bg-border md:block"
                />
              ) : null}

              <h3 className="mb-2 mt-6 text-2xl font-bold text-secondary">
                {etapa.titulo}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {etapa.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
