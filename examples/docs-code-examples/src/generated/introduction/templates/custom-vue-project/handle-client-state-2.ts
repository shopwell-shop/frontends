import { createShopwellContext } from "@shopwell/composables";
import { createApp } from "vue";

const app = createApp({});
const options = {
  enableDevtools: false,
};

const shopwellContext = createShopwellContext(app, {
  enableDevtools: !!options.enableDevtools, // decide if devtools should be enabled
});

export { shopwellContext };
