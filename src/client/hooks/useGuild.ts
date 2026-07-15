import { useCallback, useMemo } from "react";

import { trpc } from "../trpc";

import type { Guild } from "../../server/models/Guild";

/* ============================================================
   Guild Hook
============================================================ */

export interface GuildStats {
    id: string;
    name: string;

    leader: string;

    members: number;

    maxMembers: number;

    level: number;

    experience: number;

    treasury: number;

    power: number;

    wins: number;

    losses: number;

    description: string;

    public: boolean;
}

export interface UseGuildResult {
    guild: Guild | undefined;

    loading: boolean;

    fetching: boolean;

    initialized: boolean;

    error: unknown;

    refetch: () => Promise<unknown>;

    refresh: () => Promise<unknown>;

    createGuild: (...args: any[]) => Promise<unknown>;

    joinGuild: (...args: any[]) => Promise<unknown>;

    leaveGuild: (...args: any[]) => Promise<unknown>;

    creating: boolean;

    joining: boolean;

    leaving: boolean;

    stats: GuildStats;
}

/* ============================================================
   Hook
============================================================ */

export function useGuild(
    id?: string
): UseGuildResult {
    /* ========================================================
       Query
    ======================================================== */

    const guildQuery = trpc.guild.get.useQuery(
        {
            id: id ?? "",
        },
        {
            enabled: !!id,

            staleTime: 5_000,

            refetchInterval: 10_000,

            retry: 2,

            refetchOnReconnect: true,

            refetchOnWindowFocus: true,
        }
    );

    /* ========================================================
       Mutations
    ======================================================== */

    const createMutation =
        trpc.guild.create.useMutation({
            onSuccess: () => {
                void guildQuery.refetch();
            },
        });

    const joinMutation =
        trpc.guild.join.useMutation({
            onSuccess: () => {
                void guildQuery.refetch();
            },
        });

    const leaveMutation =
        trpc.guild.leave.useMutation({
            onSuccess: () => {
                void guildQuery.refetch();
            },
        });

    /* ========================================================
       Helpers
    ======================================================== */

    const refresh = useCallback(async () => {
        return guildQuery.refetch();
    }, [guildQuery]);

    /* ========================================================
       Derived Stats
    ======================================================== */

    const stats = useMemo<GuildStats>(() => {
        const guild = guildQuery.data;

        if (!guild) {
            return {
                id: "",

                name: "",

                leader: "",

                members: 0,

                maxMembers: 0,

                level: 0,

                experience: 0,

                treasury: 0,

                power: 0,

                wins: 0,

                losses: 0,

                description: "",

                public: true,
            };
        }

        return {
            id: guild.id,

            name: guild.name,

            leader:
                guild.leader ??
                guild.leaderUsername ??
                "",

            members:
                guild.members?.length ??
                guild.memberCount ??
                0,

            maxMembers:
                guild.maxMembers ?? 0,

            level:
                guild.level ?? 1,

            experience:
                guild.experience ?? 0,

            treasury:
                guild.treasury ?? 0,

            power:
                guild.power ?? 0,

            wins:
                guild.wins ?? 0,

            losses:
                guild.losses ?? 0,

            description:
                guild.description ?? "",

            public:
                guild.public ?? true,
        };
    }, [guildQuery.data]);

    /* ========================================================
       Return
    ======================================================== */

    return {
        guild: guildQuery.data,

        loading:
            guildQuery.isLoading,

        fetching:
            guildQuery.isFetching,

        initialized:
            !!guildQuery.data,

        error:
            guildQuery.error,

        refetch:
            guildQuery.refetch,

        refresh,

        createGuild:
            createMutation.mutateAsync,

        joinGuild:
            joinMutation.mutateAsync,

        leaveGuild:
            leaveMutation.mutateAsync,

        creating:
            createMutation.isPending,

        joining:
            joinMutation.isPending,

        leaving:
            leaveMutation.isPending,

        stats,
    };
}