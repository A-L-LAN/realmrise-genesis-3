import { Army } from "./Army";
import { City } from "./City";

/**
 * Government types
 */
export enum GovernmentType {
  KINGDOM = "Kingdom",
  EMPIRE = "Empire",
  REPUBLIC = "Republic",
  TRIBAL = "Tribal",
  THEOCRACY = "Theocracy",
  MERCHANT = "Merchant Republic",
}

/**
 * Diplomatic status
 */
export enum DiplomacyStatus {
  ALLY = "Ally",
  NEUTRAL = "Neutral",
  ENEMY = "Enemy",
  WAR = "War",
}

/**
 * Kingdom statistics
 */
export interface KingdomStats {
  discoveries: number;
  warsWon: number;
  warsLost: number;
  citiesFounded: number;
  buildingsConstructed: number;
  questsCompleted: number;
  technologiesResearched: number;
  dragonsDefeated: number;
  eventsParticipated: number;
}

/**
 * Resource storage
 */
export interface KingdomResources {
  gold: number;
  wood: number;
  stone: number;
  food: number;
  iron: number;
  crystal: number;
  mana: number;
}

/**
 * Kingdom economy
 */
export interface KingdomEconomy {
  income: number;
  expenses: number;
  tradeRoutes: number;
  prosperity: number;
}

/**
 * Technology tree progress
 */
export interface KingdomResearch {
  completed: string[];
  active?: string;
  progress: number;
}

/**
 * Kingdom diplomacy
 */
export interface KingdomDiplomacy {
  allies: string[];
  enemies: string[];
  neutral: string[];
  treaties: string[];
}

/**
 * Main Kingdom model
 */
export interface Kingdom {
  id: string;

  name: string;

  description: string;

  banner: string;

  motto: string;

  ruler: string;

  government: GovernmentType;

  level: number;

  influence: number;

  reputation: number;

  happiness: number;

  population: number;

  resources: KingdomResources;

  economy: KingdomEconomy;

  research: KingdomResearch;

  diplomacy: KingdomDiplomacy;

  cities: City[];

  armies: Army[];

  discoveredRegions: string[];

  worldEvents: string[];

  achievements: string[];

  titles: string[];

  stats: KingdomStats;

  foundedDay: number;

  createdAt: number;

  updatedAt: number;
}

/**
 * Creates a brand-new kingdom.
 */
export function createKingdom(
  id: string,
  name: string,
  ruler: string
): Kingdom {
  const now = Date.now();

  return {
    id,

    name,

    description: "A newly founded kingdom.",

    banner: "default",

    motto: "Together We Rise.",

    ruler,

    government: GovernmentType.KINGDOM,

    level: 1,

    influence: 0,

    reputation: 50,

    happiness: 75,

    population: 100,

    resources: {
      gold: 1000,
      wood: 500,
      stone: 500,
      food: 800,
      iron: 100,
      crystal: 25,
      mana: 0,
    },

    economy: {
      income: 50,
      expenses: 20,
      tradeRoutes: 0,
      prosperity: 50,
    },

    research: {
      completed: [],
      progress: 0,
    },

    diplomacy: {
      allies: [],
      enemies: [],
      neutral: [],
      treaties: [],
    },

    cities: [],

    armies: [],

    discoveredRegions: [],

    worldEvents: [],

    achievements: [],

    titles: [],

    stats: {
      discoveries: 0,
      warsWon: 0,
      warsLost: 0,
      citiesFounded: 0,
      buildingsConstructed: 0,
      questsCompleted: 0,
      technologiesResearched: 0,
      dragonsDefeated: 0,
      eventsParticipated: 0,
    },

    foundedDay: 1,

    createdAt: now,

    updatedAt: now,
  };
}

/**
 * Utility helpers
 */
export class KingdomUtils {
  static addInfluence(
    kingdom: Kingdom,
    amount: number
  ): Kingdom {
    kingdom.influence += amount;
    kingdom.updatedAt = Date.now();
    return kingdom;
  }

  static addPopulation(
    kingdom: Kingdom,
    amount: number
  ): Kingdom {
    kingdom.population += amount;
    kingdom.updatedAt = Date.now();
    return kingdom;
  }

  static addResources(
    kingdom: Kingdom,
    resources: Partial<KingdomResources>
  ): Kingdom {
    Object.entries(resources).forEach(([key, value]) => {
      if (value !== undefined) {
        kingdom.resources[key as keyof KingdomResources] += value;
      }
    });

    kingdom.updatedAt = Date.now();

    return kingdom;
  }

  static discoverRegion(
    kingdom: Kingdom,
    regionId: string
  ): Kingdom {
    if (!kingdom.discoveredRegions.includes(regionId)) {
      kingdom.discoveredRegions.push(regionId);
      kingdom.stats.discoveries++;
    }

    kingdom.updatedAt = Date.now();

    return kingdom;
  }

  static completeResearch(
    kingdom: Kingdom,
    technology: string
  ): Kingdom {
    if (!kingdom.research.completed.includes(technology)) {
      kingdom.research.completed.push(technology);
      kingdom.stats.technologiesResearched++;
    }

    kingdom.research.active = undefined;
    kingdom.research.progress = 0;
    kingdom.updatedAt = Date.now();

    return kingdom;
  }
}