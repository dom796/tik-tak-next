"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/submit-button copy";
import { useActionState } from "@/shared/lib/react";
import { SignUnFormState, signUpAction } from "../actions/sign-up";
import { routes } from "@/kernel/routes";
import { useTranslations } from "next-intl";

export function SignUpForm() {
  const t = useTranslations("auth.signUp");
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUnFormState,
  );

  const errorMap: Record<string, string> = {
    "login-exists": t("loginExists"),
  };

  return (
    <AuthFormLayout
      title={t("title")}
      description={t("description")}
      action={action}
      fields={<AuthFields {...formState} />}
      actions={<SubmitButton isPending={isPending}>{t("button")}</SubmitButton>}
      error={
        <ErrorMessage
          error={
            formState.errors?._errors
              ? errorMap[formState.errors._errors] ?? formState.errors._errors
              : undefined
          }
        />
      }
      link={
        <BottomLink
          text={t("hasAccount")}
          linkText={t("signInLink")}
          url={routes.signIn()}
        />
      }
    />
  );
}
