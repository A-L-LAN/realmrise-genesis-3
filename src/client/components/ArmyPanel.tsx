import React, { useMemo } from "react";
import {
  Shield,
  Sword,
  Users,
  Heart,
  Flag,
  Crown,
  Horse,
  Target,
  Star,
  TrendingUp,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Swords,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export type ArmyStatus =
  | "Idle"
  | "Training"
  | "Marching"
  | "Attacking"
  | "Defending"
  | "Recovering";

export interface ArmyUnit {
  id: string;

  name: string;

  tier: number;

  quantity: number;

  attack: number;

  defense: number;

  health: number;

  speed: number;
}

export interface ArmyCommander {
  id: string;

  name: string;

  level: number;
}

export interface ArmyPanelProps {
  id: string;

  name: string;

  kingdom: string;

  location: string;

  commander?: ArmyCommander;

  status: ArmyStatus;

  morale: number;

  stamina: number;

  capacity: number;

  totalSoldiers: number;

  marchSpeed: number;

  victories: number;

  defeats: number;

  units: ArmyUnit[];

  returningIn?: number;

  onAttack?(): void;

  onMove?(): void;

  onRecruit?(): void;

  onManage?(): void;
}

/* ============================================================
   Helpers
============================================================ */

function format(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function progress(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function statusColor(status: ArmyStatus): string {
  switch (status) {
    case "Idle":
      return "bg-green-600";

    case "Training":
      return "bg-blue-600";

    case "Marching":
      return "bg-purple-600";

    case "Attacking":
      return "bg-red-600";

    case "Defending":
      return "bg-orange-600";

    case "Recovering":
      return "bg-yellow-600";

    default:
      return "bg-slate-600";
  }
}

/* ============================================================
   Components
============================================================ */

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

interface UnitCardProps {
  unit: ArmyUnit;
}

function UnitCard({
  unit,
}: UnitCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">
            {unit.name}
          </h3>

          <p className="text-sm text-slate-400">
            Tier {unit.tier}
          </p>
        </div>

        <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
          {format(unit.quantity)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <StatCard
          icon={<Sword size={16} />}
          label="Attack"
          value={unit.attack}
        />

        <StatCard
          icon={<Shield size={16} />}
          label="Defense"
          value={unit.defense}
        />

        <StatCard
          icon={<Heart size={16} />}
          label="Health"
          value={unit.health}
        />

        <StatCard
          icon={<Horse size={16} />}
          label="Speed"
          value={unit.speed}
        />
      </div>
    </div>
  );
}

/* ============================================================
   Component
============================================================ */

export default function ArmyPanel({
  name,
  kingdom,
  location,
  commander,
  status,
  morale,
  stamina,
  capacity,
  totalSoldiers,
  marchSpeed,
  victories,
  defeats,
  units,
  returningIn,
  onAttack,
  onMove,
  onRecruit,
  onManage,
}: ArmyPanelProps) {
  const totalAttack = useMemo(
    () =>
      units.reduce(
        (sum, u) => sum + u.attack * u.quantity,
        0
      ),
    [units]
  );

  const totalDefense = useMemo(
    () =>
      units.reduce(
        (sum, u) => sum + u.defense * u.quantity,
        0
      ),
    [units]
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      {/* ====================================================
          Header
      ==================================================== */}

      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-slate-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <Swords className="text-red-400" />

              <h2 className="text-3xl font-bold text-white">
                {name}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${statusColor(
                  status
                )}`}
              >
                {status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-5 text-slate-300">
              <span className="flex items-center gap-2">
                <Flag size={16} />
                {kingdom}
              </span>

              <span className="flex items-center gap-2">
                <Target size={16} />
                {location}
              </span>

              {commander && (
                <span className="flex items-center gap-2">
                  <Crown size={16} />
                  {commander.name} (Lv {commander.level})
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onAttack}
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
            >
              Attack
            </button>

            <button
              onClick={onMove}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            >
              Move
            </button>

            <button
              onClick={onRecruit}
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
            >
              Recruit
            </button>

            <button
              onClick={onManage}
              className="rounded-lg bg-slate-700 px-4 py-2 font-semibold text-white hover:bg-slate-600"
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
          icon={<Users />}
          label="Soldiers"
          value={format(totalSoldiers)}
        />

        <StatCard
          icon={<Sword />}
          label="Attack"
          value={format(totalAttack)}
        />

        <StatCard
          icon={<Shield />}
          label="Defense"
          value={format(totalDefense)}
        />

        <StatCard
          icon={<Horse />}
          label="March Speed"
          value={marchSpeed}
        />
      </div>

      {/* ====================================================
          Morale / Stamina
      ==================================================== */}

      <div className="space-y-5 px-5 pb-5">
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-slate-400">
              Morale
            </span>

            <span className="text-sm text-white">
              {morale}%
            </span>
          </div>

          <div className="h-3 rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-green-500"
              style={{
                width: `${progress(morale)}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-slate-400">
              Stamina
            </span>

            <span className="text-sm text-white">
              {stamina}%
            </span>
          </div>

          <div className="h-3 rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-blue-500"
              style={{
                width: `${progress(stamina)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ====================================================
          Summary
      ==================================================== */}

      <div className="grid grid-cols-2 gap-4 px-5 pb-5 lg:grid-cols-4">
        <StatCard
          icon={<TrendingUp />}
          label="Capacity"
          value={capacity}
        />

        <StatCard
          icon={<CheckCircle2 />}
          label="Victories"
          value={victories}
        />

        <StatCard
          icon={<AlertTriangle />}
          label="Defeats"
          value={defeats}
        />

        <StatCard
          icon={<Clock3 />}
          label="Return"
          value={
            returningIn
              ? `${returningIn}s`
              : "-"
          }
        />
      </div>

      {/* ====================================================
          Units
      ==================================================== */}

      <div className="border-t border-slate-800 p-5">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
          <Shield className="text-blue-400" />
          Army Units
        </h3>

        {units.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center">
            <Users
              size={48}
              className="mx-auto mb-4 text-slate-600"
            />

            <h4 className="text-lg font-semibold text-white">
              No Units
            </h4>

            <p className="mt-2 text-slate-400">
              Recruit soldiers to strengthen this army.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}