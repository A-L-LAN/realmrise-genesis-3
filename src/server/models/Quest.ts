/**
 * ============================================================================
 * Realmrise: Genesis
 * Quest Model
 * ============================================================================
 * Quests provide daily objectives, exploration goals, guild missions,
 * story campaigns, seasonal events, and world-changing adventures.
 * They are a primary driver of progression and player retention.
 * ============================================================================
 */

export type QuestType =
  | "Daily"
  | "Weekly"
  | "Story"
  | "Exploration"
  | "Building"
  | "Research"
  | "Trade"
  | "Guild"
  | "Kingdom"
  | "Hero"
  | "World"
  | "Seasonal"
  | "Legendary";

export type QuestDifficulty =
  | "Easy"
  | "Normal"
  | "Hard"
  | "Expert"
  | "Epic"
  | "Legendary";

export type QuestStatus =
  | "Available"
  | "Accepted"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Expired";

export interface QuestRewards {

  experience: number;

  influence: number;

  gold: number;

  food: number;

  wood: number;

  stone: number;

  reputation: number;

  items: string[];

  heroes: string[];

  technologies: string[];

  cosmetics: string[];
}

export interface QuestRequirements {

  minimumPlayerLevel: number;

  minimumKingdomLevel: number;

  requiredProfession?: string;

  requiredGuild?: boolean;

  requiredHero?: boolean;

  requiredTechnologies: string[];

  requiredRegions: string[];
}

export interface QuestProgress {

  current: number;

  target: number;

  percentage: number;
}

export interface Quest {

  /**
   * Identity
   */

  id: string;

  title: string;

  description: string;

  story: string;

  image: string;

  /**
   * Classification
   */

  type: QuestType;

  difficulty: QuestDifficulty;

  status: QuestStatus;

  /**
   * Ownership
   */

  kingdomId?: string;

  guildId?: string;

  playerId?: string;

  heroId?: string;

  /**
   * Gameplay
   */

  objective: string;

  objectiveType: string;

  progress: QuestProgress;

  repeatable: boolean;

  cooperative: boolean;

  /**
   * Requirements
   */

  requirements: QuestRequirements;

  /**
   * Rewards
   */

  rewards: QuestRewards;

  /**
   * World Integration
   */

  regionId?: string;

  cityId?: string;

  worldEventId?: string;

  prerequisiteQuests: string[];

  nextQuests: string[];

  /**
   * Community
   */

  contributors: string[];

  completedBy: string[];

  communityVotes: number;

  /**
   * Time
   */

  startsAt: number;

  expiresAt?: number;

  completedAt?: number;

  /**
   * Daily Simulation
   */

  contributesToWorldProgress: boolean;

  unlocksWorldEvent: boolean;

  generatesStory: boolean;

  /**
   * Metadata
   */

  tags: string[];

  achievementsUnlocked: string[];

  createdAt: number;

  updatedAt: number;
}