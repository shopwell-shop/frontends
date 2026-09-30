import { createAPIClient } from "@shopwell/api-client";

import type { operations } from "#shopwell";

const runtimeConfig = useRuntimeConfig();

const shopwellEndpoint = runtimeConfig.public?.shopwell?.endpoint;
const shopwellAccessToken = runtimeConfig.public?.shopwell?.accessToken;

const apiClient = createAPIClient<operations>({
  accessToken: shopwellAccessToken,
  baseURL: shopwellEndpoint,
});

export default apiClient;
