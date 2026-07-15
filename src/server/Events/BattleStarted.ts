import { randomUUID } from "node:crypto";

/* ============================================================
   Battle Started Event
============================================================ */

export const BATTLE_STARTED = "battle_started" as const;

/* ============================================================
   Battle Started Event
============================================================ */

export interface BattleStarted {
    /**
     * Event type identifier.
     */
    type: typeof BATTLE_STARTED;

    /**
     * Unique event ID.
     */
    eventId: string;

    /**
     * Unique battle ID.
     */
    battleId: string;

    /**
     * Attacking player.
     */
    attackerId: string;

    attackerName: string;

    /**
     * Defending player.
     */
    defenderId: string;

    defenderName: string;

    /**
     * Kingdom where the battle takes place.
     */
    kingdomId: string;

    /**
     * Optional kingdom name.
     */
    kingdomName?: string;

    /**
     * Tile or region.
     */
    location: string;

    /**
     * World coordinates.
     */
    x?: number;

    y?: number;

    /**
     * Number of attacking troops.
     */
    attackerArmy: number;

    /**
     * Number of defending troops.
     */
    defenderArmy: number;

    /**
     * Hero leading the attackers.
     */
    attackerHeroId?: string;

    attackerHeroName?: string;

    /**
     * Hero leading the defenders.
     */
    defenderHeroId?: string;

    defenderHeroName?: string;

    /**
     * Battle start timestamp.
     */
    timestamp: number;
}

/* ============================================================
   Factory
============================================================ */

export interface CreateBattleStartedOptions {
    battleId: string;

    attackerId: string;
    attackerName: string;

    defenderId: string;
    defenderName: string;

    kingdomId: string;
    kingdomName?: string;

    location: string;

    x?: number;
    y?: number;

    attackerArmy: number;
    defenderArmy: number;

    attackerHeroId?: string;
    attackerHeroName?: string;

    defenderHeroId?: string;
    defenderHeroName?: string;
}

export function createBattleStarted(
    options: CreateBattleStartedOptions
): BattleStarted {
    return {
        type: BATTLE_STARTED,

        eventId: randomUUID(),

        battleId: options.battleId,

        attackerId: options.attackerId,
        attackerName: options.attackerName,

        defenderId: options.defenderId,
        defenderName: options.defenderName,

        kingdomId: options.kingdomId,
        kingdomName: options.kingdomName,

        location: options.location,

        x: options.x,
        y: options.y,

        attackerArmy: options.attackerArmy,
        defenderArmy: options.defenderArmy,

        attackerHeroId: options.attackerHeroId,
        attackerHeroName: options.attackerHeroName,

        defenderHeroId: options.defenderHeroId,
        defenderHeroName: options.defenderHeroName,

        timestamp: Date.now(),
    };
}

/* ============================================================
   Type Guard
============================================================ */

export function isBattleStarted(
    value: unknown
): value is BattleStarted {
    return (
        typeof value === "object" &&
        value !== null &&
        (value as BattleStarted).type === BATTLE_STARTED
    );
}