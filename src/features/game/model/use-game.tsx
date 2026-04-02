import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { routes } from "@/kernel/routes";
import { useEventsSource } from "@/shared/lib/sse/client";
import { startTransition, useState } from "react";
import { cancelGameAction } from "../actions/game-cancel";
import { gameStepAction } from "../actions/game-step";
import { surrenderGameAction } from "../actions/game-surrender";

export function useGame(gameId: GameId, player: GameDomain.PlayerEntity) {
  const { isPending, dataStream: game } =
    useEventsSource<GameDomain.GameEntity>(routes.gameStream(gameId), () => {
      dispatchOptimistic(undefined);
    });
  const [optimisticGame, dispatchOptimistic] =
    useState<GameDomain.GameEntity>();
  const [isPendingSurrender, setIsPendingSurrender] = useState(false);
  const [isPendingCancel, setIsPendingCancel] = useState(false);

  const step = (index: number) => {
    if (game && game.status === "inProgress") {
      const result = GameDomain.doStep({ game, player, index });
      if (result.type === "right") {
        dispatchOptimistic(result.value);
      }
      startTransition(async () => {
        await gameStepAction({ gameId, index });
      });
    }
  };

  const surrender = () => {
    setIsPendingSurrender(true);
    startTransition(async () => {
      await surrenderGameAction({ gameId });
      setIsPendingSurrender(false);
    });
  };

  const cancel = () => {
    setIsPendingCancel(true);
    startTransition(async () => {
      await cancelGameAction({ gameId });
      setIsPendingCancel(false);
    });
  };

  return {
    game: optimisticGame ?? game,
    step,
    isPending,
    surrender,
    isPendingSurrender,
    cancel,
    isPendingCancel,
  };
}
