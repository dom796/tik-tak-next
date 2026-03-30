"use client";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useTranslations } from "next-intl";
import React, { useId } from "react";

export function AuthFields({
  errors,
  formData,
}: {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
}) {
  const t = useTranslations("auth.fields");
  const loginId = useId();
  const passwordId = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>{t("loginLabel")}</Label>
        <Input
          id={loginId}
          type="login"
          name="login"
          placeholder={t("loginPlaceholder")}
          required
          defaultValue={formData?.get("login")?.toString()}
        />
        {errors?.login && <div>{errors.login}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>{t("passwordLabel")}</Label>
        <Input
          id={passwordId}
          type="password"
          name="password"
          placeholder={t("passwordPlaceholder")}
          required
          defaultValue={formData?.get("password")?.toString()}
        />
        {errors?.password && <div>{errors.password}</div>}
      </div>
    </>
  );
}