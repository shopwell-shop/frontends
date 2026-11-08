import type { operations } from "#shopwell";

export type ResetPasswordFormState = Omit<
  operations["recoveryPassword post /account/recovery-password-confirm"]["body"],
  "hash"
>;

export function resetPasswordFormRules(state: Ref<ResetPasswordFormState>) {
  return newPasswordFormRules(state);
}
