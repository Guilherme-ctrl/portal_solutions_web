"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { trackLead } from "@/lib/analytics"
import {
  COMO_FUNCIONA_HOJE,
  ESTAGIO_PROJETO,
  FAIXAS_ORCAMENTO,
  NECESSIDADES_PRODUTO,
  PRAZO_INICIO,
  USUARIOS_SOLUCAO,
  WHATSAPP_URL,
} from "@/lib/site-config"

type Status = "editando" | "enviando" | "enviado" | "erro"

const estadoInicial = {
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  site: "",
  problema: "",
  comoFuncionaHoje: "",
  usuarios: "",
  estagio: "",
  investimento: "",
  prazo: "",
}

const campoBase =
  "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/70 hover:border-muted-foreground/40 focus-visible:border-ring"

export function ProjectForm() {
  const [dados, setDados] = useState(estadoInicial)
  const [produto, setProduto] = useState<string[]>([])
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<Status>("editando")

  function atualizar(campo: keyof typeof estadoInicial, valor: string) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
  }

  function alternarProduto(item: string) {
    setProduto((atual) =>
      atual.includes(item)
        ? atual.filter((v) => v !== item)
        : [...atual, item],
    )
  }

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (status === "enviando") return

    setStatus("enviando")

    try {
      const resposta = await fetch("/api/avaliar-projeto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dados,
          produto: produto.join(", "),
          website: honeypot,
        }),
      })

      if (!resposta.ok) throw new Error(String(resposta.status))

      // Conversão: é este evento que o Google Ads deve usar como objetivo.
      trackLead({ estagio: dados.estagio, investimento: dados.investimento })
      setStatus("enviado")
    } catch {
      setStatus("erro")
    }
  }

  if (status === "enviado") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-card p-8 text-center md:p-12"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto mb-5 h-12 w-12 text-accent-strong"
        />
        <h2 className="text-2xl font-bold text-secondary">
          Recebemos o seu formulário
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
          Vamos ler o que você descreveu antes de responder. Se o projeto fizer
          sentido para os dois lados, retornamos em até um dia útil pelo e-mail
          informado para marcar a conversa.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} noValidate={false} className="space-y-12">
      <fieldset className="space-y-6">
        <legend className="mb-6 text-xl font-bold text-secondary">
          Empresa
        </legend>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Campo id="nome" label="Nome">
            <input
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              required
              className={campoBase}
              value={dados.nome}
              onChange={(e) => atualizar("nome", e.target.value)}
            />
          </Campo>

          <Campo id="email" label="E-mail">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={campoBase}
              value={dados.email}
              onChange={(e) => atualizar("email", e.target.value)}
            />
          </Campo>

          <Campo id="telefone" label="Telefone / WhatsApp">
            <input
              id="telefone"
              name="telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className={campoBase}
              value={dados.telefone}
              onChange={(e) => atualizar("telefone", e.target.value)}
            />
          </Campo>

          <Campo id="empresa" label="Empresa">
            <input
              id="empresa"
              name="empresa"
              type="text"
              autoComplete="organization"
              required
              className={campoBase}
              value={dados.empresa}
              onChange={(e) => atualizar("empresa", e.target.value)}
            />
          </Campo>
        </div>

        <Campo id="site" label="Site da empresa" opcional>
          <input
            id="site"
            name="site"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            className={campoBase}
            value={dados.site}
            onChange={(e) => atualizar("site", e.target.value)}
          />
        </Campo>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-6 text-xl font-bold text-secondary">
          Problema
        </legend>

        <Campo
          id="problema"
          label="Qual problema ou processo você quer resolver?"
          ajuda="Descreva como a operação funciona hoje e onde ela trava. Quanto mais concreto, melhor conseguimos avaliar."
        >
          <textarea
            id="problema"
            name="problema"
            rows={6}
            required
            className={cn(campoBase, "resize-y")}
            value={dados.problema}
            onChange={(e) => atualizar("problema", e.target.value)}
          />
        </Campo>

        <Campo id="comoFuncionaHoje" label="Como esse processo funciona hoje?">
          <Selecao
            id="comoFuncionaHoje"
            opcoes={COMO_FUNCIONA_HOJE}
            valor={dados.comoFuncionaHoje}
            aoMudar={(v) => atualizar("comoFuncionaHoje", v)}
          />
        </Campo>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-6 text-xl font-bold text-secondary">
          Usuários
        </legend>

        <Campo id="usuarios" label="Quem utilizará a solução?">
          <Selecao
            id="usuarios"
            opcoes={USUARIOS_SOLUCAO}
            valor={dados.usuarios}
            aoMudar={(v) => atualizar("usuarios", v)}
          />
        </Campo>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-xl font-bold text-secondary">
          Produto
        </legend>
        <p className="mb-5 text-sm text-muted-foreground">
          O que você imagina que será necessário? Pode marcar mais de um — e não
          tem problema não saber ainda.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {NECESSIDADES_PRODUTO.map((item) => (
            <label
              key={item}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                produto.includes(item)
                  ? "border-accent-strong bg-primary/5"
                  : "border-input hover:border-muted-foreground/40",
              )}
            >
              <input
                type="checkbox"
                name="produto"
                value={item}
                checked={produto.includes(item)}
                onChange={() => alternarProduto(item)}
                className="h-4 w-4 shrink-0 accent-[var(--accent-strong)]"
              />
              <span className="text-foreground">{item}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-6 text-xl font-bold text-secondary">
          Estágio, investimento e prazo
        </legend>

        <Campo id="estagio" label="Em qual estágio o projeto está?">
          <Selecao
            id="estagio"
            opcoes={ESTAGIO_PROJETO}
            valor={dados.estagio}
            aoMudar={(v) => atualizar("estagio", v)}
          />
        </Campo>

        <Campo
          id="investimento"
          label="Faixa de investimento prevista"
          ajuda="Perguntamos cedo de propósito: é o que evita levar os dois lados para uma conversa que não terminaria em projeto."
        >
          {/* Faixas configuradas em FAIXAS_ORCAMENTO, em lib/site-config.ts */}
          <Selecao
            id="investimento"
            opcoes={FAIXAS_ORCAMENTO}
            valor={dados.investimento}
            aoMudar={(v) => atualizar("investimento", v)}
          />
        </Campo>

        <Campo id="prazo" label="Quando você pretende iniciar?">
          <Selecao
            id="prazo"
            opcoes={PRAZO_INICIO}
            valor={dados.prazo}
            aoMudar={(v) => atualizar("prazo", v)}
          />
        </Campo>
      </fieldset>

      {/* Armadilha anti-spam. Invisível e fora da ordem de tabulação. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "enviando"}
          className="w-full rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "enviando" ? "Enviando…" : "Enviar para avaliação"}
        </button>

        {status === "erro" ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            Não conseguimos enviar o formulário agora. Tente novamente em alguns
            instantes ou fale com a gente pelo{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              WhatsApp
            </a>
            .
          </p>
        ) : null}

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Usamos estas informações apenas para avaliar o projeto e responder.
        </p>
      </div>
    </form>
  )
}

function Campo({
  id,
  label,
  ajuda,
  opcional,
  children,
}: {
  id: string
  label: string
  ajuda?: string
  opcional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-medium text-secondary">
        {label}
        {opcional ? (
          <span className="ml-1.5 font-normal text-muted-foreground">
            (opcional)
          </span>
        ) : null}
      </label>
      {ajuda ? (
        <p id={`${id}-ajuda`} className="text-sm leading-relaxed text-muted-foreground">
          {ajuda}
        </p>
      ) : null}
      {children}
    </div>
  )
}

/**
 * `select` nativo. Em vez do Select do Radix: abre o seletor do próprio sistema
 * no celular, funciona sem JavaScript de terceiros e não pesa no bundle da
 * landing page.
 */
function Selecao({
  id,
  opcoes,
  valor,
  aoMudar,
}: {
  id: string
  opcoes: readonly string[]
  valor: string
  aoMudar: (valor: string) => void
}) {
  return (
    <select
      id={id}
      name={id}
      required
      value={valor}
      onChange={(e) => aoMudar(e.target.value)}
      className={cn(campoBase, valor === "" && "text-muted-foreground/70")}
    >
      <option value="" disabled>
        Selecione
      </option>
      {opcoes.map((opcao) => (
        <option key={opcao} value={opcao} className="text-foreground">
          {opcao}
        </option>
      ))}
    </select>
  )
}
