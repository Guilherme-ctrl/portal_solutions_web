import { Smartphone, Globe, Settings } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: Smartphone,
      title: "Apps",
      description: "Aplicativos móveis para iOS e Android com design moderno e alta performance.",
    },
    {
      icon: Globe,
      title: "Web",
      description: "Plataformas web responsivas, escaláveis e otimizadas para seu negócio.",
    },
    {
      icon: Settings,
      title: "Sistemas",
      description: "Sistemas personalizados que automatizam e otimizam seus processos.",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary italic mb-4">
          O que construímos:
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Transformamos suas ideias em soluções digitais de alta qualidade
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <PortalIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#4a9fd4"
          />
        </svg>
      </div>
    </section>
  )
}

function PortalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4C11.16 4 4 11.16 4 20C4 28.84 11.16 36 20 36C28.84 36 36 28.84 36 20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M28 8C28 8 32 12 32 20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}
