import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/[.08]">
      <div className="max-w-content mx-auto px-8 pt-16 pb-0">
        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* Brand */}
          <div>
            <p className="font-heading font-bold text-white text-lg tracking-tight mb-3">
              Orbit Stellar
            </p>
            <p className="text-muted text-sm leading-relaxed mb-4 max-w-[260px]">
              Real-time event infrastructure for Stellar developers.
            </p>
            <p className="text-muted text-xs mb-2">MIT License</p>
            <p className="text-white text-sm flex items-center gap-2">
              <span className="text-accent text-[0.5rem]">●</span>
              All systems operational
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-white text-xs uppercase tracking-widest font-semibold mb-4">
              Product
            </p>
            <ul className="flex flex-col gap-2.5">
              {['Docs', 'SDKs', 'How it works', 'Changelog', 'Status'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted text-sm hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <p className="text-white text-xs uppercase tracking-widest font-semibold mb-4">
              Packages
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                'npm i @orbital/pulse-webhooks',
                'npm i @orbital/pulse-notify',
              ].map((cmd) => (
                <li key={cmd} className="font-mono text-muted text-xs">
                  {cmd}
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-white text-xs uppercase tracking-widest font-semibold mb-4">
              Community
            </p>
            <ul className="flex flex-col gap-2.5">
              {['GitHub', 'Twitter', 'SCF Grant', 'Open an issue'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted text-sm hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 py-5 border-t border-white/[.08]">
          <span className="text-muted text-xs">© 2026 Orbit Stellar</span>
          <span className="text-muted text-xs">Built for the Stellar ecosystem</span>
        </div>
      </div>
    </footer>
  )
}
