/**
 * Camada fina sobre o Google Tag (gtag.js).
 *
 * Nada aqui quebra se as tags não estiverem configuradas: sem
 * NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GTM_ID definidos, `window.gtag` não existe e
 * todas as funções viram no-op. Isso mantém o site funcionando em dev e em
 * preview sem nenhum ID fictício no código.
 */

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ""

/** ID da conta do Google Ads, ex.: "AW-123456789". */
export const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID ?? ""

/** Rótulo da conversão criada no Google Ads, ex.: "AbC-D_efGh12". */
export const ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL ?? ""

/**
 * Evento genérico. Envia via gtag quando o Google Tag está direto na página e,
 * quando o GTM está no lugar dele, empurra para o dataLayer — assim o mesmo
 * código funciona nas duas montagens possíveis.
 */
export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params)
    return
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params })
  }
}

/** Clique em um CTA. `local` identifica de onde partiu (hero, case, footer...). */
export function trackCta(label: string, local: string) {
  trackEvent("cta_click", { cta_label: label, cta_location: local })
}

/**
 * Conversão principal: formulário de avaliação enviado com sucesso.
 * Dispara o evento do GA4 e, se o Ads estiver configurado, a conversão do Ads.
 */
export function trackLead(params: Params = {}) {
  trackEvent("generate_lead", { form: "avaliar_projeto", ...params })

  if (ADS_ID && ADS_CONVERSION_LABEL) {
    trackEvent("conversion", {
      send_to: `${ADS_ID}/${ADS_CONVERSION_LABEL}`,
    })
  }
}
