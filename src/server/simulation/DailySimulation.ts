import { WorldState } from "./WorldSimulation";

/**
 * Runs one in-game day of simulation.
 *
 * This function is called by the scheduler once every
 * real-world day.
 */
export function runDailySimulation(
    world: WorldState
): WorldState {

    console.log("");
    console.log("=================================");
    console.log(` Beginning Day ${world.day}`);
    console.log("=================================");

    //---------------------------------------
    // Advance Time
    //---------------------------------------

    world.day++;

    //---------------------------------------
    // Forest Growth
    //---------------------------------------

    if (Math.random() < 0.60) {

        const growth = randomBetween(1, 4);

        world.forests += growth;

        world.history.push(
            `Forests expanded by ${growth}.`
        );

    }

    //---------------------------------------
    // City Expansion
    //---------------------------------------

    if (Math.random() < 0.25) {

        world.cities++;

        world.history.push(
            "A new settlement became a city."
        );

    }

    //---------------------------------------
    // Merchant Activity
    //---------------------------------------

    if (Math.random() < 0.40) {

        const delta = randomBetween(-1, 1);

        world.merchants = Math.max(
            0,
            world.merchants + delta
        );

        if (delta > 0) {

            world.history.push(
                "A merchant caravan arrived."
            );

        } else if (delta < 0) {

            world.history.push(
                "A merchant caravan departed."
            );

        }

    }

    //---------------------------------------
    // Quest Generation
    //---------------------------------------

    const newQuests = randomBetween(0, 2);

    world.quests += newQuests;

    if (newQuests > 0) {

        world.history.push(
            `${newQuests} new quest(s) appeared.`
        );

    }

    //---------------------------------------
    // Dragon Activity
    //---------------------------------------

    const dragonRoll = Math.random();

    if (dragonRoll < 0.08) {

        world.dragons++;

        world.history.push(
            "A dragon has awakened."
        );

    } else if (
        dragonRoll > 0.96 &&
        world.dragons > 0
    ) {

        world.dragons--;

        world.history.push(
            "A dragon was defeated."
        );

    }

    //---------------------------------------
    // Trim History
    //---------------------------------------

    while (world.history.length > 100) {

        world.history.shift();

    }

    //---------------------------------------
    // Logging
    //---------------------------------------

    console.log("Simulation Complete");

    console.table({

        Day: world.day,

        Cities: world.cities,

        Forests: world.forests,

        Dragons: world.dragons,

        Merchants: world.merchants,

        Quests: world.quests,

    });

    console.log("");

    return world;

}

/**
 * Random integer helper.
 */
function randomBetween(
    min: number,
    max: number
): number {

    return (
        Math.floor(
            Math.random() * (max - min + 1)
        ) + min
    );

}