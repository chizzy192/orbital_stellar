import { Router } from "express";
import type { WebhookRegistry } from "./registry.js";
import type { EventEngine } from "@orbital/pulse-core";

export function createRoutes(registry: WebhookRegistry, engine: EventEngine): Router {
  const router = Router();

  // Register a webhook
  router.post("/webhooks/register", (req, res) => {
    const { address, url, secret } = req.body;

    if (!address || !url || !secret) {
      res.status(400).json({
        error: "address, url and secret are required",
      });
      return;
    }

    if (registry.has(address)) {
      res.status(409).json({
        error: "Address already registered",
      });
      return;
    }

    const registration = registry.register(address, url, secret);
    res.status(201).json(registration);
  });

  // Unregister a webhook
  router.delete("/webhooks/:address", (req, res) => {
    const { address } = req.params;
    const removed = registry.unregister(address);

    if (!removed) {
      res.status(404).json({ error: "Address not registered" });
      return;
    }

    res.status(200).json({ message: `Unregistered ${address}` });
  });

  // List all registrations
  router.get("/webhooks", (_req, res) => {
    res.status(200).json(registry.list());
  });

  // SSE endpoint — browser connects here to receive live events
  router.get("/events/:address", (req, res) => {
    const { address } = req.params;

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Subscribe to pulse-core
    const watcher = engine.subscribe(address);

    // Send events to browser
    const handler = (event: unknown) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    watcher.on("*", handler);

    // Send a heartbeat every 30s to keep connection alive
    const heartbeat = setInterval(() => {
      res.write(`: heartbeat\n\n`);
    }, 30000);

    // Cleanup when browser disconnects
    req.on("close", () => {
      clearInterval(heartbeat);
      watcher.removeListener("*", handler);
      console.log(`[sse] Client disconnected from ${address}`);
    });

    console.log(`[sse] Client connected to ${address}`);
  });

  return router;
}