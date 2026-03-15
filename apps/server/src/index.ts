import express from "express";
import { EventEngine } from "@orbital/pulse-core";
import { WebhookRegistry } from "./registry.js";
import { createRoutes } from "./routes.js";

const PORT = process.env.PORT || 3000;
const NETWORK = (process.env.NETWORK as "mainnet" | "testnet") || "testnet";

const engine = new EventEngine({ network: NETWORK });
engine.start();
console.log(`[server] Event engine started on ${NETWORK}`);

const registry = new WebhookRegistry(engine);

const app = express();
app.use(express.json());

// Pass both registry and engine into routes
app.use(createRoutes(registry, engine));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", network: NETWORK });
});

app.listen(PORT, () => {
  console.log(`[server] Listening on port ${PORT}`);
});