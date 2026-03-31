"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-1 text-base">
      {(["en", "ru"] as const).map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={
            locale === l
              ? "font-bold px-3 py-2"
              : "opacity-50 hover:opacity-100 transition-opacity px-3 py-2"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}