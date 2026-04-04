"use client";

import { GameDomain } from "@/entities/game";
import { useTranslations } from "next-intl";

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
  const t = useTranslations("game");

  switch (game.status) {
    case "idle":
      return <div className="text-lg text-muted-foreground">{t("waitingForPlayer")}</div>;
    case "inProgress": {
      const currentSymbol = GameDomain.getGameCurrentSymbol(game);
      const currentPlayer = currentSymbol === GameDomain.GameSymbol.X ? game.players[0] : game.players[1];
      return <div className="text-lg font-medium text-amber-600 dark:text-amber-400">{t("turn", { login: currentPlayer.login, symbol: currentSymbol })}</div>;
    }
    case "gameOver": {
      return <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{t("winnerLogin", { login: game.winner.login })}</div>;
    }
    case "gameOverDraw":
      return <div className="text-lg font-medium text-muted-foreground">{t("draw")}</div>;
  }
}