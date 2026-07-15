/* ============================================================
   Heroes.ts
   ------------------------------------------------------------
   Hero configuration for Realmrise: Genesis.

   This file contains:
   - Hero classes
   - Hero rarities
   - Hero statistics
   - Experience requirements
   - Level scaling
   - Recruitment costs
   - Skill unlocks
   - Equipment slots
============================================================ */

import type { ResourceType } from "./Resources";

/* ============================================================
   Types
============================================================ */

export type HeroClass =
    | "warrior"
    | "mage"
    | "ranger"
    | "paladin";

export type HeroRarity =
    | "common"
    | "rare"
    | "epic"
    | "legendary";

export interface HeroCost {
    gold?: number;
    wood?: number;
    stone?: number;
    food?: number;
    iron?: number;
}

export interface HeroStats {
    attack: number;
    defense: number;
    intelligence: number;
    leadership: number;
}

export interface HeroClassDefinition {
    id: HeroClass;

    name: string;

    description: string;

    icon: string;

    rarity: HeroRarity;

    attack: number;

    defense: number;

    intelligence: number;

    leadership: number;

    hp: number;

    mana: number;

    speed: number;

    criticalChance: number;

    dodgeChance: number;

    recruitmentCost: HeroCost;

    unlockLevel: number;

    skillSlots: number;
}

/* ============================================================
   Hero Classes
============================================================ */

export const HERO_CLASSES: Record<
    HeroClass,
    HeroClassDefinition
> = {
    /* --------------------------------------------------------
       Warrior
    -------------------------------------------------------- */

    warrior: {
        id: "warrior",

        name: "Warrior",

        description:
            "A fearless frontline commander with exceptional durability.",

        icon: "⚔️",

        rarity: "common",

        attack: 20,

        defense: 18,

        intelligence: 6,

        leadership: 10,

        hp: 220,

        mana: 40,

        speed: 6,

        criticalChance: 0.08,

        dodgeChance: 0.04,

        recruitmentCost: {
            gold: 500,
            food: 150,
            iron: 40,
        },

        unlockLevel: 1,

        skillSlots: 3,
    },

    /* --------------------------------------------------------
       Mage
    -------------------------------------------------------- */

    mage: {
        id: "mage",

        name: "Mage",

        description:
            "Master of destructive magic and battlefield control.",

        icon: "🧙",

        rarity: "epic",

        attack: 8,

        defense: 8,

        intelligence: 20,

        leadership: 7,

        hp: 120,

        mana: 250,

        speed: 7,

        criticalChance: 0.15,

        dodgeChance: 0.05,

        recruitmentCost: {
            gold: 900,
            food: 120,
            iron: 60,
        },

        unlockLevel: 5,

        skillSlots: 5,
    },

    /* --------------------------------------------------------
       Ranger
    -------------------------------------------------------- */

    ranger: {
        id: "ranger",

        name: "Ranger",

        description:
            "Deadly ranged specialist with unmatched precision.",

        icon: "🏹",

        rarity: "rare",

        attack: 15,

        defense: 10,

        intelligence: 12,

        leadership: 8,

        hp: 170,

        mana: 80,

        speed: 10,

        criticalChance: 0.20,

        dodgeChance: 0.12,

        recruitmentCost: {
            gold: 700,
            food: 150,
            wood: 120,
        },

        unlockLevel: 3,

        skillSlots: 4,
    },

    /* --------------------------------------------------------
       Paladin
    -------------------------------------------------------- */

    paladin: {
        id: "paladin",

        name: "Paladin",

        description:
            "Holy knight capable of protecting allies while leading armies.",

        icon: "🛡️",

        rarity: "legendary",

        attack: 18,

        defense: 20,

        intelligence: 10,

        leadership: 15,

        hp: 260,

        mana: 120,

        speed: 6,

        criticalChance: 0.10,

        dodgeChance: 0.06,

        recruitmentCost: {
            gold: 1500,
            food: 300,
            iron: 120,
        },

        unlockLevel: 8,

        skillSlots: 6,
    },
};

/* ============================================================
   Hero Experience
============================================================ */

export const HERO_LEVELS = {
    maxLevel: 100,

    baseExperience: 100,

    experienceMultiplier: 1.25,
};

/* ============================================================
   Level Scaling
============================================================ */

export const HERO_LEVEL_BONUS = {
    attack: 2,

    defense: 2,

    intelligence: 2,

    leadership: 1,

    hp: 15,

    mana: 10,
};

/* ============================================================
   Hero Equipment
============================================================ */

export const HERO_EQUIPMENT = {
    weapon: "Weapon",

    armor: "Armor",

    helmet: "Helmet",

    boots: "Boots",

    accessory: "Accessory",

    relic: "Relic",
} as const;

/* ============================================================
   Hero Skills
============================================================ */

export const HERO_SKILLS = {
    warrior: [
        "Shield Bash",
        "Battle Cry",
        "Whirlwind",
        "Last Stand",
        "Iron Defense",
    ],

    mage: [
        "Fireball",
        "Lightning Strike",
        "Ice Storm",
        "Arcane Shield",
        "Meteor",
    ],

    ranger: [
        "Power Shot",
        "Rapid Fire",
        "Poison Arrow",
        "Camouflage",
        "Sniper Shot",
    ],

    paladin: [
        "Holy Strike",
        "Divine Shield",
        "Blessing",
        "Judgement",
        "Guardian Aura",
    ],
};

/* ============================================================
   Recruitment
============================================================ */

export const HERO_RECRUITMENT = {
    maxHeroesPerPlayer: 10,

    recruitCooldownHours: 12,

    rerollCost: 500,

    reviveCost: {
        gold: 1000,
        food: 200,
    },
};

/* ============================================================
   Hero Morale
============================================================ */

export const HERO_MORALE = {
    minimum: 0,

    maximum: 100,

    battleVictory: 5,

    battleDefeat: -8,

    questCompletion: 3,
};

/* ============================================================
   Hero Relationships
============================================================ */

export const HERO_AFFINITY = {
    sameClassBonus: 0.05,

    mixedArmyBonus: 0.10,

    legendaryLeadershipBonus: 0.15,
};

/* ============================================================
   Utility Collections
============================================================ */

export const HERO_CLASS_IDS: HeroClass[] = [
    "warrior",
    "mage",
    "ranger",
    "paladin",
];

export const HERO_RARITIES: HeroRarity[] = [
    "common",
    "rare",
    "epic",
    "legendary",
];

/* ============================================================
   Starting Hero
============================================================ */

export const STARTING_HERO = {
    class: "warrior" as HeroClass,

    level: 1,

    experience: 0,

    hp: HERO_CLASSES.warrior.hp,

    mana: HERO_CLASSES.warrior.mana,

    morale: 100,

    equipment: {
        weapon: null,
        armor: null,
        helmet: null,
        boots: null,
        accessory: null,
        relic: null,
    },
};