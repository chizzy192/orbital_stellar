'use client'

import { useState, useEffect, useRef } from 'react'

const SERVER = 'http://localhost:3000'

interface StellarEvent {
  type: string
  amount?: string
  asset?: string
  timestamp: string
}

type Status = 'idle' | 'connecting' | 'live' | 'error'

export default function LiveDemo() {
  const [address, setAddress] = useState('')
  const [events, setEvents] = useState<StellarEvent[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const esRef = useRef<EventSource | null>(null)

  function handleWatch() {
    if (!address.trim()) return

    esRef.current?.close()
    setEvents([])
    setErrorMsg('')
    setStatus('connecting')

    const es = new EventSource(
      `${SERVER}/events/${encodeURIComponent(address.trim())}`
    )
    esRef.current = es

    es.onopen = () => setStatus('live')

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as StellarEvent
        setEvents((prev) => [data, ...prev].slice(0, 50))
      } catch {
        // malformed event — skip
      }
    }

    es.onerror = () => {
      setStatus('error')
      setErrorMsg('Connection failed or lost. Check the address and try again.')
      es.close()
    }
  }

  useEffect(() => () => { esRef.current?.close() }, [])

  return (
    <section className="px-8 py-32">
      <div className="max-w-content mx-auto">
        <h2 className="font-heading font-bold text-white tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight mb-3">
          Watch any Stellar address. Right now.
        </h2>
        <p className="text-muted text-base mb-8">
          Live on testnet — connect to a real address and see events as they happen.
        </p>

        {/* Input row */}
        <div className="flex mb-6">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleWatch()}
            placeholder="Enter a Stellar address (G...)"
            className="flex-1 bg-bg border border-white/[.08] border-r-0 text-white font-mono text-sm px-4 py-3 outline-none placeholder:text-muted focus:border-white/20"
          />
          <button
            onClick={handleWatch}
            className="bg-accent text-black font-bold text-sm px-6 py-3 shrink-0"
          >
            Watch
          </button>
        </div>

        {/* Event feed */}
        <div className="bg-surface border border-white/[.08] h-80 overflow-y-auto p-4">
          {status === 'idle' && (
            <p className="text-muted text-sm text-center mt-24">
              Waiting for events on the Stellar testnet...
            </p>
          )}
          {status === 'connecting' && (
            <p className="text-muted text-sm text-center mt-24">Connecting...</p>
          )}
          {status === 'error' && (
            <p className="text-[#ff4444] text-sm text-center mt-24">{errorMsg}</p>
          )}
          {status === 'live' && events.length === 0 && (
            <p className="text-muted text-sm text-center mt-24">
              Waiting for events on the Stellar testnet...
            </p>
          )}
          {events.map((ev, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-white/[.08] last:border-0 text-sm"
            >
              <span className="text-accent font-mono min-w-[160px]">{ev.type}</span>
              <span className="text-white flex-1 text-center">
                {ev.amount && ev.asset ? `${ev.amount} ${ev.asset}` : '—'}
              </span>
              <span className="text-muted text-xs text-right">{ev.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
