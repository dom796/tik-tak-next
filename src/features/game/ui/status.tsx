"use client";

import { GameDomain } from "@/entities/game";
import { useTranslations } from "next-intl";

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
  const t = useTranslations("game");

  switch (game.status) {
    case "idle":
      return <div className="text-lg text-muted-foreground rounded-md bg-muted/50 px-3 py-2 text-center">{t("waitingForPlayer")}</div>;
    case "inProgress": {
      const currentSymbol = GameDomain.getGameCurrentSymbol(game);
      const currentPlayer = currentSymbol === GameDomain.GameSymbol.X ? game.players[0] : game.players[1];
      return <div className="text-lg font-medium text-amber-600 dark:text-amber-400 rounded-md bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-center">{t("turn", { login: currentPlayer.login, symbol: currentSymbol })}</div>;
    }
    case "gameOver": {
      return <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 text-center">{t("winnerLogin", { login: game.winner.login })}</div>;
    }
    case "gameOverDraw":
      return <div className="text-lg font-medium text-muted-foreground rounded-md bg-muted/50 px-3 py-2 text-center">{t("draw")}</div>;
  }
}