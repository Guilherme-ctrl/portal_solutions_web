import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // A rota do formulário não tem conteúdo indexável.
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
