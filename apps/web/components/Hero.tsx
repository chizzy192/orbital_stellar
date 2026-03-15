import Link from 'next/link'

export default function Hero() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-content mx-auto">
        <h1 className="font-heading font-extrabold text-white leading-none tracking-[-0.04em] text-[clamp(3rem,7vw,6rem)] mb-6">
          The missing event layer<br />
          for Stellar developers.
        </h1>

        <p className="text-muted text-lg leading-relaxed max-w-md mb-10">
          Subscribe to any address, receive webhooks, and build real-time apps — without running your own Horizon node.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#"
            className="bg-accent text-black font-bold text-base px-7 py-3 inline-block"
          >
            Read the docs
          </Link>
          <Link
            href="#"
            className="border border-white text-white text-base px-7 py-3 inline-block"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
