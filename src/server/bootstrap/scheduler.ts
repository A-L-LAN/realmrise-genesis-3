import { getWorld, saveWorld } from "./world";

import { runDailySimulation } from "../simulation/DailySimulation";
import { runWorldSimulation } from "../simulation/WorldSimulation";

/* ============================================================
   Scheduler State
============================================================ */

let worldTick: NodeJS.Timeout | null = null;

let dailyTick: NodeJS.Timeout | null = null;

/* ============================================================
   Configuration
============================================================ */

/*
 * Development values.
 *
 * Later you can replace these with environment variables
 * or your own configuration system.
 */

const WORLD_SIMULATION_INTERVAL = 60 * 1000;          // 1 minute

const DAILY_SIMULATION_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

/* ============================================================
   Initialize Scheduler
============================================================ */

export async function initializeScheduler(): Promise<void> {

    console.log("Initializing scheduler...");

    startWorldSimulation();

    startDailySimulation();

    console.log("Scheduler initialized.");

}

/* ============================================================
   World Simulation
============================================================ */

function startWorldSimulation(): void {

    if (worldTick) {

        clearInterval(worldTick);

    }

    worldTick = setInterval(async () => {

        try {

            const world = getWorld();

            await runWorldSimulation(world);

            await saveWorld();

            console.log("[World] Simulation completed.");

        } catch (error) {

            console.error("[World] Simulation failed.");

            console.error(error);

        }

    }, WORLD_SIMULATION_INTERVAL);

}

/* ============================================================
   Daily Simulation
============================================================ */

function startDailySimulation(): void {

    if (dailyTick) {

        clearInterval(dailyTick);

    }

    dailyTick = setInterval(async () => {

        try {

            const world = getWorld();

            await runDailySimulation(world);

            await saveWorld();

            console.log("[Daily] Simulation completed.");

        } catch (error) {

            console.error("[Daily] Simulation failed.");

            console.error(error);

        }

    }, DAILY_SIMULATION_INTERVAL);

}

/* ============================================================
   Stop Scheduler
============================================================ */

export function stopScheduler(): void {

    if (worldTick) {

        clearInterval(worldTick);

        worldTick = null;

    }

    if (dailyTick) {

        clearInterval(dailyTick);

        dailyTick = null;

    }

    console.log("Scheduler stopped.");

}

/* ============================================================
   Restart Scheduler
============================================================ */

export async function restartScheduler(): Promise<void> {

    stopScheduler();

    await initializeScheduler();

}