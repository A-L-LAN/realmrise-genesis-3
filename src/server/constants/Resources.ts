/* ============================================================
   Resources.ts
   ------------------------------------------------------------
   Global economy configuration for Realmrise: Genesis.

   This file contains:
   - Resource definitions
   - Starting resources
   - Storage limits
   - Building production rates
   - Upgrade scaling
   - Gathering rewards
   - Trading values
   - Population food consumption
   - Maintenance costs
============================================================ */

/* ============================================================
   Resource Types
============================================================ */

export type ResourceType =
    | "gold"
    | "wood"
    | "stone"
    | "food"
    | "iron";

/* ============================================================
   Resource Metadata
============================================================ */

export const RESOURCES = {
    gold: {
        id: "gold",
        name: "Gold",
        icon: "🪙",
        description: "Primary currency used throughout the kingdom.",
        color: "#FFD700",
    },

    wood: {
        id: "wood",
        name: "Wood",
        icon: "🪵",
        description: "Used for constructing buildings and siege equipment.",
        color: "#8B5A2B",
    },

    stone: {
        id: "stone",
        name: "Stone",
        icon: "🪨",
        description: "Essential for defensive structures and fortifications.",
        color: "#808080",
    },

    food: {
        id: "food",
        name: "Food",
        icon: "🌾",
        description: "Feeds population and military units.",
        color: "#4CAF50",
    },

    iron: {
        id: "iron",
        name: "Iron",
        icon: "⛓️",
        description: "Required for advanced weapons and elite units.",
        color: "#9E9E9E",
    },
} as const;

/* ============================================================
   Starting Resources
============================================================ */

export const STARTING_RESOURCES = {
    gold: 1000,
    wood: 500,
    stone: 500,
    food: 800,
    iron: 150,
} as const;

/* ============================================================
   Maximum Storage
============================================================ */

export const RESOURCE_LIMITS = {
    gold: 1_000_000,
    wood: 1_000_000,
    stone: 1_000_000,
    food: 1_000_000,
    iron: 1_000_000,
} as const;

/* ============================================================
   Default Building Production
   (Per Simulation Tick / Day)
============================================================ */

export const RESOURCE_PRODUCTION = {
    townHall: {
        gold: 15,
    },

    goldMine: {
        gold: 50,
    },

    lumberMill: {
        wood: 45,
    },

    quarry: {
        stone: 40,
    },

    farm: {
        food: 70,
    },

    ironMine: {
        iron: 20,
    },
} as const;

/* ============================================================
   Production Increase Per Building Level
============================================================ */

export const RESOURCE_LEVEL_MULTIPLIER = {
    goldMine: 1.15,
    lumberMill: 1.15,
    quarry: 1.15,
    farm: 1.15,
    ironMine: 1.12,
} as const;

/* ============================================================
   Resource Gathering Rewards
============================================================ */

export const GATHERING_REWARDS = {
    forest: {
        wood: 80,
    },

    mountain: {
        stone: 70,
        iron: 20,
    },

    farmland: {
        food: 120,
    },

    ruins: {
        gold: 150,
    },
} as const;

/* ============================================================
   Daily Passive Income
============================================================ */

export const DAILY_RESOURCE_BONUS = {
    gold: 100,
    wood: 40,
    stone: 40,
    food: 80,
    iron: 10,
} as const;

/* ============================================================
   Trade Exchange Rates
   Base market value.
============================================================ */

export const TRADE_VALUES = {
    gold: 1,

    wood: 2,

    stone: 2,

    food: 1,

    iron: 5,
} as const;

/* ============================================================
   Market Tax
============================================================ */

export const MARKET_SETTINGS = {
    tax: 0.05,
    minimumTradeAmount: 10,
    maximumTradeAmount: 100000,
} as const;

/* ============================================================
   Population Consumption
============================================================ */

export const POPULATION_CONSUMPTION = {
    civilianFood: 1,
    soldierFood: 2,
    heroFood: 5,
} as const;

/* ============================================================
   Army Upkeep
============================================================ */

export const UNIT_UPKEEP = {
    militia: {
        gold: 1,
        food: 1,
    },

    swordsman: {
        gold: 2,
        food: 2,
    },

    archer: {
        gold: 2,
        food: 2,
    },

    cavalry: {
        gold: 4,
        food: 3,
    },

    knight: {
        gold: 6,
        food: 5,
    },
} as const;

/* ============================================================
   Emergency Thresholds
============================================================ */

export const RESOURCE_WARNINGS = {
    lowFood: 100,
    lowGold: 100,
    lowWood: 50,
    lowStone: 50,
    lowIron: 25,
} as const;

/* ============================================================
   Resource Rewards
============================================================ */

export const RESOURCE_REWARDS = {
    battleVictory: {
        gold: 200,
        food: 100,
    },

    questCompletion: {
        gold: 300,
        wood: 100,
        stone: 100,
    },

    guildContribution: {
        gold: 150,
    },

    researchCompletion: {
        gold: 100,
    },
} as const;

/* ============================================================
   Resource Costs
============================================================ */

export const RESOURCE_COSTS = {
    heroRevive: {
        gold: 500,
        food: 100,
    },

    renameKingdom: {
        gold: 1000,
    },

    createGuild: {
        gold: 5000,
    },

    declareWar: {
        gold: 1000,
        iron: 100,
    },
} as const;

/* ============================================================
   Utility Collections
============================================================ */

export const RESOURCE_NAMES: ResourceType[] = [
    "gold",
    "wood",
    "stone",
    "food",
    "iron",
];

export const RESOURCE_ICONS = {
    gold: "🪙",
    wood: "🪵",
    stone: "🪨",
    food: "🌾",
    iron: "⛓️",
} as const;

/* ============================================================
   Default Resource Object
============================================================ */

export const EMPTY_RESOURCES = {
    gold: 0,
    wood: 0,
    stone: 0,
    food: 0,
    iron: 0,
} as const;