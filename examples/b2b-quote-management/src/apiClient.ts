import { createAPIClient } from "@shopwell/api-client";
import Cookies from "js-cookie";

import type { operations } from "#shopwell";

const shopwellEndpoint = "https://demo-frontends.shopwell.store/store-api";

export const apiClient = createAPIClient<operations>({
  baseURL: shopwellEndpoint,
  accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  contextToken: Cookies.get("sw-context-token"),
});

apiClient.hook("onContextChanged", (newContextToken) => {
  Cookies.set("sw-context-token", newContextToken, {
    expires: 365, // days
    path: "/",
    sameSite: "lax",
    secure: shopwellEndpoint.startsWith("https://"),
  });
});
