/* ============================================================
   Units.ts
   ------------------------------------------------------------
   Military unit definitions for Realmrise: Genesis.

   This file contains:
   - Unit metadata
   - Recruitment costs
   - Combat statistics
   - Training times
   - Population requirements
   - Upkeep
   - Unlock requirements
   - Army presets
============================================================ */

import type { ResourceType } from "./Resources";

/* ============================================================
   Types
============================================================ */

export type UnitType =
    | "militia"
    | "spearman"
    | "swordsman"
    | "archer"
    | "crossbowman"
    | "cavalry"
    | "knight"
    | "catapult"
    | "ballista"
    | "mage";

export interface UnitCost {
    gold?: number;
    wood?: number;
    stone?: number;
    food?: number;
    iron?: number;
}

export interface UnitDefinition {
    id: UnitType;

    name: string;

    description: string;

    icon: string;

    attack: number;

    defense: number;

    hp: number;

    speed: number;

    range: number;

    upkeep: number;

    population: number;

    trainingTime: number;

    barracksLevel: number;

    cost: UnitCost;

    lootCapacity: number;
}

/* ============================================================
   Units
============================================================ */

export const UNITS: Record<UnitType, UnitDefinition> = {
    /* --------------------------------------------------------
       Militia
    -------------------------------------------------------- */

    militia: {
        id: "militia",

        name: "Militia",

        description:
            "Poorly equipped civilian soldiers used for early defense.",

        icon: "🪓",

        attack: 5,

        defense: 5,

        hp: 40,

        speed: 4,

        range: 1,

        upkeep: 1,

        population: 1,

        trainingTime: 1,

        barracksLevel: 1,

        lootCapacity: 10,

        cost: {
            gold: 10,
            food: 10,
        },
    },

    /* --------------------------------------------------------
       Spearman
    -------------------------------------------------------- */

    spearman: {
        id: "spearman",

        name: "Spearman",

        description:
            "Defensive infantry effective against cavalry.",

        icon: "🛡️",

        attack: 8,

        defense: 12,

        hp: 65,

        speed: 4,

        range: 1,

        upkeep: 2,

        population: 1,

        trainingTime: 2,

        barracksLevel: 2,

        lootCapacity: 15,

        cost: {
            gold: 20,
            wood: 10,
            food: 15,
        },
    },

    /* --------------------------------------------------------
       Swordsman
    -------------------------------------------------------- */

    swordsman: {
        id: "swordsman",

        name: "Swordsman",

        description:
            "Balanced frontline infantry.",

        icon: "⚔️",

        attack: 12,

        defense: 10,

        hp: 80,

        speed: 5,

        range: 1,

        upkeep: 2,

        population: 1,

        trainingTime: 3,

        barracksLevel: 2,

        lootCapacity: 20,

        cost: {
            gold: 30,
            food: 20,
            iron: 5,
        },
    },

    /* --------------------------------------------------------
       Archer
    -------------------------------------------------------- */

    archer: {
        id: "archer",

        name: "Archer",

        description:
            "Long-range support unit.",

        icon: "🏹",

        attack: 15,

        defense: 6,

        hp: 60,

        speed: 6,

        range: 5,

        upkeep: 2,

        population: 1,

        trainingTime: 3,

        barracksLevel: 3,

        lootCapacity: 15,

        cost: {
            gold: 35,
            wood: 20,
            food: 20,
        },
    },

    /* --------------------------------------------------------
       Crossbowman
    -------------------------------------------------------- */

    crossbowman: {
        id: "crossbowman",

        name: "Crossbowman",

        description:
            "Heavy ranged infantry capable of piercing armor.",

        icon: "🎯",

        attack: 22,

        defense: 10,

        hp: 90,

        speed: 5,

        range: 6,

        upkeep: 3,

        population: 1,

        trainingTime: 5,

        barracksLevel: 5,

        lootCapacity: 25,

        cost: {
            gold: 60,
            wood: 30,
            iron: 15,
            food: 25,
        },
    },

    /* --------------------------------------------------------
       Cavalry
    -------------------------------------------------------- */

    cavalry: {
        id: "cavalry",

        name: "Light Cavalry",

        description:
            "Fast mounted unit ideal for raids.",

        icon: "🐎",

        attack: 25,

        defense: 18,

        hp: 120,

        speed: 10,

        range: 1,

        upkeep: 4,

        population: 2,

        trainingTime: 6,

        barracksLevel: 4,

        lootCapacity: 60,

        cost: {
            gold: 80,
            food: 40,
            iron: 20,
        },
    },

    /* --------------------------------------------------------
       Knight
    -------------------------------------------------------- */

    knight: {
        id: "knight",

        name: "Knight",

        description:
            "Elite heavy cavalry capable of devastating charges.",

        icon: "🛡️",

        attack: 40,

        defense: 35,

        hp: 220,

        speed: 8,

        range: 1,

        upkeep: 6,

        population: 3,

        trainingTime: 10,

        barracksLevel: 7,

        lootCapacity: 100,

        cost: {
            gold: 150,
            iron: 50,
            food: 60,
        },
    },

    /* --------------------------------------------------------
       Catapult
    -------------------------------------------------------- */

    catapult: {
        id: "catapult",

        name: "Catapult",

        description:
            "Siege engine used to destroy city defenses.",

        icon: "🪨",

        attack: 80,

        defense: 10,

        hp: 180,

        speed: 2,

        range: 10,

        upkeep: 8,

        population: 4,

        trainingTime: 20,

        barracksLevel: 8,

        lootCapacity: 0,

        cost: {
            gold: 300,
            wood: 150,
            iron: 80,
        },
    },

    /* --------------------------------------------------------
       Ballista
    -------------------------------------------------------- */

    ballista: {
        id: "ballista",

        name: "Ballista",

        description:
            "Heavy siege weapon specialized against troops.",

        icon: "🏹",

        attack: 65,

        defense: 20,

        hp: 170,

        speed: 2,

        range: 9,

        upkeep: 7,

        population: 3,

        trainingTime: 18,

        barracksLevel: 8,

        lootCapacity: 0,

        cost: {
            gold: 280,
            wood: 120,
            iron: 70,
        },
    },

    /* --------------------------------------------------------
       Mage
    -------------------------------------------------------- */

    mage: {
        id: "mage",

        name: "Battle Mage",

        description:
            "Rare magical unit capable of devastating attacks.",

        icon: "🧙",

        attack: 60,

        defense: 20,

        hp: 140,

        speed: 6,

        range: 8,

        upkeep: 10,

        population: 2,

        trainingTime: 30,

        barracksLevel: 10,

        lootCapacity: 20,

        cost: {
            gold: 500,
            food: 100,
            iron: 100,
        },
    },
};

/* ============================================================
   Army Limits
============================================================ */

export const ARMY_LIMITS = {
    maxArmySize: 500000,

    maxUnitsPerBattle: 100000,

    maxRecruitsPerQueue: 10000,
};

/* ============================================================
   Recruitment Settings
============================================================ */

export const RECRUITMENT_SETTINGS = {
    queueLimit: 10,

    trainingSpeedMultiplier: 1,

    instantRecruitCostMultiplier: 3,
};

/* ============================================================
   Battle Settings
============================================================ */

export const BATTLE_SETTINGS = {
    criticalHitChance: 0.05,

    criticalDamageMultiplier: 2,

    minimumDamage: 1,

    moraleBonus: 0.10,

    wallDefenseBonus: 0.20,
};

/* ============================================================
   Default Army
============================================================ */

export const STARTING_ARMY = {
    militia: 20,
    spearman: 0,
    swordsman: 0,
    archer: 0,
    crossbowman: 0,
    cavalry: 0,
    knight: 0,
    catapult: 0,
    ballista: 0,
    mage: 0,
};

/* ============================================================
   Utility Collections
============================================================ */

export const UNIT_IDS = Object.keys(UNITS) as UnitType[];

export const ELITE_UNITS: UnitType[] = [
    "knight",
    "catapult",
    "ballista",
    "mage",
];

export const RANGED_UNITS: UnitType[] = [
    "archer",
    "crossbowman",
    "ballista",
    "mage",
];

export const MELEE_UNITS: UnitType[] = [
    "militia",
    "spearman",
    "swordsman",
    "cavalry",
    "knight",
];

export const SIEGE_UNITS: UnitType[] = [
    "catapult",
    "ballista",
];