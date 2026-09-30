import { createShopwellContext } from "@shopwell/composables";
import { createApp } from "vue";

import { apiClient } from "./apiClient";
import App from "./App.vue";

const app = createApp(App);

const shopwellContext = createShopwellContext(app, {});
app.provide("apiClient", apiClient);
app.use(shopwellContext);
app.mount("#app");
