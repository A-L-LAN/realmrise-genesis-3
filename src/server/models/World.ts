/**
 * ============================================================================
 * Realmrise: Genesis
 * World Model
 * ============================================================================
 * The World represents the persistent civilization shared by every player.
 * It evolves daily through simulation, community decisions, exploration,
 * diplomacy, economy, warfare, seasonal events, and procedural storytelling.
 * ============================================================================
 */

export type Season =
  | "Spring"
  | "Summer"
  | "Autumn"
  | "Winter";

export type WorldAge =
  | "Age of Dawn"
  | "Age of Kingdoms"
  | "Age of Discovery"
  | "Age of Empires"
  | "Age of Legends"
  | "Age of Innovation";

export type Weather =
  | "Clear"
  | "Cloudy"
  | "Rain"
  | "Storm"
  | "Snow"
  | "Blizzard"
  | "Fog"
  | "Heatwave"
  | "Drought"
  | "Volcanic Ash";

export type Biome =
  | "Forest"
  | "Mountain"
  | "Desert"
  | "Ocean"
  | "Swamp"
  | "Snow"
  | "Ruins"
  | "Volcano"
  | "Plains"
  | "Jungle"
  | "River"
  | "Canyon"
  | "Highlands"
  | "Tundra";

export type WorldEventType =
  | "Disaster"
  | "War"
  | "Diplomacy"
  | "Festival"
  | "Discovery"
  | "Research"
  | "Trade"
  | "Exploration"
  | "Legend"
  | "Seasonal";

export interface WorldChoice {

  id: string;

  text: string;

  votes: number;

  percentage: number;
}

export interface WorldEvent {

  /**
   * Identity
   */

  id: string;

  title: string;

  description: string;

  story: string;

  image?: string;

  /**
   * Classification
   */

  type: WorldEventType;

  severity: number;

  /**
   * Community Decision
   */

  choices: WorldChoice[];

  winningChoice?: string;

  /**
   * World Impact
   */

  affectedKingdoms: string[];

  affectedRegions: string[];

  rewards: string[];

  consequences: string[];

  /**
   * Lifecycle
   */

  executed: boolean;

  startedAt: number;

  endsAt?: number;

  executedAt?: number;
}

export interface WorldTile {

  /**
   * Identity
   */

  id: string;

  x: number;

  y: number;

  biome: Biome;

  elevation: number;

  discovered: boolean;

  exploredBy: string[];

  /**
   * Ownership
   */

  owner?: string;

  kingdomId?: string;

  cityId?: string;

  guildId?: string;

  /**
   * Gameplay
   */

  landmark?: string;

  dungeon?: string;

  wonder?: string;

  resources: string[];

  dangerLevel: number;

  fertility: number;

  movementCost: number;

  occupied: boolean;
}

export interface WorldStatistics {

  totalPopulation: number;

  totalKingdoms: number;

  totalCities: number;

  totalGuilds: number;

  totalPlayers: number;

  totalHeroes: number;

  totalArmies: number;

  totalWars: number;

  totalTrades: number;

  totalDiscoveries: number;

  totalQuestsCompleted: number;

  totalWorldEvents: number;
}

export interface WorldSimulation {

  currentTick: number;

  lastSimulationAt: number;

  nextSimulationAt: number;

  simulationSpeed: number;

  weatherEnabled: boolean;

  economyEnabled: boolean;

  diplomacyEnabled: boolean;

  warfareEnabled: boolean;

  explorationEnabled: boolean;

  aiNarrationEnabled: boolean;
}

export interface World {

  /**
   * Identity
   */

  id: string;

  name: string;

  description: string;

  seed: number;

  version: string;

  /**
   * Timeline
   */

  day: number;

  year: number;

  season: Season;

  age: WorldAge;

  weather: Weather;

  /**
   * Global Progress
   */

  worldInfluence: number;

  discoveredPercentage: number;

  prosperity: number;

  stability: number;

  dangerLevel: number;

  /**
   * World Entities
   */

  kingdoms: string[];

  guilds: string[];

  cities: string[];

  heroes: string[];

  armies: string[];

  activeQuests: string[];

  /**
   * Events
   */

  activeEvents: WorldEvent[];

  completedEvents: string[];

  history: string[];

  /**
   * World Map
   */

  width: number;

  height: number;

  map: WorldTile[];

  /**
   * Leaderboards
   */

  topKingdoms: string[];

  topGuilds: string[];

  legendaryHeroes: string[];

  greatestCities: string[];

  /**
   * Unlocks
   */

  unlockedBiomes: string[];

  unlockedTechnologies: string[];

  unlockedWorldWonders: string[];

  /**
   * Simulation
   */

  simulation: WorldSimulation;

  /**
   * Statistics
   */

  statistics: WorldStatistics;

  /**
   * Metadata
   */

  createdAt: number;

  updatedAt: number;
}