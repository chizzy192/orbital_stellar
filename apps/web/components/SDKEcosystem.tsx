const PACKAGES = [
  {
    pkg: '@orbital/pulse-webhooks',
    title: 'Pulse Webhooks',
    description: 'Signed webhook delivery for your server.',
    status: 'Live' as const,
  },
  {
    pkg: '@orbital/pulse-notify',
    title: 'Pulse Notify',
    description: 'React hooks for real-time Stellar events.',
    status: 'Live' as const,
  },
  {
    pkg: '@orbital/hooks',
    title: 'Stellar Hooks',
    description: 'useAccount, useTransaction, useBalance and more.',
    status: 'Coming soon' as const,
  },
  {
    pkg: '@orbital/auth',
    title: 'Auth SDK',
    description: 'Embedded wallets, passkeys, fee sponsorship.',
    status: 'Coming soon' as const,
  },
  {
    pkg: '@orbital/payments',
    title: 'Payments SDK',
    description: 'Send, receive, swap and programmable payroll.',
    status: 'Coming soon' as const,
  },
  {
    pkg: '@orbital/testing',
    title: 'Testing Utils',
    description: 'Mock Horizon and local testnet helpers.',
    status: 'Coming soon' as const,
  },
]

export default function SDKEcosystem() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-content mx-auto">
        <h2 className="font-heading font-bold text-white tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight mb-12">
          One namespace. Every layer you need.
        </h2>

        {/* 3×2 grid — use outline/gap trick so all borders are equal weight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[.08] border border-white/[.08]">
          {PACKAGES.map((item) => (
            <div key={item.pkg} className="bg-bg p-7 flex flex-col gap-2">
              <p className="font-mono text-muted text-xs">{item.pkg}</p>
              <p className="font-bold text-white text-base">{item.title}</p>
              <p className="text-muted text-sm leading-relaxed flex-1">{item.description}</p>
              <span
                className={`text-xs font-semibold ${
                  item.status === 'Live' ? 'text-accent' : 'text-muted'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
