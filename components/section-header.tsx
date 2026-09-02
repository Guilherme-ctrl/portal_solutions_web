import { cn } from "@/lib/utils"

type Props = {
  /** Texto pequeno acima do título. Opcional. */
  eyebrow?: string
  titulo: string
  descricao?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({
  eyebrow,
  titulo,
  descricao,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-14",
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong mb-3">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl md:text-4xl font-bold text-secondary text-balance leading-tight">
        {titulo}
      </h2>

      {descricao ? (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
          {descricao}
        </p>
      ) : null}
    </div>
  )
}
