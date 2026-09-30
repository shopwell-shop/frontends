// main.ts
import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
// import previously implemented module
import ShopwellFrontends from "./plugins/vue-shopwell-frontends";
const app = createApp(App);

app.use(ShopwellFrontends, {
  // pass options described under ShopwellFrontendsOptions type in the previous section
  endpoint: "https://demo-frontends.swstage.store",
  accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  apiDefaults: {},
});

app.mount("#app");
