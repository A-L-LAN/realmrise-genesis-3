/* ============================================================
   Generic Helper Functions
   Realmrise: Genesis
============================================================ */

/* ============================================================
   Numbers
============================================================ */

export function clamp(
    value: number,
    min: number,
    max: number
): number {
    return Math.min(
        Math.max(value, min),
        max
    );
}

export function lerp(
    start: number,
    end: number,
    t: number
): number {
    return start + (end - start) * t;
}

export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return (
        ((value - inMin) * (outMax - outMin)) /
            (inMax - inMin) +
        outMin
    );
}

export function percentage(
    value: number,
    total: number
): number {
    if (total <= 0) {
        return 0;
    }

    return (value / total) * 100;
}

export function round(
    value: number,
    decimals = 2
): number {
    return Number(
        value.toFixed(decimals)
    );
}

export function randomBetween(
    min: number,
    max: number
): number {
    return Math.random() * (max - min) + min;
}

/* ============================================================
   Time
============================================================ */

export function now(): number {
    return Date.now();
}

export function sleep(
    ms: number
): Promise<void> {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}

export function seconds(
    value: number
): number {
    return value * 1000;
}

export function minutes(
    value: number
): number {
    return value * 60 * 1000;
}

export function hours(
    value: number
): number {
    return value * 60 * 60 * 1000;
}

export function days(
    value: number
): number {
    return value * 24 * 60 * 60 * 1000;
}

export function formatDuration(
    milliseconds: number
): string {
    const totalSeconds = Math.floor(
        milliseconds / 1000
    );

    const hours = Math.floor(
        totalSeconds / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}

/* ============================================================
   Strings
============================================================ */

export function capitalize(
    text: string
): string {
    if (!text.length) {
        return text;
    }

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );
}

export function capitalizeWords(
    text: string
): string {
    return text
        .split(" ")
        .map(capitalize)
        .join(" ");
}

export function slugify(
    text: string
): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
}

export function truncate(
    text: string,
    length: number
): string {
    if (text.length <= length) {
        return text;
    }

    return (
        text.substring(
            0,
            length - 3
        ) + "..."
    );
}

export function pad(
    value: number,
    length = 2
): string {
    return value
        .toString()
        .padStart(length, "0");
}

/* ============================================================
   Arrays
============================================================ */

export function unique<T>(
    array: readonly T[]
): T[] {
    return [...new Set(array)];
}

export function chunk<T>(
    array: readonly T[],
    size: number
): T[][] {
    const result: T[][] = [];

    for (
        let i = 0;
        i < array.length;
        i += size
    ) {
        result.push(
            array.slice(i, i + size)
        );
    }

    return result;
}

export function removeItem<T>(
    array: T[],
    item: T
): void {
    const index = array.indexOf(item);

    if (index >= 0) {
        array.splice(index, 1);
    }
}

export function sum(
    values: readonly number[]
): number {
    return values.reduce(
        (a, b) => a + b,
        0
    );
}

export function average(
    values: readonly number[]
): number {
    if (values.length === 0) {
        return 0;
    }

    return sum(values) / values.length;
}

/* ============================================================
   Objects
============================================================ */

export function deepClone<T>(
    object: T
): T {
    return structuredClone(object);
}

export function isEmpty(
    value: unknown
): boolean {
    if (value == null) {
        return true;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === "object") {
        return (
            Object.keys(value).length === 0
        );
    }

    if (typeof value === "string") {
        return value.trim().length === 0;
    }

    return false;
}

export function merge<T>(
    target: T,
    source: Partial<T>
): T {
    return {
        ...target,
        ...source,
    };
}

/* ============================================================
   Numbers Formatting
============================================================ */

export function formatNumber(
    value: number
): string {
    return new Intl.NumberFormat().format(
        value
    );
}

export function formatCurrency(
    value: number
): string {
    return formatNumber(value) + " Gold";
}

export function formatPercent(
    value: number
): string {
    return `${round(value)}%`;
}

/* ============================================================
   IDs
============================================================ */

export function generateId(
    prefix = ""
): string {
    const id =
        Date.now().toString(36) +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 10);

    return prefix
        ? `${prefix}-${id}`
        : id;
}

/* ============================================================
   Coordinates
============================================================ */

export interface Position {
    x: number;
    y: number;
}

export function distance(
    a: Position,
    b: Position
): number {
    return Math.sqrt(
        Math.pow(a.x - b.x, 2) +
            Math.pow(a.y - b.y, 2)
    );
}

export function manhattanDistance(
    a: Position,
    b: Position
): number {
    return (
        Math.abs(a.x - b.x) +
        Math.abs(a.y - b.y)
    );
}

/* ============================================================
   Validation
============================================================ */

export function isPositiveInteger(
    value: unknown
): value is number {
    return (
        typeof value === "number" &&
        Number.isInteger(value) &&
        value >= 0
    );
}

export function isDefined<T>(
    value: T | null | undefined
): value is T {
    return value !== null &&
        value !== undefined;
}

/* ============================================================
   Promise Helpers
============================================================ */

export async function safe<T>(
    promise: Promise<T>
): Promise<{
    success: boolean;
    data?: T;
    error?: unknown;
}> {
    try {
        return {
            success: true,
            data: await promise,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}

/* ============================================================
   Miscellaneous
============================================================ */

export function noop(): void {}

export function assert(
    condition: unknown,
    message = "Assertion failed"
): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}