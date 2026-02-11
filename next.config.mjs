/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
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
