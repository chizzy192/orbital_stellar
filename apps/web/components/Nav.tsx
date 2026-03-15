import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-bg border-b border-white/[.08]">
      <div className="max-w-content mx-auto px-8 h-16 flex items-center justify-between">
        <div className="font-heading font-medium text-lg tracking-tight text-white">
          Orbit Stellar
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-muted text-sm hover:text-white transition-colors">Docs</Link>
          <Link href="#" className="text-muted text-sm hover:text-white transition-colors">SDKs</Link>
          <Link href="#" className="text-muted text-sm hover:text-white transition-colors">How it works</Link>
          <Link href="#" className="text-muted text-sm hover:text-white transition-colors">GitHub</Link>
        </div>

        <Link
          href="#"
          className="bg-accent text-black font-bold text-sm px-5 py-2"
        >
          Get started
        </Link>
      </div>
    </nav>
  )
}
