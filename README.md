# Orbital

**Real-time event infrastructure for the Stellar network.**

Orbital is the programmable runtime between Stellar and the applications, services, and AI agents that depend on it. Subscribe to on-chain activity over SSE, deliver HMAC-signed webhooks, and consume live data from React with first-class hooks — all from a single, Stellar-native stack.

```bash
pnpm add @orbital/pulse-core @orbital/pulse-webhooks @orbital/pulse-notify
```

## Why Orbital

Stellar's official APIs give you the raw firehose — Horizon for classic operations, Stellar RPC for Soroban. Turning that firehose into production-grade application events has been a build-it-yourself problem for every team on the network. Orbital solves it once, openly, with a coherent set of primitives:

- **SSE streaming** with automatic reconnection and backoff
- **HMAC-signed webhook delivery** with retry, timeout, and SSRF protection
- **React hooks** for live account, payment, and Soroban event subscriptions
- **Soroban-aware** — classic ops and smart contract events through one API
- **MIT-licensed**, self-hostable, with a documented stability contract

## Packages

| Package | Description |
|---|---|
| [`@orbital/pulse-core`](./packages/pulse-core) | Event engine: Horizon + Soroban RPC subscription, normalization, watcher pub/sub |
| [`@orbital/pulse-webhooks`](./packages/pulse-webhooks) | HMAC-signed webhook delivery with retry and replay |
| [`@orbital/pulse-notify`](./packages/pulse-notify) | React hooks (`useStellarEvent`, `useStellarPayment`, `useStellarActivity`) |
| [`apps/server`](./apps/server) | Reference Express server combining all three packages |
| [`apps/web`](./apps/web) | Public-facing Next.js site and documentation |

## Quickstart — receive your first Stellar event

```ts
import { EventEngine } from "@orbital/pulse-core";

const engine = new EventEngine({ network: "testnet" });
engine.start();

const watcher = engine.subscribe("GABC...YOUR_ACCOUNT");
watcher.on("payment.received", (event) => {
  console.log(`+${event.amount} ${event.asset} from ${event.from}`);
});
```

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│  Stellar Network  (Horizon + Stellar RPC)                │
└─────────────────────┬────────────────────────────────────┘
                      │  SSE stream + RPC polling
                      ▼
┌──────────────────────────────────────────────────────────┐
│  @orbital/pulse-core                                     │
│  EventEngine · Watcher · Normalization · Reconnect       │
└──────┬────────────────────┬──────────────────────────────┘
       │                    │
       ▼                    ▼
┌─────────────────┐  ┌─────────────────────────────────────┐
│ pulse-webhooks  │  │  pulse-notify (React hooks)         │
│ HMAC delivery   │  │  useStellarEvent, useStellarPayment │
└─────────────────┘  └─────────────────────────────────────┘
```

## Self-hosting

The `apps/server` package is a reference implementation you can fork, deploy, or run directly:

```bash
pnpm install
NETWORK=testnet API_KEY=your-dev-key pnpm --filter @orbital/server dev
```

See [`apps/server/README.md`](./apps/server/README.md) for the full deployment guide.

## Roadmap

Orbital is on a multi-year trajectory from event infrastructure to Stellar's programmable runtime. Near-term milestones:

- **Now** — Classic payment events, HMAC webhooks, React hooks, testnet + mainnet
- **Q2–Q3 2026** — Full Stellar operation taxonomy, PostgreSQL registry, Soroban event subscription, v1.0 stability pledge
- **Q4 2026** — ABI Registry, reactor contracts, replay store, first SEP submission
- **2027+** — Intent compiler, x402 middleware, ZK-attested delivery

See [`ROADMAP.md`](./ROADMAP.md) for the full plan.

## Contributing

We welcome contributions from the Stellar community. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setup, coding standards, and PR process.

Good places to start:
- Browse [issues tagged `good-first-issue`](https://github.com/orbital/orbital/labels/good-first-issue)
- Read the [architecture overview](#architecture)
- Run the test suite: `pnpm test`

## License

MIT — see [`LICENSE`](./LICENSE). Free to use in commercial and open-source projects.

## Community

- Discord: *(invite link)*
- Twitter: `@orbitalstellar`
- GitHub Discussions: https://github.com/orbital/orbital/discussions
