import type { App } from "vue";

export type ShopwellFrontendsOptions = {
  endpoint: string;
  accessToken: string;
  apiDefaults?: Record<string, unknown>;
};

export default {
  install(app: App, options: ShopwellFrontendsOptions) {
    app.provide("shopwellOptions", options);
  },
};
