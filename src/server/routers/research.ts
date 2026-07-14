import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { researchCommand } from "../commands/research";
import { StorageService } from "../services/StorageService";

export const researchRouter = router({
  /**
   * Start researching a technology
   */
  start: publicProcedure
    .input(
      z.object({
        player: z.string(),
        technology: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return researchCommand(
        input.player,
        input.technology
      );
    }),

  /**
   * Cancel current research
   */
  cancel: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.cancelResearch(input.player);
    }),

  /**
   * Complete research instantly
   * (Admin/debug/future premium feature)
   */
  complete: publicProcedure
    .input(
      z.object({
        player: z.string(),
        technology: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.completeResearch(
        input.player,
        input.technology
      );
    }),

  /**
   * Current research
   */
  current: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getCurrentResearch(
        input.player
      );
    }),

  /**
   * Completed technologies
   */
  completed: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getCompletedResearch(
        input.player
      );
    }),

  /**
   * Available technologies
   */
  available: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getAvailableResearch(
        input.player
      );
    }),

  /**
   * Technology details
   */
  technology: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getTechnology(
        input.id
      );
    }),

  /**
   * Entire technology tree
   */
  tree: publicProcedure
    .query(async () => {
      return StorageService.getResearchTree();
    }),

  /**
   * Research queue
   */
  queue: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getResearchQueue(
        input.player
      );
    }),

  /**
   * Research history
   */
  history: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getResearchHistory(
        input.player
      );
    }),

  /**
   * Research statistics
   */
  stats: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getResearchStats(
        input.player
      );
    }),

  /**
   * Global research leaderboard
   */
  leaderboard: publicProcedure
    .query(async () => {
      return StorageService.getResearchLeaderboard();
    }),
});