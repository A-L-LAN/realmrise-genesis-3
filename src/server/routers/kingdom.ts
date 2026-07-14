import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { StorageService } from "../services/StorageService";

export const kingdomRouter = router({
  /**
   * Get kingdom by ID
   */
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdom(input.id);
    }),

  /**
   * Get kingdom owned by a player
   */
  getByPlayer: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerKingdom(input.username);
    }),

  /**
   * Get all kingdoms
   */
  all: publicProcedure.query(async () => {
    return StorageService.getKingdoms();
  }),

  /**
   * Create a kingdom
   */
  create: publicProcedure
    .input(
      z.object({
        owner: z.string(),
        name: z.string().min(3).max(40),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.createKingdom({
        owner: input.owner,
        name: input.name,
      });
    }),

  /**
   * Rename kingdom
   */
  rename: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
        name: z.string().min(3).max(40),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.renameKingdom(
        input.kingdomId,
        input.name
      );
    }),

  /**
   * Delete kingdom
   */
  delete: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.deleteKingdom(input.kingdomId);
    }),

  /**
   * Kingdom cities
   */
  cities: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdomCities(input.kingdomId);
    }),

  /**
   * Kingdom heroes
   */
  heroes: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdomHeroes(input.kingdomId);
    }),

  /**
   * Kingdom army
   */
  army: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdomArmy(input.kingdomId);
    }),

  /**
   * Kingdom resources
   */
  resources: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdomResources(input.kingdomId);
    }),

  /**
   * Kingdom research
   */
  research: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdomResearch(input.kingdomId);
    }),

  /**
   * Kingdom buildings
   */
  buildings: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdomBuildings(input.kingdomId);
    }),

  /**
   * Kingdom activity log
   */
  activity: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdomActivity(input.kingdomId);
    }),

  /**
   * Kingdom statistics
   */
  stats: publicProcedure
    .input(
      z.object({
        kingdomId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getKingdomStats(input.kingdomId);
    }),

  /**
   * Top kingdoms
   */
  leaderboard: publicProcedure.query(async () => {
    return StorageService.getKingdomLeaderboard();
  }),
});