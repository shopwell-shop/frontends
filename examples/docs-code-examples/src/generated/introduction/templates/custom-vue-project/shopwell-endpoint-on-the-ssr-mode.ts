import { createAPIClient } from "@shopwell/api-client";
import type { operations } from "@shopwell/api-client/store-api-types";
import { ref } from "vue";

import type { ShopwellFrontendsOptions } from "./configure-api-client-2";

const ssrValue = "http://shopwell";
const clientValue = "https://demo-frontends.shopwell.store";
const options: ShopwellFrontendsOptions = {
  endpoint: clientValue,
  accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  shopwellApiClient: {
    timeout: 5000,
  },
};
const contextToken = ref<string>();
const languageId = ref<string>();

const apiClient = createAPIClient<operations>({
  baseURL: ssrValue || clientValue,
  accessToken: options.accessToken,
  fetchOptions: {
    timeout: options.shopwellApiClient?.timeout || 5000,
  },
  contextToken: contextToken.value,
  defaultHeaders: {
    "sw-language-id": languageId.value,
  },
});

export { apiClient };
