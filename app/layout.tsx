import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

import { GA_ID, GTM_ID, ADS_ID } from "@/lib/analytics"
import { SITE_NOME, SITE_URL, INSTAGRAM_URL } from "@/lib/site-config"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NOME} | Software sob medida para operações reais`,
    template: `%s | ${SITE_NOME}`,
  },
  description:
    "Desenvolvimento de software sob medida para empresas com operação real. Transformamos processos, regras de negócio e operações complexas em sistemas web e mobile.",
  applicationName: SITE_NOME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NOME,
    title: `${SITE_NOME} | Software sob medida para operações reais`,
    description:
      "Transformamos processos, regras de negócio e operações complexas em sistemas web e mobile preparados para evoluir junto com a empresa.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NOME} | Software sob medida para operações reais`,
    description:
      "Transformamos processos, regras de negócio e operações complexas em sistemas web e mobile preparados para evoluir junto com a empresa.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a3a5c",
  colorScheme: "light",
}

/**
 * Dados estruturados da organização. Só descreve o que é verificável a partir
 * do próprio site — sem avaliações, endereço ou métricas inventadas.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NOME,
  url: SITE_URL,
  image: `${SITE_URL}/logo-portal.png`,
  description:
    "Desenvolvimento de software sob medida para empresas com operação real: sistemas web, aplicações mobile, backends e integrações.",
  areaServed: "BR",
  sameAs: [INSTAGRAM_URL],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        {/*
          Google Tag Manager — carrega apenas se NEXT_PUBLIC_GTM_ID estiver
          definido nas Environment Variables da Vercel. Sem ID, nada é injetado.
        */}
        {GTM_ID ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}

        {/*
          Google Tag (GA4 e/ou Google Ads). Use isto OU o GTM acima — configurar
          os dois ao mesmo tempo duplica os eventos.
        */}
        {!GTM_ID && (GA_ID || ADS_ID) ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID || ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${
                GA_ID ? `gtag('config','${GA_ID}');` : ""
              }${ADS_ID ? `gtag('config','${ADS_ID}');` : ""}`}
            </Script>
          </>
        ) : null}

        {children}

        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
