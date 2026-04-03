"use client";
import { GameDomain } from "@/entities/game";

export function GameField({
  game,
  onCellClick,
  winningLine,
}: {
  game: GameDomain.GameEntity;
  onCellClick?: (index: number) => void;
  winningLine?: [number, number, number] | null;
}) {
  const isInteractive = game.status === "inProgress";

  return (
    <div className="grid grid-cols-3">
      {game.field.map((symbol, index) => {
        const isWinning = winningLine?.includes(index) ?? false;
        return (
          <button
            onClick={() => onCellClick?.(index)}
            key={index}
            disabled={!isInteractive || symbol !== null}
            className={`border border-primary w-20 h-20 text-2xl flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed ${isWinning ? "bg-green-200 dark:bg-green-800 font-bold" : ""}`}
          >
            {symbol ?? ""}
          </button>
        );
      })}
    </div>
  );
}
