import { createShopwellContext } from "@shopwell/composables";
import { createApp, ref } from "vue";

const app = createApp({});
const shopwell = createShopwellContext(app, {
  cacheableReads: true,
});
app.use(shopwell);
// app-wide session and cart, so cacheable reads can check them
app.provide("swSessionContext", ref());
app.provide("swCart", ref());
