import {
  cancelGame,
  gameEvents,
  getGameById,
  surrenderGame,
} from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";

import { getCurrentUser } from "@/entities/user/server";

export async function getGameStream(
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;
  const user = await getCurrentUser();
  const game = await getGameById(id);

  if (!game || !user) {
    return new Response(`Game not found`, {
      status: 404,
    });
  }

  const { addCloseListener, response, write } = sseStream(req);

  write(game);

  let latestGame = game;
  const unwatch = await gameEvents.addGameChangedListener(game.id, (event) => {
    latestGame = event.data;
    write(event.data);
  });

  addCloseListener(async () => {
    if (latestGame.status === "inProgress") {
      await surrenderGame(id, user);
    } else if (latestGame.status === "idle" && latestGame.creator.id === user.id) {
      await cancelGame(id, user);
    }
    unwatch();
  });

  return response;
}
