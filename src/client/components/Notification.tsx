import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Sword,
  Crown,
  Shield,
  Coins,
  FlaskConical,
  Users,
  ScrollText,
  Info,
  X,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "battle"
  | "research"
  | "guild"
  | "kingdom"
  | "economy";

export interface GameNotification {
  id: string;

  type: NotificationType;

  title: string;

  message: string;

  timestamp: number;

  read?: boolean;

  autoClose?: boolean;

  duration?: number;
}

export interface NotificationProps {
  notifications: GameNotification[];

  onRead?(id: string): void;

  onRemove?(id: string): void;

  onClearAll?(): void;
}

/* ============================================================
   Helpers
============================================================ */

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function notificationIcon(type: NotificationType) {
  switch (type) {
    case "success":
      return (
        <CheckCircle2
          className="text-green-400"
          size={20}
        />
      );

    case "warning":
      return (
        <AlertTriangle
          className="text-yellow-400"
          size={20}
        />
      );

    case "battle":
      return (
        <Sword
          className="text-red-400"
          size={20}
        />
      );

    case "research":
      return (
        <FlaskConical
          className="text-cyan-400"
          size={20}
        />
      );

    case "guild":
      return (
        <Users
          className="text-purple-400"
          size={20}
        />
      );

    case "kingdom":
      return (
        <Crown
          className="text-amber-400"
          size={20}
        />
      );

    case "economy":
      return (
        <Coins
          className="text-yellow-500"
          size={20}
        />
      );

    default:
      return (
        <Info
          className="text-blue-400"
          size={20}
        />
      );
  }
}

function borderClass(type: NotificationType): string {
  switch (type) {
    case "success":
      return "border-green-500";

    case "warning":
      return "border-yellow-500";

    case "battle":
      return "border-red-500";

    case "research":
      return "border-cyan-500";

    case "guild":
      return "border-purple-500";

    case "kingdom":
      return "border-amber-500";

    case "economy":
      return "border-yellow-500";

    default:
      return "border-blue-500";
  }
}

/* ============================================================
   Notification Card
============================================================ */

interface CardProps {
  notification: GameNotification;

  onRead?(id: string): void;

  onRemove?(id: string): void;
}

function NotificationCard({
  notification,
  onRead,
  onRemove,
}: CardProps) {
  useEffect(() => {
    if (!notification.autoClose) {
      return;
    }

    const timeout = setTimeout(() => {
      onRemove?.(notification.id);
    }, notification.duration ?? 5000);

    return () => clearTimeout(timeout);
  }, [notification, onRemove]);

  return (
    <div
      className={`
        rounded-xl
        border-l-4
        ${borderClass(notification.type)}
        bg-slate-900
        border
        border-slate-800
        p-4
        shadow-lg
        transition-all
      `}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {notificationIcon(notification.type)}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <h3
              className={`font-semibold ${
                notification.read
                  ? "text-slate-300"
                  : "text-white"
              }`}
            >
              {notification.title}
            </h3>

            <span className="text-xs text-slate-500">
              {formatTime(notification.timestamp)}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            {notification.message}
          </p>

          <div className="mt-4 flex gap-2">
            {!notification.read && (
              <button
                onClick={() =>
                  onRead?.(notification.id)
                }
                className="
                  rounded-lg
                  bg-blue-600
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-white
                  hover:bg-blue-500
                "
              >
                Mark Read
              </button>
            )}

            <button
              onClick={() =>
                onRemove?.(notification.id)
              }
              className="
                rounded-lg
                bg-slate-800
                px-3
                py-1
                text-xs
                text-slate-300
                hover:bg-slate-700
              "
            >
              Dismiss
            </button>
          </div>
        </div>

        <button
          onClick={() =>
            onRemove?.(notification.id)
          }
          className="
            rounded-lg
            p-1
            text-slate-500
            hover:bg-slate-800
            hover:text-white
          "
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Component
============================================================ */

export default function Notification({
  notifications,
  onRead,
  onRemove,
  onClearAll,
}: NotificationProps) {
  const [filter, setFilter] = useState<
    "all" | "unread"
  >("all");

  const visibleNotifications = useMemo(() => {
    if (filter === "all") {
      return notifications;
    }

    return notifications.filter(
      (n) => !n.read
    );
  }, [notifications, filter]);

  const unread = notifications.filter(
    (n) => !n.read
  ).length;

  return (
    <div
      className="
        flex
        h-full
        flex-col
        rounded-xl
        border
        border-slate-800
        bg-slate-950
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-800
          p-4
        "
      >
        <div className="flex items-center gap-3">
          <Bell className="text-blue-400" />

          <div>
            <h2 className="font-bold text-white">
              Notifications
            </h2>

            <p className="text-xs text-slate-400">
              {unread} unread
            </p>
          </div>
        </div>

        <button
          onClick={onClearAll}
          className="
            rounded-lg
            bg-red-600
            px-3
            py-2
            text-xs
            font-semibold
            text-white
            hover:bg-red-500
          "
        >
          Clear All
        </button>
      </div>

      {/* Filters */}

      <div className="flex gap-2 border-b border-slate-800 p-4">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-3 py-2 text-sm ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("unread")}
          className={`rounded-lg px-3 py-2 text-sm ${
            filter === "unread"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Unread
        </button>
      </div>

      {/* Notifications */}

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {visibleNotifications.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Shield
              className="mb-4 text-slate-600"
              size={48}
            />

            <h3 className="text-lg font-semibold text-white">
              No Notifications
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Battle reports, research updates,
              kingdom events and guild messages will
              appear here.
            </p>
          </div>
        ) : (
          visibleNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={onRead}
              onRemove={onRemove}
            />
          ))
        )}
      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-3 text-center text-xs text-slate-500">
        <ScrollText
          className="mr-2 inline"
          size={14}
        />
        RealmRise Event Log
      </div>
    </div>
  );
}