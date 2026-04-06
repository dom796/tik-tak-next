import { sessionService } from "@/entities/user/server";
import { Button } from "@/shared/ui/button";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { LocaleSwitcher } from "@/shared/ui/locale-switcher";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";

export default async function PrivateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("common");
  const { session } = await sessionService.verifySession();

  return (
    <div className="flex flex-col grow">
      <header className="sticky top-0 z-10 px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">🎮</span>
          <span className="text-xl font-bold tracking-tight">Tik-tak-toe</span>
        </div>
        <div className="flex gap-4 items-center">
          <LocaleSwitcher />
          <ThemeToggle />
          <div className="text-sm font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">{session.login}</div>
          <form
            action={async () => {
              "use server";
              sessionService.deleteSession();
              redirect("/");
            }}
          >
            <Button>{t("signOut")}</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}