import React, { useMemo } from "react";
import {
  FlaskConical,
  Lock,
  CheckCircle2,
  Clock3,
  Coins,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export type ResearchStatus =
  | "Locked"
  | "Available"
  | "Researching"
  | "Completed";

export interface ResearchNode {
  id: string;

  name: string;

  description: string;

  category:
    | "Military"
    | "Economy"
    | "Engineering"
    | "Magic"
    | "Diplomacy";

  level: number;

  maxLevel: number;

  cost: number;

  duration: number;

  progress: number;

  status: ResearchStatus;

  prerequisites: string[];
}

export interface ResearchTreeProps {
  technologies: ResearchNode[];

  researchPoints: number;

  onResearch?(researchId: string): void;
}

/* ============================================================
   Helpers
============================================================ */

function format(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function statusClasses(status: ResearchStatus): string {
  switch (status) {
    case "Completed":
      return "border-green-500 bg-green-950";

    case "Researching":
      return "border-blue-500 bg-blue-950";

    case "Available":
      return "border-yellow-500 bg-slate-900";

    case "Locked":
    default:
      return "border-slate-700 bg-slate-900";
  }
}

function statusIcon(status: ResearchStatus) {
  switch (status) {
    case "Completed":
      return (
        <CheckCircle2
          size={18}
          className="text-green-400"
        />
      );

    case "Researching":
      return (
        <Clock3
          size={18}
          className="text-blue-400"
        />
      );

    case "Available":
      return (
        <FlaskConical
          size={18}
          className="text-yellow-400"
        />
      );

    default:
      return (
        <Lock
          size={18}
          className="text-slate-500"
        />
      );
  }
}

/* ============================================================
   Component
============================================================ */

export default function ResearchTree({
  technologies,
  researchPoints,
  onResearch,
}: ResearchTreeProps) {
  const grouped = useMemo(() => {
    const groups: Record<
      string,
      ResearchNode[]
    > = {};

    technologies.forEach((tech) => {
      if (!groups[tech.category]) {
        groups[tech.category] = [];
      }

      groups[tech.category].push(tech);
    });

    return groups;
  }, [technologies]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      {/* ====================================================
          Header
      ==================================================== */}

      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
              <FlaskConical className="text-cyan-400" />
              Research Tree
            </h2>

            <p className="mt-2 text-slate-300">
              Unlock powerful technologies to
              strengthen your kingdom.
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 px-5 py-3">
            <div className="flex items-center gap-2">
              <Zap className="text-cyan-400" />

              <span className="text-sm text-slate-400">
                Research Points
              </span>
            </div>

            <div className="mt-1 text-2xl font-bold text-white">
              {format(researchPoints)}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          Categories
      ==================================================== */}

      <div className="space-y-8 p-6">
        {Object.entries(grouped).map(
          ([category, techs]) => (
            <section key={category}>
              <h3 className="mb-5 text-xl font-bold text-white">
                {category}
              </h3>

              <div className="grid gap-5 lg:grid-cols-2">
                {techs.map((tech) => (
                  <div
                    key={tech.id}
                    className={`rounded-xl border p-5 ${statusClasses(
                      tech.status
                    )}`}
                  >
                    {/* Header */}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          {statusIcon(
                            tech.status
                          )}

                          <h4 className="text-lg font-bold text-white">
                            {tech.name}
                          </h4>
                        </div>

                        <p className="mt-2 text-sm text-slate-300">
                          {tech.description}
                        </p>
                      </div>

                      <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-white">
                        Lv {tech.level}/
                        {tech.maxLevel}
                      </span>
                    </div>

                    {/* Progress */}

                    {tech.status ===
                      "Researching" && (
                      <div className="mt-5">
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-slate-400">
                            Progress
                          </span>

                          <span className="text-white">
                            {tech.progress}%
                          </span>
                        </div>

                        <div className="h-3 rounded-full bg-slate-800">
                          <div
                            className="h-3 rounded-full bg-blue-500"
                            style={{
                              width: `${tech.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Info */}

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-800 p-3">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Coins size={16} />
                          Cost
                        </div>

                        <div className="mt-1 font-bold text-white">
                          {format(tech.cost)}
                        </div>
                      </div>

                      <div className="rounded-lg bg-slate-800 p-3">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock3 size={16} />
                          Duration
                        </div>

                        <div className="mt-1 font-bold text-white">
                          {tech.duration}m
                        </div>
                      </div>
                    </div>

                    {/* Prerequisites */}

                    <div className="mt-5">
                      <p className="mb-2 text-sm font-semibold text-slate-400">
                        Prerequisites
                      </p>

                      {tech.prerequisites.length ===
                      0 ? (
                        <span className="text-sm text-green-400">
                          None
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {tech.prerequisites.map(
                            (
                              prerequisite
                            ) => (
                              <span
                                key={
                                  prerequisite
                                }
                                className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                              >
                                <ArrowRight size={12} />

                                {
                                  prerequisite
                                }
                              </span>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Star size={16} />

                        <span className="text-sm">
                          {tech.category}
                        </span>
                      </div>

                      {tech.status ===
                        "Available" && (
                        <button
                          onClick={() =>
                            onResearch?.(
                              tech.id
                            )
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                        >
                          Research
                        </button>
                      )}

                      {tech.status ===
                        "Completed" && (
                        <span className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">
                          Completed
                        </span>
                      )}

                      {tech.status ===
                        "Locked" && (
                        <span className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-slate-400">
                          Locked
                        </span>
                      )}

                      {tech.status ===
                        "Researching" && (
                        <span className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}