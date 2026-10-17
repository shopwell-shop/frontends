# shopwell-shop/frontends - composables

[![](https://img.shields.io/npm/v/@shopwell/composables?color=blue&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCA0ODggNTUzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDM5LjA0MSAxMjkuNTkzTDI1OC43NjkgMzEuMzA3NkMyNDQuOTE1IDIzLjc1NDEgMjI4LjExNiAyNC4wMDkzIDIxNC40OTcgMzEuOTgwMkw0Ny4yNjkgMTI5Ljg1OEMzMy40NzYzIDEzNy45MzEgMjUgMTUyLjcxMyAyNSAxNjguNjk1VjM4OC40NjZDMjUgNDA0LjczMiAzMy43Nzg1IDQxOS43MzIgNDcuOTYwMiA0MjcuNjk5TDIxNS4xNzggNTIxLjYzNkMyMjguNDUxIDUyOS4wOTIgMjQ0LjU5MyA1MjkuMzMyIDI1OC4wODIgNTIyLjI3NEw0MzguMzY0IDQyNy45MzRDNDUzLjIwMSA0MjAuMTcgNDYyLjUgNDA0LjgwOSA0NjIuNSAzODguMDYzVjE2OS4xMDJDNDYyLjUgMTUyLjYzMiA0NTMuNTAyIDEzNy40NzcgNDM5LjA0MSAxMjkuNTkzWiIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9saW5lYXJfMTUzXzY5MjY1KSIgc3Ryb2tlLXdpZHRoPSI1MCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE1M182OTI2NSIgeDE9Ii0xNi4yOTg5IiB5MT0iMTY1LjM0OSIgeDI9IjI3Ni40MTIiIHkyPSItODkuMzIzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDA4NUZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0MwRTJGNSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==)](https://npmjs.com/package/@shopwell/composables)
[![](https://img.shields.io/github/package-json/v/shopwell-shop/frontends?color=blue&filename=packages%2Fcomposables%2Fpackage.json&label=frontends/composables&logo=github)](https://github.com/shopwell-shop/frontends/tree/main/packages/composables)
[![](https://img.shields.io/github/issues/shopwell-shop/frontends/composables?label=package%20issues&logo=github)](https://github.com/shopwell-shop/frontends/issues?q=is%3Aopen+is%3Aissue+label%3Acomposables)
[![](https://img.shields.io/github/license/shopwell-shop/frontends?color=blue)](#)

Set of Vue.js composition functions that can be used in any Vue.js project. They provide state management, UI logic and data fetching and are the base for all guides in our [building section](https://developer.shopwell.cn/frontends/frontends-recipes/context/navigation.html).

## Features

- `createShopwellContext` method to create a Vue 3 plugin to install
- State management
- Logic for UI
- Communication with Store-API via [api-client](https://www.npmjs.com/package/@shopwell/api-client) package

## Setup

Install npm packages (composables & api-client):

```bash
# Using pnpm
pnpm add @shopwell/composables @shopwell/api-client @shopwell/api-gen

# Using yarn
yarn add @shopwell/composables @shopwell/api-client @shopwell/api-gen

# Using npm
npm i @shopwell/composables @shopwell/api-client @shopwell/api-gen
```

Now generate your types ysing the [CLI](https://www.npmjs.com/package/@shopwell/api-gen):

```bash
pnpm shopwell-api-gen generate --apiType=store
```

Initialize the [api-client](https://www.npmjs.com/package/@shopwell/api-client) instance:

```js
import { createAPIClient } from "@shopwell/api-client";
import type { operations } from "#shopwell";

export const apiClient = createAPIClient<operations>({
  baseURL: "https://your-api-instance.com",
  accessToken: "your-sales-channel-access-token",
});

// and then provide it in the Vue app
app.provide("apiClient", apiClient);
```

Now, we can create a Vue 3 plugin to install a Shopwell context in an app:

```js
import { createShopwellContext } from "@shopwell/composables";

// app variable in type of App
const shopwellContext = createShopwellContext(app, {
  devStorefrontUrl: "https://your-sales-channel-configured-domain.com",
});
// register a plugin in a Vue instance
app.use(shopwellContext);
```

Exclude `@shopwell/composables` package from [pre-building](https://vite.dev/guide/dep-pre-bundling.html#customizing-the-behavior) process:

```ts
// vite.config.js or .ts
...
optimizeDeps: {
  exclude: ["@shopwell/composables"],
},
...
```

---

> The example does not provide the session handling and that means you need to do few additional steps if you need to keep your session after the page reload (see the chapter below with 🍪)

## Basic usage

Now you can use any composable function in your setup function:

```html
<script setup>
    import { useUser, useSessionContext } from "@shopwell/composables/dist";

    const { login } = useUser();
    const { refreshSessionContext, sessionContext } = useSessionContext();
    await refreshSessionContext();
</script>
<template>
    <pre>{{ sessionContext }}</pre>
    <button @click="login({
        username: "some-user",
        password: "secret-passwd"
    })">
        Try to login!
    </button>
</template>
```

## Session persistence with 🍪

By default, the API-Client is stateless, but accepts an optional context token as a parameter while initializing an instance. In order to keep a session, install some cookie parser to work with cookies easier:

```bash
# Using pnpm
pnpm add js-cookie

# Using yarn
yarn add js-cookie

# Using npm
npm i js-cookie
```

Let's get back to the step where the `api-client` was initialized:

<!-- automd:file src="examples/b2b-quote-management/src/apiClient.ts" code -->

```ts [apiClient.ts]
import { createAPIClient } from "@shopwell/api-client";
import Cookies from "js-cookie";

import type { operations } from "#shopwell";

const shopwellEndpoint = "https://demo-frontends.shopwell.store/store-api";

export const apiClient = createAPIClient<operations>({
  baseURL: shopwellEndpoint,
  accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
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
```

<!-- /automd -->

Thanks to this, the session will be kept to the corresponding `sw-context-token` saved in the cookie, so it can be reachable also in the SSR. Check the example to see it in action:

[![](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/shopwell-shop/frontends/tree/main/examples/blank-playground?file=src%2Fmain.ts)

## TypeScript support

All composable functions are fully typed with TypeScript and they are registed globally in Nuxt.js application, so the type hinting will help you to work with all of them.

## Links

- [📘 Documentation](https://developer.shopwell.cn/frontends)

- [👥 Community Discord](https://discord.com/channels/1308047705309708348/1405501315160739951) (`#composable-frontend`)

<!-- AUTO GENERATED CHANGELOG -->

## Changelog

Full changelog for stable version is available [here](https://github.com/shopwell-shop/frontends/blob/main/packages/composables/CHANGELOG.md)

### Latest changes: 2.1.0

### Minor Changes

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`9a48fa4`](https://github.com/shopwell-shop/frontends/commit/9a48fa4b4686da5d3269557963911bbedc189c42) Thanks [@xgll7](https://github.com/xgll7)! - Support SEO URLs of headless (API type) sales channels. Since shopwell-shop/shopwell#17991 headless sales channels persist their SEO URLs against the `store-api.*` route family (`store-api.product.detail`, `store-api.category.detail`, `store-api.landing-page.detail`). `useNavigationSearch().resolvePath()` now maps those route names to their `frontend.*` equivalents, so page resolution works unchanged on a headless sales channel. The new `getFrontendRouteName` helper in `@shopwell/helpers` exposes the same mapping for custom resolvers.

### Patch Changes

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`de57de5`](https://github.com/shopwell-shop/frontends/commit/de57de5a1624d14521467c48429151d4c9fa736d) Thanks [@xgll7](https://github.com/xgll7)! - Point the README and JSDoc documentation links at the Frontends Recipes that replaced the redirected guides
- Updated dependencies [[`9a48fa4`](https://github.com/shopwell-shop/frontends/commit/9a48fa4b4686da5d3269557963911bbedc189c42)]:
  - @shopwell/helpers@1.9.0
