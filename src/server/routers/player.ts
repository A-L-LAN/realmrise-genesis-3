import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { StorageService } from "../services/StorageService";

export const playerRouter = router({
  /**
   * Get player by username
   */
  get: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayer(input.username);
    }),

  /**
   * Get player by ID
   */
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerById(input.id);
    }),

  /**
   * Create a new player
   */
  create: publicProcedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
        avatar: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.createPlayer({
        username: input.username,
        avatar: input.avatar,
      });
    }),

  /**
   * Update player profile
   */
  update: publicProcedure
    .input(
      z.object({
        username: z.string(),

        displayName: z.string().optional(),

        avatar: z.string().optional(),

        bio: z.string().max(250).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.updatePlayer(input.username, {
        displayName: input.displayName,
        avatar: input.avatar,
        bio: input.bio,
      });
    }),

  /**
   * Delete player
   */
  delete: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.deletePlayer(input.username);
    }),

  /**
   * Get all players
   */
  all: publicProcedure.query(async () => {
    return StorageService.getPlayers();
  }),

  /**
   * Top players
   */
  leaderboard: publicProcedure.query(async () => {
    return StorageService.getLeaderboard();
  }),

  /**
   * Recent player activity
   */
  activity: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerActivity(input.username);
    }),

  /**
   * Player statistics
   */
  stats: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerStats(input.username);
    }),

  /**
   * Current quests
   */
  quests: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerQuests(input.username);
    }),

  /**
   * Owned cities
   */
  cities: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerCities(input.username);
    }),

  /**
   * Heroes
   */
  heroes: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerHeroes(input.username);
    }),

  /**
   * Army
   */
  army: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerArmy(input.username);
    }),

  /**
   * Resources
   */
  resources: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerResources(input.username);
    }),
});