import { randomUUID } from "node:crypto";

/* ============================================================
   Hero Leveled Event
============================================================ */

export const HERO_LEVELED = "hero_leveled" as const;

/* ============================================================
   Hero Leveled Event
============================================================ */

export interface HeroLeveled {
    /**
     * Event type identifier.
     */
    type: typeof HERO_LEVELED;

    /**
     * Unique event ID.
     */
    eventId: string;

    /**
     * Hero information.
     */
    heroId: string;

    heroName: string;

    /**
     * Hero class.
     * Examples:
     * Warrior, Mage, Archer, Assassin...
     */
    heroClass?: string;

    rarity?: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";

    /**
     * Hero owner.
     */
    ownerId: string;

    ownerName?: string;

    kingdomId?: string;

    kingdomName?: string;

    /**
     * Level progression.
     */
    previousLevel: number;

    newLevel: number;

    /**
     * Experience.
     */
    previousExperience: number;

    newExperience: number;

    experienceRequired: number;

    /**
     * Stat increases.
     */
    attackIncrease: number;

    defenseIncrease: number;

    healthIncrease: number;

    speedIncrease: number;

    intelligenceIncrease?: number;

    /**
     * Rewards unlocked.
     */
    skillUnlocked?: string;

    titleUnlocked?: string;

    rewardGold: number;

    rewardHonor: number;

    /**
     * Whether the hero reached maximum level.
     */
    maxLevelReached: boolean;

    /**
     * Time the hero leveled up.
     */
    leveledAt: number;

    /**
     * Event timestamp.
     */
    timestamp: number;
}

/* ============================================================
   Factory Options
============================================================ */

export interface CreateHeroLeveledOptions {
    heroId: string;

    heroName: string;

    heroClass?: string;

    rarity?: HeroLeveled["rarity"];

    ownerId: string;

    ownerName?: string;

    kingdomId?: string;

    kingdomName?: string;

    previousLevel: number;

    newLevel: number;

    previousExperience?: number;

    newExperience?: number;

    experienceRequired?: number;

    attackIncrease?: number;

    defenseIncrease?: number;

    healthIncrease?: number;

    speedIncrease?: number;

    intelligenceIncrease?: number;

    skillUnlocked?: string;

    titleUnlocked?: string;

    rewardGold?: number;

    rewardHonor?: number;

    maxLevelReached?: boolean;

    leveledAt?: number;
}

/* ============================================================
   Factory
============================================================ */

export function createHeroLeveled(
    options: CreateHeroLeveledOptions
): HeroLeveled {
    const leveledAt = options.leveledAt ?? Date.now();

    return {
        type: HERO_LEVELED,

        eventId: randomUUID(),

        heroId: options.heroId,

        heroName: options.heroName,

        heroClass: options.heroClass,

        rarity: options.rarity,

        ownerId: options.ownerId,

        ownerName: options.ownerName,

        kingdomId: options.kingdomId,

        kingdomName: options.kingdomName,

        previousLevel: options.previousLevel,

        newLevel: options.newLevel,

        previousExperience: options.previousExperience ?? 0,

        newExperience: options.newExperience ?? 0,

        experienceRequired: options.experienceRequired ?? 0,

        attackIncrease: options.attackIncrease ?? 0,

        defenseIncrease: options.defenseIncrease ?? 0,

        healthIncrease: options.healthIncrease ?? 0,

        speedIncrease: options.speedIncrease ?? 0,

        intelligenceIncrease: options.intelligenceIncrease,

        skillUnlocked: options.skillUnlocked,

        titleUnlocked: options.titleUnlocked,

        rewardGold: options.rewardGold ?? 0,

        rewardHonor: options.rewardHonor ?? 0,

        maxLevelReached: options.maxLevelReached ?? false,

        leveledAt,

        timestamp: Date.now(),
    };
}

/* ============================================================
   Type Guard
============================================================ */

export function isHeroLeveled(
    value: unknown
): value is HeroLeveled {
    return (
        typeof value === "object" &&
        value !== null &&
        (value as HeroLeveled).type === HERO_LEVELED
    );
}