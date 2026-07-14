import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { StorageService } from "../services/StorageService";

export const guildRouter = router({
  /**
   * Get guild by ID
   */
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getGuild(input.id);
    }),

  /**
   * Get guild by name
   */
  getByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getGuildByName(input.name);
    }),

  /**
   * Get guild owned by player
   */
  getByLeader: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getPlayerGuild(input.username);
    }),

  /**
   * Get all guilds
   */
  all: publicProcedure.query(async () => {
    return StorageService.getGuilds();
  }),

  /**
   * Create guild
   */
  create: publicProcedure
    .input(
      z.object({
        leader: z.string(),
        name: z.string().min(3).max(40),
        description: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.createGuild({
        leader: input.leader,
        name: input.name,
        description: input.description,
      });
    }),

  /**
   * Update guild
   */
  update: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
        name: z.string().min(3).max(40).optional(),
        description: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.updateGuild(input.guildId, {
        name: input.name,
        description: input.description,
      });
    }),

  /**
   * Delete guild
   */
  delete: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.deleteGuild(input.guildId);
    }),

  /**
   * Join guild
   */
  join: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.joinGuild(
        input.guildId,
        input.username
      );
    }),

  /**
   * Leave guild
   */
  leave: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.leaveGuild(
        input.guildId,
        input.username
      );
    }),

  /**
   * Invite player
   */
  invite: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.inviteToGuild(
        input.guildId,
        input.username
      );
    }),

  /**
   * Kick member
   */
  kick: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.kickGuildMember(
        input.guildId,
        input.username
      );
    }),

  /**
   * Transfer guild leadership
   */
  transferLeadership: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
        newLeader: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return StorageService.transferGuildLeadership(
        input.guildId,
        input.newLeader
      );
    }),

  /**
   * Guild members
   */
  members: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getGuildMembers(input.guildId);
    }),

  /**
   * Guild activity feed
   */
  activity: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getGuildActivity(input.guildId);
    }),

  /**
   * Guild statistics
   */
  stats: publicProcedure
    .input(
      z.object({
        guildId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return StorageService.getGuildStats(input.guildId);
    }),

  /**
   * Guild leaderboard
   */
  leaderboard: publicProcedure.query(async () => {
    return StorageService.getGuildLeaderboard();
  }),
});