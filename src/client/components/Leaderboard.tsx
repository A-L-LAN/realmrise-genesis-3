import React, { useMemo, useState } from "react";
import {
  Crown,
  Trophy,
  Medal,
  Shield,
  Sword,
  Star,
  TrendingUp,
  Users,
  Search,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export type LeaderboardCategory =
  | "Power"
  | "Level"
  | "Gold"
  | "Kingdom"
  | "Guild"
  | "PvP";

export interface LeaderboardPlayer {
  id: string;

  username: string;

  kingdom: string;

  guild?: string;

  level: number;

  power: number;

  gold: number;

  pvpPoints: number;

  wins: number;

  losses: number;

  score: number;
}

export interface LeaderboardProps {
  players: LeaderboardPlayer[];

  category?: LeaderboardCategory;

  onCategoryChange?(
    category: LeaderboardCategory
  ): void;

  onPlayerClick?(
    player: LeaderboardPlayer
  ): void;
}

/* ============================================================
   Helpers
============================================================ */

const categories: LeaderboardCategory[] = [
  "Power",
  "Level",
  "Gold",
  "Kingdom",
  "Guild",
  "PvP",
];

function format(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function medal(rank: number) {
  switch (rank) {
    case 1:
      return (
        <Crown
          className="text-yellow-400"
          size={22}
        />
      );

    case 2:
      return (
        <Medal
          className="text-slate-300"
          size={22}
        />
      );

    case 3:
      return (
        <Medal
          className="text-amber-700"
          size={22}
        />
      );

    default:
      return (
        <span className="font-bold text-slate-400">
          #{rank}
        </span>
      );
  }
}

/* ============================================================
   Component
============================================================ */

export default function Leaderboard({
  players,
  category = "Power",
  onCategoryChange,
  onPlayerClick,
}: LeaderboardProps) {
  const [search, setSearch] =
    useState("");

  const [ascending, setAscending] =
    useState(false);

  const filtered = useMemo(() => {
    let list = [...players];

    if (search.trim()) {
      const query =
        search.toLowerCase();

      list = list.filter((player) =>
        player.username
          .toLowerCase()
          .includes(query)
      );
    }

    list.sort((a, b) => {
      let value = 0;

      switch (category) {
        case "Power":
          value =
            a.power - b.power;
          break;

        case "Level":
          value =
            a.level - b.level;
          break;

        case "Gold":
          value =
            a.gold - b.gold;
          break;

        case "PvP":
          value =
            a.pvpPoints -
            b.pvpPoints;
          break;

        case "Guild":
          value = (
            a.guild ?? ""
          ).localeCompare(
            b.guild ?? ""
          );
          break;

        case "Kingdom":
          value =
            a.kingdom.localeCompare(
              b.kingdom
            );
          break;
      }

      return ascending
        ? value
        : -value;
    });

    return list;
  }, [
    players,
    category,
    ascending,
    search,
  ]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      {/* ====================================================
          Header
      ==================================================== */}

      <div className="bg-gradient-to-r from-yellow-700 via-amber-700 to-slate-900 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
              <Trophy className="text-yellow-300" />
              Leaderboard
            </h2>

            <p className="mt-2 text-yellow-100">
              Top players across the
              realm.
            </p>
          </div>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search player..."
              className="rounded-lg border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* ====================================================
          Categories
      ==================================================== */}

      <div className="flex flex-wrap gap-2 border-b border-slate-800 bg-slate-900 p-4">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() =>
              onCategoryChange?.(
                item
              )
            }
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              category === item
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {item}
          </button>
        ))}

        <button
          onClick={() =>
            setAscending(
              !ascending
            )
          }
          className="ml-auto rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700"
        >
          {ascending ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </button>
      </div>

      {/* ====================================================
          Table
      ==================================================== */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr className="text-left text-sm text-slate-400">
              <th className="p-4">
                Rank
              </th>
              <th className="p-4">
                Player
              </th>
              <th className="p-4">
                Kingdom
              </th>
              <th className="p-4">
                Guild
              </th>
              <th className="p-4">
                Level
              </th>
              <th className="p-4">
                Power
              </th>
              <th className="p-4">
                Gold
              </th>
              <th className="p-4">
                PvP
              </th>
              <th className="p-4">
                W/L
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length ===
            0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-12 text-center text-slate-400"
                >
                  No players found.
                </td>
              </tr>
            ) : (
              filtered.map(
                (
                  player,
                  index
                ) => (
                  <tr
                    key={
                      player.id
                    }
                    onClick={() =>
                      onPlayerClick?.(
                        player
                      )
                    }
                    className="cursor-pointer border-t border-slate-800 transition hover:bg-slate-900"
                  >
                    <td className="p-4">
                      {medal(
                        index + 1
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 font-bold text-white">
                          {player.username
                            .charAt(
                              0
                            )
                            .toUpperCase()}
                        </div>

                        <span className="font-semibold text-white">
                          {
                            player.username
                          }
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <Shield
                          size={16}
                        />
                        {
                          player.kingdom
                        }
                      </div>
                    </td>

                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <Users
                          size={16}
                        />

                        {player.guild ??
                          "-"}
                      </div>
                    </td>

                    <td className="p-4 text-white">
                      {player.level}
                    </td>

                    <td className="p-4 text-white">
                      <div className="flex items-center gap-2">
                        <Sword
                          size={16}
                          className="text-red-400"
                        />

                        {format(
                          player.power
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-white">
                      {format(
                        player.gold
                      )}
                    </td>

                    <td className="p-4 text-white">
                      <div className="flex items-center gap-2">
                        <Star
                          size={16}
                          className="text-yellow-400"
                        />

                        {format(
                          player.pvpPoints
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <TrendingUp
                          size={16}
                          className="text-green-400"
                        />

                        {
                          player.wins
                        }
                        /
                        {
                          player.losses
                        }
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}