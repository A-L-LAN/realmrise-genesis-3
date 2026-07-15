/* ============================================================
   World.ts
   ------------------------------------------------------------
   Global world configuration for Realmrise: Genesis.

   This file defines:
   - World dimensions
   - Time settings
   - Simulation settings
   - Battle rules
   - Guild settings
   - Voting system
   - World events
   - Economy settings
   - Leaderboards
   - Spawn configuration
============================================================ */

/* ============================================================
   World Types
============================================================ */

export type WorldSeason =
    | "Spring"
    | "Summer"
    | "Autumn"
    | "Winter";

export type WeatherType =
    | "Clear"
    | "Rain"
    | "Storm"
    | "Snow"
    | "Fog";

/* ============================================================
   World Settings
============================================================ */

export const WORLD_SETTINGS = {
    /* --------------------------------------------------------
       World Size
    -------------------------------------------------------- */

    width: 100,

    height: 100,

    tileSize: 32,

    /* --------------------------------------------------------
       Population
    -------------------------------------------------------- */

    maxPlayers: 10000,

    maxKingdoms: 10000,

    maxGuilds: 1000,

    maxCitiesPerPlayer: 5,

    /* --------------------------------------------------------
       Hero Settings
    -------------------------------------------------------- */

    maxHeroLevel: 100,

    maxHeroesPerPlayer: 10,

    /* --------------------------------------------------------
       Economy
    -------------------------------------------------------- */

    dailyGoldBonus: 100,

    dailyLoginReward: 200,

    guildCreationCost: 1000,

    kingdomRenameCost: 500,

    /* --------------------------------------------------------
       Research
    -------------------------------------------------------- */

    researchSpeed: 1,

    maxResearchQueue: 5,

    /* --------------------------------------------------------
       Battles
    -------------------------------------------------------- */

    battleCooldownMinutes: 10,

    maxBattleDurationMinutes: 30,

    peaceShieldHours: 12,

    /* --------------------------------------------------------
       Voting
    -------------------------------------------------------- */

    voteDurationHours: 24,

    minimumVotesRequired: 5,

    /* --------------------------------------------------------
       Simulation
    -------------------------------------------------------- */

    simulationIntervalMinutes: 5,

    dailySimulationHourUTC: 0,

    autoSaveIntervalMinutes: 2,

    /* --------------------------------------------------------
       World Expansion
    -------------------------------------------------------- */

    startingTerritoryRadius: 5,

    maximumTerritoryRadius: 100,

    /* --------------------------------------------------------
       Leaderboards
    -------------------------------------------------------- */

    leaderboardSize: 100,

    /* --------------------------------------------------------
       Chat
    -------------------------------------------------------- */

    maxChatMessageLength: 300,

    /* --------------------------------------------------------
       Activity
    -------------------------------------------------------- */

    maxActivityHistory: 100,

    /* --------------------------------------------------------
       Misc
    -------------------------------------------------------- */

    serverVersion: "1.0.0",

    worldName: "Realmrise: Genesis",
} as const;

/* ============================================================
   Seasons
============================================================ */

export const WORLD_SEASONS: WorldSeason[] = [
    "Spring",
    "Summer",
    "Autumn",
    "Winter",
];

/* ============================================================
   Weather
============================================================ */

export const WEATHER_TYPES: WeatherType[] = [
    "Clear",
    "Rain",
    "Storm",
    "Snow",
    "Fog",
];

export const WEATHER_EFFECTS = {
    Clear: {
        foodProduction: 1.0,
        movement: 1.0,
    },

    Rain: {
        foodProduction: 1.10,
        movement: 0.95,
    },

    Storm: {
        foodProduction: 0.90,
        movement: 0.80,
    },

    Snow: {
        foodProduction: 0.80,
        movement: 0.75,
    },

    Fog: {
        visibility: 0.60,
        movement: 0.90,
    },
} as const;

/* ============================================================
   World Events
============================================================ */

export const WORLD_EVENTS = {
    harvestFestival: {
        durationHours: 24,
        foodBonus: 0.25,
    },

    goldRush: {
        durationHours: 24,
        goldBonus: 0.20,
    },

    ironBoom: {
        durationHours: 24,
        ironBonus: 0.30,
    },

    plague: {
        durationHours: 24,
        foodPenalty: 0.20,
    },

    invasion: {
        durationHours: 12,
        battleRewardBonus: 0.50,
    },
} as const;

/* ============================================================
   Spawn Settings
============================================================ */

export const SPAWN_SETTINGS = {
    minimumSpawnDistance: 5,

    maximumSpawnDistance: 20,

    protectedSpawnHours: 24,
} as const;

/* ============================================================
   Resource Nodes
============================================================ */

export const RESOURCE_NODE_LIMITS = {
    forests: 500,

    farms: 500,

    quarries: 300,

    goldMines: 200,

    ironMines: 150,
} as const;

/* ============================================================
   Guild Settings
============================================================ */

export const GUILD_SETTINGS = {
    maxMembers: 50,

    maxOfficers: 5,

    maxAlliances: 3,

    guildBankLimit: 1000000,
} as const;

/* ============================================================
   Diplomacy
============================================================ */

export const DIPLOMACY_SETTINGS = {
    allianceLimit: 5,

    truceDurationHours: 24,

    warDeclarationCooldownHours: 12,

    peaceVoteDurationHours: 24,
} as const;

/* ============================================================
   AI Kingdoms
============================================================ */

export const AI_SETTINGS = {
    enabled: true,

    startingKingdoms: 100,

    aggression: 0.50,

    expansionRate: 0.75,
} as const;

/* ============================================================
   Rankings
============================================================ */

export const RANKING_CATEGORIES = [
    "Power",
    "Population",
    "Military",
    "Economy",
    "Research",
    "Guild",
] as const;

/* ============================================================
   Achievement Rewards
============================================================ */

export const ACHIEVEMENT_REWARDS = {
    firstCity: 100,

    firstBattle: 150,

    firstGuild: 250,

    firstResearch: 100,

    firstHero: 200,
} as const;

/* ============================================================
   Time Constants
============================================================ */

export const TIME = {
    second: 1000,

    minute: 60 * 1000,

    hour: 60 * 60 * 1000,

    day: 24 * 60 * 60 * 1000,
} as const;

/* ============================================================
   World Borders
============================================================ */

export const WORLD_BORDERS = {
    minimumX: 0,

    minimumY: 0,

    maximumX: WORLD_SETTINGS.width - 1,

    maximumY: WORLD_SETTINGS.height - 1,
} as const;

/* ============================================================
   Default World State
============================================================ */

export const DEFAULT_WORLD = {
    id: "realmrise-world",

    name: WORLD_SETTINGS.worldName,

    day: 1,

    season: "Spring" as WorldSeason,

    weather: "Clear" as WeatherType,

    onlinePlayers: 0,

    kingdoms: 0,

    guilds: 0,

    version: WORLD_SETTINGS.serverVersion,

    createdAt: Date.now(),

    lastSimulation: Date.now(),
};