// Decisões comerciais do site. Alterar aqui, não nos componentes.

export const WHATSAPP_NUMERO = "5547933803750"

// Preço do Diagnóstico de Escopo. Vazio = o Diagnóstico é gratuito e nenhum
// preço aparece no site. Preencher só se um dia decidir cobrar pela etapa.
export const DIAGNOSTICO_PRECO = ""

// Nome do cliente no case. Vazio = case publicado de forma anônima (sem citar a marca).
// Só preencher depois do "ok" do cliente.
export const CASE_CLIENTE_NOME = ""

// Menor faixa = piso de projeto. Revisar os valores antes de publicar.
export const FAIXAS_ORCAMENTO = [
  "Até R$ 20 mil",
  "R$ 20 mil a R$ 50 mil",
  "R$ 50 mil a R$ 100 mil",
  "Acima de R$ 100 mil",
  "Ainda não defini",
] as const

export const TEMPO_OPERACAO = [
  "Menos de 1 ano",
  "1 a 3 anos",
  "3 a 10 anos",
  "Mais de 10 anos",
] as const
