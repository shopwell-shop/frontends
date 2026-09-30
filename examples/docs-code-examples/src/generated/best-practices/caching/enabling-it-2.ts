import { createShopwellContext } from "@shopwell/composables";
import { createApp } from "vue";

const app = createApp({});
const shopwell = createShopwellContext(app, {
  cacheableReads: true,
});
app.use(shopwell);
