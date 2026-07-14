import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { tradeCommand } from "../commands/trade";
import { StorageService } from "../services/StorageService";

export const tradeRouter = router({
  /**
   * Execute a trade
   */
  execute: publicProcedure
    .input(
      z.object({
        player: z.string(),

        offer: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      return tradeCommand(
        input.player,
        input.offer
      );
    }),

  /**
   * Create a market offer
   */
  createOffer: publicProcedure
    .input(
      z.object({
        player: z.string(),

        resource: z.string(),

        amount: z.number().positive(),

        price: z.number().positive(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.createTradeOffer({
        player: input.player,
        resource: input.resource,
        amount: input.amount,
        price: input.price,
      });
    }),

  /**
   * Cancel an offer
   */
  cancelOffer: publicProcedure
    .input(
      z.object({
        offerId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.cancelTradeOffer(
        input.offerId
      );
    }),

  /**
   * Accept an offer
   */
  acceptOffer: publicProcedure
    .input(
      z.object({
        player: z.string(),
        offerId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.acceptTradeOffer(
        input.player,
        input.offerId
      );
    }),

  /**
   * Get trade offer
   */
  getOffer: publicProcedure
    .input(
      z.object({
        offerId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getTradeOffer(
        input.offerId
      );
    }),

  /**
   * Marketplace
   */
  marketplace: publicProcedure
    .query(async () => {
      return StorageService.getMarketplace();
    }),

  /**
   * Active offers
   */
  offers: publicProcedure
    .query(async () => {
      return StorageService.getTradeOffers();
    }),

  /**
   * Player offers
   */
  playerOffers: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerTradeOffers(
        input.player
      );
    }),

  /**
   * Trade history
   */
  history: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getTradeHistory(
        input.player
      );
    }),

  /**
   * Market prices
   */
  prices: publicProcedure
    .query(async () => {
      return StorageService.getMarketPrices();
    }),

  /**
   * Trade statistics
   */
  stats: publicProcedure
    .input(
      z.object({
        player: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getTradeStats(
        input.player
      );
    }),

  /**
   * Global trade leaderboard
   */
  leaderboard: publicProcedure
    .query(async () => {
      return StorageService.getTradeLeaderboard();
    }),
});