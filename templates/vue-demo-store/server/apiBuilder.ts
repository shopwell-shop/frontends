import { createAPIClient } from "@shopwell/api-client";

import type { operations } from "#shopwell";

const runtimeConfig = useRuntimeConfig();

const shopwellEndpoint =
  runtimeConfig.public?.shopwell?.endpoint ??
  (runtimeConfig.public?.shopwell as { shopwellEndpoint?: string })
    ?.shopwellEndpoint;
const shopwellAccessToken =
  runtimeConfig.public?.shopwell?.accessToken ??
  (runtimeConfig.public?.shopwell as { shopwellAccessToken?: string })
    ?.shopwellAccessToken;

const apiClient = createAPIClient<operations>({
  accessToken: shopwellAccessToken,
  baseURL: shopwellEndpoint,
});

export { shopwellEndpoint, shopwellAccessToken, apiClient };
