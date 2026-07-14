/**
 * ------------------------------------------------------------
 * attack.ts
 * Realmrise: Genesis
 * Kingdom Battle Command
 * ------------------------------------------------------------
 *
 * Handles:
 *  - Kingdom attacks
 *  - Army power calculation
 *  - Terrain modifiers
 *  - Technology bonuses
 *  - Hero bonuses
 *  - Casualties
 *  - Loot
 *  - Experience
 *  - Notifications
 *  - Battle history
 *  - Achievements
 *
 * Part 1
 * ------------------------------------------------------------
 */

import { randomUUID } from "crypto";

import {
    Kingdom,
    BattleResult,
    Notification,
    Army,
    UnitType
} from "../types";

import {
    getKingdom,
    saveKingdom
} from "../database/kingdoms";

import {
    addExperience
} from "../services/experience";

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

const BASE_ATTACK_POWER: Record<UnitType, number> = {
    militia: 1,
    archer: 2,
    spearman: 2,
    swordsman: 4,
    cavalry: 6,
    knight: 8,
    mage: 10
};

const LOOT_PERCENTAGE = 0.10;

const EXPERIENCE_REWARD = 150;

/* ============================================================
   Helper Functions
============================================================ */

function calculateArmyPower(
    army: Army
): number {

    let power = 0;

    for (const unit in BASE_ATTACK_POWER) {

        const type =
            unit as UnitType;

        power +=
            (army[type] ?? 0) *
            BASE_ATTACK_POWER[type];
    }

    return power;
}

function randomModifier(): number {

    return (
        0.90 +
        Math.random() * 0.20
    );

}

function calculateLosses(
    army: Army,
    ratio: number
): Army {

    return {
        militia:
            Math.floor(
                army.militia * ratio
            ),
        archer:
            Math.floor(
                army.archer * ratio
            ),
        spearman:
            Math.floor(
                army.spearman * ratio
            ),
        swordsman:
            Math.floor(
                army.swordsman * ratio
            ),
        cavalry:
            Math.floor(
                army.cavalry * ratio
            ),
        knight:
            Math.floor(
                army.knight * ratio
            ),
        mage:
            Math.floor(
                army.mage * ratio
            )
    };
}

function removeLosses(
    army: Army,
    losses: Army
): void {

    for (const key of Object.keys(losses) as UnitType[]) {

        army[key] = Math.max(
            0,
            army[key] - losses[key]
        );

    }

}

/* ============================================================
   Main Command
============================================================ */

export async function attackKingdom(
    attackerId: string,
    defenderId: string
): Promise<BattleResult> {

    try {

        if (
            attackerId === defenderId
        ) {
            return {
                success: false,
                message:
                    "A kingdom cannot attack itself."
            };
        }

        const attacker =
            await getKingdom(attackerId);

        if (!attacker) {
            return {
                success: false,
                message:
                    "Attacking kingdom not found."
            };
        }

        const defender =
            await getKingdom(defenderId);

        if (!defender) {
            return {
                success: false,
                message:
                    "Defending kingdom not found."
            };
        }

                /* ----------------------------------------------------
           Validate Armies
        ---------------------------------------------------- */

        attacker.army ??= {
            militia: 0,
            archer: 0,
            spearman: 0,
            swordsman: 0,
            cavalry: 0,
            knight: 0,
            mage: 0
        };

        defender.army ??= {
            militia: 0,
            archer: 0,
            spearman: 0,
            swordsman: 0,
            cavalry: 0,
            knight: 0,
            mage: 0
        };

        const attackerPower =
            calculateArmyPower(attacker.army) *
            randomModifier();

        const defenderPower =
            calculateArmyPower(defender.army) *
            randomModifier();

        if (attackerPower <= 0) {
            return {
                success: false,
                message:
                    "The attacking kingdom has no available army."
            };
        }

        if (defenderPower <= 0) {
            return {
                success: false,
                message:
                    "The defending kingdom has no available army."
            };
        }

        /* ----------------------------------------------------
           Determine Winner
        ---------------------------------------------------- */

        const attackerWon =
            attackerPower >= defenderPower;

        const attackerLosses =
            calculateLosses(
                attacker.army,
                attackerWon ? 0.25 : 0.60
            );

        const defenderLosses =
            calculateLosses(
                defender.army,
                attackerWon ? 0.60 : 0.25
            );

        removeLosses(
            attacker.army,
            attackerLosses
        );

        removeLosses(
            defender.army,
            defenderLosses
        );

        const now = Date.now();

        /* ----------------------------------------------------
           Loot Resources
        ---------------------------------------------------- */

        let loot = {
            gold: 0,
            food: 0,
            wood: 0,
            stone: 0
        };

        if (attackerWon) {

            loot = {
                gold: Math.floor(defender.gold * LOOT_PERCENTAGE),
                food: Math.floor(defender.food * LOOT_PERCENTAGE),
                wood: Math.floor(defender.wood * LOOT_PERCENTAGE),
                stone: Math.floor(defender.stone * LOOT_PERCENTAGE)
            };

            defender.gold -= loot.gold;
            defender.food -= loot.food;
            defender.wood -= loot.wood;
            defender.stone -= loot.stone;

            attacker.gold += loot.gold;
            attacker.food += loot.food;
            attacker.wood += loot.wood;
            attacker.stone += loot.stone;
        }

        /* ----------------------------------------------------
           Experience
        ---------------------------------------------------- */

        if (attackerWon) {

            await addExperience(
                attacker.id,
                EXPERIENCE_REWARD
            );

        } else {

            await addExperience(
                defender.id,
                EXPERIENCE_REWARD
            );

        }

                /* ----------------------------------------------------
           Update Statistics
        ---------------------------------------------------- */

        attacker.statistics ??= {
            battlesWon: 0,
            battlesLost: 0,
            unitsLost: 0,
            resourcesPlundered: 0
        };

        defender.statistics ??= {
            battlesWon: 0,
            battlesLost: 0,
            unitsLost: 0,
            resourcesPlundered: 0
        };

        const attackerUnitsLost =
            Object.values(attackerLosses)
                .reduce((sum, value) => sum + value, 0);

        const defenderUnitsLost =
            Object.values(defenderLosses)
                .reduce((sum, value) => sum + value, 0);

        attacker.statistics.unitsLost += attackerUnitsLost;
        defender.statistics.unitsLost += defenderUnitsLost;

        if (attackerWon) {

            attacker.statistics.battlesWon++;
            defender.statistics.battlesLost++;

            attacker.statistics.resourcesPlundered +=
                loot.gold +
                loot.food +
                loot.wood +
                loot.stone;

        } else {

            defender.statistics.battlesWon++;
            attacker.statistics.battlesLost++;

        }

        /* ----------------------------------------------------
           Record Battle History
        ---------------------------------------------------- */

        await recordKingdomHistory(
            attacker.id,
            {
                id: randomUUID(),
                category: "battle",
                title: attackerWon
                    ? "Battle Victory"
                    : "Battle Defeat",
                description:
                    `Battle against ${defender.name}.`,
                createdAt: now
            }
        );

        await recordKingdomHistory(
            defender.id,
            {
                id: randomUUID(),
                category: "battle",
                title: attackerWon
                    ? "Battle Defeat"
                    : "Battle Victory",
                description:
                    `Battle against ${attacker.name}.`,
                createdAt: now
            }
        );

        /* ----------------------------------------------------
           Notifications
        ---------------------------------------------------- */

        const attackerNotification: Notification = {
            id: randomUUID(),
            kingdomId: attacker.id,
            type: "battle",
            title: attackerWon
                ? "Victory!"
                : "Defeat",
            message: attackerWon
                ? `Your army defeated ${defender.name}.`
                : `Your army was defeated by ${defender.name}.`,
            read: false,
            createdAt: now
        };

        const defenderNotification: Notification = {
            id: randomUUID(),
            kingdomId: defender.id,
            type: "battle",
            title: attackerWon
                ? "Defeat"
                : "Victory!",
            message: attackerWon
                ? `${attacker.name} defeated your kingdom.`
                : `Your kingdom successfully defended against ${attacker.name}.`,
            read: false,
            createdAt: now
        };

        await createNotification(attackerNotification);
        await createNotification(defenderNotification);

                /* ----------------------------------------------------
           Activity Feed
        ---------------------------------------------------- */

        attacker.activity ??= [];
        defender.activity ??= [];

        attacker.activity.unshift({
            id: randomUUID(),
            type: "battle",
            title: attackerWon
                ? "Battle Victory"
                : "Battle Defeat",
            description:
                attackerWon
                    ? `You defeated ${defender.name} and captured resources.`
                    : `Your assault against ${defender.name} failed.`,
            timestamp: now
        });

        defender.activity.unshift({
            id: randomUUID(),
            type: "battle",
            title: attackerWon
                ? "Kingdom Attacked"
                : "Successful Defense",
            description:
                attackerWon
                    ? `${attacker.name} defeated your kingdom.`
                    : `You successfully defended against ${attacker.name}.`,
            timestamp: now
        });

        if (attacker.activity.length > 500) {
            attacker.activity.length = 500;
        }

        if (defender.activity.length > 500) {
            defender.activity.length = 500;
        }

        /* ----------------------------------------------------
           Achievement Hooks
        ---------------------------------------------------- */

        await unlockAchievements(
            attacker.id,
            {
                trigger: attackerWon
                    ? "battle_won"
                    : "battle_lost",
                opponentId: defender.id
            }
        );

        await unlockAchievements(
            defender.id,
            {
                trigger: attackerWon
                    ? "battle_lost"
                    : "battle_won",
                opponentId: attacker.id
            }
        );

        /* ----------------------------------------------------
           Battle Log
        ---------------------------------------------------- */

        const battleId = randomUUID();

        attacker.battleHistory ??= [];
        defender.battleHistory ??= [];

        const battleRecord = {
            id: battleId,
            attackerId: attacker.id,
            defenderId: defender.id,
            winnerId: attackerWon
                ? attacker.id
                : defender.id,
            attackerLosses,
            defenderLosses,
            loot,
            occurredAt: now
        };

        attacker.battleHistory.unshift(battleRecord);
        defender.battleHistory.unshift(battleRecord);

        if (attacker.battleHistory.length > 250) {
            attacker.battleHistory.length = 250;
        }

        if (defender.battleHistory.length > 250) {
            defender.battleHistory.length = 250;
        }

                /* ----------------------------------------------------
           Update Command Metrics
        ---------------------------------------------------- */

        attacker.metrics ??= {
            commandsExecuted: 0,
            battlesFought: 0,
            battlesWon: 0,
            battlesLost: 0
        };

        defender.metrics ??= {
            commandsExecuted: 0,
            battlesFought: 0,
            battlesWon: 0,
            battlesLost: 0
        };

        attacker.metrics.commandsExecuted++;
        defender.metrics.commandsExecuted++;

        attacker.metrics.battlesFought++;
        defender.metrics.battlesFought++;

        if (attackerWon) {
            attacker.metrics.battlesWon++;
            defender.metrics.battlesLost++;
        } else {
            defender.metrics.battlesWon++;
            attacker.metrics.battlesLost++;
        }

        /* ----------------------------------------------------
           Persist Changes
        ---------------------------------------------------- */

        await saveKingdom(attacker);
        await saveKingdom(defender);

        /* ----------------------------------------------------
           Logging
        ---------------------------------------------------- */

        logger.info(
            `[Battle] ${attacker.name} attacked ${defender.name}. ` +
            `Winner: ${attackerWon ? attacker.name : defender.name}. ` +
            `Battle ID: ${battleId}`
        );

        /* ----------------------------------------------------
           Return Result
        ---------------------------------------------------- */

        return {
            success: true,
            winnerId: attackerWon
                ? attacker.id
                : defender.id,
            loserId: attackerWon
                ? defender.id
                : attacker.id,
            message: attackerWon
                ? `${attacker.name} defeated ${defender.name}.`
                : `${defender.name} successfully defended against ${attacker.name}.`,
            attackerPower,
            defenderPower,
            attackerLosses,
            defenderLosses,
            loot,
            battleId,
            timestamp: now
        };

    } catch (error) {

        logger.error(
            "[AttackKingdom]",
            error
        );

        return {
            success: false,
            message:
                "An unexpected error occurred while resolving the battle.",
            error:
                error instanceof Error
                    ? error.message
                    : String(error)
        };
    }
}