import { createAPIClient } from "@shopwell/api-client";
import type { operations } from "@shopwell/api-client/store-api-types";
import { createShopwellContext } from "@shopwell/composables";
import { createApp, ref } from "vue";

const app = createApp({});
const apiClient = createAPIClient<operations>({});
const shopwellContext = createShopwellContext(app, {});

app.provide("apiClient", apiClient);
app.provide("shopwell", shopwellContext);
// thanks to this, `shopwellContext` can be injected in a component and other Vue-instance-aware places (like composables).
app.provide("swSessionContext", ref());
