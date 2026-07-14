import { Hero } from "./Hero";

/**
 * Player professions
 */
export enum Profession {
  EXPLORER = "Explorer",
  BUILDER = "Builder",
  MERCHANT = "Merchant",
  GUARDIAN = "Guardian",
  HISTORIAN = "Historian",
  DIPLOMAT = "Diplomat",
  ARCHITECT = "Architect",
  INVENTOR = "Inventor",
}

/**
 * Player titles
 */
export enum PlayerTitle {
  NEWCOMER = "Newcomer",
  ADVENTURER = "Adventurer",
  EXPLORER = "Explorer",
  MASTER_BUILDER = "Master Builder",
  HISTORIAN = "Historian",
  DRAGON_SLAYER = "Dragon Slayer",
  LEGEND = "Legend",
}

/**
 * Player inventory
 */
export interface Inventory {
  gold: number;
  wood: number;
  stone: number;
  food: number;
  iron: number;
  crystal: number;
  mana: number;
}

/**
 * Daily actions
 */
export interface DailyActions {
  explored: boolean;
  built: boolean;
  voted: boolean;
  claimedReward: boolean;
  completedQuest: boolean;
}

/**
 * Player statistics
 */
export interface PlayerStats {
  discoveries: number;
  questsCompleted: number;
  buildingsConstructed: number;
  votesCast: number;
  warsParticipated: number;
  dragonsDefeated: number;
  influenceEarned: number;
  citiesFounded: number;
}

/**
 * Player settings
 */
export interface PlayerSettings {
  music: boolean;
  soundEffects: boolean;
  notifications: boolean;
  darkMode: boolean;
}

/**
 * Main Player model
 */
export interface Player {
  id: string;

  username: string;

  kingdomId: string;

  guildId?: string;

  profession: Profession;

  title: PlayerTitle;

  level: number;

  experience: number;

  influence: number;

  energy: number;

  maxEnergy: number;

  inventory: Inventory;

  heroes: Hero[];

  exploredTiles: string[];

  discoveredRegions: string[];

  completedQuests: string[];

  achievements: string[];

  cosmetics: string[];

  unlockedTitles: string[];

  dailyActions: DailyActions;

  stats: PlayerStats;

  settings: PlayerSettings;

  loginStreak: number;

  totalLogins: number;

  joinedAt: number;

  lastLogin: number;

  createdAt: number;

  updatedAt: number;
}

/**
 * Factory function
 */
export function createPlayer(
  id: string,
  username: string,
  kingdomId: string
): Player {
  const now = Date.now();

  return {
    id,

    username,

    kingdomId,

    profession: Profession.EXPLORER,

    title: PlayerTitle.NEWCOMER,

    level: 1,

    experience: 0,

    influence: 0,

    energy: 100,

    maxEnergy: 100,

    inventory: {
      gold: 500,
      wood: 100,
      stone: 100,
      food: 200,
      iron: 0,
      crystal: 0,
      mana: 0,
    },

    heroes: [],

    exploredTiles: [],

    discoveredRegions: [],

    completedQuests: [],

    achievements: [],

    cosmetics: [],

    unlockedTitles: [PlayerTitle.NEWCOMER],

    dailyActions: {
      explored: false,
      built: false,
      voted: false,
      claimedReward: false,
      completedQuest: false,
    },

    stats: {
      discoveries: 0,
      questsCompleted: 0,
      buildingsConstructed: 0,
      votesCast: 0,
      warsParticipated: 0,
      dragonsDefeated: 0,
      influenceEarned: 0,
      citiesFounded: 0,
    },

    settings: {
      music: true,
      soundEffects: true,
      notifications: true,
      darkMode: false,
    },

    loginStreak: 1,

    totalLogins: 1,

    joinedAt: now,

    lastLogin: now,

    createdAt: now,

    updatedAt: now,
  };
}

/**
 * Player helper methods
 */
export class PlayerUtils {
  static gainExperience(player: Player, amount: number): Player {
    player.experience += amount;

    while (player.experience >= player.level * 100) {
      player.experience -= player.level * 100;
      player.level++;
      player.maxEnergy += 10;
      player.energy = player.maxEnergy;
    }

    player.updatedAt = Date.now();

    return player;
  }

  static gainInfluence(player: Player, amount: number): Player {
    player.influence += amount;
    player.stats.influenceEarned += amount;
    player.updatedAt = Date.now();

    return player;
  }

  static spendEnergy(player: Player, amount: number): boolean {
    if (player.energy < amount) {
      return false;
    }

    player.energy -= amount;
    player.updatedAt = Date.now();

    return true;
  }

  static restoreEnergy(player: Player): Player {
    player.energy = player.maxEnergy;
    player.updatedAt = Date.now();

    return player;
  }

  static unlockAchievement(player: Player, achievement: string): Player {
    if (!player.achievements.includes(achievement)) {
      player.achievements.push(achievement);
    }

    player.updatedAt = Date.now();

    return player;
  }

  static discoverRegion(player: Player, regionId: string): Player {
    if (!player.discoveredRegions.includes(regionId)) {
      player.discoveredRegions.push(regionId);
      player.stats.discoveries++;
    }

    player.updatedAt = Date.now();

    return player;
  }

  static addResource(
    player: Player,
    resource: keyof Inventory,
    amount: number
  ): Player {
    player.inventory[resource] += amount;
    player.updatedAt = Date.now();

    return player;
  }

  static completeQuest(player: Player, questId: string): Player {
    if (!player.completedQuests.includes(questId)) {
      player.completedQuests.push(questId);
      player.stats.questsCompleted++;
      player.dailyActions.completedQuest = true;
    }

    player.updatedAt = Date.now();

    return player;
  }

  static resetDailyActions(player: Player): Player {
    player.dailyActions = {
      explored: false,
      built: false,
      voted: false,
      claimedReward: false,
      completedQuest: false,
    };

    player.energy = player.maxEnergy;

    player.updatedAt = Date.now();

    return player;
  }

  static login(player: Player): Player {
    player.lastLogin = Date.now();
    player.totalLogins++;
    player.updatedAt = Date.now();

    return player;
  }
}