"use client";

import { GameDomain } from "@/entities/game";

export function GamePlayers({ game }: { game: GameDomain.GameEntity }) {
  const firstPlayer = game.status === "idle" ? game.creator : game.players[0];
  const secondPlayer = game.status === "idle" ? undefined : game.players[1];

  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="flex items-center gap-2 text-lg">
        <span className="font-bold text-blue-500 dark:text-blue-400">X</span>
        <span>{firstPlayer.login}</span>
        <span className="text-sm text-muted-foreground">{firstPlayer.rating}</span>
      </div>
      <div className="flex items-center gap-2 text-lg">
        <span className="font-bold text-rose-500 dark:text-rose-400">O</span>
        <span>{secondPlayer?.login ?? "..."}</span>
        <span className="text-sm text-muted-foreground">{secondPlayer?.rating ?? "..."}</span>
      </div>
    </div>
  );
}