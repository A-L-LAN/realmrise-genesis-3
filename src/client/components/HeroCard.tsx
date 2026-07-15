import React from "react";
import {
  Crown,
  Shield,
  Sword,
  Heart,
  Star,
  Zap,
  Sparkles,
  Trophy,
  BadgeCheck,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export type HeroRarity =
  | "Common"
  | "Rare"
  | "Epic"
  | "Legendary"
  | "Mythic";

export interface HeroCardProps {
  id: string;

  name: string;

  title?: string;

  heroClass: string;

  level: number;

  experience: number;

  experienceToNext: number;

  rarity: HeroRarity;

  attack: number;

  defense: number;

  health: number;

  maxHealth: number;

  energy: number;

  maxEnergy: number;

  leadership: number;

  loyalty: number;

  wins: number;

  losses: number;

  assignedArmy?: string;

  kingdom?: string;

  portraitUrl?: string;

  available?: boolean;

  onSelect?(heroId: string): void;
}

/* ============================================================
   Helpers
============================================================ */

function percent(
  current: number,
  max: number
): number {
  if (max <= 0) return 0;

  return Math.min(
    100,
    Math.round((current / max) * 100)
  );
}

function format(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function rarityClasses(rarity: HeroRarity): string {
  switch (rarity) {
    case "Common":
      return "border-gray-500 bg-gray-700";

    case "Rare":
      return "border-blue-500 bg-blue-700";

    case "Epic":
      return "border-purple-500 bg-purple-700";

    case "Legendary":
      return "border-yellow-500 bg-yellow-600";

    case "Mythic":
      return "border-red-500 bg-red-700";

    default:
      return "border-gray-500 bg-gray-700";
  }
}

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function Stat({
  icon,
  label,
  value,
}: StatProps) {
  return (
    <div className="rounded-lg bg-slate-900 p-3">
      <div className="flex items-center gap-2 text-slate-300">
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      <div className="mt-1 text-lg font-bold text-white">
        {format(value)}
      </div>
    </div>
  );
}

/* ============================================================
   Component
============================================================ */

export default function HeroCard({
  id,
  name,
  title,
  heroClass,
  level,
  experience,
  experienceToNext,
  rarity,
  attack,
  defense,
  health,
  maxHealth,
  energy,
  maxEnergy,
  leadership,
  loyalty,
  wins,
  losses,
  assignedArmy,
  kingdom,
  portraitUrl,
  available = true,
  onSelect,
}: HeroCardProps) {
  const xp = percent(
    experience,
    experienceToNext
  );

  const hp = percent(
    health,
    maxHealth
  );

  const ep = percent(
    energy,
    maxEnergy
  );

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-950
        shadow-xl
        transition
        hover:shadow-2xl
      "
    >
      {/* ====================================================
          Header
      ==================================================== */}

      <div
        className="
          bg-gradient-to-r
          from-indigo-700
          via-slate-800
          to-slate-900
          p-5
        "
      >
        <div className="flex gap-5">
          <div className="relative">
            {portraitUrl ? (
              <img
                src={portraitUrl}
                alt={name}
                className="
                  h-28
                  w-28
                  rounded-xl
                  border-2
                  border-white
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-700
                  text-4xl
                  font-bold
                  text-white
                "
              >
                {name.charAt(0)}
              </div>
            )}

            <div
              className={`
                absolute
                -bottom-2
                left-1/2
                -translate-x-1/2
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-bold
                text-white
                ${rarityClasses(rarity)}
              `}
            >
              {rarity}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                {name}
              </h2>

              <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                Lv {level}
              </span>
            </div>

            {title && (
              <p className="mt-1 text-slate-300">
                {title}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="flex items-center gap-1">
                <BadgeCheck size={15} />
                {heroClass}
              </span>

              {kingdom && (
                <span className="flex items-center gap-1">
                  <Crown size={15} />
                  {kingdom}
                </span>
              )}
            </div>

            <div className="mt-4">
              <button
                disabled={!available}
                onClick={() => onSelect?.(id)}
                className={`
                  rounded-lg
                  px-5
                  py-2
                  text-sm
                  font-semibold

                  ${
                    available
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "cursor-not-allowed bg-slate-700 text-slate-400"
                  }
                `}
              >
                {available
                  ? "Select Hero"
                  : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          Progress
      ==================================================== */}

      <div className="space-y-5 p-5">
        {/* XP */}

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">
              Experience
            </span>

            <span className="text-white">
              {format(experience)} /{" "}
              {format(experienceToNext)}
            </span>
          </div>

          <div className="h-3 rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-blue-500"
              style={{
                width: `${xp}%`,
              }}
            />
          </div>
        </div>

        {/* HP */}

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">
              Health
            </span>

            <span className="text-white">
              {health}/{maxHealth}
            </span>
          </div>

          <div className="h-3 rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-green-500"
              style={{
                width: `${hp}%`,
              }}
            />
          </div>
        </div>

        {/* Energy */}

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">
              Energy
            </span>

            <span className="text-white">
              {energy}/{maxEnergy}
            </span>
          </div>

          <div className="h-3 rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-purple-500"
              style={{
                width: `${ep}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ====================================================
          Stats
      ==================================================== */}

      <div className="grid grid-cols-2 gap-4 p-5 lg:grid-cols-3">
        <Stat
          icon={<Sword size={18} />}
          label="Attack"
          value={attack}
        />

        <Stat
          icon={<Shield size={18} />}
          label="Defense"
          value={defense}
        />

        <Stat
          icon={<Heart size={18} />}
          label="Health"
          value={health}
        />

        <Stat
          icon={<Zap size={18} />}
          label="Leadership"
          value={leadership}
        />

        <Stat
          icon={<Sparkles size={18} />}
          label="Loyalty"
          value={loyalty}
        />

        <Stat
          icon={<Star size={18} />}
          label="Level"
          value={level}
        />
      </div>

      {/* ====================================================
          Footer
      ==================================================== */}

      <div className="border-t border-slate-800 bg-slate-900 p-5">
        <div className="flex flex-wrap justify-between gap-4 text-sm">
          <div className="text-slate-300">
            <strong className="text-white">
              Assigned Army:
            </strong>{" "}
            {assignedArmy ?? "None"}
          </div>

          <div className="flex gap-5">
            <span className="flex items-center gap-1 text-green-400">
              <Trophy size={15} />
              {wins} Wins
            </span>

            <span className="text-red-400">
              {losses} Losses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}