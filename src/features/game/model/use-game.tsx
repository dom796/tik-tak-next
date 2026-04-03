import { GameDomain } from "@/entities/game";
import { useRouter } from "@/i18n/navigation";
import { GameId } from "@/kernel/ids";
import { routes } from "@/kernel/routes";
import { useEventsSource } from "@/shared/lib/sse/client";
import { startTransition, useState } from "react";
import { cancelGameAction } from "../actions/game-cancel";
import { gameStepAction } from "../actions/game-step";
import { surrenderGameAction } from "../actions/game-surrender";

export function useGame(gameId: GameId, player: GameDomain.PlayerEntity) {
  const router = useRouter();
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
      const result = await surrenderGameAction({ gameId });
      if (result.type === "right") {
        router.push("/");
      } else {
        setIsPendingSurrender(false);
      }
    });
  };

  const cancel = () => {
    setIsPendingCancel(true);
    startTransition(async () => {
      const result = await cancelGameAction({ gameId });
      if (result.type === "right") {
        router.push("/");
      } else {
        setIsPendingCancel(false);
      }
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
