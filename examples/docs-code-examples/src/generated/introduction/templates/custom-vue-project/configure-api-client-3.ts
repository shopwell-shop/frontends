import { createAPIClient } from "@shopwell/api-client";
import type { operations } from "@shopwell/api-client/store-api-types";
import Cookies from "js-cookie";
import { ref } from "vue";

import type { ShopwellFrontendsOptions } from "./configure-api-client-2";

const options: ShopwellFrontendsOptions = {
  endpoint: "https://demo-frontends.swstage.store/store-api",
  accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  shopwellApiClient: {
    timeout: 5000,
  },
};

const cookieContextToken = Cookies.get("sw-context-token");
const cookieLanguageId = Cookies.get("sw-language-id");

const contextToken = ref(cookieContextToken);
const languageId = ref(cookieLanguageId);

const apiClient = createAPIClient<operations>({
  baseURL: options.endpoint,
  accessToken: options.accessToken,
  fetchOptions: {
    timeout: options.shopwellApiClient?.timeout || 5000,
  },
  contextToken: contextToken.value,
  defaultHeaders: {
    "sw-language-id": languageId.value,
  },
});

export { apiClient, contextToken, languageId };
