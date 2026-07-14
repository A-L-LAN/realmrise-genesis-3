/**
 * ============================================================================
 * Realmrise: Genesis
 * Army Model
 * ============================================================================
 * Armies defend kingdoms, explore the world, conquer territories, escort
 * caravans, and participate in world events. They evolve over time through
 * battles, experience, logistics, and leadership.
 * ============================================================================
 */

export type ArmyStatus =
  | "Idle"
  | "Recruiting"
  | "Training"
  | "Moving"
  | "Exploring"
  | "Patrolling"
  | "Defending"
  | "Attacking"
  | "Besieging"
  | "Returning"
  | "Resting"
  | "Resupplying"
  | "Destroyed";

export type ArmyFormation =
  | "Balanced"
  | "Defensive"
  | "Offensive"
  | "Phalanx"
  | "Skirmish"
  | "Ambush"
  | "Siege";

export interface ArmyUnits {

  soldiers: number;

  archers: number;

  cavalry: number;

  siege: number;

  scouts: number;

  engineers: number;

  healers: number;

  mages: number;
}

export interface ArmyResources {

  food: number;

  supplies: number;

  arrows: number;

  siegeAmmo: number;

  gold: number;
}

export interface ArmyStatistics {

  battlesFought: number;

  victories: number;

  defeats: number;

  enemiesDefeated: number;

  citiesCaptured: number;

  regionsExplored: number;

  distanceTravelled: number;

  worldEventsParticipated: number;
}

export interface Army {

  /**
   * Identity
   */

  id: string;

  name: string;

  description: string;

  banner: string;

  /**
   * Ownership
   */

  kingdomId: string;

  cityId?: string;

  guildId?: string;

  /**
   * Leadership
   */

  commander: string;

  captains: string[];

  heroes: string[];

  /**
   * Units
   */

  units: ArmyUnits;

  totalUnits: number;

  /**
   * Combat
   */

  level: number;

  experience: number;

  attack: number;

  defense: number;

  speed: number;

  morale: number;

  discipline: number;

  stamina: number;

  formation: ArmyFormation;

  /**
   * Logistics
   */

  resources: ArmyResources;

  upkeepCost: number;

  movementRange: number;

  visionRange: number;

  /**
   * World State
   */

  currentRegionId: string;

  destinationRegionId?: string;

  currentCityId?: string;

  currentQuestId?: string;

  assignedMission?: string;

  /**
   * Gameplay
   */

  status: ArmyStatus;

  isElite: boolean;

  canMove: boolean;

  canAttack: boolean;

  available: boolean;

  /**
   * History
   */

  conqueredRegions: string[];

  completedMissions: string[];

  battleHistory: string[];

  achievements: string[];

  /**
   * Statistics
   */

  statistics: ArmyStatistics;

  /**
   * Lifecycle
   */

  createdAt: number;

  updatedAt: number;

  lastMovedAt: number;

  lastBattleAt?: number;
}