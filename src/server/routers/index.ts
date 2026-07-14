import { router } from "../trpc";

import { playerRouter } from "./player";
import { kingdomRouter } from "./kingdom";
import { worldRouter } from "./world";
import { guildRouter } from "./guild";
import { battleRouter } from "./battle";
import { simulationRouter } from "./simulation";
import { tradeRouter } from "./trade";
import { researchRouter } from "./research";
import { recruitRouter } from "./recruit";
import { voteRouter } from "./vote";

/**
 * Root tRPC router for Realmrise: Genesis.
 *
 * Every feature-specific router is mounted here and becomes available
 * under the corresponding namespace.
 *
 * Examples:
 * - player.get
 * - kingdom.all
 * - world.get
 * - guild.all
 * - battle.attack
 * - simulation.tick
 * - trade.execute
 * - research.start
 * - recruit.unit
 * - vote.cast
 */
export const appRouter = router({
  /**
   * Player management
   */
  player: playerRouter,

  /**
   * Kingdom management
   */
  kingdom: kingdomRouter,

  /**
   * World state
   */
  world: worldRouter,

  /**
   * Guild management
   */
  guild: guildRouter,

  /**
   * Battles and combat
   */
  battle: battleRouter,

  /**
   * World simulation
   */
  simulation: simulationRouter,

  /**
   * Trading and marketplace
   */
  trade: tradeRouter,

  /**
   * Technology research
   */
  research: researchRouter,

  /**
   * Army recruitment
   */
  recruit: recruitRouter,

  /**
   * World governance and voting
   */
  vote: voteRouter,
});

/**
 * Root API type exported for the tRPC client.
 */
export type AppRouter = typeof appRouter;