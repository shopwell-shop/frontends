import { createAPIClient } from "@shopwell/api-client";
import { createShopwellContext } from "@shopwell/composables";
import Cookies from "js-cookie";
// ./plugins/vue-shopwell-frontends.ts file
import type { App } from "vue";
import { ref } from "vue";

interface ShopwellFrontendsOptions {
  accessToken: string;
  endpoint: string;
}

export default {
  install: (app: App, options: ShopwellFrontendsOptions) => {
    // Configure the API client and Shopwell context here.
  },
};
