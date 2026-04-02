"use server";

import { cancelGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left } from "@/shared/lib/either";

export async function cancelGameAction({ gameId }: { gameId: GameId }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return left("not-found");
  }

  return await cancelGame(gameId, currentUser);
}