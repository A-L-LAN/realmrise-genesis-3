import React from "react";
import {
  Coins,
  Wheat,
  Hammer,
  Gem,
  HeartPulse,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export interface Resource {
  name: string;
  amount: number;
  income?: number;
  icon?: React.ReactNode;
}

export interface ResourceBarProps {
  gold: Resource;
  food: Resource;
  wood: Resource;
  stone: Resource;
  iron: Resource;
  mana: Resource;
}

/* ============================================================
   Helpers
============================================================ */

function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function IncomeBadge({
  income,
}: {
  income?: number;
}) {
  if (income === undefined) {
    return null;
  }

  const positive = income >= 0;

  return (
    <div
      className={`flex items-center gap-1 text-xs font-semibold ${
        positive
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      {positive ? (
        <TrendingUp size={12} />
      ) : (
        <TrendingDown size={12} />
      )}

      {positive ? "+" : ""}
      {income}/m
    </div>
  );
}

/* ============================================================
   Resource Card
============================================================ */

function ResourceCard({
  resource,
}: {
  resource: Resource;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        bg-slate-900
        border
        border-slate-800
        px-4
        py-2
        shadow
        min-w-[150px]
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-slate-800
        "
      >
        {resource.icon}
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-slate-400">
          {resource.name}
        </span>

        <span className="font-bold text-white">
          {formatNumber(resource.amount)}
        </span>

        <IncomeBadge
          income={resource.income}
        />
      </div>
    </div>
  );
}

/* ============================================================
   Component
============================================================ */

export default function ResourceBar({
  gold,
  food,
  wood,
  stone,
  iron,
  mana,
}: ResourceBarProps) {
  return (
    <section
      className="
        w-full
        border-b
        border-slate-800
        bg-slate-950
        px-4
        py-3
      "
    >
      <div
        className="
          flex
          gap-3
          overflow-x-auto
          scrollbar-thin
        "
      >
        <ResourceCard
          resource={{
            ...gold,
            icon: (
              <Coins
                className="text-yellow-400"
                size={22}
              />
            ),
          }}
        />

        <ResourceCard
          resource={{
            ...food,
            icon: (
              <Wheat
                className="text-green-400"
                size={22}
              />
            ),
          }}
        />

        <ResourceCard
          resource={{
            ...wood,
            icon: (
              <Hammer
                className="text-orange-400"
                size={22}
              />
            ),
          }}
        />

        <ResourceCard
          resource={{
            ...stone,
            icon: (
              <Gem
                className="text-gray-300"
                size={22}
              />
            ),
          }}
        />

        <ResourceCard
          resource={{
            ...iron,
            icon: (
              <Hammer
                className="text-slate-300"
                size={22}
              />
            ),
          }}
        />

        <ResourceCard
          resource={{
            ...mana,
            icon: (
              <HeartPulse
                className="text-purple-400"
                size={22}
              />
            ),
          }}
        />
      </div>
    </section>
  );
}