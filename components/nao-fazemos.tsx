import { X, Check } from "lucide-react"

const naoFazemos = [
  "Projetos sem escopo definido, cobrados por hora e sem previsão de fim.",
  "Validação de ideia para quem ainda não tem operação nem faturamento.",
  "Clones de aplicativos de grande porte — o custo real de manter uma plataforma dessas raramente cabe no orçamento de quem pede.",
]

const fazemos = [
  "Digitalização de um processo que hoje roda em planilha, papel ou WhatsApp.",
  "Sistemas internos que substituem controle manual em empresas que já faturam.",
  "Plataformas que conectam dois lados de uma operação que já existe fora do software.",
]

export function NaoFazemos() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-4">
          Para quem somos — e para quem não somos
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Ser específico sobre isso economiza o tempo de todo mundo, inclusive o seu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary">O que fazemos</h3>
            </div>
            <ul className="space-y-4">
              {fazemos.map((item) => (
                <li key={item} className="text-muted-foreground leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <X className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-secondary">O que não fazemos</h3>
            </div>
            <ul className="space-y-4">
              {naoFazemos.map((item) => (
                <li key={item} className="text-muted-foreground leading-relaxed">
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
