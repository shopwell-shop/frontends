import { createAPIClient } from "@shopwell/api-client";

import type { operations } from "#shopwell";

import { shopwellAccessToken, shopwellEndpoint } from "../../../apiBuilder";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.customerId || !body.token || !body.userId) {
    await sendRedirect(event, "/", 400);
    return;
  }
  const apiClient = createAPIClient<operations>({
    accessToken: shopwellAccessToken,
    baseURL: shopwellEndpoint,
  });

  await apiClient.invoke(
    "imitateCustomerLogin post /account/login/imitate-customer",
    {
      body: {
        customerId: body.customerId,
        token: body.token,
        userId: body.userId,
      },
    },
  );

  if (!apiClient.defaultHeaders["sw-context-token"]) {
    await sendRedirect(event, "/", 400);
    return;
  }
  setCookie(
    event,
    "sw-context-token",
    apiClient.defaultHeaders["sw-context-token"],
  );

  await sendRedirect(event, "/account", 200);
});
