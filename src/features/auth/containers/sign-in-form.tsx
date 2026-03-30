"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/submit-button copy";
import { signInAction, SignInFormState } from "../actions/sing-in";
import { useActionState } from "@/shared/lib/react";
import { routes } from "@/kernel/routes";
import { useTranslations } from "next-intl";

export function SignInForm() {
  const t = useTranslations("auth.signIn");
  const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState,
  );

  const errorMap: Record<string, string> = {
    "invalid-credentials": t("invalidCredentials"),
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
          text={t("noAccount")}
          linkText={t("signUpLink")}
          url={routes.signUp()}
        />
      }
    />
  );
}