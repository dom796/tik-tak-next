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
    <div className="grid grid-cols-3 gap-1">
      {game.field.map((symbol, index) => {
        const isWinning = winningLine?.includes(index) ?? false;
        return (
          <button
            type="button"
            onClick={() => onCellClick?.(index)}
            key={index}
            disabled={!isInteractive || symbol !== null}
            aria-label={symbol ? `Cell ${index + 1}: ${symbol}` : `Cell ${index + 1}: empty`}
            className={`border border-border rounded-md w-20 h-20 md:w-24 md:h-24 text-2xl md:text-3xl font-bold flex justify-center items-center transition-colors disabled:cursor-not-allowed enabled:hover:bg-accent ${isWinning ? "bg-emerald-100 dark:bg-emerald-900 border-emerald-400 dark:border-emerald-600" : ""}`}
          >
            {symbol === "X" && (
              <span className={isWinning ? "text-emerald-700 dark:text-emerald-300" : "text-blue-500 dark:text-blue-400"}>X</span>
            )}
            {symbol === "O" && (
              <span className={isWinning ? "text-emerald-700 dark:text-emerald-300" : "text-rose-500 dark:text-rose-400"}>O</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
