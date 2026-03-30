import { GameId } from "./ids";

export const routes = {
  signIn: () => `/sign-in`,
  signUp: () => `/sign-up`,
  game: (gameId: GameId) => `/game/${gameId}`,
  gameStream: (gameId: GameId) => `/api/game/${gameId}/stream`,
  gamesStream: () => `/api/games/stream`,
};
