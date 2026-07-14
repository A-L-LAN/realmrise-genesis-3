import { redis } from "@devvit/web/server";

import type { World } from "../models/World";
import type { Player } from "../models/Player";
import type { Kingdom } from "../models/Kingdom";
import type { Guild } from "../models/Guild";
import type { Hero } from "../models/Hero";

/* ============================================================
   Storage Service
============================================================ */

export class StorageService {
    /* ========================================================
       Generic Helpers
    ======================================================== */

    static async get<T>(key: string): Promise<T | null> {
        const value = await redis.get(key);

        if (!value) {
            return null;
        }

        return JSON.parse(value) as T;
    }

    static async set(key: string, value: unknown): Promise<void> {
        await redis.set(
            key,
            JSON.stringify(value)
        );
    }

    static async delete(key: string): Promise<void> {
        await redis.del(key);
    }

    static async exists(key: string): Promise<boolean> {
        return (await redis.exists(key)) > 0;
    }

    static async increment(
        key: string,
        amount = 1
    ): Promise<number> {
        return await redis.incrBy(
            key,
            amount
        );
    }

    /* ========================================================
       Key Builders
    ======================================================== */

    static playerKey(username: string): string {
        return `player:${username.toLowerCase()}`;
    }

    static kingdomKey(id: string): string {
        return `kingdom:${id}`;
    }

    static guildKey(id: string): string {
        return `guild:${id}`;
    }

    static heroKey(id: string): string {
        return `hero:${id}`;
    }

    static worldKey(): string {
        return "world";
    }

    /* ========================================================
       World
    ======================================================== */

    static loadWorld(): Promise<World | null> {
        return this.get<World>(
            this.worldKey()
        );
    }

    static saveWorld(
        world: World
    ): Promise<void> {
        return this.set(
            this.worldKey(),
            world
        );
    }

    static deleteWorld(): Promise<void> {
        return this.delete(
            this.worldKey()
        );
    }

    /* ========================================================
       Players
    ======================================================== */

    static loadPlayer(
        username: string
    ): Promise<Player | null> {
        return this.get<Player>(
            this.playerKey(username)
        );
    }

    static savePlayer(
        player: Player
    ): Promise<void> {
        return this.set(
            this.playerKey(player.username),
            player
        );
    }

    static deletePlayer(
        username: string
    ): Promise<void> {
        return this.delete(
            this.playerKey(username)
        );
    }

    /* ========================================================
       Kingdoms
    ======================================================== */

    static loadKingdom(
        id: string
    ): Promise<Kingdom | null> {
        return this.get<Kingdom>(
            this.kingdomKey(id)
        );
    }

    static saveKingdom(
        kingdom: Kingdom
    ): Promise<void> {
        return this.set(
            this.kingdomKey(kingdom.id),
            kingdom
        );
    }

    /* ========================================================
       Guilds
    ======================================================== */

    static loadGuild(
        id: string
    ): Promise<Guild | null> {
        return this.get<Guild>(
            this.guildKey(id)
        );
    }

    static saveGuild(
        guild: Guild
    ): Promise<void> {
        return this.set(
            this.guildKey(guild.id),
            guild
        );
    }

    /* ========================================================
       Heroes
    ======================================================== */

    static loadHero(
        id: string
    ): Promise<Hero | null> {
        return this.get<Hero>(
            this.heroKey(id)
        );
    }

    static saveHero(
        hero: Hero
    ): Promise<void> {
        return this.set(
            this.heroKey(hero.id),
            hero
        );
    }

    /* ========================================================
       Batch Helpers
    ======================================================== */

    static async getMany<T>(
        keys: string[]
    ): Promise<(T | null)[]> {
        const values = await redis.mGet(keys);

        return values.map(value =>
            value
                ? (JSON.parse(value) as T)
                : null
        );
    }

    static async setMany(
        entries: Record<string, unknown>
    ): Promise<void> {
        const serialized: Record<string, string> = {};

        for (const [key, value] of Object.entries(entries)) {
            serialized[key] = JSON.stringify(value);
        }

        await redis.mSet(serialized);
    }

    /* ========================================================
       Maintenance
    ======================================================== */

    static async clearWorld(): Promise<void> {
        await redis.del(
            "world",
            "leaderboard",
            "daily-events"
        );
    }
}