/**
 * ============================================================================
 * Realmrise: Genesis
 * City Model
 * ============================================================================
 * Cities are persistent settlements that grow through community decisions,
 * daily simulations, exploration, trade, and construction. They serve as
 * economic, military, and cultural centers within a kingdom.
 * ============================================================================
 */

export type CityType =
  | "Capital"
  | "Town"
  | "Village"
  | "Fortress"
  | "Harbor"
  | "Trading Post"
  | "Sacred City"
  | "Frontier";

export type CityStatus =
  | "Peaceful"
  | "Growing"
  | "Prosperous"
  | "UnderConstruction"
  | "UnderSiege"
  | "Recovering"
  | "Celebrating"
  | "Famine"
  | "Disaster";

export interface CityResources {

  gold: number;

  food: number;

  wood: number;

  stone: number;

  iron: number;

  crystal: number;
}

export interface CityProduction {

  foodPerDay: number;

  woodPerDay: number;

  stonePerDay: number;

  goldPerDay: number;

  researchPerDay: number;

  influencePerDay: number;
}

export interface CityStatistics {

  totalBuildings: number;

  completedProjects: number;

  tradeRoutes: number;

  warsSurvived: number;

  festivalsHeld: number;

  legendaryEvents: number;

  visitors: number;

  daysEstablished: number;
}

export interface City {

  /**
   * Identity
   */

  id: string;

  name: string;

  description: string;

  banner: string;

  type: CityType;

  /**
   * Ownership
   */

  kingdomId: string;

  owner: string;

  governor?: string;

  guildId?: string;

  /**
   * World Position
   */

  regionId: string;

  location: string;

  biome: string;

  /**
   * Progression
   */

  level: number;

  experience: number;

  population: number;

  populationCapacity: number;

  happiness: number;

  prosperity: number;

  influence: number;

  reputation: number;

  /**
   * Resources
   */

  resources: CityResources;

  production: CityProduction;

  /**
   * Buildings
   */

  buildings: string[];

  constructionQueue: string[];

  unlockedBuildings: string[];

  wonders: string[];

  monuments: string[];

  /**
   * Military
   */

  stationedArmyIds: string[];

  heroIds: string[];

  defenses: number;

  wallLevel: number;

  towerLevel: number;

  garrisonSize: number;

  /**
   * Economy
   */

  marketLevel: number;

  tradeRoutes: string[];

  storageCapacity: number;

  treasury: number;

  taxRate: number;

  /**
   * Research
   */

  researchedTechnologies: string[];

  activeResearch?: string;

  /**
   * Community
   */

  activeProjects: string[];

  completedProjects: string[];

  festivals: string[];

  historicalEvents: string[];

  achievements: string[];

  /**
   * Gameplay State
   */

  status: CityStatus;

  isCapital: boolean;

  isUnderAttack: boolean;

  isVisible: boolean;

  /**
   * Statistics
   */

  statistics: CityStatistics;

  /**
   * Lifecycle
   */

  foundedAt: number;

  createdAt: number;

  updatedAt: number;

  lastSimulationAt: number;
}