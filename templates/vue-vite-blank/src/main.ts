import { createShopwellContext } from "@shopwell/composables/dist";

import "./style.css";
import { createApp } from "vue";

import { apiClient } from "./apiClient";
import App from "./App.vue";

const app = createApp(App);

// setup shopwell plugin
const shopwellContext = createShopwellContext(app, {});
app.provide("apiClient", apiClient);

// register a plugin in a Vue instance
app.use(shopwellContext);

app.mount("#app");
