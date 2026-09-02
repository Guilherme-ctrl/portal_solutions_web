import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Metodo } from "@/components/metodo"
import { Case } from "@/components/case"
import { NaoFazemos } from "@/components/nao-fazemos"
import { Diagnostico } from "@/components/diagnostico"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Metodo />
      <Case />
      <NaoFazemos />
      <Diagnostico />
      <Footer />
    </main>
  )
}
