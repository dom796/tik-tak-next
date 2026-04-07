"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { DEFAULT_THEME, THEME_COOKIE, type Theme } from "@/shared/lib/theme";

function readThemeCookie(): Theme {
  const match = document.cookie.match(new RegExp(`(?:^|; )${THEME_COOKIE}=([^;]+)`));
  const value = match?.[1];
  return value === "light" || value === "dark" ? value : DEFAULT_THEME;
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(readThemeCookie());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000`;
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    setThemeState(next);
  };

  if (!mounted) {
    return <Button variant="outline" size="default" aria-label="Toggle theme" />;
  }

  return (
    <Button
      variant="outline"
      size="default"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}