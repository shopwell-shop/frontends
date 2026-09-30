import { createAPIClient } from "@shopwell/api-client";
import type { operations } from "@shopwell/api-client/store-api-types";
import { createShopwellContext } from "@shopwell/composables";
import Cookies from "js-cookie";
// ./plugins/vue-shopwell-frontends.ts file
import { ref } from "vue";
import type { App } from "vue";

// Types to be used during the registration of the plugin to pass basic credentials for your Shopwell 6 instance.
export type ShopwellFrontendsOptions = {
  endpoint: string;
  accessToken: string;
  shopwellApiClient?: {
    timeout: number;
  };
  enableDevtools?: boolean;
};

export default {
  install: (app: App, options: ShopwellFrontendsOptions) => {
    const cookieContextToken = Cookies.get("sw-context-token");
    const cookieLanguageId = Cookies.get("sw-language-id");

    const contextToken = ref(cookieContextToken);
    const languageId = ref(cookieLanguageId);

    const apiClient = createAPIClient<operations>({
      baseURL: options.endpoint,
      accessToken: options.accessToken,
      contextToken: contextToken.value,
      fetchOptions: {
        timeout: options.shopwellApiClient?.timeout || 5000,
      },
      defaultHeaders: {
        "sw-language-id": languageId.value,
      },
    });

    const shopwellContext = createShopwellContext(app, {
      enableDevtools: !!options.enableDevtools,
    });

    app.provide("apiClient", apiClient);
    app.provide("shopwell", shopwellContext);
    app.provide("swSessionContext", ref());
  },
};
