"use server";

import { surrenderGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left } from "@/shared/lib/either";

export async function surrenderGameAction({ gameId }: { gameId: GameId }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return left("not-found");
  }

  return await surrenderGame(gameId, currentUser);
}