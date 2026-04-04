import { GamesList } from "@/features/games-list/server";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("games");

  return (
    <div className="flex flex-col gap-6 container mx-auto pt-10 px-4">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <GamesList />
    </div>
  );
}