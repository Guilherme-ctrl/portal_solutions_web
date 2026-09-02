import { Check, X } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const trabalhamos = [
  "Empresas que já operam e precisam digitalizar um processo que hoje roda em planilha, papel ou mensagem.",
  "Operações que cresceram e precisam de um sistema interno no lugar do controle manual.",
  "Negócios que precisam conectar dois ou mais lados de uma operação que já existe fora do software.",
  "Times que já têm um sistema e precisam evoluí-lo ou substituí-lo sem parar a operação.",
]

const naoTrabalhamos = [
  "Projetos sem escopo definido, cobrados por hora e sem previsão de fim.",
  "Validação de ideia para quem ainda não tem operação, processo ou faturamento.",
  "Clones de aplicativos de grande porte — o custo real de manter uma plataforma dessas raramente cabe no orçamento de quem pede.",
]

export function ParaQuem() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Perfil de projeto"
          titulo="Com quem trabalhamos — e com quem não trabalhamos"
          descricao="Ser específico sobre isso economiza o tempo de todo mundo, inclusive o seu."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <div
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
              >
                <Check className="h-5 w-5 text-accent-strong" />
              </div>
              <h3 className="text-xl font-bold text-secondary">
                Projetos que atendemos
              </h3>
            </div>
            <ul className="space-y-4">
              {trabalhamos.map((item) => (
                <li key={item} className="leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <div
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-secondary">
                Projetos que não atendemos
              </h3>
            </div>
            <ul className="space-y-4">
              {naoTrabalhamos.map((item) => (
                <li key={item} className="leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
