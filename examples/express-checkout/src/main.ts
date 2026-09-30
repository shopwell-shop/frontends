import { createShopwellContext } from "@shopwell/composables";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import { apiClient } from "./apiClient";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)",
      component: App,
    },
  ],
});
const app = createApp(App);

const shopwellContext = createShopwellContext(app, {});
app.provide("apiClient", apiClient);
app.use(router);
app.use(shopwellContext);
app.mount("#app");
