export function Logo({ size = 50 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Círculo externo */}
      <path
        d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5z"
        stroke="#4a9fd4"
        strokeWidth="8"
        fill="none"
      />
      {/* Abertura do portal (corte no círculo) */}
      <path
        d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45"
        stroke="#4a9fd4"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Espiral interna */}
      <path
        d="M50 20c-16.5 0-30 13.5-30 30s13.5 30 30 30c8.3 0 15.8-3.4 21.2-8.8"
        stroke="#5bb4e0"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ponto central do portal */}
      <circle cx="50" cy="50" r="8" fill="#4a9fd4" />
    </svg>
  )
}
