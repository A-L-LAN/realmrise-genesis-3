/**
 * ---------------------------------------------------------
 * Realmrise: Genesis
 * World Simulation Engine
 * ---------------------------------------------------------
 * Simulates one complete in-game day.
 * This engine is executed by the scheduler.
 * ---------------------------------------------------------
 */

export interface WorldState {
    day: number;
    cities: number;
    forests: number;
    dragons: number;
    merchants: number;
    quests: number;
    history: string[];
}

export default class WorldSimulation {

    constructor(
        private readonly world: WorldState
    ) {}

    /**
     * Runs one complete world simulation cycle.
     */
    public simulateWorld(): WorldState {

        console.log("");
        console.log("==================================");
        console.log(` Realmrise Simulation - Day ${this.world.day}`);
        console.log("==================================");

        this.expandCities();
        this.spreadForests();
        this.moveDragons();
        this.generateQuest();
        this.spawnMerchant();
        this.resolveRandomEvents();
        this.advanceDay();

        this.trimHistory();

        console.log("");
        console.log("Simulation Complete");
        console.table({
            Day: this.world.day,
            Cities: this.world.cities,
            Forests: this.world.forests,
            Dragons: this.world.dragons,
            Merchants: this.world.merchants,
            Quests: this.world.quests,
        });
        console.log("");

        return this.world;

    }

    //--------------------------------------------------------
    // Cities
    //--------------------------------------------------------

    private expandCities(): void {

        const growth = this.random(1, 3);

        this.world.cities += growth;

        this.log(
            `🏙 ${growth} city(ies) expanded.`
        );

    }

    //--------------------------------------------------------
    // Forest Growth
    //--------------------------------------------------------

    private spreadForests(): void {

        const growth = this.random(2, 6);

        this.world.forests += growth;

        this.log(
            `🌲 Forests expanded by ${growth} tile(s).`
        );

    }

    //--------------------------------------------------------
    // Dragons
    //--------------------------------------------------------

    private moveDragons(): void {

        if (this.world.dragons <= 0) {

            this.log(
                "🐉 No dragons roam the world."
            );

            return;

        }

        const moved = this.random(
            1,
            this.world.dragons
        );

        this.log(
            `🐉 ${moved} dragon(s) migrated.`
        );

    }

    //--------------------------------------------------------
    // Quest Generation
    //--------------------------------------------------------

    private generateQuest(): void {

        const quests = [

            "Explore the Forgotten Temple",

            "Defeat the Mountain Dragon",

            "Escort Merchant Caravan",

            "Repair the Ancient Bridge",

            "Investigate the Crystal Cave",

            "Recover the Lost Crown",

            "Protect the Harvest Festival",

            "Destroy the Goblin Camp",

            "Clear the Haunted Forest",

            "Escort Royal Supplies"

        ];

        const quest =
            quests[
                this.random(
                    0,
                    quests.length - 1
                )
            ];

        this.world.quests++;

        this.log(
            `📜 New Quest: ${quest}`
        );

    }

    //--------------------------------------------------------
    // Merchants
    //--------------------------------------------------------

    private spawnMerchant(): void {

        if (Math.random() < 0.75) {

            this.world.merchants++;

            this.log(
                "🛒 A travelling merchant arrived."
            );

        }

    }

    //--------------------------------------------------------
    // Random World Events
    //--------------------------------------------------------

    private resolveRandomEvents(): void {

        const roll = Math.random();

        if (roll < 0.10) {

            this.world.dragons++;

            this.log(
                "🔥 A dragon has awakened."
            );

        } else if (
            roll < 0.20 &&
            this.world.dragons > 0
        ) {

            this.world.dragons--;

            this.log(
                "⚔ Heroes defeated a dragon."
            );

        } else if (roll < 0.30) {

            this.world.forests = Math.max(
                0,
                this.world.forests - this.random(2, 8)
            );

            this.log(
                "🔥 Wildfire damaged nearby forests."
            );

        } else if (roll < 0.40) {

            this.world.cities++;

            this.log(
                "🏰 A new kingdom was founded."
            );

        }

    }

    //--------------------------------------------------------
    // Advance Time
    //--------------------------------------------------------

    private advanceDay(): void {

        this.world.day++;

    }

    //--------------------------------------------------------
    // Keep History Manageable
    //--------------------------------------------------------

    private trimHistory(): void {

        while (this.world.history.length > 100) {

            this.world.history.shift();

        }

    }

    //--------------------------------------------------------
    // Logging
    //--------------------------------------------------------

    private log(
        message: string
    ): void {

        console.log(message);

        this.world.history.push(message);

    }

    //--------------------------------------------------------
    // Random Helper
    //--------------------------------------------------------

    private random(
        min: number,
        max: number
    ): number {

        return (
            Math.floor(
                Math.random() * (max - min + 1)
            ) + min
        );

    }

}

/**
 * ---------------------------------------------------------
 * Convenience helper used by the scheduler.
 * ---------------------------------------------------------
 */

export function runWorldSimulation(
    world: WorldState
): WorldState {

    const simulation =
        new WorldSimulation(world);

    return simulation.simulateWorld();

}