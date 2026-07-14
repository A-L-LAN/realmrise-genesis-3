import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { voteCommand } from "../commands/vote";
import { StorageService } from "../services/StorageService";

export const voteRouter = router({
  /**
   * Cast a vote for a world event or proposal
   */
  cast: publicProcedure
    .input(
      z.object({
        player: z.string(),
        eventId: z.string(),
        choice: z.number().int().nonnegative(),
      })
    )
    .mutation(async ({ input }) => {
      return voteCommand(
        input.player,
        input.eventId,
        input.choice
      );
    }),

  /**
   * Get a single voting event
   */
  event: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getVoteEvent(
        input.eventId
      );
    }),

  /**
   * Get all active voting events
   */
  active: publicProcedure.query(async () => {
    return StorageService.getActiveVoteEvents();
  }),

  /**
   * Get completed voting events
   */
  completed: publicProcedure.query(async () => {
    return StorageService.getCompletedVoteEvents();
  }),

  /**
   * Get player's voting history
   */
  history: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getVoteHistory(
        input.player
      );
    }),

  /**
   * Get player's vote for a specific event
   */
  playerVote: publicProcedure
    .input(
      z.object({
        player: z.string(),
        eventId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerVote(
        input.player,
        input.eventId
      );
    }),

  /**
   * Current voting results
   */
  results: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getVoteResults(
        input.eventId
      );
    }),

  /**
   * Governance statistics
   */
  stats: publicProcedure.query(async () => {
    return StorageService.getVotingStats();
  }),

  /**
   * World governance overview
   */
  governance: publicProcedure.query(async () => {
    return StorageService.getGovernanceState();
  }),

  /**
   * Recent governance activity
   */
  feed: publicProcedure.query(async () => {
    return StorageService.getVotingFeed();
  }),
});