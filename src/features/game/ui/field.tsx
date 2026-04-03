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
      {game.field.map((symbol, index) => (
        <button
          onClick={() => onCellClick?.(index)}
          key={index}
          disabled={!isInteractive || symbol !== null}
          className="border border-primary w-20 h-20 text-2xl flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {symbol ?? ""}
        </button>
      ))}
    </div>
  );
}
