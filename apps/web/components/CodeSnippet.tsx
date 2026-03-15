'use client'

import { useState, useEffect, useRef } from 'react'

type Tab = 'simple' | 'medium' | 'complex'

const SNIPPETS: Record<Tab, string[]> = {
  simple: [
    "pulse.watch('GABC...1234', (event) => {",
    "  console.log('something happened', event)",
    "})",
  ],
  medium: [
    "pulse.watch('GABC...1234')",
    "  .on('payment.received', (event) => {",
    "    notifyUser(event.amount)",
    "  })",
  ],
  complex: [
    "pulse.watch('GABC...1234', {",
    "  events: ['payment.received', 'contract.invoked'],",
    "  filters: { asset: 'USDC', minAmount: 100 },",
    "  delivery: {",
    "    webhook: 'https://myapp.com/hooks/stellar',",
    "    retries: 3,",
    "    signingSecret: 'whsec_...'",
    "  },",
    "  onEvent: (event) => { ... }",
    "})",
  ],
}

const TAB_LABELS: Record<Tab, string> = {
  simple: 'Simple',
  medium: 'Medium',
  complex: 'Complex',
}

export default function CodeSnippet() {
  const [activeTab, setActiveTab] = useState<Tab>('simple')
  const [highlightedLine, setHighlightedLine] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setHighlightedLine(0)
    if (intervalRef.current) clearInterval(intervalRef.current)

    const lines = SNIPPETS[activeTab]
    intervalRef.current = setInterval(() => {
      setHighlightedLine((prev) => (prev + 1) % lines.length)
    }, 800)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeTab])

  const lines = SNIPPETS[activeTab]

  return (
    <section className="px-8 py-32">
      <div className="max-w-content mx-auto">
        <h2 className="font-heading font-bold text-white tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight mb-3">
          Simple by default. Powerful when needed.
        </h2>
        <p className="text-muted text-base mb-12">
          Drop in one function call. Add options as your app grows.
        </p>

        <div className="border border-white/[.08] flex flex-col md:flex-row">
          {/* Tabs */}
          <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-white/[.08] md:w-48 shrink-0">
            {(Object.keys(SNIPPETS) as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  'px-5 py-4 text-sm text-left flex-1 md:flex-none border-b-[3px] md:border-b-0 md:border-l-[3px] transition-none',
                  activeTab === tab
                    ? 'border-accent text-white'
                    : 'border-transparent text-muted hover:text-white',
                ].join(' ')}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>

          {/* Code window */}
          <div className="flex-1 bg-surface">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[.08]">
              <span className="w-3 h-3 rounded-full bg-white/[.08] inline-block" />
              <span className="w-3 h-3 rounded-full bg-white/[.08] inline-block" />
              <span className="w-3 h-3 rounded-full bg-white/[.08] inline-block" />
            </div>
            <pre className="font-mono text-sm p-6 overflow-x-auto leading-[1.8]">
              {lines.map((line, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className={[
                    'px-2 -mx-2 whitespace-pre block',
                    i === highlightedLine
                      ? 'text-white bg-[rgba(232,255,71,0.1)]'
                      : 'text-muted',
                  ].join(' ')}
                >
                  {line}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
