/* ============================================================
   Kingdoms.ts
   ------------------------------------------------------------
   Kingdom configuration for Realmrise: Genesis.

   This file contains:
   - Kingdom factions
   - Starting bonuses
   - Starting resources
   - Starting armies
   - Capital cities
   - Diplomacy settings
   - Alignment system
   - Utility collections
============================================================ */

import { STARTING_RESOURCES } from "./Resources";
import { STARTING_ARMY } from "./Units";

/* ============================================================
   Types
============================================================ */

export type KingdomType =
    | "human"
    | "elves"
    | "dwarves"
    | "orcs"
    | "undead"
    | "dragons";

export type KingdomAlignment =
    | "Order"
    | "Nature"
    | "Industry"
    | "Chaos"
    | "Death"
    | "Ancient";

export interface KingdomBonuses {
    attack?: number;
    defense?: number;
    gold?: number;
    wood?: number;
    stone?: number;
    food?: number;
    iron?: number;
    research?: number;
    recruitment?: number;
    construction?: number;
    trade?: number;
    heroExperience?: number;
}

export interface KingdomDefinition {
    id: KingdomType;

    name: string;

    title: string;

    description: string;

    icon: string;

    alignment: KingdomAlignment;

    capital: string;

    color: string;

    bonuses: KingdomBonuses;

    startingResources: typeof STARTING_RESOURCES;

    startingArmy: typeof STARTING_ARMY;

    preferredHero:
        | "warrior"
        | "mage"
        | "ranger"
        | "paladin";
}

/* ============================================================
   Kingdom Definitions
============================================================ */

export const KINGDOMS: Record<
    KingdomType,
    KingdomDefinition
> = {
    /* --------------------------------------------------------
       Humans
    -------------------------------------------------------- */

    human: {
        id: "human",

        name: "Kingdom of Men",

        title: "The Imperial Kingdom",

        description:
            "Balanced civilization with strong economy and leadership.",

        icon: "👑",

        alignment: "Order",

        capital: "Aurelia",

        color: "#3F51B5",

        bonuses: {
            gold: 0.10,
            recruitment: 0.05,
            trade: 0.05,
        },

        startingResources: STARTING_RESOURCES,

        startingArmy: STARTING_ARMY,

        preferredHero: "warrior",
    },

    /* --------------------------------------------------------
       Elves
    -------------------------------------------------------- */

    elves: {
        id: "elves",

        name: "Elven Alliance",

        title: "Guardians of the Forest",

        description:
            "Masters of archery, research, and natural harmony.",

        icon: "🌲",

        alignment: "Nature",

        capital: "Silverleaf",

        color: "#4CAF50",

        bonuses: {
            food: 0.15,
            research: 0.10,
            heroExperience: 0.10,
        },

        startingResources: {
            ...STARTING_RESOURCES,
            food: 1000,
            wood: 700,
        },

        startingArmy: {
            ...STARTING_ARMY,
            archer: 15,
        },

        preferredHero: "ranger",
    },

    /* --------------------------------------------------------
       Dwarves
    -------------------------------------------------------- */

    dwarves: {
        id: "dwarves",

        name: "Dwarven Hold",

        title: "Lords of the Mountains",

        description:
            "Industrial builders with unmatched defensive strength.",

        icon: "⛰️",

        alignment: "Industry",

        capital: "Ironforge",

        color: "#795548",

        bonuses: {
            stone: 0.20,
            defense: 0.10,
            iron: 0.15,
            construction: 0.05,
        },

        startingResources: {
            ...STARTING_RESOURCES,
            stone: 900,
            iron: 300,
        },

        startingArmy: {
            ...STARTING_ARMY,
            spearman: 15,
        },

        preferredHero: "warrior",
    },

    /* --------------------------------------------------------
       Orcs
    -------------------------------------------------------- */

    orcs: {
        id: "orcs",

        name: "Orc Horde",

        title: "The Endless Horde",

        description:
            "Savage warriors that dominate through overwhelming force.",

        icon: "🪓",

        alignment: "Chaos",

        capital: "Bloodfang",

        color: "#8BC34A",

        bonuses: {
            attack: 0.15,
            recruitment: 0.15,
            food: 0.05,
        },

        startingResources: {
            ...STARTING_RESOURCES,
            food: 1000,
        },

        startingArmy: {
            ...STARTING_ARMY,
            militia: 40,
            swordsman: 10,
        },

        preferredHero: "warrior",
    },

    /* --------------------------------------------------------
       Undead
    -------------------------------------------------------- */

    undead: {
        id: "undead",

        name: "Undead Legion",

        title: "Empire of Eternal Night",

        description:
            "Dark civilization that never fears death.",

        icon: "☠️",

        alignment: "Death",

        capital: "Necropolis",

        color: "#607D8B",

        bonuses: {
            recruitment: 0.20,
            attack: 0.05,
            defense: 0.05,
        },

        startingResources: {
            ...STARTING_RESOURCES,
            food: 400,
            gold: 1200,
        },

        startingArmy: {
            ...STARTING_ARMY,
            militia: 30,
            swordsman: 15,
        },

        preferredHero: "mage",
    },

    /* --------------------------------------------------------
       Dragons
    -------------------------------------------------------- */

    dragons: {
        id: "dragons",

        name: "Dragon Dominion",

        title: "Ancient Empire",

        description:
            "Extremely powerful late-game civilization with legendary heroes.",

        icon: "🐉",

        alignment: "Ancient",

        capital: "Drakoria",

        color: "#F44336",

        bonuses: {
            attack: 0.10,
            defense: 0.10,
            heroExperience: 0.20,
            gold: 0.10,
        },

        startingResources: {
            ...STARTING_RESOURCES,
            gold: 2000,
            iron: 400,
        },

        startingArmy: {
            ...STARTING_ARMY,
            knight: 5,
            mage: 2,
        },

        preferredHero: "paladin",
    },
};

/* ============================================================
   Diplomacy
============================================================ */

export const DIPLOMACY_SETTINGS = {
    allianceLimit: 5,

    ceasefireHours: 24,

    warDeclarationCost: 1000,

    peaceVoteDurationHours: 12,
};

/* ============================================================
   Kingdom Progression
============================================================ */

export const KINGDOM_LEVELS = {
    maxLevel: 50,

    experienceMultiplier: 1.2,

    territoryExpansionCost: 1000,
};

/* ============================================================
   Capital Bonuses
============================================================ */

export const CAPITAL_BONUSES = {
    goldIncome: 0.10,

    defense: 0.10,

    population: 100,

    storage: 5000,
};

/* ============================================================
   Government Types
============================================================ */

export const GOVERNMENT_TYPES = [
    "Monarchy",
    "Republic",
    "Empire",
    "Tribal",
    "Council",
] as const;

/* ============================================================
   Starting Reputation
============================================================ */

export const STARTING_REPUTATION = {
    friendly: 0,

    hostile: 0,

    honor: 100,
};

/* ============================================================
   Utility Collections
============================================================ */

export const KINGDOM_TYPES = Object.values(KINGDOMS);

export const KINGDOM_IDS: KingdomType[] = [
    "human",
    "elves",
    "dwarves",
    "orcs",
    "undead",
    "dragons",
];

export const KINGDOM_COLORS = Object.fromEntries(
    Object.values(KINGDOMS).map((kingdom) => [
        kingdom.id,
        kingdom.color,
    ])
);

/* ============================================================
   Default Kingdom
============================================================ */

export const DEFAULT_KINGDOM = KINGDOMS.human;