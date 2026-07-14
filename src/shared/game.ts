// ============================================================================
// Realmrise: Genesis
// Shared Game Types
// src/types/game.ts
// ============================================================================

/* ============================================================================
   ENUMS / UNION TYPES
============================================================================ */

export type Biome =
  | "Forest"
  | "Mountain"
  | "Desert"
  | "Ocean"
  | "Swamp"
  | "Snow"
  | "Plains"
  | "Ruins"
  | "Volcano"
  | "Jungle"
  | "Savanna"
  | "Tundra"
  | "Crystal"
  | "Canyon";

export type Resource =
  | "Gold"
  | "Wood"
  | "Stone"
  | "Food"
  | "Iron"
  | "Mana"
  | "Crystal"
  | "Coal"
  | "Oil";

export type HeroClass =
  | "Warrior"
  | "Mage"
  | "Ranger"
  | "Paladin"
  | "Assassin"
  | "Necromancer"
  | "Priest"
  | "Engineer"
  | "Druid"
  | "Berserker";

export type BuildingType =
  | "TownHall"
  | "Farm"
  | "Mine"
  | "LumberMill"
  | "Barracks"
  | "Marketplace"
  | "Academy"
  | "Castle"
  | "Wall"
  | "Harbor"
  | "Forge"
  | "Temple"
  | "Stable"
  | "Tower"
  | "Workshop";

export type UnitType =
  | "Militia"
  | "Archer"
  | "Knight"
  | "Mage"
  | "Spearman"
  | "Catapult"
  | "Cavalry";

export type Weather =
  | "Sunny"
  | "Rain"
  | "Storm"
  | "Snow"
  | "Fog"
  | "Drought";

export type Season =
  | "Spring"
  | "Summer"
  | "Autumn"
  | "Winter";

export type DiplomacyStatus =
  | "War"
  | "Peace"
  | "Alliance"
  | "Trade"
  | "Neutral";

export type EventType =
  | "Battle"
  | "Disaster"
  | "Discovery"
  | "Festival"
  | "Diplomacy"
  | "Quest"
  | "Technology"
  | "Economy"
  | "Weather";

export type QuestDifficulty =
  | "Easy"
  | "Normal"
  | "Hard"
  | "Epic"
  | "Legendary";

/* ============================================================================
   BASIC TYPES
============================================================================ */

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface CameraState {
  zoom: number;
  x: number;
  y: number;
}

export interface Resources {
  Gold: number;
  Wood: number;
  Stone: number;
  Food: number;
  Iron: number;
  Mana: number;
  Crystal: number;
  Coal: number;
  Oil: number;
}

export interface Stats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
  intelligence: number;
  luck: number;
}

/* ============================================================================
   HEROES
============================================================================ */

export interface Hero {
  id: string;

  name: string;

  class: HeroClass;

  level: number;

  experience: number;

  rarity:
    | "Common"
    | "Rare"
    | "Epic"
    | "Legendary";

  stats: Stats;

  skills: string[];

  equipment: string[];

  health: number;

  morale: number;

  alive: boolean;

  position: Position;
}

/* ============================================================================
   BUILDINGS
============================================================================ */

export interface Building {
  id: string;

  type: BuildingType;

  level: number;

  health: number;

  constructionComplete: boolean;

  production?: Partial<Resources>;

  position: Position;
}

/* ============================================================================
   MILITARY
============================================================================ */

export interface ArmyUnit {

  id: string;

  type: UnitType;

  quantity: number;

  attack: number;

  defense: number;

  speed: number;
}

export interface Army {

  id: string;

  kingdomId: string;

  units: ArmyUnit[];

  commander?: string;

  position: Position;
}

/* ============================================================================
   WORLD
============================================================================ */

export interface Tile {

  id: string;

  biome: Biome;

  owner?: string;

  explored: boolean;

  occupied: boolean;

  elevation: number;

  movementCost: number;

  resources: Partial<Resources>;

  position: Position;
}

/* ============================================================================
   KINGDOM
============================================================================ */

export interface Kingdom {

  id: string;

  name: string;

  banner: string;

  ruler: string;

  level: number;

  population: number;

  happiness: number;

  influence: number;

  treasury: number;

  resources: Resources;

  heroes: Hero[];

  buildings: Building[];

  armies: Army[];

  technologies: string[];

  allies: string[];

  enemies: string[];

  discoveredTiles: string[];
}

/* ============================================================================
   PLAYER
============================================================================ */

export interface Player {

  id: string;

  username: string;

  kingdomId: string;

  level: number;

  experience: number;

  avatar: string;

  joinedAt: number;

  lastOnline: number;

  achievements: string[];

  premium: boolean;
}

/* ============================================================================
   DIPLOMACY
============================================================================ */

export interface Treaty {

  id: string;

  kingdomA: string;

  kingdomB: string;

  status: DiplomacyStatus;

  createdAt: number;

  expiresAt?: number;
}

/* ============================================================================
   QUESTS
============================================================================ */

export interface Quest {

  id: string;

  title: string;

  description: string;

  difficulty: QuestDifficulty;

  completed: boolean;

  reward: Partial<Resources>;

  experience: number;
}

/* ============================================================================
   WORLD EVENTS
============================================================================ */

export interface WorldEvent {

  id: string;

  title: string;

  description: string;

  type: EventType;

  timestamp: number;

  kingdomId?: string;

  rewards?: Partial<Resources>;
}

/* ============================================================================
   LEADERBOARD
============================================================================ */

export interface LeaderboardEntry {

  playerId: string;

  username: string;

  kingdomId: string;

  score: number;

  rank: number;
}

/* ============================================================================
   WORLD STATE
============================================================================ */

export interface WorldState {

  day: number;

  year: number;

  season: Season;

  weather: Weather;

  population: number;

  kingdoms: Kingdom[];

  worldMap: Tile[];

  events: WorldEvent[];

  treaties: Treaty[];

  leaderboards: LeaderboardEntry[];
}

/* ============================================================================
   GAME STATE
============================================================================ */

export interface GameState {

  player: Player;

  kingdom: Kingdom;

  world: WorldState;

  camera: CameraState;

  selectedHero?: Hero;

  selectedBuilding?: Building;

  selectedTile?: Tile;

  activeQuest?: Quest;

  loading: boolean;

  connected: boolean;

  lastSave: number;
}

/* ============================================================================
   NETWORK
============================================================================ */

export interface ServerResponse<T> {

  success: boolean;

  data?: T;

  error?: string;
}

export interface SocketMessage<T = unknown> {

  type: string;

  payload: T;

  timestamp: number;
}

/* ============================================================================
   GAME SETTINGS
============================================================================ */

export interface GameSettings {

  music: boolean;

  sound: boolean;

  notifications: boolean;

  fullscreen: boolean;

  language: string;

  zoomSensitivity: number;

  showFPS: boolean;
}