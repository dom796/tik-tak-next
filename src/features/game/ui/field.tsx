"use client";
import { GameDomain } from "@/entities/game";

export function GameField({
  game,
  onCellClick,
}: {
  game: GameDomain.GameEntity;
  onCellClick?: (index: number) => void;
}) {
  const isInteractive = game.status === "inProgress";

  return (
    <div className="grid grid-cols-3">
      {game.field.map((sybmol, index) => (
        <button
          onClick={() => onCellClick?.(index)}
          key={index}
          disabled={!isInteractive || sybmol !== null}
          className="border border-primary w-10 h-10 flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sybmol ?? ""}
        </button>
      ))}
    </div>
  );
}
