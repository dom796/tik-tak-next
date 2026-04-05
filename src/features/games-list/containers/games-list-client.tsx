"use client";

import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "./create-button";
import { Button } from "@/shared/ui/button";
import { routes } from "@/kernel/routes";
import { Link } from "@/i18n/navigation";
import { GameDomain } from "@/entities/game";
import { useEventsSource } from "@/shared/lib/sse/client";
import { useTranslations } from "next-intl";

export function GamesListClient({
  games,
}: {
  games: GameDomain.GameIdleEntity[];
}) {
  const t = useTranslations("games");
  const { dataStream: gamesStream = games } = useEventsSource<
    GameDomain.GameIdleEntity[]
  >(routes.gamesStream());

  return (
    <Layout actions={<CreateButton />}>
      {gamesStream.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-2">
          <span className="text-4xl">🎮</span>
          <p className="text-base font-medium">{t("noGames")}</p>
          <p className="text-sm">{t("noGamesHint")}</p>
        </div>
      ) : (
        gamesStream.map((game) => (
          <GameCard
            key={game.id}
            login={game.creator.login}
            rating={game.creator.rating}
            actions={
              <Link href={routes.game(game.id)}>
                <Button>{t("join")}</Button>
              </Link>
            }
          />
        ))
      )}
    </Layout>
  );
}