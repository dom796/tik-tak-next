import { GameIdleEntity } from "../domain";
import { gameRepository } from "../repositories/game";

const MAX_IDLE_GAMES = 50;

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const games = await gameRepository.gamesList({ status: "idle" }, MAX_IDLE_GAMES);

  return games as GameIdleEntity[];
}
