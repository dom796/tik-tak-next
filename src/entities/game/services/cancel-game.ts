import { GameId } from "@/kernel/ids";
import { PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";
import { gameEvents } from "./game-events";

export async function cancelGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });
  if (!game) {
    return left("game-not-found" as const);
  }

  if (game.status !== "idle") {
    return left("game-is-not-idle" as const);
  }

  if (game.creator.id !== player.id) {
    return left("player-is-not-creator" as const);
  }

  await gameRepository.deleteGame(gameId);
  await gameEvents.emit({ type: "game-created" });

  return right(undefined);
}