"use server";

import { createUser, sessionService } from "@/entities/user/server";
import { redirect } from "@/i18n/navigation";

import { z } from "zod";

export type SignUnFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signUpAction = async (
  state: SignUnFormState,
  formData: FormData,
): Promise<SignUnFormState> => {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    const formatedErrors = z.flattenError(result.error);
    return {
      formData,
      errors: {
        login: formatedErrors.fieldErrors.login?.join(", "),
        password: formatedErrors.fieldErrors.password?.join(", "),
        _errors: formatedErrors.formErrors.join(", "),
      },
    };
  }

  const createUserResult = await createUser(result.data);

  if (createUserResult.type === "right") {
    await sessionService.addSession(createUserResult.value);

    redirect("/");
  }

  const errors = {
    "user-login-exists": "login-exists",
  }[createUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};
