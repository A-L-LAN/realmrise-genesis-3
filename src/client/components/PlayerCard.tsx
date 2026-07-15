import React from "react";
import {
  Crown,
  Shield,
  Sword,
  Star,
  Coins,
  Trophy,
  Users,
  Heart,
  MapPinned,
  Calendar,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export interface PlayerCardProps {
  username: string;

  kingdom: string;

  guild?: string;

  level: number;

  experience: number;

  experienceToNext: number;

  gold: number;

  power: number;

  reputation: number;

  cities: number;

  armies: number;

  heroes: number;

  health: number;

  maxHealth: number;

  worldDay: number;

  avatarUrl?: string;

  online?: boolean;
}

/* ============================================================
   Helpers
============================================================ */

function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function percentage(
  current: number,
  max: number
): number {
  if (max <= 0) return 0;

  return Math.min(
    100,
    Math.round((current / max) * 100)
  );
}

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function Stat({
  icon,
  label,
  value,
}: StatProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-lg
        bg-slate-900
        p-3
      "
    >
      <div className="text-blue-400">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="font-semibold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Component
============================================================ */

export default function PlayerCard({
  username,
  kingdom,
  guild,
  level,
  experience,
  experienceToNext,
  gold,
  power,
  reputation,
  cities,
  armies,
  heroes,
  health,
  maxHealth,
  worldDay,
  avatarUrl,
  online = true,
}: PlayerCardProps) {
  const xpProgress = percentage(
    experience,
    experienceToNext
  );

  const hpProgress = percentage(
    health,
    maxHealth
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
      "
    >
      {/* ==========================================
          Header
      ========================================== */}

      <div
        className="
          bg-gradient-to-r
          from-blue-700
          via-indigo-700
          to-slate-900
          p-6
        "
      >
        <div className="flex items-center gap-5">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username}
                className="
                  h-24
                  w-24
                  rounded-full
                  border-4
                  border-white
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-white
                  bg-slate-800
                  text-3xl
                  font-bold
                  text-white
                "
              >
                {username.charAt(0).toUpperCase()}
              </div>
            )}

            <div
              className={`
                absolute
                bottom-1
                right-1
                h-5
                w-5
                rounded-full
                border-2
                border-white
                ${
                  online
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              `}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                {username}
              </h2>

              <span
                className="
                  rounded-full
                  bg-yellow-500
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-slate-900
                "
              >
                LV {level}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-200">
              <span className="flex items-center gap-1">
                <Crown size={16} />
                {kingdom}
              </span>

              {guild && (
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {guild}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Experience
      ========================================== */}

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Experience
          </span>

          <span className="text-sm text-white">
            {formatNumber(experience)} /{" "}
            {formatNumber(experienceToNext)}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{
              width: `${xpProgress}%`,
            }}
          />
        </div>

        <div className="mt-5 mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Health
          </span>

          <span className="text-sm text-white">
            {health} / {maxHealth}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-green-500 transition-all"
            style={{
              width: `${hpProgress}%`,
            }}
          />
        </div>
      </div>

      {/* ==========================================
          Stats
      ========================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
          p-5
          lg:grid-cols-3
        "
      >
        <Stat
          icon={<Coins />}
          label="Gold"
          value={formatNumber(gold)}
        />

        <Stat
          icon={<Sword />}
          label="Power"
          value={formatNumber(power)}
        />

        <Stat
          icon={<Shield />}
          label="Reputation"
          value={formatNumber(reputation)}
        />

        <Stat
          icon={<MapPinned />}
          label="Cities"
          value={cities}
        />

        <Stat
          icon={<Users />}
          label="Armies"
          value={armies}
        />

        <Stat
          icon={<Star />}
          label="Heroes"
          value={heroes}
        />
      </div>

      {/* ==========================================
          Footer
      ========================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-800
          bg-slate-900
          px-5
          py-4
        "
      >
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar size={16} />

          <span className="text-sm">
            World Day {worldDay}
          </span>
        </div>

        <div className="flex items-center gap-2 text-yellow-400">
          <Trophy size={16} />

          <span className="text-sm font-semibold">
            Active Ruler
          </span>
        </div>
      </div>
    </div>
  );
}