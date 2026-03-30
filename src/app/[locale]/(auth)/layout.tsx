"use client";

import React from "react";
import { LocaleSwitcher } from "@/shared/ui/locale-switcher";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background relative">
      <div className="absolute top-4 right-4">
        <LocaleSwitcher />
      </div>
      {children}
    </div>
  );
}
