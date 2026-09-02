/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Site estático na Vercel; os únicos assets são PNGs pequenos e já
    // dimensionados, então não há ganho em passar pelo otimizador.
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/google96ab26bde0d88af2.html",
        destination: "/api/google-verification",
      },
    ]
  },
}

export default nextConfig
