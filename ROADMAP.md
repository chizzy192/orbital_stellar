# Roadmap

Orbital is on a multi-year trajectory from event infrastructure to Stellar's programmable runtime. This document describes the planned work in concrete terms. Dates are targets, not guarantees.

---

## Phase 0 — Foundation (now, `v0.x`)

**Goal:** a working, self-hostable event stack that any Stellar developer can run today.

| Area | Status |
|---|---|
| Classic payment event streaming via Horizon SSE | ✅ Done |
| HMAC-signed webhook delivery with retry | ✅ Done |
| React hooks (`useStellarEvent`, `useStellarPayment`, `useStellarActivity`) | ✅ Done |
| Reference Express server (`apps/server`) | ✅ Done |
| Public documentation site (`apps/web`) | ✅ Done |
| Testnet + mainnet support | ✅ Done |
| CI, CodeQL, and Dependabot | ✅ Done |

---

## Phase 1 — Production-grade Core (Q2–Q3 2026, `v1.0`)

**Goal:** a stability-pledged `v1.0` that teams can build on without worrying about breaking changes.

- **Full Stellar operation taxonomy** — account creation, trustline changes, offer operations, clawback, `path_payment`, `manage_offer`, `invoke_host_function`, and all remaining Horizon operation types normalized into typed events.
- **Soroban event subscription** — subscribe to smart contract events by contract ID and topic filter via Stellar RPC.
- **PostgreSQL event registry** — durable storage for event history and replay, replacing the in-memory watcher state.
- **Dead-letter queue + CLI replay tool** — failed webhook deliveries land in a DLQ; a CLI tool lets operators inspect and replay individual events.
- **HA mode** — leader election via Redis/etcd so multiple server instances can run without duplicate delivery.
- **Prometheus / OpenTelemetry exporters** — metrics for event throughput, webhook latency, and queue depth, compatible with standard observability stacks.
- **SSRF hardening pass** — audit and harden the webhook delivery pipeline against all known SSRF vectors.
- **Docker image** — reference server published as a shippable Docker image for self-hosted deployments.
- **Starter boilerplates** — `orbital-next-starter`, `orbital-express-starter`, and `orbital-anchor-starter` for fast project setup.
- **v1.0 stability pledge** — `@orbital/pulse-core`, `@orbital/pulse-webhooks`, and `@orbital/pulse-notify` adopt semver with a documented stability contract. No breaking changes without a major version bump.
- **npm publish** — all three packages published to the npm registry under `@orbital/`.

---

## Phase 2 — SDK Ecosystem (2027)

**Goal:** own the full Stellar developer SDK surface with a coherent, composable package family.

- **`@orbital/hooks`** — complete data-hook library: `useAccount`, `useBalance`, `useTransaction`, `useOrderBook`, and the full account activity surface.
- **`@orbital/payments`** — transaction primitives: send, receive, path payment, and payroll batch operations with typed results.
- **`@orbital/auth`** — embedded wallets via WebAuthn/passkeys, fee sponsorship, and WalletConnect integration.
- **`@orbital/analytics`** — client library and event-volume dashboards for tracking on-chain activity patterns.
- **ABI Registry** — on-chain contract ABI storage as an open standard (schema, verification spec, client library) so pulse-core can decode Soroban event data automatically.
- **Reactor contracts** — a reference SDK and library of Soroban Rust contracts that react to events from other contracts, open for anyone to fork.
- **Replay store** — deterministic replay of any event window from the PostgreSQL store, enabling backfill, testing, and audit workflows.
- **First SEP submission** — propose a Stellar Ecosystem Proposal formalizing the event normalization format so other implementations can interoperate.

---

## Phase 3 — Trust & Agent Layer (2028+)

**Goal:** turn event subscriptions into programmable intent pipelines and capture the AI-agent economy on Stellar.

- **`@orbital/x402`** — Express/Next.js middleware for payment-gated API access via the HTTP 402 / x402 protocol, so event streams can be monetized natively on Stellar.
- **`@orbital/agent-sdk`** — payment client for autonomous AI agents; integrates with x402 for agent-to-agent and agent-to-service payments.
- **`@orbital/anchor-sdk`** — client library for SEP-24 and SEP-31 lifecycle events, giving anchors typed hooks into their own deposit/withdrawal flows.
- **Intent compiler** — declare "when X happens, do Y" as a typed intent; the compiler produces a webhook + reactor contract + replay policy. Open-sourced at maturity.
- **Shadow-Fork simulator** — fork any ledger state, inject hypothetical operations, and replay Soroban invocations for pre-trade analysis, testing, and audit. OSS core.
- **ZK-attested delivery** — zero-knowledge proofs that a webhook was delivered and acknowledged, enabling trustless SLA verification between event producers and consumers.
- **Additional SEPs** — reactor contract spec, intent schema, and attestation format.

---

## Phase 4 — Protocol Permanence (long-term)

**Goal:** become the protocol layer that regulators, enterprises, and central banks assume exists on Stellar.

- **Orbital Network operator software** — OSS node software that any certified third party can run, moving toward a Cloudflare-style network of independent operators rather than a single hosted service.
- **Identity layer** — a reference implementation for passkey-based embedded wallets and federated Stellar addresses, aiming to become Stellar's standard sign-in primitive.
- **Reactor-contract library** — a community-contributed library of hundreds of composable reactor patterns, maintained as an OSS standard.
- **10+ SEPs** — spanning identity, events, reactors, x402, compliance reporting, and attestation formats. Standards authorship is the long-term leverage; shipping features is secondary to writing the protocols others follow.

---

## What's Not on This Roadmap

- Support for non-Stellar networks
- A GUI dashboard (the web app is documentation only — operational UIs belong in deployment tooling, not this repo)
- A proprietary SaaS or enterprise tier (that work is outside this repository's scope)

---

## Contributing to the Roadmap

If you have a feature request or want to propose a change to the roadmap, open a GitHub Discussion in the [Ideas category](https://github.com/orbital/orbital/discussions/categories/ideas). Roadmap items that attract significant community interest move up in priority.
