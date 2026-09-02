import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Problemas } from "@/components/problemas"
import { OQueDesenvolvemos } from "@/components/o-que-desenvolvemos"
import { Processo } from "@/components/processo"
import { CaseDestaque } from "@/components/case-destaque"
import { ParaQuem } from "@/components/para-quem"
import { CtaFinal } from "@/components/cta-final"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Software sob medida para operações reais",
  description:
    "Desenvolvimento de software sob medida para empresas: sistemas web, aplicativos empresariais, plataformas digitais, backends e integrações. Transformamos processos e regras de negócio em software.",
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problemas />
        <OQueDesenvolvemos />
        <Processo />
        <CaseDestaque />
        <ParaQuem />
        <CtaFinal local="home_final" />
      </main>
      <Footer />
    </>
  )
}
