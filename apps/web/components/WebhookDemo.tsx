'use client'

import { useState } from 'react'

const SERVER = 'http://localhost:3000'

export default function WebhookDemo() {
  const [stellarAddress, setStellarAddress] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [signingSecret, setSigningSecret] = useState('')
  const [response, setResponse] = useState<{ ok: boolean; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleRegister() {
    if (!stellarAddress.trim() || !webhookUrl.trim()) return

    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch(`${SERVER}/webhooks/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: stellarAddress.trim(),
          webhookUrl: webhookUrl.trim(),
          signingSecret: signingSecret.trim() || undefined,
        }),
      })
      const data = await res.json()
      setResponse({ ok: res.ok, message: data.message ?? JSON.stringify(data) })
    } catch (err) {
      setResponse({
        ok: false,
        message: err instanceof Error ? err.message : 'Request failed.',
      })
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-bg border border-white/[.08] text-white text-sm px-4 py-3 outline-none placeholder:text-muted focus:border-white/20'

  return (
    <section className="px-8 py-32">
      <div className="max-w-content mx-auto">
        <h2 className="font-heading font-bold text-white tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight mb-3">
          Register a webhook in seconds.
        </h2>
        <p className="text-muted text-base mb-8">
          Point Orbit Stellar at your endpoint — we handle delivery, retries, and signing.
        </p>

        <div className="max-w-lg flex flex-col gap-3">
          <input
            type="text"
            value={stellarAddress}
            onChange={(e) => setStellarAddress(e.target.value)}
            placeholder="G..."
            className={`${inputClass} font-mono`}
          />
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://yourapp.com/hooks/stellar"
            className={inputClass}
          />
          <input
            type="text"
            value={signingSecret}
            onChange={(e) => setSigningSecret(e.target.value)}
            placeholder="whsec_..."
            className={`${inputClass} font-mono`}
          />
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-accent text-black font-bold text-base py-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register webhook'}
          </button>

          {response && (
            <p className={`text-sm ${response.ok ? 'text-white' : 'text-[#ff4444]'}`}>
              {response.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
