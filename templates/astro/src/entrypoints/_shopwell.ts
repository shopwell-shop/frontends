import { createAPIClient } from "@shopwell/api-client";
import type { operations } from "@shopwell/api-client/store-api-types";
import { createShopwellContext } from "@shopwell/composables/dist";
import Cookies from "js-cookie";
import type { App } from "vue";

export default (app: App) => {
  const shopwellEndpoint =
    import.meta.env.API_URL ||
    "https://demo-frontends.shopwell.store/store-api";

  const apiClient = createAPIClient<operations>({
    baseURL: shopwellEndpoint,
    accessToken:
      import.meta.env.API_ACCESS_TOKEN || "SWSCBHFSNTVMAWNZDNFKSHLAYW",
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

  // create a Shopwell context plugin and inject it to the Vue app
  const shopwellContext = createShopwellContext(app, {
    devStorefrontUrl: null,
  });
  // register a plugin
  app.provide("apiClient", apiClient);
  app.use(shopwellContext);
};
