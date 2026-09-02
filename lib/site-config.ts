/**
 * Decisões comerciais e de conteúdo do site.
 * Alterar aqui, nunca nos componentes.
 */

// ---------------------------------------------------------------------------
// Identidade e contato
// ---------------------------------------------------------------------------

export const SITE_NOME = "Portal Solutions"

/**
 * Domínio canônico da aplicação: HTTPS, sem www, sem barra no final.
 * É a única forma do endereço que pode aparecer em canonical, Open Graph e
 * sitemap.xml — servir o site também em www.portalsolutions.dev criaria uma
 * segunda cópia indexável e dividiria a autoridade do domínio.
 */
const DOMINIO_CANONICO = "https://portalsolutions.dev"

/**
 * Normaliza o valor de NEXT_PUBLIC_SITE_URL para a forma canônica.
 *
 * Força HTTPS e remove o "www.", de modo que o canonical continue correto
 * mesmo que a variável seja cadastrada na Vercel como "http://..." ou
 * "https://www...". localhost é preservado como está, para o ambiente local.
 * Valor inválido cai no domínio canônico em vez de derrubar o build.
 */
function normalizarSiteUrl(bruta: string): string {
  try {
    const url = new URL(bruta)
    const ehLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1"

    if (!ehLocal) {
      url.protocol = "https:"
      url.hostname = url.hostname.replace(/^www\./, "")
    }

    // origin já descarta path, query e barra final
    return url.origin
  } catch {
    return DOMINIO_CANONICO
  }
}

export const SITE_URL = normalizarSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? DOMINIO_CANONICO,
)

export const WHATSAPP_NUMERO = "5547933803750"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}`
export const INSTAGRAM_URL = "https://www.instagram.com/portal.solutions/"

// ---------------------------------------------------------------------------
// >>> PISO DE INVESTIMENTO <<<
// ---------------------------------------------------------------------------
// Enquanto estiver vazio (""), nenhuma menção a preço mínimo aparece no site.
// Ao preencher (ex.: "R$ 40 mil"), a frase passa a aparecer automaticamente
// na Home e na página /avaliar-projeto. Não é preciso mexer em componente.
export const PRECO_MINIMO_PROJETO = ""

// ---------------------------------------------------------------------------
// >>> FAIXAS DE ORÇAMENTO DO FORMULÁRIO <<<
// ---------------------------------------------------------------------------
// Campo obrigatório em /avaliar-projeto. A escala começa em R$ 2 mil porque a
// demanda pode ser um site institucional, não só uma plataforma.
// Basta editar as strings abaixo — o formulário e a mensagem do WhatsApp se
// ajustam sozinhos. Não existe faixa abaixo de R$ 2 mil de propósito: esse é
// o piso. Quem estiver abaixo dele cai em "Ainda precisamos definir".
export const FAIXAS_ORCAMENTO = [
  "R$ 2 mil a R$ 5 mil",
  "R$ 5 mil a R$ 15 mil",
  "R$ 15 mil a R$ 40 mil",
  "R$ 40 mil a R$ 100 mil",
  "Acima de R$ 100 mil",
  "Ainda precisamos definir",
] as const

// ---------------------------------------------------------------------------
// Demais opções do formulário de avaliação
// ---------------------------------------------------------------------------

export const COMO_FUNCIONA_HOJE = [
  "Planilhas",
  "Processo manual",
  "Sistema existente",
  "Várias ferramentas diferentes",
  "Ainda não existe",
  "Outro",
] as const

export const USUARIOS_SOLUCAO = [
  "Equipe interna",
  "Clientes",
  "Fornecedores/parceiros",
  "Diferentes públicos",
  "Ainda não sei",
] as const

export const NECESSIDADES_PRODUTO = [
  "Sistema Web",
  "Aplicativo Mobile",
  "Painel administrativo",
  "Backend/API",
  "Integrações",
  "Ainda não sei",
] as const

export const ESTAGIO_PROJETO = [
  "Existe apenas uma ideia",
  "Temos o processo mapeado",
  "A operação já existe manualmente",
  "Já temos um sistema e precisamos evoluí-lo ou substituí-lo",
  "Já temos especificação/requisitos",
] as const

export const PRAZO_INICIO = [
  "Imediatamente",
  "Próximos 30 dias",
  "1 a 3 meses",
  "3 a 6 meses",
  "Ainda estamos avaliando",
] as const

// ---------------------------------------------------------------------------
// Case — publicado de forma anônima
// ---------------------------------------------------------------------------
// O cliente ainda não autorizou uso comercial da marca. Manter vazio.
// Nenhum nome, logo, screenshot ou identidade do cliente deve entrar no site.
export const CASE_CLIENTE_NOME = ""

export const CASE_SLUG = "marketplace-b2b"
export const CASE_URL = `/cases/${CASE_SLUG}`
export const CASE_TITULO = "Marketplace B2B de locação"
