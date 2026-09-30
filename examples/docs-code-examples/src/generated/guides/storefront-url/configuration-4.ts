import { createShopwellContext } from "@shopwell/composables";
import { createApp } from "vue";

const app = createApp({});
const shopwellContext = createShopwellContext(app, {
  devStorefrontUrl: "https://your-shop.shopwell.store",
});
