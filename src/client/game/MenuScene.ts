import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {

    private startButton!: Phaser.GameObjects.Text;
    private settingsButton!: Phaser.GameObjects.Text;
    private creditsButton!: Phaser.GameObjects.Text;
    private exitButton!: Phaser.GameObjects.Text;

    constructor() {
        super("MenuScene");
    }

    create(): void {

        const { width, height } = this.scale;

        // --------------------------------------------------
        // Background
        // --------------------------------------------------

        this.cameras.main.setBackgroundColor("#10263f");

        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x10263f
        );

        // Decorative circles

        this.add.circle(120, 100, 80, 0x1e3a5f, 0.25);
        this.add.circle(width - 120, 180, 100, 0x295780, 0.20);
        this.add.circle(width / 2, height - 100, 140, 0x18304d, 0.20);

        // --------------------------------------------------
        // Game Title
        // --------------------------------------------------

        const title = this.add.text(

            width / 2,

            90,

            "REALMRISE\nGENESIS",

            {
                fontFamily: "Arial Black",
                fontSize: "52px",
                color: "#FFD54F",
                align: "center"
            }

        ).setOrigin(0.5);

        this.tweens.add({

            targets: title,

            scale: 1.05,

            duration: 1800,

            yoyo: true,

            repeat: -1

        });

        // --------------------------------------------------
        // Subtitle
        // --------------------------------------------------

        this.add.text(

            width / 2,

            190,

            "One World. Every Choice Matters.",

            {
                fontSize: "22px",
                color: "#ffffff"
            }

        ).setOrigin(0.5);

        this.add.text(

            width / 2,

            220,

            "Return Tomorrow to Shape Its Future.",

            {
                fontSize: "18px",
                color: "#A5D6A7"
            }

        ).setOrigin(0.5);

        // --------------------------------------------------
        // Buttons
        // --------------------------------------------------

        this.startButton = this.createButton(
            width / 2,
            330,
            "▶ START GAME"
        );

        this.settingsButton = this.createButton(
            width / 2,
            400,
            "⚙ SETTINGS"
        );

        this.creditsButton = this.createButton(
            width / 2,
            470,
            "📜 CREDITS"
        );

        this.exitButton = this.createButton(
            width / 2,
            540,
            "❌ EXIT"
        );

        // --------------------------------------------------
        // Button Actions
        // --------------------------------------------------

        this.startButton.on("pointerdown", () => {

            this.cameras.main.fadeOut(600);

            this.time.delayedCall(650, () => {

                this.scene.start("WorldScene");

            });

        });

        this.settingsButton.on("pointerdown", () => {

            alert("Settings coming soon.");

        });

        this.creditsButton.on("pointerdown", () => {

            alert(
                "Realmrise: Genesis\n\nBuilt with Phaser 3 + TypeScript"
            );

        });

        this.exitButton.on("pointerdown", () => {

            window.close();

        });

        // --------------------------------------------------
        // Footer
        // --------------------------------------------------

        this.add.text(

            width / 2,

            height - 50,

            "Version 0.1.0 Alpha",

            {
                fontSize: "14px",
                color: "#BBBBBB"
            }

        ).setOrigin(0.5);

        // --------------------------------------------------
        // Keyboard Shortcut
        // --------------------------------------------------

        this.input.keyboard?.once(

            "keydown-ENTER",

            () => {

                this.scene.start("WorldScene");

            }

        );

    }

    /**
     * Creates a menu button.
     */

    private createButton(

        x: number,

        y: number,

        label: string

    ): Phaser.GameObjects.Text {

        const button = this.add.text(

            x,

            y,

            label,

            {

                fontFamily: "Arial",

                fontSize: "28px",

                color: "#FFFFFF",

                backgroundColor: "#1E3A5F",

                padding: {

                    left: 25,

                    right: 25,

                    top: 12,

                    bottom: 12

                }

            }

        )

            .setOrigin(0.5)

            .setInteractive({

                useHandCursor: true

            });

        button.on("pointerover", () => {

            button.setStyle({

                backgroundColor: "#2E7D32",

                color: "#FFFF66"

            });

            button.setScale(1.08);

        });

        button.on("pointerout", () => {

            button.setStyle({

                backgroundColor: "#1E3A5F",

                color: "#FFFFFF"

            });

            button.setScale(1);

        });

        return button;

    }

}