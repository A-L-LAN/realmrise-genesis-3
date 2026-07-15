import React, { useMemo } from "react";
import {
  Shield,
  Crown,
  Users,
  Trophy,
  Coins,
  Sword,
  Star,
  Calendar,
  Target,
  ScrollText,
  PlusCircle,
  Settings,
  CheckCircle2,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export interface GuildMember {
  id: string;
  username: string;
  rank: string;
  level: number;
  power: number;
  online: boolean;
  contribution: number;
}

export interface GuildWar {
  enemyGuild: string;
  status: "Preparing" | "Active" | "Victory" | "Defeat";
  remainingTime?: number;
}

export interface GuildPanelProps {
  id: string;

  name: string;

  tag: string;

  description: string;

  level: number;

  experience: number;

  experienceToNext: number;

  treasury: number;

  memberLimit: number;

  members: GuildMember[];

  leader: string;

  kingdom?: string;

  victories: number;

  defeats: number;

  guildPower: number;

  foundedDay: number;

  activeWar?: GuildWar;

  onInvite?(): void;

  onManage?(): void;

  onDonate?(): void;

  onLeave?(): void;
}

/* ============================================================
   Helpers
============================================================ */

function format(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function progress(
  current: number,
  max: number
): number {
  if (max <= 0) return 0;

  return Math.min(
    100,
    Math.round((current / max) * 100)
  );
}

function warColor(
  status: GuildWar["status"]
): string {
  switch (status) {
    case "Preparing":
      return "bg-yellow-600";

    case "Active":
      return "bg-red-600";

    case "Victory":
      return "bg-green-600";

    case "Defeat":
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

interface MemberCardProps {
  member: GuildMember;
}

function MemberCard({
  member,
}: MemberCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">
            {member.username}
          </h3>

          <p className="text-sm text-slate-400">
            {member.rank}
          </p>
        </div>

        <div
          className={`h-3 w-3 rounded-full ${
            member.online
              ? "bg-green-500"
              : "bg-slate-600"
          }`}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <StatCard
          icon={<Star size={16} />}
          label="Level"
          value={member.level}
        />

        <StatCard
          icon={<Sword size={16} />}
          label="Power"
          value={format(member.power)}
        />

        <StatCard
          icon={<Coins size={16} />}
          label="Contribution"
          value={format(member.contribution)}
        />

        <StatCard
          icon={<CheckCircle2 size={16} />}
          label="Status"
          value={
            member.online
              ? "Online"
              : "Offline"
          }
        />
      </div>
    </div>
  );
}

/* ============================================================
   Component
============================================================ */

export default function GuildPanel({
  name,
  tag,
  description,
  level,
  experience,
  experienceToNext,
  treasury,
  memberLimit,
  members,
  leader,
  kingdom,
  victories,
  defeats,
  guildPower,
  foundedDay,
  activeWar,
  onInvite,
  onManage,
  onDonate,
  onLeave,
}: GuildPanelProps) {
  const xp = progress(
    experience,
    experienceToNext
  );

  const onlineMembers = useMemo(
    () =>
      members.filter((m) => m.online)
        .length,
    [members]
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      {/* ====================================================
          Header
      ==================================================== */}

      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-slate-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <Shield className="text-purple-400" />

              <h2 className="text-3xl font-bold text-white">
                {name}
              </h2>

              <span className="rounded-full bg-purple-600 px-3 py-1 text-sm font-semibold text-white">
                [{tag}]
              </span>
            </div>

            <p className="mt-3 max-w-2xl text-slate-300">
              {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-5 text-slate-300">
              <span className="flex items-center gap-2">
                <Crown size={16} />
                Leader: {leader}
              </span>

              {kingdom && (
                <span className="flex items-center gap-2">
                  <Target size={16} />
                  {kingdom}
                </span>
              )}

              <span className="flex items-center gap-2">
                <Calendar size={16} />
                Founded Day {foundedDay}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onInvite}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
            >
              <PlusCircle size={18} />
              Invite
            </button>

            <button
              onClick={onDonate}
              className="rounded-lg bg-yellow-600 px-4 py-2 font-semibold text-white hover:bg-yellow-500"
            >
              Donate
            </button>

            <button
              onClick={onManage}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            >
              <Settings size={18} />
              Manage
            </button>

            <button
              onClick={onLeave}
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
            >
              Leave
            </button>
          </div>
        </div>
      </div>

      {/* Experience */}

      <div className="p-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-400">
            Guild Level {level}
          </span>

          <span className="text-white">
            {format(experience)} /{" "}
            {format(experienceToNext)}
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-800">
          <div
            className="h-3 rounded-full bg-purple-500"
            style={{
              width: `${xp}%`,
            }}
          />
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 px-5 pb-5 lg:grid-cols-4">
        <StatCard
          icon={<Users />}
          label="Members"
          value={`${members.length}/${memberLimit}`}
        />

        <StatCard
          icon={<Coins />}
          label="Treasury"
          value={format(treasury)}
        />

        <StatCard
          icon={<Sword />}
          label="Guild Power"
          value={format(guildPower)}
        />

        <StatCard
          icon={<Trophy />}
          label="Record"
          value={`${victories}-${defeats}`}
        />
      </div>

      {/* Active War */}

      {activeWar && (
        <div className="mx-5 mb-5 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Guild War
              </h3>

              <p className="mt-2 text-slate-300">
                Enemy Guild:{" "}
                <strong>
                  {activeWar.enemyGuild}
                </strong>
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 font-semibold text-white ${warColor(
                activeWar.status
              )}`}
            >
              {activeWar.status}
            </span>
          </div>

          {activeWar.remainingTime !==
            undefined && (
            <p className="mt-3 text-sm text-slate-400">
              Remaining:{" "}
              {activeWar.remainingTime}s
            </p>
          )}
        </div>
      )}

      {/* Members */}

      <div className="border-t border-slate-800 p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-white">
              <Users className="text-blue-400" />
              Members
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {onlineMembers} online
            </p>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ScrollText size={18} />
            {members.length} total
          </div>
        </div>

        {members.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center">
            <Users
              size={48}
              className="mx-auto mb-4 text-slate-600"
            />

            <h4 className="text-lg font-semibold text-white">
              No Members
            </h4>

            <p className="mt-2 text-slate-400">
              Invite players to grow your guild.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}