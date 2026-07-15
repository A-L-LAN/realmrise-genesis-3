import { randomUUID } from "node:crypto";

/* ============================================================
   Kingdom Captured Event
============================================================ */

export const KINGDOM_CAPTURED = "kingdom_captured" as const;

/* ============================================================
   Kingdom Captured Event
============================================================ */

export interface KingdomCaptured {
    /**
     * Event type identifier.
     */
    type: typeof KINGDOM_CAPTURED;

    /**
     * Unique event ID.
     */
    eventId: string;

    /**
     * Kingdom information.
     */
    kingdomId: string;

    kingdomName: string;

    /**
     * Previous ruler.
     */
    previousOwnerId: string;

    previousOwnerName?: string;

    /**
     * New ruler.
     */
    newOwnerId: string;

    newOwnerName?: string;

    /**
     * Player that dealt the final blow or
     * commanded the successful siege.
     */
    capturedBy: string;

    /**
     * Battle that resulted in the capture.
     */
    battleId?: string;

    /**
     * Guild responsible for the conquest.
     */
    guildId?: string;

    guildName?: string;

    /**
     * Kingdom statistics.
     */
    previousPopulation: number;

    remainingPopulation: number;

    previousPower: number;

    remainingPower: number;

    /**
     * Rewards earned.
     */
    goldCaptured: number;

    foodCaptured: number;

    woodCaptured: number;

    stoneCaptured: number;

    manaCaptured?: number;

    /**
     * Coordinates of the capital.
     */
    capitalCityId?: string;

    capitalCityName?: string;

    location?: string;

    x?: number;

    y?: number;

    /**
     * Whether the kingdom was completely eliminated.
     */
    kingdomDestroyed: boolean;

    /**
     * Number of territories now controlled
     * by the new owner.
     */
    territoriesControlled: number;

    /**
     * Capture time.
     */
    capturedAt: number;

    /**
     * Event timestamp.
     */
    timestamp: number;
}

/* ============================================================
   Factory Options
============================================================ */

export interface CreateKingdomCapturedOptions {
    kingdomId: string;

    kingdomName: string;

    previousOwnerId: string;

    previousOwnerName?: string;

    newOwnerId: string;

    newOwnerName?: string;

    capturedBy: string;

    battleId?: string;

    guildId?: string;

    guildName?: string;

    previousPopulation?: number;

    remainingPopulation?: number;

    previousPower?: number;

    remainingPower?: number;

    goldCaptured?: number;

    foodCaptured?: number;

    woodCaptured?: number;

    stoneCaptured?: number;

    manaCaptured?: number;

    capitalCityId?: string;

    capitalCityName?: string;

    location?: string;

    x?: number;

    y?: number;

    kingdomDestroyed?: boolean;

    territoriesControlled?: number;

    capturedAt?: number;
}

/* ============================================================
   Factory
============================================================ */

export function createKingdomCaptured(
    options: CreateKingdomCapturedOptions
): KingdomCaptured {
    const capturedAt = options.capturedAt ?? Date.now();

    return {
        type: KINGDOM_CAPTURED,

        eventId: randomUUID(),

        kingdomId: options.kingdomId,

        kingdomName: options.kingdomName,

        previousOwnerId: options.previousOwnerId,

        previousOwnerName: options.previousOwnerName,

        newOwnerId: options.newOwnerId,

        newOwnerName: options.newOwnerName,

        capturedBy: options.capturedBy,

        battleId: options.battleId,

        guildId: options.guildId,

        guildName: options.guildName,

        previousPopulation: options.previousPopulation ?? 0,

        remainingPopulation: options.remainingPopulation ?? 0,

        previousPower: options.previousPower ?? 0,

        remainingPower: options.remainingPower ?? 0,

        goldCaptured: options.goldCaptured ?? 0,

        foodCaptured: options.foodCaptured ?? 0,

        woodCaptured: options.woodCaptured ?? 0,

        stoneCaptured: options.stoneCaptured ?? 0,

        manaCaptured: options.manaCaptured,

        capitalCityId: options.capitalCityId,

        capitalCityName: options.capitalCityName,

        location: options.location,

        x: options.x,

        y: options.y,

        kingdomDestroyed: options.kingdomDestroyed ?? false,

        territoriesControlled: options.territoriesControlled ?? 1,

        capturedAt,

        timestamp: Date.now(),
    };
}

/* ============================================================
   Type Guard
============================================================ */

export function isKingdomCaptured(
    value: unknown
): value is KingdomCaptured {
    return (
        typeof value === "object" &&
        value !== null &&
        (value as KingdomCaptured).type === KINGDOM_CAPTURED
    );
}