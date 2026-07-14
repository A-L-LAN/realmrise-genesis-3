import { initializeWorld } from "./world";
import { initializeScheduler } from "./scheduler";
import { initializeAI } from "./ai";

/* ============================================================
   Realmrise: Genesis Server Initialization
============================================================ */

export async function initializeServer(): Promise<void> {

    console.log("");
    console.log("==================================================");
    console.log("Realmrise: Genesis");
    console.log("Server Initialization Started");
    console.log("==================================================");
    console.log("");

    try {

        /* ---------------------------------------------
           1. Load or Create the Persistent World
        ---------------------------------------------- */

        console.log("Loading world...");

        await initializeWorld();

        console.log("World initialized.");
        console.log("");

        /* ---------------------------------------------
           2. Initialize AI Systems
        ---------------------------------------------- */

        console.log("Initializing AI kingdoms...");

        await initializeAI();

        console.log("AI initialized.");
        console.log("");

        /* ---------------------------------------------
           3. Start World Scheduler
        ---------------------------------------------- */

        console.log("Starting world scheduler...");

        await initializeScheduler();

        console.log("Scheduler running.");
        console.log("");

        /* ---------------------------------------------
           Startup Complete
        ---------------------------------------------- */

        console.log("==================================================");
        console.log("Realmrise server is ready.");
        console.log("One World. Every Choice Matters.");
        console.log("==================================================");
        console.log("");

    } catch (error) {

        console.error("");
        console.error("==================================================");
        console.error("Realmrise initialization failed.");
        console.error("==================================================");
        console.error(error);
        console.error("");

        throw error;

    }

}