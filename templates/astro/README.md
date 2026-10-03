# Astro blank template

![Shopwell Frontends](./public/shopwell-frontends-logo.png)

This repository shows an example of application built using Shopwell Frontends Framework with [Astro](https://astro.build).

## What's inside

- Astro application [following official Guides > integrations > @astrojs/vue](https://docs.astro.build/en/guides/integrations-guide/vue/)
- Required libraries installed (api-client and composables)

## Requirements

Astro 7 requires Node.js `>=22.12.0`.

Go to [Documentation > Requirements](https://developer.shopwell.cn/frontends/framework/requirements.html) to see the details.

## Set up your Shopwell 6 instance

In order to have a different API connected to the app, change two lines of code in [./src/entrypoints/\_shopwell.ts](./src/entrypoints/_shopwell.ts):

<!-- automd:file src="templates/astro/src/entrypoints/_shopwell.ts" code -->

```ts [_shopwell.ts]
import { createAPIClient } from "@shopwell/api-client";
import type { operations } from "@shopwell/api-client/store-api-types";
import { createShopwellContext } from "@shopwell/composables/dist";
import Cookies from "js-cookie";
import type { App } from "vue";

export default (app: App) => {
  const shopwellEndpoint =
    import.meta.env.API_URL ||
    "https://demo-frontends.shopwell.store/store-api";

  const apiClient = createAPIClient<operations>({
    baseURL: shopwellEndpoint,
    accessToken:
      import.meta.env.API_ACCESS_TOKEN || "SWSCBHFSNTVMAWNZDNFKSHLAYW",
    contextToken: Cookies.get("sw-context-token"),
  });

  apiClient.hook("onContextChanged", (newContextToken) => {
    Cookies.set("sw-context-token", newContextToken, {
      expires: 365, // days
      path: "/",
      sameSite: "lax",
      secure: shopwellEndpoint.startsWith("https://"),
    });
  });

  // create a Shopwell context plugin and inject it to the Vue app
  const shopwellContext = createShopwellContext(app, {
    devStorefrontUrl: null,
  });
  // register a plugin
  app.provide("apiClient", apiClient);
  app.use(shopwellContext);
};
```

<!-- /automd -->

## Customize

Now, you are free to use the `@shopwell/composables` package in the application. You can start from [Session.vue](./src/components/Session.vue).

## Install & Run

1. `pnpm i` to install deps
2. `pnpm dev` to run the project in dev mode

## Try it online

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/shopwell-shop/frontends/tree/main/templates/astro)
