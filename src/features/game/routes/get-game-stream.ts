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

  const unwatch = await gameEvents.addGameChangedListener(game.id, (event) => {
    write(event.data);
  });

  addCloseListener(async () => {
    if (game.status === "inProgress") {
      await surrenderGame(id, user);
    } else if (game.status === "idle" && game.creator.id === user.id) {
      await cancelGame(id, user);
    }
    unwatch();
  });

  return response;
}
