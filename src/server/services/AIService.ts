import type { World } from "../models/World";

/* ============================================================
   AI Service

   Coordinates every AI system in the game.
============================================================ */

export class AIService {

    private static initialized = false;

    private static world: World | null = null;

    /* ========================================================
       Initialize AI
    ======================================================== */

    static async initialize(world: World): Promise<void> {

        if (this.initialized) {

            console.log("AI already initialized.");

            return;

        }

        this.world = world;

        console.log("======================================");
        console.log("Initializing AI Systems...");
        console.log("======================================");

        await this.initializeKingdoms();

        await this.initializeHeroes();

        await this.initializeGuilds();

        await this.initializeMerchants();

        await this.initializeDiplomacy();

        await this.initializeEconomy();

        this.initialized = true;

        console.log("AI initialization complete.");

    }

    /* ========================================================
       Shutdown
    ======================================================== */

    static async shutdown(): Promise<void> {

        if (!this.initialized) {

            return;

        }

        console.log("Stopping AI...");

        this.world = null;

        this.initialized = false;

    }

    /* ========================================================
       World Tick

       Called every simulation cycle.
    ======================================================== */

    static async update(): Promise<void> {

        if (!this.initialized || !this.world) {

            return;

        }

        await this.updateKingdoms();

        await this.updateHeroes();

        await this.updateGuilds();

        await this.updateEconomy();

        await this.updateDiplomacy();

        await this.updateNPCs();

    }

    /* ========================================================
       Kingdom AI
    ======================================================== */

    private static async initializeKingdoms(): Promise<void> {

        console.log("Loading Kingdom AI...");

    }

    private static async updateKingdoms(): Promise<void> {

        if (!this.world) return;

        for (const kingdom of this.world.kingdoms) {

            /*
                Future:

                - recruit armies
                - construct buildings
                - attack enemies
                - expand territory
                - gather resources
            */

        }

    }

    /* ========================================================
       Hero AI
    ======================================================== */

    private static async initializeHeroes(): Promise<void> {

        console.log("Loading Hero AI...");

    }

    private static async updateHeroes(): Promise<void> {

        if (!this.world) return;

        /*
            Future

            Heroes

            - travel
            - train
            - explore
            - level up
            - complete quests
        */

    }

    /* ========================================================
       Guild AI
    ======================================================== */

    private static async initializeGuilds(): Promise<void> {

        console.log("Loading Guild AI...");

    }

    private static async updateGuilds(): Promise<void> {

        if (!this.world) return;

    }

    /* ========================================================
       Merchant AI
    ======================================================== */

    private static async initializeMerchants(): Promise<void> {

        console.log("Loading Merchant AI...");

    }

    /* ========================================================
       Economy AI
    ======================================================== */

    private static async initializeEconomy(): Promise<void> {

        console.log("Loading Economy AI...");

    }

    private static async updateEconomy(): Promise<void> {

        if (!this.world) return;

    }

    /* ========================================================
       Diplomacy AI
    ======================================================== */

    private static async initializeDiplomacy(): Promise<void> {

        console.log("Loading Diplomacy AI...");

    }

    private static async updateDiplomacy(): Promise<void> {

        if (!this.world) return;

    }

    /* ========================================================
       NPC AI
    ======================================================== */

    private static async updateNPCs(): Promise<void> {

        if (!this.world) return;

    }

    /* ========================================================
       Helpers
    ======================================================== */

    static isInitialized(): boolean {

        return this.initialized;

    }

    static getWorld(): World | null {

        return this.world;

    }

}