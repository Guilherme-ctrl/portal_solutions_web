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

type Status = "editando" | "enviado"

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
  const [status, setStatus] = useState<Status>("editando")
  const [linkWhatsapp, setLinkWhatsapp] = useState("")

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

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const url = montarLinkWhatsapp(dados, produto)

    // Conversão: é este evento que o Google Ads deve usar como objetivo.
    // Marca a abertura do WhatsApp com o formulário preenchido — não há como
    // o site saber se a mensagem foi de fato enviada depois disso.
    trackLead({ estagio: dados.estagio, investimento: dados.investimento })

    // window.open direto no handler do clique, sem await antes, para que o
    // navegador não trate a aba como popup e bloqueie.
    window.open(url, "_blank", "noopener,noreferrer")

    setLinkWhatsapp(url)
    setStatus("enviado")
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
          Abrimos o WhatsApp com as suas respostas
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
          A mensagem já vai preenchida — é só revisar e enviar. Assim que ela
          chegar, lemos o que você descreveu e respondemos em até um dia útil.
        </p>

        {/* O window.open pode ter sido bloqueado pelo navegador. Este link
            garante que a pessoa não fique sem saída. */}
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-secondary px-7 py-3.5 font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          Abrir o WhatsApp
        </a>

        <p className="mt-4 text-sm text-muted-foreground">
          Não abriu sozinho? Use o botão acima.
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
            maxLength={1500}
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

      <div>
        <button
          type="submit"
          className="w-full rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          Revisar e enviar pelo WhatsApp
        </button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Abrimos o WhatsApp com as respostas já preenchidas. Você revisa antes
          de enviar — nada sai daqui sem a sua confirmação.
        </p>
      </div>
    </form>
  )
}

/**
 * Monta o link do WhatsApp com as respostas já formatadas.
 *
 * O site não tem backend: em vez de postar em um serviço externo, o
 * formulário vira uma mensagem pronta que a pessoa revisa e envia. O ganho de
 * qualificação continua o mesmo — as respostas chegam junto com o primeiro
 * contato, em vez de um "olá, tudo bem?".
 *
 * Campos opcionais em branco são omitidos para a mensagem não chegar com
 * linhas vazias.
 */
function montarLinkWhatsapp(
  dados: typeof estadoInicial,
  produto: string[],
): string {
  const linhas = [
    "Olá! Preenchi o formulário de avaliação de projeto no site.",
    "",
    `*Nome:* ${dados.nome}`,
    `*Empresa:* ${dados.empresa}`,
    `*E-mail:* ${dados.email}`,
    `*Telefone:* ${dados.telefone}`,
  ]

  if (dados.site.trim()) linhas.push(`*Site:* ${dados.site}`)

  linhas.push(
    "",
    "*Problema ou processo a resolver*",
    dados.problema,
    "",
    `*Como funciona hoje:* ${dados.comoFuncionaHoje}`,
    `*Quem vai usar:* ${dados.usuarios}`,
    `*O que imagino ser necessário:* ${
      produto.length > 0 ? produto.join(", ") : "Ainda não sei"
    }`,
    `*Estágio:* ${dados.estagio}`,
    `*Investimento previsto:* ${dados.investimento}`,
    `*Pretendo iniciar:* ${dados.prazo}`,
  )

  return `${WHATSAPP_URL}?text=${encodeURIComponent(linhas.join("\n"))}`
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
