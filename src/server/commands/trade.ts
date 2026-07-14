/**
 * ------------------------------------------------------------
 * trade.ts
 * Realmrise: Genesis
 * Kingdom Resource Trading Command
 * ------------------------------------------------------------
 *
 * Handles:
 *  - Resource trading
 *  - Trade validation
 *  - Resource transfer
 *  - Economy updates
 *  - Trade history
 *  - Notifications
 *  - Achievements
 *  - Activity feeds
 *
 * Part 1
 * ------------------------------------------------------------
 */

import { randomUUID } from "crypto";

import {
    CommandResult,
    Kingdom,
    ResourceCost,
    TradeOffer,
    Notification
} from "../types";

import {
    getKingdom,
    saveKingdom
} from "../database/kingdoms";

import {
    unlockAchievements
} from "../services/achievements";

import {
    createNotification
} from "../services/notifications";

import {
    recordKingdomHistory
} from "../services/history";

import {
    logger
} from "../utils/logger";

/* ============================================================
   Constants
============================================================ */

const HISTORY_CATEGORY = "trade";

/* ============================================================
   Helper Functions
============================================================ */

function hasEnoughResources(
    kingdom: Kingdom,
    resources: ResourceCost
): boolean {

    return (
        kingdom.gold >= resources.gold &&
        kingdom.food >= resources.food &&
        kingdom.wood >= resources.wood &&
        kingdom.stone >= resources.stone
    );
}

function deductResources(
    kingdom: Kingdom,
    resources: ResourceCost
): void {

    kingdom.gold -= resources.gold;
    kingdom.food -= resources.food;
    kingdom.wood -= resources.wood;
    kingdom.stone -= resources.stone;
}

function addResources(
    kingdom: Kingdom,
    resources: ResourceCost
): void {

    kingdom.gold += resources.gold;
    kingdom.food += resources.food;
    kingdom.wood += resources.wood;
    kingdom.stone += resources.stone;
}

function isEmptyTrade(
    resources: ResourceCost
): boolean {

    return (
        resources.gold <= 0 &&
        resources.food <= 0 &&
        resources.wood <= 0 &&
        resources.stone <= 0
    );
}

/* ============================================================
   Main Command
============================================================ */

export async function tradeResources(
    fromKingdom: string,
    toKingdom: string,
    offer: TradeOffer
): Promise<CommandResult> {

    try {

        if (fromKingdom === toKingdom) {
            return {
                success: false,
                message: "A kingdom cannot trade with itself."
            };
        }

        const sender =
            await getKingdom(fromKingdom);

        if (!sender) {
            return {
                success: false,
                message: "Source kingdom not found."
            };
        }

        const receiver =
            await getKingdom(toKingdom);

        if (!receiver) {
            return {
                success: false,
                message: "Destination kingdom not found."
            };
        }

        if (
            isEmptyTrade(
                offer.resources
            )
        ) {
            return {
                success: false,
                message:
                    "Trade offer contains no resources."
            };
        }

        if (
            !hasEnoughResources(
                sender,
                offer.resources
            )
        ) {
            return {
                success: false,
                message:
                    "The source kingdom lacks the required resources."
            };
        }

        const now = Date.now();

                /* ----------------------------------------------------
           Execute Resource Transfer
        ---------------------------------------------------- */

        deductResources(
            sender,
            offer.resources
        );

        addResources(
            receiver,
            offer.resources
        );

        /* ----------------------------------------------------
           Economy Statistics
        ---------------------------------------------------- */

        sender.economy ??= {
            totalGoldSpent: 0,
            totalWoodSpent: 0,
            totalStoneSpent: 0,
            totalFoodSpent: 0,
            totalTradesSent: 0,
            totalTradesReceived: 0
        };

        receiver.economy ??= {
            totalGoldSpent: 0,
            totalWoodSpent: 0,
            totalStoneSpent: 0,
            totalFoodSpent: 0,
            totalTradesSent: 0,
            totalTradesReceived: 0
        };

        sender.economy.totalTradesSent++;
        receiver.economy.totalTradesReceived++;

        /* ----------------------------------------------------
           Trade Logs
        ---------------------------------------------------- */

        sender.tradeHistory ??= [];
        receiver.tradeHistory ??= [];

        const tradeId = randomUUID();

        const tradeRecord = {
            id: tradeId,
            fromKingdom: sender.id,
            toKingdom: receiver.id,
            resources: { ...offer.resources },
            note: offer.note ?? "",
            createdAt: now
        };

        sender.tradeHistory.unshift(tradeRecord);

        receiver.tradeHistory.unshift(tradeRecord);

        if (sender.tradeHistory.length > 500) {
            sender.tradeHistory.length = 500;
        }

        if (receiver.tradeHistory.length > 500) {
            receiver.tradeHistory.length = 500;
        }

        /* ----------------------------------------------------
           Kingdom History
        ---------------------------------------------------- */

        await recordKingdomHistory(
            sender.id,
            {
                id: randomUUID(),
                category: HISTORY_CATEGORY,
                title: "Resources Sent",
                description:
                    `${sender.name} sent resources to ${receiver.name}.`,
                createdAt: now
            }
        );

        await recordKingdomHistory(
            receiver.id,
            {
                id: randomUUID(),
                category: HISTORY_CATEGORY,
                title: "Resources Received",
                description:
                    `${receiver.name} received resources from ${sender.name}.`,
                createdAt: now
            }
        );

                /* ----------------------------------------------------
           Activity Feeds
        ---------------------------------------------------- */

        sender.activity ??= [];
        receiver.activity ??= [];

        sender.activity.unshift({
            id: randomUUID(),
            type: "trade",
            title: "Trade Sent",
            description:
                `Sent resources to ${receiver.name}.`,
            timestamp: now
        });

        receiver.activity.unshift({
            id: randomUUID(),
            type: "trade",
            title: "Trade Received",
            description:
                `Received resources from ${sender.name}.`,
            timestamp: now
        });

        if (sender.activity.length > 500) {
            sender.activity.length = 500;
        }

        if (receiver.activity.length > 500) {
            receiver.activity.length = 500;
        }

        /* ----------------------------------------------------
           Notifications
        ---------------------------------------------------- */

        const senderNotification: Notification = {
            id: randomUUID(),
            kingdomId: sender.id,
            type: "trade",
            title: "Trade Completed",
            message:
                `Your kingdom successfully sent resources to ${receiver.name}.`,
            read: false,
            createdAt: now
        };

        const receiverNotification: Notification = {
            id: randomUUID(),
            kingdomId: receiver.id,
            type: "trade",
            title: "Resources Received",
            message:
                `${sender.name} has transferred resources to your kingdom.`,
            read: false,
            createdAt: now
        };

        await createNotification(senderNotification);

        await createNotification(receiverNotification);

        /* ----------------------------------------------------
           Achievement Hooks
        ---------------------------------------------------- */

        await unlockAchievements(sender.id, {
            trigger: "trade_sent",
            targetKingdom: receiver.id,
            tradeId
        });

        await unlockAchievements(receiver.id, {
            trigger: "trade_received",
            sourceKingdom: sender.id,
            tradeId
        });

                /* ----------------------------------------------------
           Update Kingdom Metrics
        ---------------------------------------------------- */

        sender.metrics ??= {
            commandsExecuted: 0,
            tradesSent: 0,
            tradesReceived: 0
        };

        receiver.metrics ??= {
            commandsExecuted: 0,
            tradesSent: 0,
            tradesReceived: 0
        };

        sender.metrics.commandsExecuted++;
        sender.metrics.tradesSent++;

        receiver.metrics.commandsExecuted++;
        receiver.metrics.tradesReceived++;

        /* ----------------------------------------------------
           Persist Changes
        ---------------------------------------------------- */

        await saveKingdom(sender);

        await saveKingdom(receiver);

        /* ----------------------------------------------------
           Log Successful Trade
        ---------------------------------------------------- */

        logger.info(
            `[Trade] ${sender.id} transferred resources to ${receiver.id} (Trade ID: ${tradeId}).`
        );

        /* ----------------------------------------------------
           Return Success
        ---------------------------------------------------- */

        return {
            success: true,
            message:
                `Trade completed successfully between ${sender.name} and ${receiver.name}.`,
            data: {
                tradeId,
                fromKingdom: sender.id,
                toKingdom: receiver.id,
                transferred: {
                    ...offer.resources
                },
                note: offer.note ?? "",
                completedAt: now,
                senderResources: {
                    gold: sender.gold,
                    food: sender.food,
                    wood: sender.wood,
                    stone: sender.stone
                },
                receiverResources: {
                    gold: receiver.gold,
                    food: receiver.food,
                    wood: receiver.wood,
                    stone: receiver.stone
                }
            }
        };

    } catch (error) {

        logger.error(
            "[TradeResources]",
            error
        );

        return {
            success: false,
            message:
                "An unexpected error occurred while processing the trade.",
            error:
                error instanceof Error
                    ? error.message
                    : String(error)
        };
    }
}