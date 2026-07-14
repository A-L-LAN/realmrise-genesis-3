export type TerrainType =
    | "grass"
    | "forest"
    | "mountain"
    | "desert"
    | "water";

export interface WorldTile {
    x: number;
    y: number;
    terrain: TerrainType;
    discovered: boolean;
    walkable: boolean;
    resource?: string;
    elevation: number;
    moisture: number;
    spawnPoint: boolean;
}

export default class WorldGenerator {

    constructor(
        private readonly width: number,
        private readonly height: number
    ) {}

    /**
     * Generates the complete world.
     */
    public generateWorld(): WorldTile[][] {

        const world: WorldTile[][] = [];

        for (let y = 0; y < this.height; y++) {

            const row: WorldTile[] = [];

            for (let x = 0; x < this.width; x++) {

                const elevation = this.generateElevation(x, y);
                const moisture = this.generateMoisture(x, y);

                const terrain = this.chooseTerrain(
                    elevation,
                    moisture
                );

                row.push({
                    x,
                    y,
                    terrain,
                    discovered: false,
                    walkable: terrain !== "water",
                    resource: this.generateResource(terrain),
                    elevation,
                    moisture,
                    spawnPoint: false,
                });

            }

            world.push(row);

        }

        this.placeSpawnPoints(world);

        return world;

    }

    /**
     * Simple elevation generator.
     */
    private generateElevation(
        x: number,
        y: number
    ): number {

        const nx = x / this.width;
        const ny = y / this.height;

        const value =
            (
                Math.sin(nx * Math.PI * 4) +
                Math.cos(ny * Math.PI * 3)
            ) * 0.25 +
            Math.random() * 0.5;

        return Math.min(
            1,
            Math.max(0, value)
        );

    }

    /**
     * Moisture generator.
     */
    private generateMoisture(
        x: number,
        y: number
    ): number {

        const nx = x / this.width;
        const ny = y / this.height;

        const value =
            (
                Math.cos(nx * Math.PI * 2) +
                Math.sin(ny * Math.PI * 5)
            ) * 0.25 +
            Math.random() * 0.5;

        return Math.min(
            1,
            Math.max(0, value)
        );

    }

    /**
     * Determine terrain from elevation and moisture.
     */
    private chooseTerrain(
        elevation: number,
        moisture: number
    ): TerrainType {

        if (elevation < 0.18)
            return "water";

        if (elevation > 0.82)
            return "mountain";

        if (moisture < 0.22)
            return "desert";

        if (moisture > 0.65)
            return "forest";

        return "grass";

    }

    /**
     * Generate natural resources.
     */
    private generateResource(
        terrain: TerrainType
    ): string | undefined {

        const roll = Math.random();

        switch (terrain) {

            case "forest":

                if (roll < 0.45) return "wood";
                if (roll < 0.55) return "berries";
                return undefined;

            case "mountain":

                if (roll < 0.35) return "stone";
                if (roll < 0.45) return "iron";
                if (roll < 0.48) return "gold";
                return undefined;

            case "grass":

                if (roll < 0.30) return "food";
                if (roll < 0.35) return "horses";
                return undefined;

            case "desert":

                if (roll < 0.10) return "gold";
                if (roll < 0.18) return "oil";
                return undefined;

            default:

                return undefined;

        }

    }

    /**
     * Place several player spawn locations.
     */
    private placeSpawnPoints(
        world: WorldTile[][]
    ): void {

        let placed = 0;

        while (placed < 8) {

            const x = Math.floor(
                Math.random() * this.width
            );

            const y = Math.floor(
                Math.random() * this.height
            );

            const tile = world[y][x];

            if (
                tile.walkable &&
                tile.terrain === "grass"
            ) {

                tile.spawnPoint = true;
                placed++;

            }

        }

    }

}

/**
 * Convenience function used by bootstrap code.
 */
export function generateWorld(
    width = 100,
    height = 100
): WorldTile[][] {

    const generator = new WorldGenerator(
        width,
        height
    );

    return generator.generateWorld();

}