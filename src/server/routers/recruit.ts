import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { recruitCommand } from "../commands/recruit";
import { StorageService } from "../services/StorageService";

export const recruitRouter = router({
  /**
   * Recruit military units
   */
  unit: publicProcedure
    .input(
      z.object({
        player: z.string(),

        unit: z.string(),

        amount: z.number().int().positive(),
      })
    )
    .mutation(async ({ input }) => {
      return recruitCommand(
        input.player,
        input.unit,
        input.amount
      );
    }),

  /**
   * Recruit a hero
   */
  hero: publicProcedure
    .input(
      z.object({
        player: z.string(),
        heroId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.recruitHero(
        input.player,
        input.heroId
      );
    }),

  /**
   * Recruit a worker/citizen
   */
  worker: publicProcedure
    .input(
      z.object({
        player: z.string(),
        amount: z.number().int().positive(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.recruitWorkers(
        input.player,
        input.amount
      );
    }),

  /**
   * Recruitable military units
   */
  availableUnits: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getRecruitableUnits(
        input.player
      );
    }),

  /**
   * Available heroes
   */
  availableHeroes: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getRecruitableHeroes(
        input.player
      );
    }),

  /**
   * Player army
   */
  army: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerArmy(
        input.player
      );
    }),

  /**
   * Army statistics
   */
  stats: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getArmyStats(
        input.player
      );
    }),

  /**
   * Recruitment history
   */
  history: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getRecruitmentHistory(
        input.player
      );
    }),

  /**
   * Training queue
   */
  queue: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getRecruitmentQueue(
        input.player
      );
    }),

  /**
   * Current recruitment costs
   */
  costs: publicProcedure.query(async () => {
    return StorageService.getRecruitmentCosts();
  }),

  /**
   * Military leaderboard
   */
  leaderboard: publicProcedure.query(async () => {
    return StorageService.getMilitaryLeaderboard();
  }),
});