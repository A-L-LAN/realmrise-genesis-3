/**
 * ============================================================================
 * Realmrise: Genesis
 * Hero Model
 * ============================================================================
 * Represents a persistent hero that can lead armies, explore the world,
 * participate in quests, gain experience, collect equipment, and become
 * part of the world's permanent history.
 * ============================================================================
 */

export type HeroClass =
  | "Warrior"
  | "Knight"
  | "Paladin"
  | "Guardian"
  | "Ranger"
  | "Archer"
  | "Hunter"
  | "Assassin"
  | "Rogue"
  | "Mage"
  | "Sorcerer"
  | "Wizard"
  | "Druid"
  | "Priest"
  | "Monk"
  | "Necromancer"
  | "Berserker"
  | "Engineer";

export type HeroRarity =
  | "Common"
  | "Uncommon"
  | "Rare"
  | "Epic"
  | "Legendary"
  | "Mythic";

export type HeroStatus =
  | "Idle"
  | "Exploring"
  | "Traveling"
  | "Questing"
  | "Training"
  | "Defending"
  | "Attacking"
  | "Resting"
  | "Injured"
  | "Captured"
  | "Missing"
  | "Dead";

export interface HeroAttributes {
  strength: number;
  intelligence: number;
  agility: number;
  vitality: number;
  wisdom: number;
  charisma: number;
  luck: number;
}

export interface HeroEquipment {

  weapon?: string;

  armor?: string;

  helmet?: string;

  shield?: string;

  gloves?: string;

  boots?: string;

  accessory?: string;

  artifact?: string;
}

export interface HeroStatistics {

  battlesWon: number;

  battlesLost: number;

  enemiesDefeated: number;

  questsCompleted: number;

  regionsExplored: number;

  structuresBuilt: number;

  resourcesGathered: number;

  daysServed: number;
}

export interface Hero {

  /**
   * Identity
   */

  id: string;

  name: string;

  title: string;

  biography: string;

  portrait: string;

  class: HeroClass;

  rarity: HeroRarity;

  /**
   * Ownership
   */

  kingdomId: string;

  playerId: string;

  guildId?: string;

  /**
   * Progression
   */

  level: number;

  experience: number;

  experienceToNextLevel: number;

  /**
   * Core Stats
   */

  health: number;

  maxHealth: number;

  mana: number;

  maxMana: number;

  stamina: number;

  maxStamina: number;

  attack: number;

  defense: number;

  magic: number;

  resistance: number;

  speed: number;

  leadership: number;

  criticalChance: number;

  dodgeChance: number;

  /**
   * RPG Attributes
   */

  attributes: HeroAttributes;

  /**
   * Skills
   */

  skills: string[];

  unlockedAbilities: string[];

  passiveAbilities: string[];

  /**
   * Equipment
   */

  equipment: HeroEquipment;

  inventory: string[];

  /**
   * Gameplay State
   */

  currentRegionId?: string;

  currentCityId?: string;

  currentQuestId?: string;

  assignedArmyId?: string;

  status: HeroStatus;

  available: boolean;

  /**
   * Relationships
   */

  companions: string[];

  rivals: string[];

  mentor?: string;

  /**
   * Reputation
   */

  reputation: number;

  fame: number;

  loyalty: number;

  morale: number;

  /**
   * Traits
   */

  traits: string[];

  titles: string[];

  achievements: string[];

  /**
   * Persistent History
   */

  discoveredRegions: string[];

  completedQuests: string[];

  worldEventsParticipated: string[];

  legendaryMoments: string[];

  /**
   * Statistics
   */

  statistics: HeroStatistics;

  /**
   * Economy
   */

  upkeepCost: number;

  recruitmentCost: number;

  /**
   * Lifecycle
   */

  isLegendary: boolean;

  isAlive: boolean;

  retired: boolean;

  createdAt: number;

  updatedAt: number;

  lastActionAt: number;
}