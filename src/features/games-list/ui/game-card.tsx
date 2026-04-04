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
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>{t("gameWith", { login })}</CardTitle>
      </CardHeader>
      <CardContent>{t("rating", { rating })}</CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  );
}