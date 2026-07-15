import { randomUUID } from "node:crypto";

/* ============================================================
   Battle Finished Event
============================================================ */

export const BATTLE_FINISHED = "battle_finished" as const;

/* ============================================================
   Battle Finished Event
============================================================ */

export interface BattleFinished {
    /**
     * Event type identifier.
     */
    type: typeof BATTLE_FINISHED;

    /**
     * Unique event ID.
     */
    eventId: string;

    /**
     * Battle identifier.
     */
    battleId: string;

    /**
     * Winning player.
     */
    winnerId: string;

    winnerName: string;

    /**
     * Losing player.
     */
    loserId: string;

    loserName: string;

    /**
     * Kingdom where the battle occurred.
     */
    kingdomId: string;

    kingdomName?: string;

    /**
     * Battle location.
     */
    location: string;

    /**
     * Optional world coordinates.
     */
    x?: number;

    y?: number;

    /**
     * Heroes involved.
     */
    winnerHeroId?: string;

    winnerHeroName?: string;

    loserHeroId?: string;

    loserHeroName?: string;

    /**
     * Army sizes before battle.
     */
    winnerArmyStart: number;

    loserArmyStart: number;

    /**
     * Survivors after battle.
     */
    winnerArmyRemaining: number;

    loserArmyRemaining: number;

    /**
     * Casualties.
     */
    troopsLostWinner: number;

    troopsLostLoser: number;

    /**
     * Rewards.
     */
    resourcesCaptured: number;

    experienceAwarded: number;

    honorAwarded: number;

    goldLooted?: number;

    /**
     * Territory changes.
     */
    kingdomCaptured: boolean;

    conqueredKingdomId?: string;

    conqueredKingdomName?: string;

    /**
     * Battle duration in seconds.
     */
    duration: number;

    /**
     * Event timestamp.
     */
    timestamp: number;
}

/* ============================================================
   Factory Options
============================================================ */

export interface CreateBattleFinishedOptions {
    battleId: string;

    winnerId: string;
    winnerName: string;

    loserId: string;
    loserName: string;

    kingdomId: string;
    kingdomName?: string;

    location: string;

    x?: number;
    y?: number;

    winnerHeroId?: string;
    winnerHeroName?: string;

    loserHeroId?: string;
    loserHeroName?: string;

    winnerArmyStart: number;
    loserArmyStart: number;

    winnerArmyRemaining: number;
    loserArmyRemaining: number;

    troopsLostWinner: number;
    troopsLostLoser: number;

    resourcesCaptured: number;

    experienceAwarded: number;

    honorAwarded: number;

    goldLooted?: number;

    kingdomCaptured?: boolean;

    conqueredKingdomId?: string;

    conqueredKingdomName?: string;

    duration: number;
}

/* ============================================================
   Factory
============================================================ */

export function createBattleFinished(
    options: CreateBattleFinishedOptions
): BattleFinished {
    return {
        type: BATTLE_FINISHED,

        eventId: randomUUID(),

        battleId: options.battleId,

        winnerId: options.winnerId,
        winnerName: options.winnerName,

        loserId: options.loserId,
        loserName: options.loserName,

        kingdomId: options.kingdomId,
        kingdomName: options.kingdomName,

        location: options.location,

        x: options.x,
        y: options.y,

        winnerHeroId: options.winnerHeroId,
        winnerHeroName: options.winnerHeroName,

        loserHeroId: options.loserHeroId,
        loserHeroName: options.loserHeroName,

        winnerArmyStart: options.winnerArmyStart,
        loserArmyStart: options.loserArmyStart,

        winnerArmyRemaining: options.winnerArmyRemaining,
        loserArmyRemaining: options.loserArmyRemaining,

        troopsLostWinner: options.troopsLostWinner,
        troopsLostLoser: options.troopsLostLoser,

        resourcesCaptured: options.resourcesCaptured,

        experienceAwarded: options.experienceAwarded,

        honorAwarded: options.honorAwarded,

        goldLooted: options.goldLooted,

        kingdomCaptured: options.kingdomCaptured ?? false,

        conqueredKingdomId: options.conqueredKingdomId,

        conqueredKingdomName: options.conqueredKingdomName,

        duration: options.duration,

        timestamp: Date.now(),
    };
}

/* ============================================================
   Type Guard
============================================================ */

export function isBattleFinished(
    value: unknown
): value is BattleFinished {
    return (
        typeof value === "object" &&
        value !== null &&
        (value as BattleFinished).type === BATTLE_FINISHED
    );
}