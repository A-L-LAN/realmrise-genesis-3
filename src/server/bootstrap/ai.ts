import { getWorld } from "./world";

import { AIService } from "../services/AIService";

/* ============================================================
   AI State
============================================================ */

let initialized = false;

/* ============================================================
   Initialize AI
============================================================ */

export async function initializeAI(): Promise<void> {

    if (initialized) {

        console.log("AI already initialized.");

        return;

    }

    console.log("Loading AI systems...");

    const world = getWorld();

    await AIService.initialize(world);

    initialized = true;

    console.log("AI systems initialized.");

}

/* ============================================================
   Shutdown AI
============================================================ */

export async function shutdownAI(): Promise<void> {

    if (!initialized) {

        return;

    }

    console.log("Stopping AI systems...");

    await AIService.shutdown();

    initialized = false;

    console.log("AI stopped.");

}

/* ============================================================
   Restart AI
============================================================ */

export async function restartAI(): Promise<void> {

    await shutdownAI();

    await initializeAI();

}

/* ============================================================
   Status
============================================================ */

export function isAIInitialized(): boolean {

    return initialized;

}