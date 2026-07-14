/**
 * ------------------------------------------------------------
 * research.ts
 * Realmrise: Genesis
 * Technology Research Command
 * ------------------------------------------------------------
 *
 * Handles:
 *  - Technology research
 *  - Cost validation
 *  - Dependency validation
 *  - Population requirements
 *  - Kingdom resource deduction
 *  - Experience rewards
 *  - Event logging
 *  - Achievement hooks
 *  - Notification hooks
 *  - Daily simulation integration
 *
 * Part 1
 * ------------------------------------------------------------
 */

import { randomUUID } from "crypto";

import {
    Kingdom,
    Technology,
    CommandResult,
    ResourceCost,
    KingdomTechnologyState,
    Notification,
    KingdomEvent
} from "../types";

import {
    getKingdom,
    saveKingdom
} from "../database/kingdoms";

import {
    getTechnology
} from "../database/technologies";

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
    queueWorldEvent
} from "../services/worldEvents";

import {
    calculateTechnologyResearchTime
} from "../utils/researchTime";

import {
    logger
} from "../utils/logger";

/* ============================================================
   Constants
============================================================ */

const MAX_TECH_LEVEL = 10;

const DEFAULT_RESEARCH_EXPERIENCE = 75;

const HISTORY_CATEGORY = "technology";

/* ============================================================
   Helper Functions
============================================================ */

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

function technologyAlreadyUnlocked(
    kingdom: Kingdom,
    technologyId: string
): boolean {
    return kingdom.technologies.some(
        tech =>
            tech.id === technologyId &&
            tech.completed
    );
}

function getTechnologyProgress(
    kingdom: Kingdom,
    technologyId: string
): KingdomTechnologyState | undefined {
    return kingdom.technologies.find(
        tech => tech.id === technologyId
    );
}

function hasRequiredTechnologies(
    kingdom: Kingdom,
    technology: Technology
): boolean {

    if (
        !technology.prerequisites ||
        technology.prerequisites.length === 0
    ) {
        return true;
    }

    return technology.prerequisites.every(req =>
        kingdom.technologies.some(
            tech =>
                tech.id === req &&
                tech.completed
        )
    );
}

function validatePopulation(
    kingdom: Kingdom,
    technology: Technology
): boolean {

    if (!technology.minimumPopulation) {
        return true;
    }

    return (
        kingdom.population >=
        technology.minimumPopulation
    );
}

function isResearchInProgress(
    kingdom: Kingdom
): boolean {

    return kingdom.technologies.some(
        tech =>
            !tech.completed &&
            tech.startedAt !== undefined
    );
}

function createResearchState(
    technology: Technology,
    durationHours: number
): KingdomTechnologyState {

    const now = Date.now();

    return {
        id: technology.id,
        level: 1,
        completed: false,
        startedAt: now,
        completesAt:
            now + durationHours * 60 * 60 * 1000
    };
}

/* ============================================================
   Main Command
============================================================ */

export async function researchTechnology(
    kingdomId: string,
    technologyId: string
): Promise<CommandResult> {

    try {

        /* ----------------------------------------------------
           Load Kingdom
        ---------------------------------------------------- */

        const kingdom = await getKingdom(kingdomId);

        if (!kingdom) {
            return {
                success: false,
                message: "Kingdom not found."
            };
        }

        /* ----------------------------------------------------
           Load Technology
        ---------------------------------------------------- */

        const technology = await getTechnology(
            technologyId
        );

        if (!technology) {
            return {
                success: false,
                message: "Technology does not exist."
            };
        }

        /* ----------------------------------------------------
           Validation
        ---------------------------------------------------- */

        if (
            technologyAlreadyUnlocked(
                kingdom,
                technology.id
            )
        ) {
            return {
                success: false,
                message:
                    "Technology has already been researched."
            };
        }

        if (isResearchInProgress(kingdom)) {
            return {
                success: false,
                message:
                    "Another technology is already being researched."
            };
        }

        if (
            !hasRequiredTechnologies(
                kingdom,
                technology
            )
        ) {
            return {
                success: false,
                message:
                    "Prerequisite technologies have not been completed."
            };
        }

        if (
            !validatePopulation(
                kingdom,
                technology
            )
        ) {
            return {
                success: false,
                message:
                    "Your population is too small to research this technology."
            };
        }

        if (
            !hasEnoughResources(
                kingdom,
                technology.cost
            )
        ) {
            return {
                success: false,
                message:
                    "Insufficient resources to begin research."
            };
        }

        /* ----------------------------------------------------
           Calculate Research Duration
        ---------------------------------------------------- */

        const duration =
            calculateTechnologyResearchTime(
                kingdom,
                technology
            );

        /* ----------------------------------------------------
           Deduct Resources
        ---------------------------------------------------- */

        deductResources(
            kingdom,
            technology.cost
        );

        /* ----------------------------------------------------
           Create Research Entry
        ---------------------------------------------------- */

        const research =
            createResearchState(
                technology,
                duration
            );

        kingdom.technologies.push(research);

                /* ----------------------------------------------------
           Award Experience
        ---------------------------------------------------- */

        await addExperience(
            kingdom.id,
            technology.experienceReward ??
                DEFAULT_RESEARCH_EXPERIENCE
        );

        /* ----------------------------------------------------
           Record Kingdom History
        ---------------------------------------------------- */

        await recordKingdomHistory(
            kingdom.id,
            {
                id: randomUUID(),
                category: HISTORY_CATEGORY,
                title: `Research Started: ${technology.name}`,
                description:
                    `${kingdom.name} has begun researching ` +
                    `${technology.name}. ` +
                    `Research will complete in ${duration} hour${duration === 1 ? "" : "s"}.`,
                createdAt: Date.now()
            }
        );

        /* ----------------------------------------------------
           Queue World Event
        ---------------------------------------------------- */

        await queueWorldEvent({
            id: randomUUID(),
            kingdomId: kingdom.id,
            type: "technologyResearchStarted",
            title: `${kingdom.name} begins researching ${technology.name}`,
            description:
                `${kingdom.name} has invested resources into ` +
                `${technology.name}. Scholars and engineers are now at work.`,
            createdAt: Date.now()
        });

        /* ----------------------------------------------------
           Notification
        ---------------------------------------------------- */

        const notification: Notification = {
            id: randomUUID(),
            kingdomId: kingdom.id,
            type: "technology",
            title: "Research Started",
            message:
                `${technology.name} research has begun.\n\n` +
                `Estimated completion: ${duration} hour${duration === 1 ? "" : "s"}.`,
            read: false,
            createdAt: Date.now()
        };

        await createNotification(notification);

        /* ----------------------------------------------------
           Achievement Hooks
        ---------------------------------------------------- */

        await unlockAchievements(
            kingdom.id,
            {
                trigger: "technology_started",
                technologyId: technology.id
            }
        );

        /* ----------------------------------------------------
           Statistics
        ---------------------------------------------------- */

        kingdom.statistics ??= {
            technologiesResearched: 0,
            technologiesStarted: 0,
            totalResearchHours: 0,
            battlesWon: 0,
            battlesLost: 0,
            buildingsConstructed: 0
        };

        kingdom.statistics.technologiesStarted++;

        kingdom.statistics.totalResearchHours += duration;

        /* ----------------------------------------------------
           Activity Feed
        ---------------------------------------------------- */

        kingdom.activity ??= [];

        kingdom.activity.unshift({
            id: randomUUID(),
            type: "technology",
            title: "Research Started",
            description:
                `${technology.name} research has begun.`,
            timestamp: Date.now()
        });

        if (kingdom.activity.length > 200) {
            kingdom.activity.length = 200;
        }

        /* ----------------------------------------------------
           Research Queue Metadata
        ---------------------------------------------------- */

        kingdom.currentResearch = {
            technologyId: technology.id,
            startedAt: research.startedAt!,
            completesAt: research.completesAt!,
            durationHours: duration
        };

                /* ----------------------------------------------------
           Research Timeline
        ---------------------------------------------------- */

        kingdom.timeline ??= [];

        kingdom.timeline.push({
            id: randomUUID(),
            type: "research",
            title: `${technology.name} Research Began`,
            description:
                `${kingdom.name} has committed its scholars to researching ` +
                `${technology.name}.`,
            timestamp: Date.now()
        });

        /* ----------------------------------------------------
           Economy Statistics
        ---------------------------------------------------- */

        kingdom.economy ??= {
            totalGoldSpent: 0,
            totalWoodSpent: 0,
            totalStoneSpent: 0,
            totalFoodSpent: 0
        };

        kingdom.economy.totalGoldSpent += technology.cost.gold;
        kingdom.economy.totalWoodSpent += technology.cost.wood;
        kingdom.economy.totalStoneSpent += technology.cost.stone;
        kingdom.economy.totalFoodSpent += technology.cost.food;

        /* ----------------------------------------------------
           Research Log
        ---------------------------------------------------- */

        kingdom.researchLog ??= [];

        kingdom.researchLog.unshift({
            id: randomUUID(),
            technologyId: technology.id,
            technologyName: technology.name,
            startedAt: research.startedAt!,
            completesAt: research.completesAt!,
            estimatedHours: duration,
            completed: false
        });

        if (kingdom.researchLog.length > 500) {
            kingdom.researchLog.length = 500;
        }

        /* ----------------------------------------------------
           Kingdom Modifiers
        ---------------------------------------------------- */

        kingdom.modifiers ??= [];

        if (technology.startModifier) {
            kingdom.modifiers.push({
                id: randomUUID(),
                source: technology.id,
                name: technology.startModifier.name,
                type: technology.startModifier.type,
                value: technology.startModifier.value,
                expiresAt: research.completesAt!
            });
        }

        /* ----------------------------------------------------
           Research Metrics
        ---------------------------------------------------- */

        kingdom.metrics ??= {
            commandsExecuted: 0,
            technologiesStarted: 0,
            technologiesCompleted: 0
        };

        kingdom.metrics.commandsExecuted++;
        kingdom.metrics.technologiesStarted++;

        /* ----------------------------------------------------
           Save Kingdom
        ---------------------------------------------------- */

        await saveKingdom(kingdom);

        /* ----------------------------------------------------
           Log Success
        ---------------------------------------------------- */

        logger.info(
            `[Research] ${kingdom.id} started research on ${technology.id}`
        );

        /* ----------------------------------------------------
           Return Success
        ---------------------------------------------------- */

        return {
            success: true,
            message:
                `${technology.name} research has started successfully.`,
            data: {
                technologyId: technology.id,
                technologyName: technology.name,
                durationHours: duration,
                startedAt: research.startedAt,
                completesAt: research.completesAt,
                remainingResources: {
                    gold: kingdom.gold,
                    wood: kingdom.wood,
                    stone: kingdom.stone,
                    food: kingdom.food
                }
            }
        };

    } catch (error) {

        logger.error(
            "[ResearchTechnology]",
            error
        );

        return {
            success: false,
            message:
                "An unexpected error occurred while starting research.",
            error:
                error instanceof Error
                    ? error.message
                    : String(error)
        };
    }
}