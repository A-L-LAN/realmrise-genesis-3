import type { World } from "../models/World";

import { generateWorld } from "../simulation/WorldGenerator";

import { StorageService } from "../services/StorageService";

/* ============================================================
   Active World
============================================================ */

let activeWorld: World | null = null;

/* ============================================================
   Initialize World
============================================================ */

export async function initializeWorld(): Promise<World> {

    console.log("Checking for existing world...");

    const existingWorld = await StorageService.loadWorld();

    if (existingWorld) {

        console.log("Existing world loaded.");

        activeWorld = existingWorld;

        return existingWorld;

    }

    console.log("No world found.");
    console.log("Generating new world...");

    const world = await generateWorld();

    await StorageService.saveWorld(world);

    activeWorld = world;

    console.log("New world created successfully.");

    return world;

}

/* ============================================================
   Get Active World
============================================================ */

export function getWorld(): World {

    if (!activeWorld) {

        throw new Error(
            "Realmrise world has not been initialized."
        );

    }

    return activeWorld;

}

/* ============================================================
   Replace Active World
============================================================ */

export async function setWorld(world: World): Promise<void> {

    activeWorld = world;

    await StorageService.saveWorld(world);

}

/* ============================================================
   Save Active World
============================================================ */

export async function saveWorld(): Promise<void> {

    if (!activeWorld) {

        throw new Error(
            "Cannot save because no world is loaded."
        );

    }

    await StorageService.saveWorld(activeWorld);

}

/* ============================================================
   Reload World From Storage
============================================================ */

export async function reloadWorld(): Promise<World> {

    const world = await StorageService.loadWorld();

    if (!world) {

        throw new Error(
            "Unable to reload world from storage."
        );

    }

    activeWorld = world;

    return world;

}

/* ============================================================
   World Status
============================================================ */

export function hasWorld(): boolean {

    return activeWorld !== null;

}