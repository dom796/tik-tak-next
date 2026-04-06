"use client";

import React from "react";
import { LocaleSwitcher } from "@/shared/ui/locale-switcher";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted relative gap-6">
      <div className="absolute top-4 right-4">
        <LocaleSwitcher />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-3xl leading-none">🎮</span>
        <span className="text-2xl font-bold tracking-tight">Tik-tak-toe</span>
      </div>
      {children}
    </div>
  );
}
