/**
 * ------------------------------------------------------------
 * recruit.ts
 * Realmrise: Genesis
 * Military Recruitment Command
 * ------------------------------------------------------------
 *
 * Handles:
 *  - Unit recruitment
 *  - Resource validation
 *  - Housing validation
 *  - Population requirements
 *  - Army updates
 *  - Recruitment queues
 *  - Experience rewards
 *  - Notifications
 *  - History
 *  - Achievements
 *
 * Part 1
 * ------------------------------------------------------------
 */

import { randomUUID } from "crypto";

import {
    CommandResult,
    Player,
    Kingdom,
    UnitType,
    ResourceCost,
    Notification
} from "../types";

import {
    getPlayer,
    savePlayer
} from "../database/players";

import {
    getKingdom,
    saveKingdom
} from "../database/kingdoms";

import {
    addExperience
} from "../services/experience";

import {
    unlockAchievements
} from "../services/achievements";

import {
    createNotification
} from "../services/notifications";

import {
    recordKingdomHistory
} from "../services/history";

import {
    logger
} from "../utils/logger";

/* ============================================================
   Constants
============================================================ */

const DEFAULT_RECRUIT_EXPERIENCE = 20;

const HISTORY_CATEGORY = "military";

const RECRUITMENT_TIME_PER_UNIT = 60 * 1000;

/* ============================================================
   Unit Definitions
============================================================ */

const UNIT_COSTS: Record<UnitType, ResourceCost> = {

    militia: {
        gold: 10,
        food: 5,
        wood: 0,
        stone: 0
    },

    archer: {
        gold: 20,
        food: 8,
        wood: 10,
        stone: 0
    },

    spearman: {
        gold: 25,
        food: 10,
        wood: 5,
        stone: 0
    },

    swordsman: {
        gold: 40,
        food: 15,
        wood: 0,
        stone: 10
    },

    cavalry: {
        gold: 100,
        food: 40,
        wood: 20,
        stone: 0
    },

    knight: {
        gold: 150,
        food: 60,
        wood: 30,
        stone: 20
    },

    mage: {
        gold: 200,
        food: 50,
        wood: 0,
        stone: 50
    }

};

/* ============================================================
   Helper Functions
============================================================ */

function calculateCost(
    unitType: UnitType,
    amount: number
): ResourceCost {

    const base = UNIT_COSTS[unitType];

    return {
        gold: base.gold * amount,
        food: base.food * amount,
        wood: base.wood * amount,
        stone: base.stone * amount
    };
}

function hasEnoughResources(
    kingdom: Kingdom,
    cost: ResourceCost
): boolean {

    return (
        kingdom.gold >= cost.gold &&
        kingdom.food >= cost.food &&
        kingdom.wood >= cost.wood &&
        kingdom.stone >= cost.stone
    );
}

function deductResources(
    kingdom: Kingdom,
    cost: ResourceCost
): void {

    kingdom.gold -= cost.gold;
    kingdom.food -= cost.food;
    kingdom.wood -= cost.wood;
    kingdom.stone -= cost.stone;
}

function hasEnoughPopulation(
    kingdom: Kingdom,
    amount: number
): boolean {

    return kingdom.population >= amount;
}

function hasEnoughHousing(
    kingdom: Kingdom,
    amount: number
): boolean {

    return (
        kingdom.population +
        amount <=
        kingdom.populationCapacity
    );
}

/* ============================================================
   Main Command
============================================================ */

export async function recruitUnits(
    playerId: string,
    unitType: UnitType,
    amount: number
): Promise<CommandResult> {

    try {

        if (amount <= 0) {
            return {
                success: false,
                message: "Recruitment amount must be greater than zero."
            };
        }

        const player = await getPlayer(playerId);

        if (!player) {
            return {
                success: false,
                message: "Player not found."
            };
        }

        if (!player.kingdomId) {
            return {
                success: false,
                message: "Player is not a member of a kingdom."
            };
        }

        const kingdom = await getKingdom(player.kingdomId);

        if (!kingdom) {
            return {
                success: false,
                message: "Kingdom not found."
            };
        }

        const cost = calculateCost(
            unitType,
            amount
        );

                /* ----------------------------------------------------
           Validation
        ---------------------------------------------------- */

        if (
            !hasEnoughResources(
                kingdom,
                cost
            )
        ) {
            return {
                success: false,
                message:
                    "Your kingdom does not have enough resources."
            };
        }

        if (
            !hasEnoughPopulation(
                kingdom,
                amount
            )
        ) {
            return {
                success: false,
                message:
                    "Your kingdom does not have enough available population."
            };
        }

        if (
            !hasEnoughHousing(
                kingdom,
                amount
            )
        ) {
            return {
                success: false,
                message:
                    "Your kingdom does not have enough housing capacity."
            };
        }

        /* ----------------------------------------------------
           Deduct Resources
        ---------------------------------------------------- */

        deductResources(
            kingdom,
            cost
        );

        /* ----------------------------------------------------
           Initialize Recruitment Queue
        ---------------------------------------------------- */

        kingdom.recruitmentQueue ??= [];

        const now = Date.now();

        const completesAt =
            now +
            amount *
            RECRUITMENT_TIME_PER_UNIT;

        kingdom.recruitmentQueue.push({
            id: randomUUID(),
            unitType,
            amount,
            startedAt: now,
            completesAt,
            status: "training"
        });

        /* ----------------------------------------------------
           Reserve Population
        ---------------------------------------------------- */

        kingdom.population -= amount;

        /* ----------------------------------------------------
           Economy Statistics
        ---------------------------------------------------- */

        kingdom.economy ??= {
            totalGoldSpent: 0,
            totalWoodSpent: 0,
            totalStoneSpent: 0,
            totalFoodSpent: 0
        };

        kingdom.economy.totalGoldSpent += cost.gold;
        kingdom.economy.totalWoodSpent += cost.wood;
        kingdom.economy.totalStoneSpent += cost.stone;
        kingdom.economy.totalFoodSpent += cost.food;

        /* ----------------------------------------------------
           Kingdom Statistics
        ---------------------------------------------------- */

        kingdom.statistics ??= {
            unitsRecruited: 0,
            battlesWon: 0,
            battlesLost: 0,
            buildingsConstructed: 0,
            technologiesResearched: 0
        };

        kingdom.statistics.unitsRecruited += amount;

        /* ----------------------------------------------------
           Player Statistics
        ---------------------------------------------------- */

        player.statistics ??= {
            unitsRecruited: 0,
            battlesWon: 0,
            questsCompleted: 0,
            votesCast: 0
        };

        player.statistics.unitsRecruited += amount;

        /* ----------------------------------------------------
           Award Experience
        ---------------------------------------------------- */

        await addExperience(
            player.id,
            DEFAULT_RECRUIT_EXPERIENCE * amount
        );

                /* ----------------------------------------------------
           Record Kingdom History
        ---------------------------------------------------- */

        await recordKingdomHistory(
            kingdom.id,
            {
                id: randomUUID(),
                category: HISTORY_CATEGORY,
                title: "Military Recruitment",
                description:
                    `${player.username} started recruiting ${amount} ${unitType}${amount === 1 ? "" : "s"}.`,
                createdAt: now
            }
        );

        /* ----------------------------------------------------
           Player Activity Feed
        ---------------------------------------------------- */

        player.activity ??= [];

        player.activity.unshift({
            id: randomUUID(),
            type: "recruitment",
            title: "Units Recruited",
            description:
                `Started recruiting ${amount} ${unitType}${amount === 1 ? "" : "s"}.`,
            timestamp: now
        });

        if (player.activity.length > 200) {
            player.activity.length = 200;
        }

        /* ----------------------------------------------------
           Kingdom Activity Feed
        ---------------------------------------------------- */

        kingdom.activity ??= [];

        kingdom.activity.unshift({
            id: randomUUID(),
            type: "recruitment",
            title: "Military Expansion",
            description:
                `${amount} ${unitType}${amount === 1 ? "" : "s"} entered military training.`,
            timestamp: now
        });

        if (kingdom.activity.length > 500) {
            kingdom.activity.length = 500;
        }

        /* ----------------------------------------------------
           Notification
        ---------------------------------------------------- */

        const notification: Notification = {
            id: randomUUID(),
            playerId: player.id,
            type: "military",
            title: "Recruitment Started",
            message:
                `${amount} ${unitType}${amount === 1 ? "" : "s"} are now being trained.\n\n` +
                `Training completes at ${new Date(completesAt).toLocaleString()}.`,
            read: false,
            createdAt: now
        };

        await createNotification(notification);

        /* ----------------------------------------------------
           Achievement Hooks
        ---------------------------------------------------- */

        await unlockAchievements(
            player.id,
            {
                trigger: "units_recruited",
                unitType,
                amount
            }
        );

                /* ----------------------------------------------------
           Initialize Army Structure
        ---------------------------------------------------- */

        kingdom.army ??= {
            militia: 0,
            archer: 0,
            spearman: 0,
            swordsman: 0,
            cavalry: 0,
            knight: 0,
            mage: 0
        };

        /* ----------------------------------------------------
           Recruitment Metrics
        ---------------------------------------------------- */

        kingdom.metrics ??= {
            commandsExecuted: 0,
            unitsQueued: 0,
            unitsCompleted: 0,
            technologiesStarted: 0,
            technologiesCompleted: 0
        };

        kingdom.metrics.commandsExecuted++;
        kingdom.metrics.unitsQueued += amount;

        /* ----------------------------------------------------
           Save Changes
        ---------------------------------------------------- */

        await saveKingdom(kingdom);

        await savePlayer(player);

        /* ----------------------------------------------------
           Log Success
        ---------------------------------------------------- */

        logger.info(
            `[Recruitment] ${player.username} queued ${amount} ${unitType}${amount === 1 ? "" : "s"} for kingdom ${kingdom.id}.`
        );

        /* ----------------------------------------------------
           Return Success
        ---------------------------------------------------- */

        return {
            success: true,
            message:
                `${amount} ${unitType}${amount === 1 ? "" : "s"} successfully entered military training.`,
            data: {
                unitType,
                amount,
                startedAt: now,
                completesAt,
                durationMilliseconds:
                    amount * RECRUITMENT_TIME_PER_UNIT,
                resourcesRemaining: {
                    gold: kingdom.gold,
                    food: kingdom.food,
                    wood: kingdom.wood,
                    stone: kingdom.stone
                },
                queueLength:
                    kingdom.recruitmentQueue.length
            }
        };

    } catch (error) {

        logger.error(
            "[RecruitUnits]",
            error
        );

        return {
            success: false,
            message:
                "An unexpected error occurred while recruiting units.",
            error:
                error instanceof Error
                    ? error.message
                    : String(error)
        };
    }
}