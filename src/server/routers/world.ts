import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { StorageService } from "../services/StorageService";

export const worldRouter = router({
  /**
   * Entire world state
   */
  get: publicProcedure.query(async () => {
    return StorageService.getWorld();
  }),

  /**
   * World statistics
   */
  stats: publicProcedure.query(async () => {
    return StorageService.getWorldStats();
  }),

  /**
   * World map
   */
  map: publicProcedure.query(async () => {
    return StorageService.getWorldMap();
  }),

  /**
   * Get a single tile
   */
  tile: publicProcedure
    .input(
      z.object({
        x: z.number().int(),
        y: z.number().int(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getTile(input.x, input.y);
    }),

  /**
   * Visible map area
   */
  region: publicProcedure
    .input(
      z.object({
        minX: z.number().int(),
        minY: z.number().int(),
        maxX: z.number().int(),
        maxY: z.number().int(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getRegion(
        input.minX,
        input.minY,
        input.maxX,
        input.maxY
      );
    }),

  /**
   * World events
   */
  events: publicProcedure.query(async () => {
    return StorageService.getWorldEvents();
  }),

  /**
   * Single world event
   */
  event: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getWorldEvent(input.id);
    }),

  /**
   * World leaderboard
   */
  leaderboard: publicProcedure.query(async () => {
    return StorageService.getWorldLeaderboard();
  }),

  /**
   * Kingdoms in the world
   */
  kingdoms: publicProcedure.query(async () => {
    return StorageService.getKingdoms();
  }),

  /**
   * Guilds in the world
   */
  guilds: publicProcedure.query(async () => {
    return StorageService.getGuilds();
  }),

  /**
   * Active quests
   */
  quests: publicProcedure.query(async () => {
    return StorageService.getWorldQuests();
  }),

  /**
   * Heroes
   */
  heroes: publicProcedure.query(async () => {
    return StorageService.getWorldHeroes();
  }),

  /**
   * Cities
   */
  cities: publicProcedure.query(async () => {
    return StorageService.getWorldCities();
  }),

  /**
   * Resources available in the world
   */
  resources: publicProcedure.query(async () => {
    return StorageService.getWorldResources();
  }),

  /**
   * Current simulation status
   */
  simulation: publicProcedure.query(async () => {
    return StorageService.getSimulationStatus();
  }),

  /**
   * Current game day
   */
  day: publicProcedure.query(async () => {
    return StorageService.getCurrentDay();
  }),

  /**
   * World history/activity feed
   */
  history: publicProcedure.query(async () => {
    return StorageService.getWorldHistory();
  }),
});