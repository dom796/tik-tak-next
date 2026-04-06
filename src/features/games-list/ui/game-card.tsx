"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import React from "react";
import { useTranslations } from "next-intl";

export function GameCard({
  login,
  rating,
  actions,
}: {
  login: string;
  rating: number;
  actions: React.ReactNode;
}) {
  const t = useTranslations("games");
  return (
    <Card className="transition-shadow hover:shadow-md flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{t("gameWith", { login })}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <span className="inline-flex items-center gap-1 text-sm text-amber-500 font-medium">
          <span>★</span>
          <span>{rating}</span>
        </span>
      </CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  );
}