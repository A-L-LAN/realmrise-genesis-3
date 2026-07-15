import React from "react";
import {
  Crown,
  Bell,
  Settings,
  Users,
  Shield,
  Coins,
  Calendar,
  Wifi,
  WifiOff,
} from "lucide-react";

export interface TopBarProps {
  playerName: string;
  kingdomName: string;
  level: number;

  onlinePlayers: number;
  worldDay: number;

  connected?: boolean;

  notifications?: number;

  onNotifications?(): void;
  onSettings?(): void;
}

const iconButtonStyle =
  "relative flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors";

export default function TopBar({
  playerName,
  kingdomName,
  level,
  onlinePlayers,
  worldDay,
  connected = true,
  notifications = 0,
  onNotifications,
  onSettings,
}: TopBarProps) {
  return (
    <header className="w-full bg-slate-950 border-b border-slate-800 shadow-lg">
      <div className="flex h-16 items-center justify-between px-5">
        {/* Left */}
        <div className="flex items-center gap-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-600">
            <Crown className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              RealmRise: Genesis
            </h1>

            <p className="text-xs text-slate-400">
              Conquer • Expand • Rule
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2 text-slate-300">
            <Users size={18} />
            <span className="text-sm">
              {onlinePlayers.toLocaleString()} Online
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Calendar size={18} />
            <span className="text-sm">
              Day {worldDay}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Shield size={18} />
            <span className="text-sm">
              Kingdom: {kingdomName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Coins size={18} />
            <span className="text-sm">
              Lv {level}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Connection */}
          <div className="flex items-center gap-2">
            {connected ? (
              <>
                <Wifi className="text-green-400" size={18} />
                <span className="hidden md:block text-xs text-green-400">
                  Connected
                </span>
              </>
            ) : (
              <>
                <WifiOff className="text-red-500" size={18} />
                <span className="hidden md:block text-xs text-red-500">
                  Offline
                </span>
              </>
            )}
          </div>

          {/* Notifications */}
          <button
            className={iconButtonStyle}
            onClick={onNotifications}
          >
            <Bell className="text-white" size={20} />

            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {notifications > 99 ? "99+" : notifications}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            className={iconButtonStyle}
            onClick={onSettings}
          >
            <Settings className="text-white" size={20} />
          </button>

          {/* Player */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              {playerName.charAt(0).toUpperCase()}
            </div>

            <div className="hidden md:block">
              <div className="text-sm font-semibold text-white">
                {playerName}
              </div>

              <div className="text-xs text-slate-400">
                Kingdom Ruler
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}