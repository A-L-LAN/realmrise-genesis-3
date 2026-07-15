import { randomUUID } from "node:crypto";

/* ============================================================
   Player Joined Event
============================================================ */

export const PLAYER_JOINED = "player_joined" as const;

/* ============================================================
   Player Joined Event
============================================================ */

export interface PlayerJoined {
    /**
     * Event type identifier.
     */
    type: typeof PLAYER_JOINED;

    /**
     * Unique event ID.
     */
    eventId: string;

    /**
     * Player information.
     */
    playerId: string;

    username: string;

    displayName?: string;

    /**
     * Reddit username (optional).
     */
    redditUsername?: string;

    /**
     * Kingdom joined.
     */
    kingdomId: string;

    kingdomName?: string;

    /**
     * Starting city.
     */
    cityId?: string;

    cityName?: string;

    /**
     * Spawn location.
     */
    spawnLocation?: string;

    x?: number;

    y?: number;

    /**
     * Initial player information.
     */
    level: number;

    power: number;

    reputation: number;

    /**
     * Whether this is the player's first time joining
     * the world.
     */
    isNewPlayer: boolean;

    /**
     * Account creation timestamp.
     */
    joinedAt: number;

    /**
     * Event creation timestamp.
     */
    timestamp: number;
}

/* ============================================================
   Factory Options
============================================================ */

export interface CreatePlayerJoinedOptions {
    playerId: string;

    username: string;

    displayName?: string;

    redditUsername?: string;

    kingdomId: string;

    kingdomName?: string;

    cityId?: string;

    cityName?: string;

    spawnLocation?: string;

    x?: number;

    y?: number;

    level?: number;

    power?: number;

    reputation?: number;

    isNewPlayer?: boolean;

    joinedAt?: number;
}

/* ============================================================
   Factory
============================================================ */

export function createPlayerJoined(
    options: CreatePlayerJoinedOptions
): PlayerJoined {
    const joinedAt = options.joinedAt ?? Date.now();

    return {
        type: PLAYER_JOINED,

        eventId: randomUUID(),

        playerId: options.playerId,

        username: options.username,

        displayName: options.displayName,

        redditUsername: options.redditUsername,

        kingdomId: options.kingdomId,

        kingdomName: options.kingdomName,

        cityId: options.cityId,

        cityName: options.cityName,

        spawnLocation: options.spawnLocation,

        x: options.x,

        y: options.y,

        level: options.level ?? 1,

        power: options.power ?? 0,

        reputation: options.reputation ?? 0,

        isNewPlayer: options.isNewPlayer ?? true,

        joinedAt,

        timestamp: Date.now(),
    };
}

/* ============================================================
   Type Guard
============================================================ */

export function isPlayerJoined(
    value: unknown
): value is PlayerJoined {
    return (
        typeof value === "object" &&
        value !== null &&
        (value as PlayerJoined).type === PLAYER_JOINED
    );
}