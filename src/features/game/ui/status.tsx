"use client";

import { GameDomain } from "@/entities/game";
import { useTranslations } from "next-intl";

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
  const t = useTranslations("game");

  switch (game.status) {
    case "idle":
      return <div className="text-lg">{t("waitingForPlayer")}</div>;
    case "inProgress": {
      const currentSymbol = GameDomain.getGameCurrentSymbol(game);
      const currentPlayer = currentSymbol === GameDomain.GameSymbol.X ? game.players[0] : game.players[1];
      return <div className="text-lg">{t("turn", { login: currentPlayer.login, symbol: currentSymbol })}</div>;
    }
    case "gameOver": {
      return <div className="text-lg">{t("winnerLogin", { login: game.winner.login })}</div>;
    }
    case "gameOverDraw":
      return <div className="text-lg">{t("draw")}</div>;
  }
}