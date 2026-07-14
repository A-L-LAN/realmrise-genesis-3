/**
 * ------------------------------------------------------------
 * vote.ts
 * Realmrise: Genesis
 * Community Event Voting Command
 * ------------------------------------------------------------
 *
 * Handles:
 *  - Event voting
 *  - Player validation
 *  - Duplicate vote prevention
 *  - Vote recording
 *  - Experience rewards
 *  - History logging
 *  - Notifications
 *  - Achievement hooks
 *  - Statistics
 *  - World updates
 *
 * Part 1
 * ------------------------------------------------------------
 */

import { randomUUID } from "crypto";

import {
    CommandResult,
    Player,
    WorldEvent,
    Notification
} from "../types";

import {
    getPlayer,
    savePlayer
} from "../database/players";

import {
    getWorldEvent,
    saveWorldEvent
} from "../database/worldEvents";

import {
    addExperience
} from "../services/experience";

import {
    unlockAchievements
} from "../services/achievements";

import {
    createNotification
} from "../services/notifications";

import {
    recordKingdomHistory
} from "../services/history";

import {
    logger
} from "../utils/logger";

/* ============================================================
   Constants
============================================================ */

const DEFAULT_VOTE_EXPERIENCE = 10;

const HISTORY_CATEGORY = "community";

/* ============================================================
   Helper Functions
============================================================ */

function hasAlreadyVoted(
    player: Player,
    eventId: string
): boolean {
    return (
        player.votes?.some(
            vote => vote.eventId === eventId
        ) ?? false
    );
}

function isValidChoice(
    event: WorldEvent,
    choice: string
): boolean {
    return event.choices.includes(choice);
}

function totalVotes(
    event: WorldEvent
): number {

    if (!event.votes) {
        return 0;
    }

    return Object.values(event.votes)
        .reduce(
            (total, value) => total + value,
            0
        );
}

/* ============================================================
   Main Command
============================================================ */

export async function voteOnEvent(
    playerId: string,
    eventId: string,
    choice: string
): Promise<CommandResult> {

    try {

        /* ----------------------------------------------------
           Load Player
        ---------------------------------------------------- */

        const player = await getPlayer(playerId);

        if (!player) {
            return {
                success: false,
                message: "Player not found."
            };
        }

        /* ----------------------------------------------------
           Load Event
        ---------------------------------------------------- */

        const event = await getWorldEvent(eventId);

        if (!event) {
            return {
                success: false,
                message: "World event not found."
            };
        }

        if (event.executed) {
            return {
                success: false,
                message:
                    "Voting has already ended for this event."
            };
        }

        /* ----------------------------------------------------
           Validation
        ---------------------------------------------------- */

        if (
            hasAlreadyVoted(
                player,
                event.id
            )
        ) {
            return {
                success: false,
                message:
                    "You have already voted on this event."
            };
        }

        if (
            !isValidChoice(
                event,
                choice
            )
        ) {
            return {
                success: false,
                message:
                    "Invalid voting choice."
            };
        }

        /* ----------------------------------------------------
           Initialize Vote Storage
        ---------------------------------------------------- */

        event.votes ??= {};

        player.votes ??= [];

                /* ----------------------------------------------------
           Record Vote
        ---------------------------------------------------- */

        event.votes[choice] =
            (event.votes[choice] ?? 0) + 1;

        player.votes.push({
            id: randomUUID(),
            eventId: event.id,
            choice,
            votedAt: Date.now()
        });

        /* ----------------------------------------------------
           Award Experience
        ---------------------------------------------------- */

        await addExperience(
            player.id,
            DEFAULT_VOTE_EXPERIENCE
        );

        /* ----------------------------------------------------
           Update Player Statistics
        ---------------------------------------------------- */

        player.statistics ??= {
            votesCast: 0,
            eventsParticipated: 0,
            questsCompleted: 0,
            battlesWon: 0,
            buildingsConstructed: 0,
            technologiesResearched: 0
        };

        player.statistics.votesCast++;
        player.statistics.eventsParticipated++;

        /* ----------------------------------------------------
           Activity Feed
        ---------------------------------------------------- */

        player.activity ??= [];

        player.activity.unshift({
            id: randomUUID(),
            type: "vote",
            title: "Community Vote",
            description:
                `You voted "${choice}" on "${event.title}".`,
            timestamp: Date.now()
        });

        if (player.activity.length > 200) {
            player.activity.length = 200;
        }

        /* ----------------------------------------------------
           Record Kingdom History
        ---------------------------------------------------- */

        if (player.kingdomId) {

            await recordKingdomHistory(
                player.kingdomId,
                {
                    id: randomUUID(),
                    category: HISTORY_CATEGORY,
                    title: "Community Vote",
                    description:
                        `${player.username} voted "${choice}" during the event "${event.title}".`,
                    createdAt: Date.now()
                }
            );

        }

        /* ----------------------------------------------------
           Notification
        ---------------------------------------------------- */

        const notification: Notification = {
            id: randomUUID(),
            playerId: player.id,
            type: "vote",
            title: "Vote Recorded",
            message:
                `Your vote for "${choice}" has been successfully recorded.`,
            read: false,
            createdAt: Date.now()
        };

        await createNotification(notification);

                /* ----------------------------------------------------
           Achievement Hooks
        ---------------------------------------------------- */

        await unlockAchievements(
            player.id,
            {
                trigger: "vote_cast",
                eventId: event.id,
                choice
            }
        );

        /* ----------------------------------------------------
           Event Statistics
        ---------------------------------------------------- */

        event.statistics ??= {
            totalVotes: 0,
            uniqueVoters: 0,
            lastVoteAt: 0
        };

        event.statistics.totalVotes++;

        event.statistics.uniqueVoters =
            player.votes.length > 0
                ? event.statistics.uniqueVoters + 1
                : event.statistics.uniqueVoters;

        event.statistics.lastVoteAt = Date.now();

        /* ----------------------------------------------------
           Event Activity Feed
        ---------------------------------------------------- */

        event.activity ??= [];

        event.activity.unshift({
            id: randomUUID(),
            type: "vote",
            playerId: player.id,
            playerName: player.username,
            choice,
            timestamp: Date.now()
        });

        if (event.activity.length > 500) {
            event.activity.length = 500;
        }

        /* ----------------------------------------------------
           Voting Progress
        ---------------------------------------------------- */

        const voteCount = totalVotes(event);

        event.lastUpdatedAt = Date.now();

        event.leadingChoice = Object.entries(event.votes)
            .sort((a, b) => b[1] - a[1])[0]?.[0];

        /* ----------------------------------------------------
           Persist Changes
        ---------------------------------------------------- */

        await savePlayer(player);

        await saveWorldEvent(event);

        /* ----------------------------------------------------
           Log Success
        ---------------------------------------------------- */

        logger.info(
            `[Vote] ${player.id} voted "${choice}" on event ${event.id}`
        );

        /* ----------------------------------------------------
           Success Response
        ---------------------------------------------------- */

        return {
            success: true,
            message: "Your vote has been recorded successfully.",
            data: {
                eventId: event.id,
                eventTitle: event.title,
                selectedChoice: choice,
                totalVotes: voteCount,
                leadingChoice: event.leadingChoice,
                votedAt: Date.now()
            }
        };

    } catch (error) {

        logger.error(
            "[VoteOnEvent]",
            error
        );

        return {
            success: false,
            message:
                "An unexpected error occurred while recording your vote.",
            error:
                error instanceof Error
                    ? error.message
                    : String(error)
        };
    }
}