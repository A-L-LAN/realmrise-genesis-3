/**
 * ============================================================================
 * Realmrise: Genesis
 * Guild Model
 * ============================================================================
 * Guilds are long-lived player organizations that collaborate on exploration,
 * warfare, construction, research, trade, and world events.
 * ============================================================================
 */

export type GuildType =
  | "Adventure"
  | "Military"
  | "Merchant"
  | "Research"
  | "Builders"
  | "Explorers"
  | "Diplomatic"
  | "Religious"
  | "Crafting"
  | "Mixed";

export type GuildVisibility =
  | "Public"
  | "InviteOnly"
  | "Private";

export interface GuildStatistics {
  totalMembers: number;

  activeMembers: number;

  kingdomsSupported: number;

  citiesFounded: number;

  regionsExplored: number;

  questsCompleted: number;

  battlesWon: number;

  battlesLost: number;

  worldEventsCompleted: number;

  monumentsBuilt: number;

  technologiesResearched: number;

  tradeRoutesEstablished: number;

  totalInfluenceEarned: number;
}

export interface GuildResources {
  gold: number;

  wood: number;

  stone: number;

  food: number;

  influence: number;
}

export interface Guild {

  /**
   * Identity
   */

  id: string;

  name: string;

  tag: string;

  description: string;

  motto: string;

  banner: string;

  emblem: string;

  type: GuildType;

  visibility: GuildVisibility;

  /**
   * Leadership
   */

  founder: string;

  leader: string;

  officers: string[];

  elders: string[];

  members: string[];

  pendingInvites: string[];

  /**
   * World Ownership
   */

  kingdomId: string;

  headquarters?: string;

  ownedCities: string[];

  ownedRegions: string[];

  monuments: string[];

  /**
   * Progression
   */

  level: number;

  experience: number;

  influence: number;

  reputation: number;

  prestige: number;

  ranking: number;

  /**
   * Resources
   */

  treasury: GuildResources;

  /**
   * Activities
   */

  activeProjects: string[];

  completedProjects: string[];

  activeQuests: string[];

  completedQuests: string[];

  activeEvents: string[];

  /**
   * Diplomacy
   */

  alliedGuilds: string[];

  rivalGuilds: string[];

  treaties: string[];

  /**
   * Unlocks
   */

  unlockedPerks: string[];

  technologies: string[];

  guildBonuses: string[];

  /**
   * Community
   */

  announcements: string[];

  achievements: string[];

  legendaryMembers: string[];

  historicalEvents: string[];

  /**
   * Statistics
   */

  statistics: GuildStatistics;

  /**
   * Lifecycle
   */

  isRecruiting: boolean;

  isActive: boolean;

  createdAt: number;

  updatedAt: number;

  lastActivityAt: number;
}