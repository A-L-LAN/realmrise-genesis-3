import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { attackCommand } from "../commands/attack";
import { StorageService } from "../services/StorageService";

export const battleRouter = router({
  /**
   * Attack another kingdom/player
   */
  attack: publicProcedure
    .input(
      z.object({
        attacker: z.string(),
        defender: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return attackCommand(
        input.attacker,
        input.defender
      );
    }),

  /**
   * Battle history
   */
  history: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getBattleHistory(input.player);
    }),

  /**
   * Recent battles
   */
  recent: publicProcedure.query(async () => {
    return StorageService.getRecentBattles();
  }),

  /**
   * Battle by ID
   */
  get: publicProcedure
    .input(
      z.object({
        battleId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getBattle(input.battleId);
    }),

  /**
   * Active battles
   */
  active: publicProcedure.query(async () => {
    return StorageService.getActiveBattles();
  }),

  /**
   * Battle reports for a player
   */
  reports: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getBattleReports(input.player);
    }),

  /**
   * Battle statistics
   */
  stats: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getBattleStats(input.player);
    }),

  /**
   * Battle leaderboard
   */
  leaderboard: publicProcedure.query(async () => {
    return StorageService.getBattleLeaderboard();
  }),

  /**
   * Player victories
   */
  victories: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getVictories(input.player);
    }),

  /**
   * Player defeats
   */
  defeats: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getDefeats(input.player);
    }),

  /**
   * Current army status
   */
  army: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerArmy(input.player);
    }),
});