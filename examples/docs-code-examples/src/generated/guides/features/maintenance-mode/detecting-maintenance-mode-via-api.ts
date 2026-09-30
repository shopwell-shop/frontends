import { createAPIClient } from "@shopwell/api-client";
import { isMaintenanceMode } from "@shopwell/helpers";
import Cookies from "js-cookie";

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
  // do proper reaction to maintenance mode
});
