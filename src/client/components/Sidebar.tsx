import React from "react";
import {
  LayoutDashboard,
  Castle,
  Shield,
  Swords,
  Crown,
  ScrollText,
  Users,
  FlaskConical,
  Handshake,
  Trophy,
  Map,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface SidebarProps {
  active: string;

  collapsed?: boolean;

  onToggle?(): void;

  onSelect?(id: string): void;
}

/* ============================================================
   Menu
============================================================ */

const MENU_ITEMS: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "map",
    label: "World Map",
    icon: <Map size={20} />,
  },
  {
    id: "city",
    label: "City",
    icon: <Castle size={20} />,
  },
  {
    id: "army",
    label: "Army",
    icon: <Swords size={20} />,
  },
  {
    id: "heroes",
    label: "Heroes",
    icon: <Crown size={20} />,
  },
  {
    id: "kingdom",
    label: "Kingdom",
    icon: <Shield size={20} />,
  },
  {
    id: "guild",
    label: "Guild",
    icon: <Users size={20} />,
  },
  {
    id: "research",
    label: "Research",
    icon: <FlaskConical size={20} />,
  },
  {
    id: "quests",
    label: "Quests",
    icon: <ScrollText size={20} />,
    badge: 3,
  },
  {
    id: "trade",
    label: "Trade",
    icon: <Handshake size={20} />,
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: <Trophy size={20} />,
  },
];

/* ============================================================
   Sidebar Button
============================================================ */

interface SidebarButtonProps {
  item: SidebarItem;
  active: boolean;
  collapsed: boolean;
  onClick(): void;
}

function SidebarButton({
  item,
  active,
  collapsed,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        flex
        w-full
        items-center
        gap-4
        rounded-xl
        px-4
        py-3
        transition-all
        duration-200

        ${
          active
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }
      `}
    >
      <span className="flex-shrink-0">{item.icon}</span>

      {!collapsed && (
        <>
          <span className="flex-1 text-left font-medium">
            {item.label}
          </span>

          {item.badge !== undefined && (
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              {item.badge}
            </span>
          )}
        </>
      )}

      {collapsed && (
        <div
          className="
            pointer-events-none
            absolute
            left-full
            ml-3
            hidden
            rounded-lg
            bg-slate-900
            px-3
            py-2
            text-sm
            text-white
            shadow-xl
            group-hover:block
            whitespace-nowrap
            z-50
          "
        >
          {item.label}
        </div>
      )}
    </button>
  );
}

/* ============================================================
   Sidebar
============================================================ */

export default function Sidebar({
  active,
  collapsed = false,
  onToggle,
  onSelect,
}: SidebarProps) {
  return (
    <aside
      className={`
        flex
        h-screen
        flex-col
        border-r
        border-slate-800
        bg-slate-950
        transition-all
        duration-300
        ${
          collapsed
            ? "w-20"
            : "w-72"
        }
      `}
    >
      {/* ====================================================
          Header
      ==================================================== */}

      <div className="flex items-center justify-between border-b border-slate-800 p-5">
        {!collapsed && (
          <div>
            <h2 className="text-xl font-bold text-white">
              RealmRise
            </h2>

            <p className="text-xs text-slate-400">
              Genesis
            </p>
          </div>
        )}

        <button
          onClick={onToggle}
          className="
            rounded-lg
            bg-slate-800
            p-2
            text-slate-300
            transition-colors
            hover:bg-slate-700
            hover:text-white
          "
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* ====================================================
          Navigation
      ==================================================== */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {MENU_ITEMS.map((item) => (
          <SidebarButton
            key={item.id}
            item={item}
            active={active === item.id}
            collapsed={collapsed}
            onClick={() => onSelect?.(item.id)}
          />
        ))}
      </nav>

      {/* ====================================================
          Footer
      ==================================================== */}

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={() => onSelect?.("settings")}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-xl
            px-4
            py-3
            text-slate-300
            transition-colors
            hover:bg-slate-800
            hover:text-white
          "
        >
          <Settings size={20} />

          {!collapsed && (
            <span className="font-medium">
              Settings
            </span>
          )}
        </button>

        {!collapsed && (
          <div className="mt-6 rounded-xl bg-slate-900 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              RealmRise
            </p>

            <h3 className="mt-2 text-lg font-bold text-white">
              Genesis
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Build your kingdom, command mighty heroes,
              forge alliances, conquer the world and become
              the greatest ruler.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}