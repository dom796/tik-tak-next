import { Game } from "@/features/game/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="flex flex-col grow justify-center py-8 w-full max-w-[400px] mx-auto">
      <Game gameId={id} />
    </main>
  );
}
