import { createAPIClient } from "@shopwell/api-client";

import type { operations } from "#shopwell";

export default defineEventHandler(async (event) => {
  const rawBody = await readBody<string>(event);
  const params = new URLSearchParams(rawBody);
  const token = params.get("token");
  const customerId = params.get("customerId");
  const userId = params.get("userId");

  if (!token || !customerId || !userId) {
    return sendRedirect(event, "/");
  }

  const config = useRuntimeConfig(event);
  const apiClient = createAPIClient<operations>({
    accessToken: config.public.shopwell.accessToken,
    baseURL: config.public.shopwell.endpoint,
  });

  try {
    await apiClient.invoke(
      "imitateCustomerLogin post /account/login/imitate-customer",
      {
        body: {
          token: String(token),
          customerId: String(customerId),
          userId: String(userId),
        },
      },
    );
  } catch {
    return sendRedirect(event, "/");
  }

  const contextToken = apiClient.defaultHeaders["sw-context-token"];
  if (!contextToken) {
    return sendRedirect(event, "/");
  }

  setCookie(event, "sw-context-token", contextToken, {
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  return sendRedirect(event, "/account");
});
