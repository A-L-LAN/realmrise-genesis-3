import { useCallback, useMemo } from "react";

import { trpc } from "../trpc";

import type { Kingdom } from "../../server/models/Kingdom";

/* ============================================================
   Kingdom Hook
============================================================ */

export interface KingdomStats {
    id: string;

    name: string;

    ruler: string;

    capital: string;

    population: number;

    cities: number;

    armies: number;

    heroes: number;

    guilds: number;

    territory: number;

    power: number;

    level: number;

    treasury: number;

    food: number;

    wood: number;

    stone: number;

    iron: number;

    gold: number;

    captured: boolean;
}

export interface UseKingdomResult {
    kingdom: Kingdom | undefined;

    loading: boolean;

    fetching: boolean;

    initialized: boolean;

    error: unknown;

    refetch: () => Promise<unknown>;

    refresh: () => Promise<unknown>;

    capture: (...args: any[]) => Promise<unknown>;

    rename: (...args: any[]) => Promise<unknown>;

    capturing: boolean;

    renaming: boolean;

    stats: KingdomStats;
}

/* ============================================================
   Hook
============================================================ */

export function useKingdom(
    id?: string
): UseKingdomResult {
    /* ========================================================
       Query
    ======================================================== */

    const kingdomQuery =
        trpc.kingdom.get.useQuery(
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

    const captureMutation =
        trpc.kingdom.capture.useMutation({
            onSuccess: () => {
                void kingdomQuery.refetch();
            },
        });

    const renameMutation =
        trpc.kingdom.rename.useMutation({
            onSuccess: () => {
                void kingdomQuery.refetch();
            },
        });

    /* ========================================================
       Helpers
    ======================================================== */

    const refresh = useCallback(async () => {
        return kingdomQuery.refetch();
    }, [kingdomQuery]);

    /* ========================================================
       Derived Statistics
    ======================================================== */

    const stats = useMemo<KingdomStats>(() => {
        const kingdom = kingdomQuery.data;

        if (!kingdom) {
            return {
                id: "",

                name: "",

                ruler: "",

                capital: "",

                population: 0,

                cities: 0,

                armies: 0,

                heroes: 0,

                guilds: 0,

                territory: 0,

                power: 0,

                level: 0,

                treasury: 0,

                food: 0,

                wood: 0,

                stone: 0,

                iron: 0,

                gold: 0,

                captured: false,
            };
        }

        return {
            id: kingdom.id,

            name: kingdom.name,

            ruler:
                kingdom.ruler ??
                kingdom.owner ??
                "",

            capital:
                kingdom.capital ??
                "",

            population:
                kingdom.population ?? 0,

            cities:
                kingdom.cities?.length ??
                kingdom.cityCount ??
                0,

            armies:
                kingdom.armies?.length ??
                kingdom.armyCount ??
                0,

            heroes:
                kingdom.heroes?.length ??
                kingdom.heroCount ??
                0,

            guilds:
                kingdom.guilds?.length ??
                kingdom.guildCount ??
                0,

            territory:
                kingdom.territory ?? 0,

            power:
                kingdom.power ?? 0,

            level:
                kingdom.level ?? 1,

            treasury:
                kingdom.treasury ?? 0,

            food:
                kingdom.food ?? 0,

            wood:
                kingdom.wood ?? 0,

            stone:
                kingdom.stone ?? 0,

            iron:
                kingdom.iron ?? 0,

            gold:
                kingdom.gold ?? 0,

            captured:
                kingdom.captured ?? false,
        };
    }, [kingdomQuery.data]);

    /* ========================================================
       Return
    ======================================================== */

    return {
        kingdom: kingdomQuery.data,

        loading:
            kingdomQuery.isLoading,

        fetching:
            kingdomQuery.isFetching,

        initialized:
            !!kingdomQuery.data,

        error:
            kingdomQuery.error,

        refetch:
            kingdomQuery.refetch,

        refresh,

        capture:
            captureMutation.mutateAsync,

        rename:
            renameMutation.mutateAsync,

        capturing:
            captureMutation.isPending,

        renaming:
            renameMutation.isPending,

        stats,
    };
}