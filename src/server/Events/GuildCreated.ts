import { randomUUID } from "node:crypto";

/* ============================================================
   Guild Created Event
============================================================ */

export const GUILD_CREATED = "guild_created" as const;

/* ============================================================
   Guild Created Event
============================================================ */

export interface GuildCreated {
    /**
     * Event type identifier.
     */
    type: typeof GUILD_CREATED;

    /**
     * Unique event ID.
     */
    eventId: string;

    /**
     * Guild information.
     */
    guildId: string;

    guildName: string;

    /**
     * Optional guild metadata.
     */
    guildTag?: string;

    description?: string;

    banner?: string;

    /**
     * Founder information.
     */
    founderId: string;

    founderName: string;

    /**
     * Kingdom the guild belongs to.
     */
    kingdomId: string;

    kingdomName?: string;

    /**
     * Initial guild statistics.
     */
    memberCount: number;

    maxMembers: number;

    guildLevel: number;

    guildPower: number;

    guildTreasury: number;

    /**
     * Headquarters.
     */
    headquartersCityId?: string;

    headquartersCityName?: string;

    headquartersLocation?: string;

    x?: number;

    y?: number;

    /**
     * Whether recruitment is open.
     */
    recruitmentOpen: boolean;

    /**
     * Guild creation time.
     */
    createdAt: number;

    /**
     * Event timestamp.
     */
    timestamp: number;
}

/* ============================================================
   Factory Options
============================================================ */

export interface CreateGuildCreatedOptions {
    guildId: string;

    guildName: string;

    guildTag?: string;

    description?: string;

    banner?: string;

    founderId: string;

    founderName: string;

    kingdomId: string;

    kingdomName?: string;

    memberCount?: number;

    maxMembers?: number;

    guildLevel?: number;

    guildPower?: number;

    guildTreasury?: number;

    headquartersCityId?: string;

    headquartersCityName?: string;

    headquartersLocation?: string;

    x?: number;

    y?: number;

    recruitmentOpen?: boolean;

    createdAt?: number;
}

/* ============================================================
   Factory
============================================================ */

export function createGuildCreated(
    options: CreateGuildCreatedOptions
): GuildCreated {
    const createdAt = options.createdAt ?? Date.now();

    return {
        type: GUILD_CREATED,

        eventId: randomUUID(),

        guildId: options.guildId,

        guildName: options.guildName,

        guildTag: options.guildTag,

        description: options.description,

        banner: options.banner,

        founderId: options.founderId,

        founderName: options.founderName,

        kingdomId: options.kingdomId,

        kingdomName: options.kingdomName,

        memberCount: options.memberCount ?? 1,

        maxMembers: options.maxMembers ?? 25,

        guildLevel: options.guildLevel ?? 1,

        guildPower: options.guildPower ?? 0,

        guildTreasury: options.guildTreasury ?? 0,

        headquartersCityId: options.headquartersCityId,

        headquartersCityName: options.headquartersCityName,

        headquartersLocation: options.headquartersLocation,

        x: options.x,

        y: options.y,

        recruitmentOpen: options.recruitmentOpen ?? true,

        createdAt,

        timestamp: Date.now(),
    };
}

/* ============================================================
   Type Guard
============================================================ */

export function isGuildCreated(
    value: unknown
): value is GuildCreated {
    return (
        typeof value === "object" &&
        value !== null &&
        (value as GuildCreated).type === GUILD_CREATED
    );
}