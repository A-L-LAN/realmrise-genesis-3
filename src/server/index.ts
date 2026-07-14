import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";

import {
    createServer,
    getServerPort,
} from "@devvit/web/server";

import { createContext } from "./context";
import { appRouter } from "./trpc";

import { menu } from "./routes/menu";
import { triggers } from "./routes/triggers";

/* ============================================================
   Create Hono Application
============================================================ */

const app = new Hono();

/* ============================================================
   Public tRPC API
============================================================ */

const api = new Hono();

api.use(
    "/trpc/*",
    trpcServer({
        endpoint: "/api/trpc",
        router: appRouter,
        createContext,
    })
);

app.route("/api", api);

/* ============================================================
   Internal Devvit Endpoints
============================================================ */

const internal = new Hono();

internal.route("/menu", menu);
internal.route("/triggers", triggers);

app.route("/internal", internal);

/* ============================================================
   Health Check
============================================================ */

app.get("/", (c) => {
    return c.json({
        name: "Realmrise: Genesis",
        status: "running",
        initialized: false,
        message:
            "Initialization occurs lazily when the first request requires the world.",
    });
});

/* ============================================================
   Start Server
============================================================ */

serve({
    fetch: app.fetch,
    createServer,
    port: getServerPort(),
});

console.log("");
console.log("==================================================");
console.log("Realmrise: Genesis");
console.log("Devvit Server Started");
console.log("==================================================");
console.log(`Port: ${getServerPort()}`);
console.log("Waiting for first request...");
console.log("==================================================");
console.log("");