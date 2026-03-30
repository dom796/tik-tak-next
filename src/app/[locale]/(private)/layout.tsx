import { sessionService } from "@/entities/user/server";
import { Button } from "@/shared/ui/button";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { LocaleSwitcher } from "@/shared/ui/locale-switcher";
import { redirect } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
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

  const { session } = await sessionService.verifySession();

  return (
    <div className="flex flex-col grow">
      <header className="px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">Tik-tak-toe-online</div>
        <div className="flex gap-4 items-center">
          <LocaleSwitcher />
          <ThemeToggle />
          <div className="text-lg">{session.login}</div>
          <form
            action={async () => {
              "use server";
              sessionService.deleteSession();
              redirect("/");
            }}
          >
            <Button>Sign out</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}