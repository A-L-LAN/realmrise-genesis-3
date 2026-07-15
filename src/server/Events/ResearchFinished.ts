import { randomUUID } from "node:crypto";

/* ============================================================
   Research Finished Event
============================================================ */

export const RESEARCH_FINISHED = "research_finished" as const;

/* ============================================================
   Research Finished Event
============================================================ */

export interface ResearchFinished {
    /**
     * Event type identifier.
     */
    type: typeof RESEARCH_FINISHED;

    /**
     * Unique event ID.
     */
    eventId: string;

    /**
     * Player information.
     */
    playerId: string;

    playerName: string;

    /**
     * Optional kingdom information.
     */
    kingdomId?: string;

    kingdomName?: string;

    /**
     * Research information.
     */
    researchId: string;

    researchName: string;

    /**
     * Research category.
     * Examples:
     * Economy, Military, Magic, Engineering...
     */
    category?: string;

    /**
     * New research level.
     */
    level: number;

    /**
     * Previous level before completion.
     */
    previousLevel: number;

    /**
     * Research duration in seconds.
     */
    duration: number;

    /**
     * Total cost paid.
     */
    goldCost: number;

    woodCost: number;

    stoneCost: number;

    foodCost: number;

    manaCost?: number;

    /**
     * Rewards granted.
     */
    experienceAwarded: number;

    researchPointsAwarded: number;

    /**
     * Bonus unlocked after completion.
     */
    unlockedBonus?: string;

    /**
     * Whether this completed the research tree.
     */
    maxLevelReached: boolean;

    /**
     * Completion time.
     */
    completedAt: number;

    /**
     * Event timestamp.
     */
    timestamp: number;
}

/* ============================================================
   Factory Options
============================================================ */

export interface CreateResearchFinishedOptions {
    playerId: string;

    playerName: string;

    kingdomId?: string;

    kingdomName?: string;

    researchId: string;

    researchName: string;

    category?: string;

    level: number;

    previousLevel?: number;

    duration: number;

    goldCost?: number;

    woodCost?: number;

    stoneCost?: number;

    foodCost?: number;

    manaCost?: number;

    experienceAwarded?: number;

    researchPointsAwarded?: number;

    unlockedBonus?: string;

    maxLevelReached?: boolean;

    completedAt?: number;
}

/* ============================================================
   Factory
============================================================ */

export function createResearchFinished(
    options: CreateResearchFinishedOptions
): ResearchFinished {
    const completedAt = options.completedAt ?? Date.now();

    return {
        type: RESEARCH_FINISHED,

        eventId: randomUUID(),

        playerId: options.playerId,

        playerName: options.playerName,

        kingdomId: options.kingdomId,

        kingdomName: options.kingdomName,

        researchId: options.researchId,

        researchName: options.researchName,

        category: options.category,

        level: options.level,

        previousLevel: options.previousLevel ?? Math.max(0, options.level - 1),

        duration: options.duration,

        goldCost: options.goldCost ?? 0,

        woodCost: options.woodCost ?? 0,

        stoneCost: options.stoneCost ?? 0,

        foodCost: options.foodCost ?? 0,

        manaCost: options.manaCost,

        experienceAwarded: options.experienceAwarded ?? 0,

        researchPointsAwarded: options.researchPointsAwarded ?? 0,

        unlockedBonus: options.unlockedBonus,

        maxLevelReached: options.maxLevelReached ?? false,

        completedAt,

        timestamp: Date.now(),
    };
}

/* ============================================================
   Type Guard
============================================================ */

export function isResearchFinished(
    value: unknown
): value is ResearchFinished {
    return (
        typeof value === "object" &&
        value !== null &&
        (value as ResearchFinished).type === RESEARCH_FINISHED
    );
}