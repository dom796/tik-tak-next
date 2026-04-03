"use client";

import { GameLayout } from "../ui/layout";
import { GamePlayers } from "../ui/players";

import { GameStatus } from "../ui/status";
import { GameField } from "../ui/field";
import { useGame } from "../model/use-game";
import { GameDomain } from "@/entities/game";
import { Button } from "@/shared/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function GameClient({
  defaultGame,
  player,
}: {
  defaultGame: GameDomain.GameEntity;
  player: GameDomain.PlayerEntity;
}) {
  const { game = defaultGame, step, surrender, isPendingSurrender, cancel, isPendingCancel } = useGame(defaultGame.id, player);
  const t = useTranslations("game");

  const isCreator = game.status === "idle" && game.creator.id === player.id;
  const isActiveParticipant =
    game.status === "inProgress" &&
    game.players.some((p) => p.id === player.id);
  const isGameOver =
    game.status === "gameOver" || game.status === "gameOverDraw";

  const leaveButton = isCreator ? (
    <Button variant="destructive" onClick={cancel} disabled={isPendingCancel}>
      {t("cancelGame")}
    </Button>
  ) : isActiveParticipant ? (
    <Button variant="destructive" onClick={surrender} disabled={isPendingSurrender}>
      {t("leaveGame")}
    </Button>
  ) : undefined;

  const backButton = isGameOver ? (
    <Link href="/">
      <Button variant="outline">{t("backToGames")}</Button>
    </Link>
  ) : undefined;

  return (
    <GameLayout
      title={t("gameTitle")}
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} onCellClick={step} />}
      leaveButton={leaveButton}
      backButton={backButton}
    />
  );
}
