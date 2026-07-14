import Phaser from "phaser";

interface TileData {
    x: number;
    y: number;
    biome: string;
}

export default class WorldScene extends Phaser.Scene {

    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    private infoText!: Phaser.GameObjects.Text;
    private selectedTileText!: Phaser.GameObjects.Text;

    private selection!: Phaser.GameObjects.Graphics;

    private readonly tileSize = 32;
    private readonly mapWidth = 100;
    private readonly mapHeight = 100;

    private readonly moveSpeed = 250;

    constructor() {
        super("WorldScene");
    }

    async create(): Promise<void> {

        //------------------------------------------------
        // Background
        //------------------------------------------------

        this.cameras.main.setBackgroundColor("#6AA84F");

        //------------------------------------------------
        // World
        //------------------------------------------------

        // Future:
        //
        // const world = await trpc.world.get.query();
        // this.renderWorld(world.tiles);

        this.generatePlaceholderWorld();

        //------------------------------------------------
        // Physics
        //------------------------------------------------

        this.physics.world.setBounds(
            0,
            0,
            this.mapWidth * this.tileSize,
            this.mapHeight * this.tileSize
        );

        //------------------------------------------------
        // Player
        //------------------------------------------------

        this.player = this.physics.add.sprite(
            500,
            500,
            "player"
        );

        this.player.setCollideWorldBounds(true);

        //------------------------------------------------
        // Camera
        //------------------------------------------------

        this.cameras.main.startFollow(this.player, true);

        this.cameras.main.setZoom(2);

        this.cameras.main.setBounds(
            0,
            0,
            this.mapWidth * this.tileSize,
            this.mapHeight * this.tileSize
        );

        //------------------------------------------------
        // Keyboard
        //------------------------------------------------

        this.cursors = this.input.keyboard!.createCursorKeys();

        //------------------------------------------------
        // Selection Box
        //------------------------------------------------

        this.selection = this.add.graphics();

        //------------------------------------------------
        // HUD
        //------------------------------------------------

        this.createHUD();

        //------------------------------------------------
        // Mouse
        //------------------------------------------------

        this.input.on(
            "pointerdown",
            this.handlePointerDown,
            this
        );
    }

    //------------------------------------------------
    // Placeholder World
    //------------------------------------------------

    private generatePlaceholderWorld(): void {

        const graphics = this.add.graphics();

        for (let y = 0; y < this.mapHeight; y++) {

            for (let x = 0; x < this.mapWidth; x++) {

                const biome = this.randomBiome();

                graphics.fillStyle(
                    this.getBiomeColor(biome),
                    1
                );

                graphics.fillRect(
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );

                graphics.lineStyle(
                    1,
                    0x000000,
                    0.15
                );

                graphics.strokeRect(
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }

    //------------------------------------------------
    // Future Server Rendering
    //------------------------------------------------

    /*
    private renderWorld(tiles: TileData[]): void {

        const graphics = this.add.graphics();

        tiles.forEach(tile => {

            graphics.fillStyle(
                this.getBiomeColor(tile.biome),
                1
            );

            graphics.fillRect(
                tile.x * this.tileSize,
                tile.y * this.tileSize,
                this.tileSize,
                this.tileSize
            );

        });

    }
    */

    //------------------------------------------------
    // Mouse
    //------------------------------------------------

    private handlePointerDown(
        pointer: Phaser.Input.Pointer
    ): void {

        const worldPoint =
            this.cameras.main.getWorldPoint(
                pointer.x,
                pointer.y
            );

        const tileX =
            Math.floor(worldPoint.x / this.tileSize);

        const tileY =
            Math.floor(worldPoint.y / this.tileSize);

        this.highlightTile(tileX, tileY);

        this.selectedTileText.setText([
            `Tile : ${tileX}, ${tileY}`,
            `Biome : Unknown`
        ]);

        console.log(
            "Tile Selected",
            tileX,
            tileY
        );
    }

    //------------------------------------------------
    // Tile Highlight
    //------------------------------------------------

    private highlightTile(
        tileX: number,
        tileY: number
    ): void {

        this.selection.clear();

        this.selection.lineStyle(
            2,
            0xffff00,
            1
        );

        this.selection.strokeRect(
            tileX * this.tileSize,
            tileY * this.tileSize,
            this.tileSize,
            this.tileSize
        );
    }

    //------------------------------------------------
    // Update
    //------------------------------------------------

    update(): void {

        let vx = 0;
        let vy = 0;

        if (this.cursors.left.isDown)
            vx = -1;

        if (this.cursors.right.isDown)
            vx = 1;

        if (this.cursors.up.isDown)
            vy = -1;

        if (this.cursors.down.isDown)
            vy = 1;

        const velocity =
            new Phaser.Math.Vector2(vx, vy);

        if (velocity.length() > 0) {

            velocity
                .normalize()
                .scale(this.moveSpeed);

        }

        this.player.setVelocity(
            velocity.x,
            velocity.y
        );

        this.infoText.setText([

            "Realmrise: Genesis",

            "",

            "Arrow Keys : Move",

            "Click : Inspect Tile",

            "",

            `Player X : ${Math.floor(this.player.x)}`,

            `Player Y : ${Math.floor(this.player.y)}`,

            `Tile X : ${Math.floor(this.player.x / this.tileSize)}`,

            `Tile Y : ${Math.floor(this.player.y / this.tileSize)}`

        ]);
    }

    //------------------------------------------------
    // HUD
    //------------------------------------------------

    private createHUD(): void {

        this.add.rectangle(
            0,
            0,
            this.scale.width,
            110,
            0x000000,
            0.6
        )
            .setOrigin(0)
            .setScrollFactor(0);

        this.infoText =
            this.add.text(
                15,
                10,
                "",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#ffffff"
                }
            )
                .setScrollFactor(0);

        this.selectedTileText =
            this.add.text(
                this.scale.width - 220,
                10,
                "No Tile Selected",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#ffff00",
                    align: "right"
                }
            )
                .setOrigin(0, 0)
                .setScrollFactor(0);

        //------------------------------------------------
        // Future Minimap Placeholder
        //------------------------------------------------

        this.add.rectangle(
            this.scale.width - 110,
            70,
            90,
            90,
            0x222222,
            0.8
        )
            .setScrollFactor(0)
            .setStrokeStyle(
                2,
                0xffffff
            );
    }

    //------------------------------------------------
    // Helpers
    //------------------------------------------------

    private randomBiome(): string {

        const biomes = [

            "Forest",

            "Grassland",

            "Mountain",

            "Desert",

            "Water"

        ];

        return Phaser.Utils.Array.GetRandom(
            biomes
        );
    }

    private getBiomeColor(
        biome: string
    ): number {

        switch (biome) {

            case "Forest":
                return 0x2E8B57;

            case "Grassland":
                return 0x7CFC00;

            case "Mountain":
                return 0x8B8B83;

            case "Desert":
                return 0xEDC9AF;

            case "Water":
                return 0x1E90FF;

            default:
                return 0x6AA84F;
        }
    }
}