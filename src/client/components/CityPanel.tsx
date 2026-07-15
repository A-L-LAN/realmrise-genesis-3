import React, { useMemo } from "react";
import {
  Castle,
  Building2,
  Hammer,
  Users,
  Coins,
  Wheat,
  Trees,
  Mountain,
  Shield,
  Heart,
  Clock3,
  Star,
  PlusCircle,
  ArrowUp,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export interface CityBuilding {
  id: string;
  name: string;
  level: number;
  maxLevel: number;

  icon?: React.ReactNode;

  health: number;
  maxHealth: number;

  upgrading?: boolean;

  upgradeTimeRemaining?: number;

  description?: string;
}

export interface CityResources {
  gold: number;
  food: number;
  wood: number;
  stone: number;
  population: number;
}

export interface CityPanelProps {
  cityId: string;

  cityName: string;

  kingdom: string;

  governor?: string;

  level: number;

  prosperity: number;

  defense: number;

  happiness: number;

  resources: CityResources;

  buildings: CityBuilding[];

  onUpgradeBuilding?(buildingId: string): void;

  onBuild?(): void;

  onManage?(): void;
}

/* ============================================================
   Helpers
============================================================ */

function format(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function percent(current: number, max: number): number {
  if (max <= 0) return 0;

  return Math.min(
    100,
    Math.round((current / max) * 100)
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatCard({
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-slate-900 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-xs uppercase">
          {label}
        </span>
      </div>

      <div className="mt-2 text-xl font-bold text-white">
        {value}
      </div>
    </div>
  );
}

/* ============================================================
   Building Card
============================================================ */

interface BuildingCardProps {
  building: CityBuilding;

  onUpgrade?(id: string): void;
}

function BuildingCard({
  building,
  onUpgrade,
}: BuildingCardProps) {
  const hp = percent(
    building.health,
    building.maxHealth
  );

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-800 p-3">
            {building.icon ?? (
              <Building2 size={24} />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {building.name}
            </h3>

            <p className="text-sm text-slate-400">
              Level {building.level} /{" "}
              {building.maxLevel}
            </p>

            {building.description && (
              <p className="mt-1 text-xs text-slate-500">
                {building.description}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={
            building.upgrading ||
            building.level >= building.maxLevel
          }
          onClick={() =>
            onUpgrade?.(building.id)
          }
          className={`
            rounded-lg
            px-3
            py-2
            text-sm
            font-semibold

            ${
              building.level >=
              building.maxLevel
                ? "cursor-not-allowed bg-slate-700 text-slate-400"
                : building.upgrading
                ? "cursor-not-allowed bg-yellow-700 text-white"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }
          `}
        >
          {building.level >=
          building.maxLevel
            ? "MAX"
            : building.upgrading
            ? "Upgrading"
            : "Upgrade"}
        </button>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-slate-400">
            Health
          </span>

          <span className="text-white">
            {building.health}/
            {building.maxHealth}
          </span>
        </div>

        <div className="h-2 rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-green-500"
            style={{
              width: `${hp}%`,
            }}
          />
        </div>

        {building.upgrading && (
          <div className="mt-3 flex items-center gap-2 text-xs text-yellow-400">
            <Clock3 size={14} />

            {building.upgradeTimeRemaining}s
            remaining
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Component
============================================================ */

export default function CityPanel({
  cityName,
  kingdom,
  governor,
  level,
  prosperity,
  defense,
  happiness,
  resources,
  buildings,
  onUpgradeBuilding,
  onBuild,
  onManage,
}: CityPanelProps) {
  const averageBuildingLevel = useMemo(() => {
    if (buildings.length === 0) return 0;

    return (
      buildings.reduce(
        (sum, b) => sum + b.level,
        0
      ) / buildings.length
    ).toFixed(1);
  }, [buildings]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      {/* ====================================================
          Header
      ==================================================== */}

      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <Castle className="text-yellow-400" />

              <h2 className="text-3xl font-bold text-white">
                {cityName}
              </h2>

              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                Lv {level}
              </span>
            </div>

            <p className="mt-2 text-slate-300">
              Kingdom:{" "}
              <strong>{kingdom}</strong>
            </p>

            {governor && (
              <p className="text-slate-400">
                Governor: {governor}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBuild}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
            >
              <PlusCircle size={18} />
              Build
            </button>

            <button
              onClick={onManage}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            >
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          Stats
      ==================================================== */}

      <div className="grid grid-cols-2 gap-4 p-5 lg:grid-cols-4">
        <StatCard
          icon={<Star size={18} />}
          label="Prosperity"
          value={`${prosperity}%`}
        />

        <StatCard
          icon={<Shield size={18} />}
          label="Defense"
          value={defense}
        />

        <StatCard
          icon={<Heart size={18} />}
          label="Happiness"
          value={`${happiness}%`}
        />

        <StatCard
          icon={<ArrowUp size={18} />}
          label="Avg Building"
          value={averageBuildingLevel}
        />
      </div>

      {/* ====================================================
          Resources
      ==================================================== */}

      <div className="px-5">
        <h3 className="mb-3 text-lg font-bold text-white">
          City Resources
        </h3>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard
            icon={<Coins size={18} />}
            label="Gold"
            value={format(resources.gold)}
          />

          <StatCard
            icon={<Wheat size={18} />}
            label="Food"
            value={format(resources.food)}
          />

          <StatCard
            icon={<Trees size={18} />}
            label="Wood"
            value={format(resources.wood)}
          />

          <StatCard
            icon={<Mountain size={18} />}
            label="Stone"
            value={format(resources.stone)}
          />

          <StatCard
            icon={<Users size={18} />}
            label="Population"
            value={format(
              resources.population
            )}
          />
        </div>
      </div>

      {/* ====================================================
          Buildings
      ==================================================== */}

      <div className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Hammer className="text-orange-400" />

          <h3 className="text-lg font-bold text-white">
            Buildings
          </h3>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {buildings.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
              onUpgrade={
                onUpgradeBuilding
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}