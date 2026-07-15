/* ============================================================
   Random Utility Functions
   Realmrise: Genesis
============================================================ */

export class Random {
    /* ========================================================
       Numbers
    ======================================================== */

    static integer(min: number, max: number): number {
        if (min > max) {
            [min, max] = [max, min];
        }

        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

    static float(min: number, max: number): number {
        if (min > max) {
            [min, max] = [max, min];
        }

        return Math.random() * (max - min) + min;
    }

    static decimal(
        min: number,
        max: number,
        decimals = 2
    ): number {
        return Number(
            this.float(min, max).toFixed(decimals)
        );
    }

    static percentage(): number {
        return this.integer(0, 100);
    }

    /* ========================================================
       Probability
    ======================================================== */

    static chance(percent: number): boolean {
        if (percent <= 0) {
            return false;
        }

        if (percent >= 100) {
            return true;
        }

        return Math.random() * 100 < percent;
    }

    static odds(
        numerator: number,
        denominator: number
    ): boolean {
        if (denominator <= 0) {
            return false;
        }

        return Math.random() <
            numerator / denominator;
    }

    static coinFlip(): boolean {
        return Math.random() < 0.5;
    }

    static rollDie(
        sides = 6
    ): number {
        return this.integer(1, sides);
    }

    static rollDice(
        count = 2,
        sides = 6
    ): number {
        let total = 0;

        for (let i = 0; i < count; i++) {
            total += this.rollDie(sides);
        }

        return total;
    }

    /* ========================================================
       Arrays
    ======================================================== */

    static pick<T>(
        array: readonly T[]
    ): T {
        if (array.length === 0) {
            throw new Error(
                "Cannot pick from an empty array."
            );
        }

        return array[
            this.integer(
                0,
                array.length - 1
            )
        ];
    }

    static pickMany<T>(
        array: readonly T[],
        amount: number
    ): T[] {
        if (amount <= 0) {
            return [];
        }

        if (amount >= array.length) {
            return this.shuffle(array);
        }

        return this.shuffle(array).slice(
            0,
            amount
        );
    }

    static shuffle<T>(
        array: readonly T[]
    ): T[] {
        const copy = [...array];

        for (
            let i = copy.length - 1;
            i > 0;
            i--
        ) {
            const j = this.integer(0, i);

            [copy[i], copy[j]] = [
                copy[j],
                copy[i],
            ];
        }

        return copy;
    }

    static sample<T>(
        array: readonly T[]
    ): T | null {
        if (array.length === 0) {
            return null;
        }

        return this.pick(array);
    }

    /* ========================================================
       Weighted Random
    ======================================================== */

    static weightedPick<T>(
        items: readonly {
            value: T;
            weight: number;
        }[]
    ): T {
        if (items.length === 0) {
            throw new Error(
                "Weighted array is empty."
            );
        }

        const totalWeight = items.reduce(
            (sum, item) =>
                sum + Math.max(0, item.weight),
            0
        );

        if (totalWeight <= 0) {
            return items[0].value;
        }

        let random = Math.random() * totalWeight;

        for (const item of items) {
            random -= Math.max(
                0,
                item.weight
            );

            if (random <= 0) {
                return item.value;
            }
        }

        return items[
            items.length - 1
        ].value;
    }

    /* ========================================================
       Strings
    ======================================================== */

    static string(
        length = 12,
        characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    ): string {
        let result = "";

        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                this.integer(
                    0,
                    characters.length - 1
                )
            );
        }

        return result;
    }

    static hex(
        length = 8
    ): string {
        return this.string(
            length,
            "0123456789abcdef"
        );
    }

    /* ========================================================
       Colors
    ======================================================== */

    static color(): string {
        return `#${this.hex(6)}`;
    }

    /* ========================================================
       UUID
    ======================================================== */

    static uuid(): string {
        if (
            typeof crypto !== "undefined" &&
            typeof crypto.randomUUID ===
                "function"
        ) {
            return crypto.randomUUID();
        }

        return (
            Date.now().toString(36) +
            "-" +
            this.string(12)
        );
    }

    /* ========================================================
       Coordinates
    ======================================================== */

    static coordinate(
        width: number,
        height: number
    ): {
        x: number;
        y: number;
    } {
        return {
            x: this.integer(
                0,
                width - 1
            ),
            y: this.integer(
                0,
                height - 1
            ),
        };
    }

    static position(
        minX: number,
        maxX: number,
        minY: number,
        maxY: number
    ): {
        x: number;
        y: number;
    } {
        return {
            x: this.integer(minX, maxX),
            y: this.integer(minY, maxY),
        };
    }

    /* ========================================================
       Battle Helpers
    ======================================================== */

    static criticalHit(
        chance = 10,
        multiplier = 2
    ): number {
        return this.chance(chance)
            ? multiplier
            : 1;
    }

    static damage(
        min: number,
        max: number,
        criticalChance = 10,
        criticalMultiplier = 2
    ): number {
        const damage = this.integer(
            min,
            max
        );

        return Math.floor(
            damage *
                this.criticalHit(
                    criticalChance,
                    criticalMultiplier
                )
        );
    }

    /* ========================================================
       Resource Generation
    ======================================================== */

    static resource(
        base: number,
        variance = 10
    ): number {
        return Math.max(
            0,
            Math.floor(
                base +
                    this.integer(
                        -variance,
                        variance
                    )
            )
        );
    }

    /* ========================================================
       Time
    ======================================================== */

    static delay(
        minMs: number,
        maxMs: number
    ): number {
        return this.integer(
            minMs,
            maxMs
        );
    }

    /* ========================================================
       Boolean
    ======================================================== */

    static boolean(): boolean {
        return this.coinFlip();
    }

    /* ========================================================
       Random Sign
    ======================================================== */

    static sign(): -1 | 1 {
        return this.coinFlip()
            ? 1
            : -1;
    }

    /* ========================================================
       Clamp Random
    ======================================================== */

    static between(
        value: number,
        variance: number
    ): number {
        return value +
            this.integer(
                -variance,
                variance
            );
    }
}

export default Random;