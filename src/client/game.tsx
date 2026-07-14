import "./index.css";
import "./styles/main.css";

import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

import Phaser from "phaser";

import BootScene from "./game/BootScene";
import MenuScene from "./game/MenuScene";
import WorldScene from "./game/WorldScene";

function GameApp() {

    useEffect(() => {

        const config: Phaser.Types.Core.GameConfig = {

            type: Phaser.AUTO,

            parent: "game",

            width: 1280,

            height: 720,

            backgroundColor: "#1e293b",

            pixelArt: true,

            physics: {

                default: "arcade",

                arcade: {

                    gravity: {

                        x: 0,

                        y: 0,

                    },

                    debug: false,

                },

            },

            scale: {

                mode: Phaser.Scale.FIT,

                autoCenter: Phaser.Scale.CENTER_BOTH,

                width: 1280,

                height: 720,

            },

            scene: [

                BootScene,

                MenuScene,

                WorldScene,

            ],

        };

        const game = new Phaser.Game(config);

        (window as any).game = game;

        return () => {

            game.destroy(true);

        };

    }, []);

    return (

        <div
            id="game"
            style={{
                width: "100%",
                height: "100%",
            }}
        />

    );

}

createRoot(

    document.getElementById("root")!

).render(

    <StrictMode>

        <GameApp />

    </StrictMode>

);