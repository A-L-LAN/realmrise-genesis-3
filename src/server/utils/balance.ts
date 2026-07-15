/* ============================================================
   Game Balance Helpers
   Realmrise: Genesis
============================================================ */

export class Balance {
    /* ========================================================
       Multipliers
    ======================================================== */

    static readonly BUILDING_MULTIPLIER = 1.35;

    static readonly RESEARCH_MULTIPLIER = 1.50;

    static readonly HERO_EXPERIENCE_MULTIPLIER = 1.80;

    static readonly CITY_UPGRADE_MULTIPLIER = 1.40;

    static readonly TRAINING_MULTIPLIER = 1.20;

    /* ========================================================
       Buildings
    ======================================================== */

    static buildingCost(
        base: number,
        level: number
    ): number {
        return Math.max(
            1,
            Math.floor(
                base *
                    Math.pow(
                        this.BUILDING_MULTIPLIER,
                        Math.max(0, level)
                    )
            )
        );
    }

    static buildingUpgradeTime(
        level: number
    ): number {
        return Math.floor(
            60 *
                Math.pow(
                    1.15,
                    Math.max(0, level)
                )
        );
    }

    /* ========================================================
       Cities
    ======================================================== */

    static cityUpgradeCost(
        base: number,
        level: number
    ): number {
        return Math.floor(
            base *
                Math.pow(
                    this.CITY_UPGRADE_MULTIPLIER,
                    level
                )
        );
    }

    /* ========================================================
       Research
    ======================================================== */

    static researchCost(
        base: number,
        level: number
    ): number {
        return Math.floor(
            base *
                Math.pow(
                    this.RESEARCH_MULTIPLIER,
                    Math.max(0, level)
                )
        );
    }

    static researchTime(
        baseMinutes: number,
        level: number
    ): number {
        return Math.floor(
            baseMinutes *
                Math.pow(1.15, level)
        );
    }

    /* ========================================================
       Heroes
    ======================================================== */

    static heroExperience(
        level: number
    ): number {
        return Math.floor(
            100 *
                Math.pow(
                    Math.max(1, level),
                    this
                        .HERO_EXPERIENCE_MULTIPLIER
                )
        );
    }

    static heroPower(
        level: number,
        strength: number,
        intelligence: number,
        leadership: number
    ): number {
        return Math.floor(
            level * 10 +
                strength * 2 +
                intelligence * 1.5 +
                leadership * 2.5
        );
    }

    /* ========================================================
       Recruitment
    ======================================================== */

    static recruitCost(
        base: number,
        amount: number
    ): number {
        return Math.floor(
            base *
                amount
        );
    }

    static recruitTime(
        amount: number
    ): number {
        return Math.max(
            5,
            Math.floor(amount * 2)
        );
    }

    /* ========================================================
       Army
    ======================================================== */

    static armyUpkeep(
        units: number
    ): number {
        return Math.floor(
            units * 0.5
        );
    }

    static armyCapacity(
        cityLevel: number,
        barracksLevel: number
    ): number {
        return (
            cityLevel * 100 +
            barracksLevel * 250
        );
    }

    /* ========================================================
       Combat
    ======================================================== */

    static battlePower(
        attack: number,
        defense: number,
        morale: number
    ): number {
        return Math.floor(
            attack * 1.2 +
                defense +
                morale * 5
        );
    }

    static damage(
        attack: number,
        defense: number
    ): number {
        return Math.max(
            1,
            Math.floor(
                attack -
                    defense * 0.5
            )
        );
    }

    static criticalDamage(
        damage: number,
        multiplier = 2
    ): number {
        return Math.floor(
            damage * multiplier
        );
    }

    static hitChance(
        accuracy: number,
        evasion: number
    ): number {
        return Math.max(
            5,
            Math.min(
                95,
                accuracy - evasion + 75
            )
        );
    }

    static moraleBonus(
        morale: number
    ): number {
        return morale * 0.05;
    }

    /* ========================================================
       Economy
    ======================================================== */

    static taxIncome(
        population: number,
        happiness: number
    ): number {
        return Math.floor(
            population *
                (happiness / 100)
        );
    }

    static marketTax(
        amount: number,
        rate = 0.05
    ): number {
        return Math.floor(
            amount * rate
        );
    }

    static tradeProfit(
        buyPrice: number,
        sellPrice: number,
        quantity: number
    ): number {
        return (
            sellPrice - buyPrice
        ) * quantity;
    }

    static production(
        workers: number,
        efficiency = 1
    ): number {
        return Math.floor(
            workers *
                efficiency
        );
    }

    static storageCapacity(
        warehouseLevel: number
    ): number {
        return Math.floor(
            1000 *
                Math.pow(
                    1.30,
                    warehouseLevel
                )
        );
    }

    /* ========================================================
       Population
    ======================================================== */

    static populationGrowth(
        population: number,
        happiness: number
    ): number {
        return Math.floor(
            population *
                (0.01 *
                    (happiness / 100))
        );
    }

    static foodConsumption(
        population: number
    ): number {
        return population;
    }

    /* ========================================================
       Travel
    ======================================================== */

    static travelTime(
        distance: number,
        speed: number
    ): number {
        if (speed <= 0) {
            return Infinity;
        }

        return distance / speed;
    }

    static movementSpeed(
        baseSpeed: number,
        terrainModifier = 1
    ): number {
        return (
            baseSpeed *
            terrainModifier
        );
    }

    /* ========================================================
       Quests
    ======================================================== */

    static questReward(
        level: number
    ): number {
        return Math.floor(
            100 *
                Math.pow(
                    1.25,
                    level
                )
        );
    }

    static experienceReward(
        difficulty: number
    ): number {
        return Math.floor(
            50 *
                Math.pow(
                    1.5,
                    difficulty
                )
        );
    }

    /* ========================================================
       Reputation
    ======================================================== */

    static reputationGain(
        difficulty: number
    ): number {
        return Math.max(
            1,
            difficulty * 5
        );
    }

    /* ========================================================
       Guilds
    ======================================================== */

    static guildCreationCost(): number {
        return 1000;
    }

    static guildUpgradeCost(
        level: number
    ): number {
        return Math.floor(
            5000 *
                Math.pow(
                    1.5,
                    level
                )
        );
    }

    /* ========================================================
       World Events
    ======================================================== */

    static eventRewardMultiplier(
        difficulty: number
    ): number {
        return 1 +
            difficulty * 0.25;
    }

    /* ========================================================
       Utility
    ======================================================== */

    static clamp(
        value: number,
        min: number,
        max: number
    ): number {
        return Math.min(
            Math.max(value, min),
            max
        );
    }

    static scale(
        base: number,
        multiplier: number,
        level: number
    ): number {
        return Math.floor(
            base *
                Math.pow(
                    multiplier,
                    level
                )
        );
    }

    static percentage(
        value: number,
        percent: number
    ): number {
        return Math.floor(
            value *
                (percent / 100)
        );
    }

    static randomVariance(
        value: number,
        variance = 10
    ): number {
        const modifier =
            (Math.random() * 2 - 1) *
            variance;

        return Math.floor(
            value +
                (value * modifier) /
                    100
        );
    }
}

export default Balance;