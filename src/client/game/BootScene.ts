import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {

    private progressBar!: Phaser.GameObjects.Graphics;
    private progressBox!: Phaser.GameObjects.Graphics;
    private loadingText!: Phaser.GameObjects.Text;
    private percentText!: Phaser.GameObjects.Text;
    private assetText!: Phaser.GameObjects.Text;

    constructor() {
        super("BootScene");
    }

    preload(): void {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background
        this.cameras.main.setBackgroundColor("#0f172a");

        // Progress box
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.9);
        this.progressBox.fillRect(width / 2 - 220, height / 2 - 25, 440, 50);

        // Progress bar
        this.progressBar = this.add.graphics();

        // Title
        this.loadingText = this.add.text(
            width / 2,
            height / 2 - 80,
            "Realmrise: Genesis",
            {
                fontFamily: "Arial",
                fontSize: "32px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        // Percentage
        this.percentText = this.add.text(
            width / 2,
            height / 2 + 40,
            "0%",
            {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        // Asset name
        this.assetText = this.add.text(
            width / 2,
            height / 2 + 80,
            "",
            {
                fontFamily: "Arial",
                fontSize: "16px",
                color: "#cccccc"
            }
        ).setOrigin(0.5);

        // Update progress
        this.load.on("progress", (value: number) => {

            this.progressBar.clear();

            this.progressBar.fillStyle(0x4ade80, 1);

            this.progressBar.fillRect(
                width / 2 - 210,
                height / 2 - 15,
                420 * value,
                30
            );

            this.percentText.setText(
                `${Math.floor(value * 100)}%`
            );

        });

        // Show current asset
        this.load.on("fileprogress", (file: Phaser.Loader.File) => {

            this.assetText.setText(
                `Loading: ${file.key}`
            );

        });

        // Loading complete
        this.load.on("complete", () => {

            this.progressBar.destroy();
            this.progressBox.destroy();
            this.loadingText.destroy();
            this.percentText.destroy();
            this.assetText.destroy();

        });

        // ----------------------------------------------------
        // Images
        // ----------------------------------------------------

        this.load.image("grass", "assets/tiles/grass.png");
        this.load.image("water", "assets/tiles/water.png");
        this.load.image("mountain", "assets/tiles/mountain.png");
        this.load.image("forest", "assets/tiles/forest.png");

        this.load.image("player", "assets/player/player.png");

        this.load.image("tree", "assets/environment/tree.png");
        this.load.image("castle", "assets/buildings/castle.png");
        this.load.image("house", "assets/buildings/house.png");

        this.load.image("button", "assets/ui/button.png");
        this.load.image("panel", "assets/ui/panel.png");

        // ----------------------------------------------------
        // Sprite Sheets
        // ----------------------------------------------------

        this.load.spritesheet(
            "hero",
            "assets/sprites/hero.png",
            {
                frameWidth: 32,
                frameHeight: 32
            }
        );

        this.load.spritesheet(
            "fire",
            "assets/effects/fire.png",
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );

        // ----------------------------------------------------
        // Tilemap
        // ----------------------------------------------------

        this.load.tilemapTiledJSON(
            "world",
            "assets/maps/world.json"
        );

        // ----------------------------------------------------
        // Audio
        // ----------------------------------------------------

        this.load.audio(
            "menuMusic",
            "assets/audio/menu.mp3"
        );

        this.load.audio(
            "click",
            "assets/audio/click.wav"
        );

        this.load.audio(
            "explore",
            "assets/audio/explore.wav"
        );

        // ----------------------------------------------------
        // Optional Bitmap Font
        // ----------------------------------------------------

        this.load.bitmapFont(
            "pixelFont",
            "assets/fonts/font.png",
            "assets/fonts/font.xml"
        );
    }

    create(): void {

        // Global input settings
        this.input.setTopOnly(true);

        // Camera
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Optional animations
        this.anims.create({
            key: "hero_idle",
            frames: this.anims.generateFrameNumbers("hero", {
                start: 0,
                end: 3
            }),
            frameRate: 6,
            repeat: -1
        });

        // Start Menu
        this.scene.start("MenuScene");
    }

}