import { useCallback, useMemo } from "react";

import { trpc } from "../trpc";

import type { World } from "../../server/models/World";

/* ============================================================
   World Hook
============================================================ */

export interface UseWorldResult {
    world: World | undefined;

    loading: boolean;

    fetching: boolean;

    initialized: boolean;

    error: unknown;

    refetch: () => Promise<unknown>;

    refresh: () => Promise<unknown>;

    initializeWorld: () => Promise<unknown>;

    resetWorld: () => Promise<unknown>;

    initializing: boolean;

    resetting: boolean;

    stats: {
        age: number;
        day: number;
        width: number;
        height: number;
        players: number;
        kingdoms: number;
        guilds: number;
        paused: boolean;
    };
}

export function useWorld(): UseWorldResult {
    /* ========================================================
       Queries
    ======================================================== */

    const worldQuery = trpc.world.get.useQuery(undefined, {
        staleTime: 5_000,
        refetchInterval: 5_000,
        retry: 2,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    /* ========================================================
       Mutations
    ======================================================== */

    const initializeMutation =
        trpc.world.initialize.useMutation({
            onSuccess: () => {
                void worldQuery.refetch();
            },
        });

    const resetMutation =
        trpc.world.reset.useMutation({
            onSuccess: () => {
                void worldQuery.refetch();
            },
        });

    /* ========================================================
       Helpers
    ======================================================== */

    const refresh = useCallback(async () => {
        return worldQuery.refetch();
    }, [worldQuery]);

    /* ========================================================
       Derived Statistics
    ======================================================== */

    const stats = useMemo(() => {
        const world = worldQuery.data;

        if (!world) {
            return {
                age: 0,
                day: 0,
                width: 0,
                height: 0,
                players: 0,
                kingdoms: 0,
                guilds: 0,
                paused: false,
            };
        }

        return {
            age: world.age ?? 0,
            day: world.day ?? 0,
            width: world.width ?? 0,
            height: world.height ?? 0,

            players:
                world.players?.length ??
                world.playerCount ??
                0,

            kingdoms:
                world.kingdoms?.length ??
                world.kingdomCount ??
                0,

            guilds:
                world.guilds?.length ??
                world.guildCount ??
                0,

            paused:
                world.paused ?? false,
        };
    }, [worldQuery.data]);

    /* ========================================================
       Return
    ======================================================== */

    return {
        world: worldQuery.data,

        loading: worldQuery.isLoading,

        fetching: worldQuery.isFetching,

        initialized: !!worldQuery.data,

        error: worldQuery.error,

        refetch: worldQuery.refetch,

        refresh,

        initializeWorld:
            initializeMutation.mutateAsync,

        resetWorld:
            resetMutation.mutateAsync,

        initializing:
            initializeMutation.isPending,

        resetting:
            resetMutation.isPending,

        stats,
    };
}