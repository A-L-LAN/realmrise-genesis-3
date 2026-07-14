import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { DailySimulation } from "../simulation/DailySimulation";
import { WorldSimulation } from "../simulation/WorldSimulation";
import { StorageService } from "../services/StorageService";

export const simulationRouter = router({
  /**
   * Execute one daily simulation tick
   */
  tick: publicProcedure
    .mutation(async () => {
      return DailySimulation.run();
    }),

  /**
   * Execute a full world simulation cycle
   */
  world: publicProcedure
    .mutation(async () => {
      return WorldSimulation.run();
    }),

  /**
   * Run multiple simulation days
   */
  advance: publicProcedure
    .input(
      z.object({
        days: z.number().int().min(1).max(365),
      })
    )
    .mutation(async ({ input }) => {
      const results = [];

      for (let i = 0; i < input.days; i++) {
        results.push(await DailySimulation.run());
      }

      return {
        daysSimulated: input.days,
        results,
      };
    }),

  /**
   * Current simulation status
   */
  status: publicProcedure
    .query(async () => {
      return StorageService.getSimulationStatus();
    }),

  /**
   * Current world day
   */
  day: publicProcedure
    .query(async () => {
      return StorageService.getCurrentDay();
    }),

  /**
   * Simulation history
   */
  history: publicProcedure
    .query(async () => {
      return StorageService.getSimulationHistory();
    }),

  /**
   * Latest simulation events
   */
  events: publicProcedure
    .query(async () => {
      return StorageService.getSimulationEvents();
    }),

  /**
   * World statistics after simulation
   */
  stats: publicProcedure
    .query(async () => {
      return StorageService.getWorldStats();
    }),

  /**
   * World summary
   */
  summary: publicProcedure
    .query(async () => {
      return StorageService.getWorldSummary();
    }),

  /**
   * Reset the simulation
   */
  reset: publicProcedure
    .mutation(async () => {
      return StorageService.resetSimulation();
    }),
});