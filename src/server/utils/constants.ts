/* ============================================================
   Shared Server Constants
   Realmrise: Genesis
============================================================ */

/* ============================================================
   Storage Keys
============================================================ */

export const STORAGE_KEYS = {
    WORLD: "world",

    WORLD_VERSION: "world:version",

    SETTINGS: "settings",

    LEADERBOARD: "leaderboard",

    DAILY_EVENTS: "daily-events",

    ANNOUNCEMENTS: "announcements",

    SERVER_STATE: "server-state",

    GAME_STATS: "game-stats",

    PLAYERS: "players",

    KINGDOMS: "kingdoms",

    GUILDS: "guilds",

    HEROES: "heroes",

    QUESTS: "quests",

    ARMIES: "armies",

    CITIES: "cities",

    RESEARCH: "research",

    BATTLES: "battles",

    MARKET: "market",

    VOTES: "votes",

    CHAT: "chat",
} as const;

/* ============================================================
   Redis Key Prefixes
============================================================ */

export const PREFIX = {
    PLAYER: "player:",

    KINGDOM: "kingdom:",

    GUILD: "guild:",

    HERO: "hero:",

    QUEST: "quest:",

    CITY: "city:",

    ARMY: "army:",

    VOTE: "vote:",

    BATTLE: "battle:",

    RESEARCH: "research:",

    MARKET: "market:",

    SESSION: "session:",
} as const;

/* ============================================================
   Default Player Values
============================================================ */

export const DEFAULTS = {
    STARTING_GOLD: 1000,

    STARTING_WOOD: 500,

    STARTING_STONE: 500,

    STARTING_FOOD: 1000,

    STARTING_IRON: 100,

    STARTING_POPULATION: 50,

    STARTING_HAPPINESS: 100,

    STARTING_LEVEL: 1,

    STARTING_EXPERIENCE: 0,

    STARTING_REPUTATION: 0,

    STARTING_POWER: 100,

    STARTING_CITY_LEVEL: 1,

    STARTING_TROOPS: 20,

    STARTING_GEMS: 0,

    STARTING_RESEARCH_POINTS: 0,

    STARTING_HERO_SLOTS: 2,
} as const;

/* ============================================================
   Resource Defaults
============================================================ */

export const RESOURCE_LIMITS = {
    GOLD: 999999999,

    WOOD: 999999999,

    STONE: 999999999,

    FOOD: 999999999,

    IRON: 999999999,

    GEMS: 999999999,
} as const;

/* ============================================================
   Game Limits
============================================================ */

export const LIMITS = {
    MAX_LEVEL: 100,

    MAX_CITY_LEVEL: 30,

    MAX_HERO_LEVEL: 100,

    MAX_ARMY_SIZE: 100000,

    MAX_HEROES: 20,

    MAX_GUILDS: 1000,

    MAX_GUILD_MEMBERS: 100,

    MAX_ALLIANCES: 50,

    MAX_CHAT_LENGTH: 500,

    MAX_USERNAME_LENGTH: 24,

    MAX_KINGDOM_NAME_LENGTH: 40,

    MAX_GUILD_NAME_LENGTH: 40,

    MAX_BUILDING_LEVEL: 30,

    MAX_RESEARCH_LEVEL: 50,

    MAX_MARKET_OFFERS: 5000,

    MAX_DAILY_QUESTS: 10,
} as const;

/* ============================================================
   World Constants
============================================================ */

export const WORLD = {
    WIDTH: 100,

    HEIGHT: 100,

    TILE_SIZE: 32,

    MAX_PLAYERS: 10000,

    MAX_CITIES: 5000,

    MAX_KINGDOMS: 20,

    MAX_GUILDS: 1000,

    DAY_LENGTH_MINUTES: 1440,

    BATTLE_COOLDOWN_MINUTES: 10,

    DAILY_GOLD_BONUS: 100,

    RESEARCH_SPEED: 1,
} as const;

/* ============================================================
   Economy
============================================================ */

export const ECONOMY = {
    TAX_RATE: 0.10,

    MARKET_TAX: 0.05,

    TRADE_FEE: 0.02,

    GUILD_CREATION_COST: 1000,

    HERO_REVIVE_COST: 500,

    CITY_RENAME_COST: 250,

    ALLIANCE_COST: 5000,
} as const;

/* ============================================================
   Combat
============================================================ */

export const COMBAT = {
    CRITICAL_HIT_CHANCE: 10,

    CRITICAL_DAMAGE_MULTIPLIER: 2,

    BASE_ATTACK: 10,

    BASE_DEFENSE: 10,

    BASE_HEALTH: 100,

    MORALE_BONUS: 5,

    RETREAT_THRESHOLD: 20,
} as const;

/* ============================================================
   Heroes
============================================================ */

export const HERO = {
    MAX_LEVEL: 100,

    EXPERIENCE_BASE: 100,

    EXPERIENCE_MULTIPLIER: 1.8,

    MAX_SKILLS: 5,

    DEFAULT_ENERGY: 100,

    ENERGY_RECOVERY_PER_HOUR: 10,
} as const;

/* ============================================================
   Buildings
============================================================ */

export const BUILDING = {
    MAX_LEVEL: 30,

    BASE_COST_MULTIPLIER: 1.35,

    BUILD_TIME_SECONDS: 60,

    MAX_QUEUE: 3,
} as const;

/* ============================================================
   Research
============================================================ */

export const RESEARCH = {
    MAX_LEVEL: 50,

    COST_MULTIPLIER: 1.5,

    BASE_DURATION_MINUTES: 15,
} as const;

/* ============================================================
   Guilds
============================================================ */

export const GUILD = {
    MAX_MEMBERS: 100,

    MAX_RANKS: 6,

    MAX_DESCRIPTION_LENGTH: 500,

    CREATION_COST: 1000,
} as const;

/* ============================================================
   Voting
============================================================ */

export const VOTING = {
    DEFAULT_DURATION_HOURS: 24,

    MIN_DURATION_HOURS: 1,

    MAX_DURATION_HOURS: 72,

    MINIMUM_VOTES: 3,
} as const;

/* ============================================================
   Scheduler
============================================================ */

export const SCHEDULER = {
    WORLD_TICK_SECONDS: 60,

    RESOURCE_TICK_SECONDS: 300,

    HERO_TICK_SECONDS: 600,

    AI_TICK_SECONDS: 900,

    DAILY_RESET_HOUR: 0,

    AUTOSAVE_SECONDS: 300,
} as const;

/* ============================================================
   AI
============================================================ */

export const AI = {
    MAX_ACTIONS_PER_TICK: 20,

    AGGRESSION: 0.6,

    EXPANSION: 0.7,

    TRADE: 0.4,

    RESEARCH: 0.5,
} as const;

/* ============================================================
   API
============================================================ */

export const API = {
    DEFAULT_PAGE_SIZE: 20,

    MAX_PAGE_SIZE: 100,

    REQUEST_TIMEOUT_MS: 10000,
} as const;

/* ============================================================
   Version
============================================================ */

export const GAME = {
    NAME: "Realmrise: Genesis",

    VERSION: "1.0.0",

    SAVE_VERSION: 1,
} as const;