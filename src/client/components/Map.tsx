import React, { useCallback, useMemo, useState } from "react";
import {
  Castle,
  Crown,
  Flag,
  Mountain,
  Trees,
  Waves,
  Wheat,
  Swords,
  ZoomIn,
  ZoomOut,
  LocateFixed,
  Grid3X3,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export type TileType =
  | "grass"
  | "forest"
  | "mountain"
  | "water"
  | "farm"
  | "city"
  | "castle";

export interface MapTile {
  x: number;
  y: number;

  type: TileType;

  owner?: string;

  kingdom?: string;

  occupied?: boolean;

  hasHero?: boolean;

  hasArmy?: boolean;
}

export interface MapProps {
  width: number;
  height: number;

  tiles: MapTile[];

  selectedTile?: MapTile;

  onTileClick?(tile: MapTile): void;
}

/* ============================================================
   Colors
============================================================ */

function tileColor(type: TileType): string {
  switch (type) {
    case "grass":
      return "bg-green-600";

    case "forest":
      return "bg-green-900";

    case "mountain":
      return "bg-gray-500";

    case "water":
      return "bg-blue-600";

    case "farm":
      return "bg-yellow-500";

    case "city":
      return "bg-orange-600";

    case "castle":
      return "bg-red-700";

    default:
      return "bg-green-600";
  }
}

function TileIcon(tile: MapTile) {
  if (tile.hasHero)
    return <Crown size={14} className="text-yellow-300" />;

  if (tile.hasArmy)
    return <Swords size={14} className="text-white" />;

  switch (tile.type) {
    case "forest":
      return <Trees size={14} />;

    case "mountain":
      return <Mountain size={14} />;

    case "water":
      return <Waves size={14} />;

    case "farm":
      return <Wheat size={14} />;

    case "city":
      return <Flag size={14} />;

    case "castle":
      return <Castle size={14} />;

    default:
      return null;
  }
}

/* ============================================================
   Tile
============================================================ */

interface TileProps {
  tile: MapTile;

  selected: boolean;

  onClick(): void;
}

function Tile({
  tile,
  selected,
  onClick,
}: TileProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        border
        border-slate-800
        transition-all
        duration-150

        ${tileColor(tile.type)}

        ${
          selected
            ? "ring-4 ring-yellow-400 z-20"
            : "hover:brightness-125"
        }
      `}
      title={`${tile.type.toUpperCase()}
(${tile.x}, ${tile.y})`}
    >
      <TileIcon tile={tile} />

      {tile.owner && (
        <div
          className="
            absolute
            bottom-0
            right-0
            h-2
            w-2
            rounded-full
            bg-blue-400
          "
        />
      )}
    </button>
  );
}

/* ============================================================
   Component
============================================================ */

export default function Map({
  width,
  height,
  tiles,
  selectedTile,
  onTileClick,
}: MapProps) {
  const [zoom, setZoom] = useState(1);

  const grid = useMemo(() => {
    return tiles;
  }, [tiles]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 0.25, 2));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 0.25, 0.5));
  }, []);

  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        rounded-xl
        border
        border-slate-800
        bg-slate-950
      "
    >
      {/* ===============================================
          Toolbar
      =============================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-800
          bg-slate-900
          px-4
          py-3
        "
      >
        <div className="flex items-center gap-3">
          <Grid3X3 className="text-blue-400" />

          <div>
            <h2 className="font-bold text-white">
              World Map
            </h2>

            <p className="text-xs text-slate-400">
              {width} × {height} Tiles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
          >
            <ZoomOut size={18} />
          </button>

          <span className="min-w-[60px] text-center text-sm text-white">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={zoomIn}
            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
          >
            <ZoomIn size={18} />
          </button>

          <button
            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
          >
            <LocateFixed size={18} />
          </button>
        </div>
      </div>

      {/* ===============================================
          Map
      =============================================== */}

      <div
        className="
          flex-1
          overflow-auto
          bg-slate-900
          p-4
        "
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            width: width * 40,
            height: height * 40,
          }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${width},40px)`,
            }}
          >
            {grid.map((tile) => (
              <Tile
                key={`${tile.x}-${tile.y}`}
                tile={tile}
                selected={
                  selectedTile?.x === tile.x &&
                  selectedTile?.y === tile.y
                }
                onClick={() =>
                  onTileClick?.(tile)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===============================================
          Footer
      =============================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-800
          bg-slate-900
          px-4
          py-3
          text-sm
        "
      >
        <div className="text-slate-400">
          Click a tile to inspect or issue commands.
        </div>

        {selectedTile && (
          <div className="flex gap-6 text-white">
            <span>
              X: <b>{selectedTile.x}</b>
            </span>

            <span>
              Y: <b>{selectedTile.y}</b>
            </span>

            <span>
              Terrain:{" "}
              <b>{selectedTile.type}</b>
            </span>

            {selectedTile.kingdom && (
              <span>
                Kingdom:{" "}
                <b>{selectedTile.kingdom}</b>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}