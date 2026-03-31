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
      return <div className="text-lg">{t("turn", { symbol: currentSymbol })}</div>;
    }
    case "gameOver": {
      const currentSymbol = GameDomain.getPlayerSymbol(game.winner, game) ?? "";
      return <div className="text-lg">{t("winner", { symbol: currentSymbol })}</div>;
    }
    case "gameOverDraw":
      return <div className="text-lg">{t("draw")}</div>;
  }
}