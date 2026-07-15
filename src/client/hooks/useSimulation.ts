import { useCallback, useMemo } from "react";

import { trpc } from "../trpc";

/* ============================================================
   Simulation Types
============================================================ */

export interface SimulationStats {
    day: number;
    tick: number;
    worldAge: number;

    activePlayers: number;
    kingdoms: number;
    guilds: number;

    battles: number;

    running: boolean;
    paused: boolean;
}

export interface UseSimulationResult {
    simulation: any;

    loading: boolean;

    fetching: boolean;

    initialized: boolean;

    error: unknown;

    refetch: () => Promise<unknown>;

    refresh: () => Promise<unknown>;

    tick: (...args: any[]) => Promise<unknown>;

    advanceDay: (...args: any[]) => Promise<unknown>;

    ticking: boolean;

    advancing: boolean;

    stats: SimulationStats;
}

/* ============================================================
   Simulation Hook
============================================================ */

export function useSimulation(): UseSimulationResult {
    /* ========================================================
       Query
    ======================================================== */

    const simulationQuery =
        trpc.simulation.status.useQuery(undefined, {
            staleTime: 2_000,

            refetchInterval: 3_000,

            retry: 2,

            refetchOnReconnect: true,

            refetchOnWindowFocus: true,
        });

    /* ========================================================
       Mutations
    ======================================================== */

    const tickMutation =
        trpc.simulation.tick.useMutation({
            onSuccess: () => {
                void simulationQuery.refetch();
            },
        });

    const advanceDayMutation =
        trpc.simulation.advanceDay.useMutation({
            onSuccess: () => {
                void simulationQuery.refetch();
            },
        });

    /* ========================================================
       Helpers
    ======================================================== */

    const refresh = useCallback(async () => {
        return simulationQuery.refetch();
    }, [simulationQuery]);

    /* ========================================================
       Derived Statistics
    ======================================================== */

    const stats = useMemo<SimulationStats>(() => {
        const simulation =
            simulationQuery.data;

        if (!simulation) {
            return {
                day: 0,

                tick: 0,

                worldAge: 0,

                activePlayers: 0,

                kingdoms: 0,

                guilds: 0,

                battles: 0,

                running: false,

                paused: false,
            };
        }

        return {
            day:
                simulation.day ?? 0,

            tick:
                simulation.tick ?? 0,

            worldAge:
                simulation.worldAge ??
                simulation.age ??
                0,

            activePlayers:
                simulation.activePlayers ??
                0,

            kingdoms:
                simulation.kingdoms ??
                0,

            guilds:
                simulation.guilds ??
                0,

            battles:
                simulation.activeBattles ??
                simulation.battles ??
                0,

            running:
                simulation.running ?? true,

            paused:
                simulation.paused ?? false,
        };
    }, [simulationQuery.data]);

    /* ========================================================
       Return
    ======================================================== */

    return {
        simulation:
            simulationQuery.data,

        loading:
            simulationQuery.isLoading,

        fetching:
            simulationQuery.isFetching,

        initialized:
            !!simulationQuery.data,

        error:
            simulationQuery.error,

        refetch:
            simulationQuery.refetch,

        refresh,

        tick:
            tickMutation.mutateAsync,

        advanceDay:
            advanceDayMutation.mutateAsync,

        ticking:
            tickMutation.isPending,

        advancing:
            advanceDayMutation.isPending,

        stats,
    };
}