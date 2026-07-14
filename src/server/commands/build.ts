// commands/build.ts

import { StorageService } from "../services/StorageService";
import { KingdomService } from "../services/KingdomService";
import { BuildingService } from "../services/BuildingService";
import { HistoryService } from "../services/HistoryService";
import { AchievementService } from "../services/AchievementService";

import { Player } from "../models/Player";
import { Kingdom } from "../models/Kingdom";
import { Building } from "../models/Building";

export interface CommandResult {
    success: boolean;
    message: string;

    rewards?: {
        experience?: number;
        gold?: number;
    };

    changes?: string[];

    building?: Building;

    worldUpdated?: boolean;
}

export async function buildBuilding(
    playerId: string,
    kingdomId: string,
    buildingId: string
): Promise<CommandResult> {
    try {
        //--------------------------------------------------------
        // Load Player
        //--------------------------------------------------------

        const player = await StorageService.getPlayer(playerId);

        if (!player) {
            return {
                success: false,
                message: "Player not found."
            };
        }

        //--------------------------------------------------------
        // Load Kingdom
        //--------------------------------------------------------

        const kingdom = await StorageService.getKingdom(kingdomId);

        if (!kingdom) {
            return {
                success: false,
                message: "Kingdom not found."
            };
        }

        //--------------------------------------------------------
        // Validate Ownership
        //--------------------------------------------------------

        if (player.kingdomId !== kingdom.id) {
            return {
                success: false,
                message: "You are not a member of this kingdom."
            };
        }

        //--------------------------------------------------------
        // Get Building Definition
        //--------------------------------------------------------

        const building = BuildingService.getBuilding(buildingId);

        if (!building) {
            return {
                success: false,
                message: "Unknown building."
            };
        }

        //--------------------------------------------------------
        // Check Requirements
        //--------------------------------------------------------

        if (
            player.level <
            building.requiredLevel
        ) {
            return {
                success: false,
                message: `Requires level ${building.requiredLevel}.`
            };
        }

        //--------------------------------------------------------
        // Check Resources
        //--------------------------------------------------------

        if (kingdom.gold < building.cost.gold) {
            return {
                success: false,
                message: "Not enough gold."
            };
        }

        if (kingdom.wood < building.cost.wood) {
            return {
                success: false,
                message: "Not enough wood."
            };
        }

        if (kingdom.stone < building.cost.stone) {
            return {
                success: false,
                message: "Not enough stone."
            };
        }

        if (kingdom.food < building.cost.food) {
            return {
                success: false,
                message: "Not enough food."
            };
        }

        //--------------------------------------------------------
        // Spend Resources
        //--------------------------------------------------------

        kingdom.gold -= building.cost.gold;
        kingdom.wood -= building.cost.wood;
        kingdom.stone -= building.cost.stone;
        kingdom.food -= building.cost.food;

        //--------------------------------------------------------
        // Apply Bonuses
        //--------------------------------------------------------

        switch (building.type) {
            case "Farm":
                kingdom.foodProduction += building.foodBonus;
                break;

            case "LumberMill":
                kingdom.woodProduction += building.woodBonus;
                break;

            case "Quarry":
                kingdom.stoneProduction += building.stoneBonus;
                break;

            case "Mine":
                kingdom.goldProduction += building.goldBonus;
                break;

            case "House":
                kingdom.populationCapacity +=
                    building.populationBonus;
                break;

            case "Barracks":
                kingdom.armyCapacity +=
                    building.armyBonus;
                break;

            case "Market":
                kingdom.tradeBonus +=
                    building.tradeBonus;
                break;

            case "Library":
                kingdom.researchBonus +=
                    building.researchBonus;
                break;

            case "Castle":
                kingdom.defense +=
                    building.defenseBonus;
                break;
        }

        //--------------------------------------------------------
        // Add Building
        //--------------------------------------------------------

        kingdom.buildings.push({
            id: building.id,
            level: 1,
            constructedAt: Date.now()
        });

        //--------------------------------------------------------
        // Experience
        //--------------------------------------------------------

        player.experience += building.experienceReward;

        //--------------------------------------------------------
        // Save
        //--------------------------------------------------------

        await StorageService.savePlayer(player);

        await StorageService.saveKingdom(kingdom);

        //--------------------------------------------------------
        // Kingdom Stats
        //--------------------------------------------------------

        await KingdomService.recalculateStats(
            kingdom.id
        );

        //--------------------------------------------------------
        // Achievements
        //--------------------------------------------------------

        await AchievementService.checkBuildingAchievements(
            player.id,
            kingdom.id
        );

        //--------------------------------------------------------
        // History
        //--------------------------------------------------------

        await HistoryService.addEntry({
            kingdomId,
            playerId,
            type: "BUILDING_CONSTRUCTED",
            title: `${player.username} constructed a ${building.name}.`,
            timestamp: Date.now()
        });

        //--------------------------------------------------------
        // Return
        //--------------------------------------------------------

        return {
            success: true,

            message: `${building.name} successfully constructed.`,

            rewards: {
                experience:
                    building.experienceReward
            },

            building,

            changes: [
                `-${building.cost.gold} Gold`,
                `-${building.cost.wood} Wood`,
                `-${building.cost.stone} Stone`,
                `-${building.cost.food} Food`,
                `${building.name} added`
            ],

            worldUpdated: true
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Unable to construct building."
        };
    }
}