import { useMemo } from "react";

import { usePlayer } from "./usePlayer";

/* ============================================================
   Resource Types
============================================================ */

export interface ResourceState {
    gold: number;
    food: number;
    wood: number;
    stone: number;
    iron: number;

    total: number;
}

export interface ResourceIncome {
    gold: number;
    food: number;
    wood: number;
    stone: number;
    iron: number;
}

export interface ResourceCapacity {
    gold: number;
    food: number;
    wood: number;
    stone: number;
    iron: number;
}

export interface ResourcePercentages {
    gold: number;
    food: number;
    wood: number;
    stone: number;
    iron: number;
}

export interface UseResourcesResult {
    resources: ResourceState;

    income: ResourceIncome;

    capacity: ResourceCapacity;

    percentages: ResourcePercentages;

    canAfford: (
        cost: Partial<ResourceState>
    ) => boolean;

    loading: boolean;

    initialized: boolean;

    error: unknown;

    refetch: () => Promise<unknown>;
}

/* ============================================================
   Hook
============================================================ */

export function useResources(
    username?: string
): UseResourcesResult {
    const {
        player,
        loading,
        error,
        refetch,
    } = usePlayer(username);

    /* ========================================================
       Resources
    ======================================================== */

    const resources = useMemo<ResourceState>(() => {
        if (!player) {
            return {
                gold: 0,
                food: 0,
                wood: 0,
                stone: 0,
                iron: 0,
                total: 0,
            };
        }

        const gold = player.gold ?? 0;
        const food = player.food ?? 0;
        const wood = player.wood ?? 0;
        const stone = player.stone ?? 0;
        const iron = player.iron ?? 0;

        return {
            gold,
            food,
            wood,
            stone,
            iron,

            total:
                gold +
                food +
                wood +
                stone +
                iron,
        };
    }, [player]);

    /* ========================================================
       Resource Income
    ======================================================== */

    const income = useMemo<ResourceIncome>(() => {
        if (!player) {
            return {
                gold: 0,
                food: 0,
                wood: 0,
                stone: 0,
                iron: 0,
            };
        }

        return {
            gold: player.goldIncome ?? 0,
            food: player.foodIncome ?? 0,
            wood: player.woodIncome ?? 0,
            stone: player.stoneIncome ?? 0,
            iron: player.ironIncome ?? 0,
        };
    }, [player]);

    /* ========================================================
       Capacity
    ======================================================== */

    const capacity = useMemo<ResourceCapacity>(() => {
        if (!player) {
            return {
                gold: 0,
                food: 0,
                wood: 0,
                stone: 0,
                iron: 0,
            };
        }

        return {
            gold: player.goldCapacity ?? Number.MAX_SAFE_INTEGER,
            food: player.foodCapacity ?? Number.MAX_SAFE_INTEGER,
            wood: player.woodCapacity ?? Number.MAX_SAFE_INTEGER,
            stone: player.stoneCapacity ?? Number.MAX_SAFE_INTEGER,
            iron: player.ironCapacity ?? Number.MAX_SAFE_INTEGER,
        };
    }, [player]);

    /* ========================================================
       Storage Percentages
    ======================================================== */

    const percentages =
        useMemo<ResourcePercentages>(() => {
            const percent = (
                amount: number,
                max: number
            ) => {
                if (max <= 0) {
                    return 0;
                }

                return Math.min(
                    100,
                    Math.round(
                        (amount / max) * 100
                    )
                );
            };

            return {
                gold: percent(
                    resources.gold,
                    capacity.gold
                ),

                food: percent(
                    resources.food,
                    capacity.food
                ),

                wood: percent(
                    resources.wood,
                    capacity.wood
                ),

                stone: percent(
                    resources.stone,
                    capacity.stone
                ),

                iron: percent(
                    resources.iron,
                    capacity.iron
                ),
            };
        }, [resources, capacity]);

    /* ========================================================
       Affordability Helper
    ======================================================== */

    function canAfford(
        cost: Partial<ResourceState>
    ): boolean {
        return (
            resources.gold >= (cost.gold ?? 0) &&
            resources.food >= (cost.food ?? 0) &&
            resources.wood >= (cost.wood ?? 0) &&
            resources.stone >= (cost.stone ?? 0) &&
            resources.iron >= (cost.iron ?? 0)
        );
    }

    /* ========================================================
       Return
    ======================================================== */

    return {
        resources,

        income,

        capacity,

        percentages,

        canAfford,

        loading,

        initialized: !!player,

        error,

        refetch,
    };
}