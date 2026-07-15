import React from "react";
import {
  Hammer,
  Swords,
  Users,
  FlaskConical,
  ShoppingCart,
  ScrollText,
  Shield,
  Castle,
  Flag,
  Gavel,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export interface ActionItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  disabled?: boolean;
  cooldown?: number;
}

export interface ActionBarProps {
  selected?: string;
  actions?: ActionItem[];
  onAction?(actionId: string): void;
}

/* ============================================================
   Default Actions
============================================================ */

const DEFAULT_ACTIONS: ActionItem[] = [
  {
    id: "build",
    label: "Build",
    description: "Construct new buildings",
    icon: <Hammer size={22} />,
  },
  {
    id: "recruit",
    label: "Recruit",
    description: "Train new military units",
    icon: <Users size={22} />,
  },
  {
    id: "attack",
    label: "Attack",
    description: "Launch an attack",
    icon: <Swords size={22} />,
  },
  {
    id: "research",
    label: "Research",
    description: "Unlock new technologies",
    icon: <FlaskConical size={22} />,
  },
  {
    id: "trade",
    label: "Trade",
    description: "Exchange resources",
    icon: <ShoppingCart size={22} />,
  },
  {
    id: "quests",
    label: "Quests",
    description: "View active quests",
    icon: <ScrollText size={22} />,
  },
  {
    id: "defense",
    label: "Defense",
    description: "Manage city defenses",
    icon: <Shield size={22} />,
  },
  {
    id: "kingdom",
    label: "Kingdom",
    description: "Kingdom management",
    icon: <Castle size={22} />,
  },
  {
    id: "guild",
    label: "Guild",
    description: "Guild management",
    icon: <Flag size={22} />,
  },
  {
    id: "vote",
    label: "Vote",
    description: "Kingdom voting",
    icon: <Gavel size={22} />,
  },
];

/* ============================================================
   Action Button
============================================================ */

interface ActionButtonProps {
  action: ActionItem;
  selected: boolean;
  onClick(): void;
}

function ActionButton({
  action,
  selected,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      disabled={action.disabled}
      onClick={onClick}
      title={action.description}
      className={`
        relative
        flex
        flex-col
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        px-5
        py-4
        transition-all
        duration-200
        min-w-[120px]

        ${
          selected
            ? "border-blue-500 bg-blue-600 text-white shadow-lg"
            : "border-slate-800 bg-slate-900 text-slate-300 hover:border-blue-500 hover:bg-slate-800 hover:text-white"
        }

        ${
          action.disabled
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer"
        }
      `}
    >
      <div>{action.icon}</div>

      <span className="text-sm font-semibold">
        {action.label}
      </span>

      {action.cooldown !== undefined && action.cooldown > 0 && (
        <span
          className="
            absolute
            top-2
            right-2
            rounded-full
            bg-red-600
            px-2
            py-0.5
            text-[10px]
            font-bold
            text-white
          "
        >
          {action.cooldown}s
        </span>
      )}
    </button>
  );
}

/* ============================================================
   Action Bar
============================================================ */

export default function ActionBar({
  selected,
  actions = DEFAULT_ACTIONS,
  onAction,
}: ActionBarProps) {
  return (
    <section
      className="
        w-full
        border-t
        border-slate-800
        bg-slate-950
        px-4
        py-4
      "
    >
      <div
        className="
          flex
          gap-4
          overflow-x-auto
          scrollbar-thin
          scrollbar-thumb-slate-700
          scrollbar-track-transparent
        "
      >
        {actions.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            selected={selected === action.id}
            onClick={() => onAction?.(action.id)}
          />
        ))}
      </div>
    </section>
  );
}