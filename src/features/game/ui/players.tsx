"use client";

import { GameDomain } from "@/entities/game";

export function GamePlayers({ game }: { game: GameDomain.GameEntity }) {
  const firstPlayer = game.status === "idle" ? game.creator : game.players[0];
  const secondPlayer = game.status === "idle" ? undefined : game.players[1];

  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-3">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-blue-500 dark:text-blue-400 w-5">X</span>
        <div className="flex flex-col">
          <span className="font-medium leading-tight">{firstPlayer.login}</span>
          <span className="text-xs text-muted-foreground">{firstPlayer.rating}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <div className="flex flex-col items-end">
          <span className="font-medium leading-tight">{secondPlayer?.login ?? "..."}</span>
          <span className="text-xs text-muted-foreground">{secondPlayer?.rating ?? "..."}</span>
        </div>
        <span className="font-bold text-lg text-rose-500 dark:text-rose-400 w-5 text-right">O</span>
      </div>
    </div>
  );
}