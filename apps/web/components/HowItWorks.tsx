const STEPS = [
  {
    title: 'Stellar Network',
    description: 'Transaction confirmed on-chain',
  },
  {
    title: 'Horizon SSE',
    description: 'One persistent global stream',
  },
  {
    title: 'Orbit Stellar',
    description: 'Filters, normalizes, routes',
  },
  {
    title: 'Your App',
    description: 'Webhook or React hook fires',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-content mx-auto">
        <h2 className="font-heading font-bold text-white tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight mb-12">
          One connection. Every developer.
        </h2>

        <div className="border border-white/[.08] px-8 py-10 flex flex-col md:flex-row items-start md:items-center">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex items-center flex-1 w-full md:w-auto">
              <div className="flex-1">
                <p className="font-bold text-white text-sm mb-1">{step.title}</p>
                <p className="text-muted text-xs">{step.description}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="text-muted text-lg px-4 md:px-6 py-4 md:py-0 self-center">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
