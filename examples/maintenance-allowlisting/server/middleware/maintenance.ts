import { ApiClientError } from "@shopwell/api-client";
import { isMaintenanceMode } from "@shopwell/helpers";

import apiClient from "../apiBuilder";

export default defineEventHandler(async (event) => {
  try {
    await apiClient.invoke("readContext get /context");
  } catch (error) {
    if (error instanceof ApiClientError) {
      if (isMaintenanceMode(error.details.errors ?? [])) {
        event.context.nuxt = event.context.nuxt ?? {};
        event.context.nuxt.noSSR = true;
        console.log("Maintenance mode is active");
      }
    }
  }
});
