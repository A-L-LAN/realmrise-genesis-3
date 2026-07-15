/* ============================================================
   Buildings.ts
   ------------------------------------------------------------
   Complete building definitions for Realmrise: Genesis.

   This file contains:
   - Building metadata
   - Construction costs
   - Upgrade scaling
   - Maximum levels
   - Build times
   - Unlock requirements
   - Production values
   - Population bonuses
============================================================ */

import type { ResourceType } from "./Resources";

/* ============================================================
   Types
============================================================ */

export interface BuildingCost {
    gold?: number;
    wood?: number;
    stone?: number;
    food?: number;
    iron?: number;
}

export interface BuildingDefinition {
    id: string;
    name: string;
    description: string;

    icon: string;

    maxLevel: number;

    buildTime: number; // minutes

    cost: BuildingCost;

    upgradeMultiplier: number;

    unlockLevel: number;

    production?: Partial<Record<ResourceType, number>>;

    populationBonus?: number;

    militaryBonus?: number;

    researchBonus?: number;

    storageBonus?: number;
}

/* ============================================================
   Buildings
============================================================ */

export const BUILDINGS: Record<string, BuildingDefinition> = {
    /* --------------------------------------------------------
       Town Hall
    -------------------------------------------------------- */

    townHall: {
        id: "townHall",
        name: "Town Hall",
        description:
            "The administrative heart of your kingdom. Unlocks upgrades and increases overall capacity.",

        icon: "🏰",

        maxLevel: 20,

        buildTime: 5,

        cost: {
            wood: 200,
            stone: 150,
            gold: 100,
        },

        upgradeMultiplier: 1.40,

        unlockLevel: 1,

        populationBonus: 20,

        storageBonus: 1000,
    },

    /* --------------------------------------------------------
       Farm
    -------------------------------------------------------- */

    farm: {
        id: "farm",
        name: "Farm",
        description:
            "Produces food for your growing population.",

        icon: "🌾",

        maxLevel: 20,

        buildTime: 4,

        cost: {
            wood: 120,
            stone: 80,
            gold: 40,
        },

        upgradeMultiplier: 1.30,

        unlockLevel: 1,

        production: {
            food: 70,
        },
    },

    /* --------------------------------------------------------
       Lumber Mill
    -------------------------------------------------------- */

    lumberMill: {
        id: "lumberMill",
        name: "Lumber Mill",
        description:
            "Harvests timber used for buildings and siege weapons.",

        icon: "🪵",

        maxLevel: 20,

        buildTime: 5,

        cost: {
            wood: 150,
            stone: 100,
            gold: 50,
        },

        upgradeMultiplier: 1.30,

        unlockLevel: 1,

        production: {
            wood: 45,
        },
    },

    /* --------------------------------------------------------
       Quarry
    -------------------------------------------------------- */

    quarry: {
        id: "quarry",
        name: "Quarry",
        description:
            "Produces stone for construction and fortifications.",

        icon: "🪨",

        maxLevel: 20,

        buildTime: 6,

        cost: {
            wood: 120,
            stone: 150,
            gold: 60,
        },

        upgradeMultiplier: 1.30,

        unlockLevel: 2,

        production: {
            stone: 40,
        },
    },

    /* --------------------------------------------------------
       Gold Mine
    -------------------------------------------------------- */

    goldMine: {
        id: "goldMine",
        name: "Gold Mine",
        description:
            "Generates gold used for nearly every activity.",

        icon: "🪙",

        maxLevel: 20,

        buildTime: 6,

        cost: {
            wood: 180,
            stone: 160,
            gold: 80,
        },

        upgradeMultiplier: 1.35,

        unlockLevel: 2,

        production: {
            gold: 50,
        },
    },

    /* --------------------------------------------------------
       Iron Mine
    -------------------------------------------------------- */

    ironMine: {
        id: "ironMine",
        name: "Iron Mine",
        description:
            "Extracts iron for advanced weapons and elite troops.",

        icon: "⛓️",

        maxLevel: 20,

        buildTime: 8,

        cost: {
            wood: 200,
            stone: 250,
            gold: 120,
        },

        upgradeMultiplier: 1.35,

        unlockLevel: 4,

        production: {
            iron: 20,
        },
    },

    /* --------------------------------------------------------
       Barracks
    -------------------------------------------------------- */

    barracks: {
        id: "barracks",
        name: "Barracks",
        description:
            "Trains military units and improves army strength.",

        icon: "⚔️",

        maxLevel: 20,

        buildTime: 10,

        cost: {
            wood: 200,
            stone: 200,
            gold: 150,
        },

        upgradeMultiplier: 1.35,

        unlockLevel: 2,

        militaryBonus: 5,
    },

    /* --------------------------------------------------------
       Academy
    -------------------------------------------------------- */

    academy: {
        id: "academy",
        name: "Academy",
        description:
            "Researches new technologies and kingdom improvements.",

        icon: "📚",

        maxLevel: 10,

        buildTime: 15,

        cost: {
            wood: 300,
            stone: 250,
            gold: 300,
        },

        upgradeMultiplier: 1.45,

        unlockLevel: 5,

        researchBonus: 10,
    },

    /* --------------------------------------------------------
       Warehouse
    -------------------------------------------------------- */

    warehouse: {
        id: "warehouse",
        name: "Warehouse",
        description:
            "Increases resource storage capacity.",

        icon: "📦",

        maxLevel: 20,

        buildTime: 8,

        cost: {
            wood: 180,
            stone: 180,
            gold: 120,
        },

        upgradeMultiplier: 1.30,

        unlockLevel: 3,

        storageBonus: 5000,
    },

    /* --------------------------------------------------------
       Marketplace
    -------------------------------------------------------- */

    marketplace: {
        id: "marketplace",
        name: "Marketplace",
        description:
            "Allows trading resources with other kingdoms.",

        icon: "🏪",

        maxLevel: 15,

        buildTime: 12,

        cost: {
            wood: 250,
            stone: 200,
            gold: 250,
        },

        upgradeMultiplier: 1.35,

        unlockLevel: 4,
    },

    /* --------------------------------------------------------
       Wall
    -------------------------------------------------------- */

    wall: {
        id: "wall",
        name: "City Wall",
        description:
            "Improves city defense against enemy invasions.",

        icon: "🛡️",

        maxLevel: 20,

        buildTime: 12,

        cost: {
            wood: 250,
            stone: 350,
            gold: 150,
        },

        upgradeMultiplier: 1.40,

        unlockLevel: 3,

        militaryBonus: 10,
    },

    /* --------------------------------------------------------
       Watch Tower
    -------------------------------------------------------- */

    watchTower: {
        id: "watchTower",
        name: "Watch Tower",
        description:
            "Provides early warning against incoming attacks.",

        icon: "🗼",

        maxLevel: 15,

        buildTime: 10,

        cost: {
            wood: 180,
            stone: 220,
            gold: 100,
        },

        upgradeMultiplier: 1.35,

        unlockLevel: 4,
    },

    /* --------------------------------------------------------
       Temple
    -------------------------------------------------------- */

    temple: {
        id: "temple",
        name: "Temple",

        description:
            "Inspires the population and increases kingdom morale.",

        icon: "⛪",

        maxLevel: 10,

        buildTime: 20,

        cost: {
            wood: 300,
            stone: 350,
            gold: 400,
        },

        upgradeMultiplier: 1.50,

        unlockLevel: 6,

        populationBonus: 50,
    },

    /* --------------------------------------------------------
       Castle
    -------------------------------------------------------- */

    castle: {
        id: "castle",

        name: "Castle",

        description:
            "The ultimate military headquarters of the kingdom.",

        icon: "🏯",

        maxLevel: 10,

        buildTime: 30,

        cost: {
            wood: 1000,
            stone: 1200,
            gold: 1500,
            iron: 300,
        },

        upgradeMultiplier: 1.60,

        unlockLevel: 10,

        militaryBonus: 20,

        populationBonus: 100,
    },
};

/* ============================================================
   Utility Collections
============================================================ */

export const BUILDING_IDS = Object.keys(BUILDINGS);

export const STARTING_BUILDINGS = {
    townHall: 1,
    farm: 1,
    lumberMill: 1,
    quarry: 1,
    goldMine: 1,
    ironMine: 0,
    barracks: 1,
    academy: 0,
    warehouse: 1,
    marketplace: 0,
    wall: 1,
    watchTower: 0,
    temple: 0,
    castle: 0,
};

export const MAX_BUILDING_LEVEL = 20;