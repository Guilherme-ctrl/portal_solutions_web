export function Header() {
  return (
    <header className="w-full py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-portal.png"
          alt="Portal Solutions Logo"
          className="h-28 md:h-32 w-auto object-contain"
        />
      </div>
    </header>
  )
}
