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
    <div className="flex flex-col gap-8 container mx-auto pt-[100px]">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <GamesList />
    </div>
  );
}