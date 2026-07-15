import { randomUUID } from "node:crypto";

/* ============================================================
   Daily Reset Event
============================================================ */

export const DAILY_RESET = "daily_reset" as const;

/* ============================================================
   Daily Reset Event
============================================================ */

export interface DailyReset {
    /**
     * Event type identifier.
     */
    type: typeof DAILY_RESET;

    /**
     * Unique event ID.
     */
    eventId: string;

    /**
     * Current in-game day.
     */
    day: number;

    /**
     * Age of the world in days.
     */
    worldAge: number;

    /**
     * World statistics.
     */
    activePlayers: number;

    totalPlayers: number;

    kingdoms: number;

    guilds: number;

    heroes: number;

    cities: number;

    /**
     * Economy snapshot.
     */
    totalGold: number;

    totalFood: number;

    totalWood: number;

    totalStone: number;

    totalMana: number;

    /**
     * Daily activity.
     */
    battlesFought: number;

    kingdomsCaptured: number;

    guildsCreated: number;

    heroesLeveled: number;

    researchCompleted: number;

    tradesCompleted: number;

    questsCompleted: number;

    /**
     * World status.
     */
    season?: string;

    weather?: string;

    /**
     * Optional reset summary.
     */
    summary?: string;

    /**
     * Time the reset occurred.
     */
    resetAt: number;

    /**
     * Event timestamp.
     */
    timestamp: number;
}

/* ============================================================
   Factory Options
============================================================ */

export interface CreateDailyResetOptions {
    day: number;

    worldAge: number;

    activePlayers: number;

    totalPlayers?: number;

    kingdoms: number;

    guilds: number;

    heroes?: number;

    cities?: number;

    totalGold?: number;

    totalFood?: number;

    totalWood?: number;

    totalStone?: number;

    totalMana?: number;

    battlesFought?: number;

    kingdomsCaptured?: number;

    guildsCreated?: number;

    heroesLeveled?: number;

    researchCompleted?: number;

    tradesCompleted?: number;

    questsCompleted?: number;

    season?: string;

    weather?: string;

    summary?: string;

    resetAt?: number;
}

/* ============================================================
   Factory
============================================================ */

export function createDailyReset(
    options: CreateDailyResetOptions
): DailyReset {
    const resetAt = options.resetAt ?? Date.now();

    return {
        type: DAILY_RESET,

        eventId: randomUUID(),

        day: options.day,

        worldAge: options.worldAge,

        activePlayers: options.activePlayers,

        totalPlayers: options.totalPlayers ?? options.activePlayers,

        kingdoms: options.kingdoms,

        guilds: options.guilds,

        heroes: options.heroes ?? 0,

        cities: options.cities ?? 0,

        totalGold: options.totalGold ?? 0,

        totalFood: options.totalFood ?? 0,

        totalWood: options.totalWood ?? 0,

        totalStone: options.totalStone ?? 0,

        totalMana: options.totalMana ?? 0,

        battlesFought: options.battlesFought ?? 0,

        kingdomsCaptured: options.kingdomsCaptured ?? 0,

        guildsCreated: options.guildsCreated ?? 0,

        heroesLeveled: options.heroesLeveled ?? 0,

        researchCompleted: options.researchCompleted ?? 0,

        tradesCompleted: options.tradesCompleted ?? 0,

        questsCompleted: options.questsCompleted ?? 0,

        season: options.season,

        weather: options.weather,

        summary: options.summary,

        resetAt,

        timestamp: Date.now(),
    };
}

/* ============================================================
   Type Guard
============================================================ */

export function isDailyReset(
    value: unknown
): value is DailyReset {
    return (
        typeof value === "object" &&
        value !== null &&
        (value as DailyReset).type === DAILY_RESET
    );
}