import { NextResponse } from "next/server"

/**
 * Recebe o formulário de /avaliar-projeto e repassa para o serviço de e-mail.
 *
 * Por que existe uma rota em vez de o formulário postar direto no Formspree:
 * o endpoint fica em FORM_ENDPOINT, uma variável de ambiente SEM o prefixo
 * NEXT_PUBLIC_, ou seja, ela nunca é embutida no JavaScript entregue ao
 * navegador. Nenhum e-mail, chave ou identificador de conta aparece no
 * frontend. É a única peça de servidor do site — o resto continua estático.
 *
 * Configuração: ver README.md > "Formulário de avaliação".
 */

const CAMPOS_OBRIGATORIOS = [
  "nome",
  "email",
  "telefone",
  "empresa",
  "problema",
  "comoFuncionaHoje",
  "usuarios",
  "estagio",
  "investimento",
  "prazo",
] as const

const LIMITE_CARACTERES = 5000

type Payload = Record<string, unknown>

export async function POST(request: Request) {
  let dados: Payload

  try {
    dados = (await request.json()) as Payload
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 })
  }

  // Armadilha anti-spam: campo escondido que só um robô preenche.
  // Respondemos 200 de propósito, para o robô não descobrir que foi barrado.
  if (typeof dados.website === "string" && dados.website.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  const faltando = CAMPOS_OBRIGATORIOS.filter((campo) => {
    const valor = dados[campo]
    return typeof valor !== "string" || valor.trim() === ""
  })

  if (faltando.length > 0) {
    return NextResponse.json(
      { erro: "Preencha todos os campos obrigatórios.", campos: faltando },
      { status: 400 },
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(dados.email))) {
    return NextResponse.json({ erro: "E-mail inválido." }, { status: 400 })
  }

  const excedeu = Object.values(dados).some(
    (valor) => typeof valor === "string" && valor.length > LIMITE_CARACTERES,
  )

  if (excedeu) {
    return NextResponse.json(
      { erro: "Mensagem longa demais." },
      { status: 400 },
    )
  }

  const endpoint = process.env.FORM_ENDPOINT

  if (!endpoint) {
    // Sem endpoint configurado o site não pode receber o lead. Registramos o
    // erro para aparecer nos logs da Vercel e devolvemos 503 para que o
    // formulário mostre o contato alternativo em vez de fingir sucesso.
    console.error(
      "[avaliar-projeto] FORM_ENDPOINT não configurado — o envio foi descartado.",
    )
    return NextResponse.json(
      { erro: "Formulário ainda não configurado." },
      { status: 503 },
    )
  }

  const corpo = {
    ...dados,
    website: undefined,
    _assunto: `Avaliação de projeto — ${dados.empresa}`,
    _origem: request.headers.get("referer") ?? "",
    _recebidoEm: new Date().toISOString(),
  }

  try {
    const resposta = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(corpo),
    })

    if (!resposta.ok) {
      console.error(
        `[avaliar-projeto] Serviço de formulário respondeu ${resposta.status}.`,
      )
      return NextResponse.json(
        { erro: "Não foi possível enviar agora." },
        { status: 502 },
      )
    }
  } catch (erro) {
    console.error("[avaliar-projeto] Falha ao contatar o serviço:", erro)
    return NextResponse.json(
      { erro: "Não foi possível enviar agora." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
