"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-1 text-sm">
      {(["en", "ru"] as const).map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          title={l === "en" ? "English" : "Русский"}
          aria-label={l === "en" ? "Switch to English" : "Переключить на русский"}
          className={
            locale === l
              ? "font-semibold px-2.5 py-1 rounded-md border border-border bg-muted"
              : "px-2.5 py-1 rounded-md opacity-50 hover:opacity-80 transition-opacity"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}