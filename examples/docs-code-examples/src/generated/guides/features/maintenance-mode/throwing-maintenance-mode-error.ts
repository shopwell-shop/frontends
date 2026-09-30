import { createAPIClient } from "@shopwell/api-client";
import { isMaintenanceMode } from "@shopwell/helpers";
import Cookies from "js-cookie";

import { createError } from "#imports";

const shopwellEndpoint = "https://demo-frontends.shopwell.store/store-api/";
const shopwellAccessToken = "SWSCBHFSNTVMAWNZDNFKSHLAYW";

const apiClient = createAPIClient({
  baseURL: shopwellEndpoint,
  accessToken: shopwellAccessToken,
  contextToken: Cookies.get("sw-context-token"),
});

apiClient.hook("onResponseError", (response) => {
  const payload = response._data as { errors?: [{ code?: string }] };
  const error = isMaintenanceMode(
    payload.errors ?? ([{}] as [{ code?: string }]),
  );
  if (error) {
    throw createError({
      statusCode: 503,
      statusMessage: "MAINTENANCE_MODE",
    });
  }
});
