"use client";

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game";
import { mapLeft, right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";
import { startTransition } from "react";
import { useTranslations } from "next-intl";

export function CreateButton() {
  const t = useTranslations("games");
  const [state, dispatch, isPending] = useActionState(
    createGameAction,
    right(undefined),
  );

  return (
    <Button
      disabled={isPending}
      onClick={() => startTransition(dispatch)}
      error={mapLeft(
        state,
        (e) =>
          ({
            ["can-create-only-one-game"]: t("oneGameLimit"),
            ["user-not-found"]: t("userNotFound"),
          })[e],
      )}
    >
      {t("createGame")}
    </Button>
  );
}