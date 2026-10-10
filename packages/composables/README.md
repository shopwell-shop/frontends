# shopwell/frontends - composables

[![](https://img.shields.io/npm/v/@shopwell/composables?color=blue&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCA0ODggNTUzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDM5LjA0MSAxMjkuNTkzTDI1OC43NjkgMzEuMzA3NkMyNDQuOTE1IDIzLjc1NDEgMjI4LjExNiAyNC4wMDkzIDIxNC40OTcgMzEuOTgwMkw0Ny4yNjkgMTI5Ljg1OEMzMy40NzYzIDEzNy45MzEgMjUgMTUyLjcxMyAyNSAxNjguNjk1VjM4OC40NjZDMjUgNDA0LjczMiAzMy43Nzg1IDQxOS43MzIgNDcuOTYwMiA0MjcuNjk5TDIxNS4xNzggNTIxLjYzNkMyMjguNDUxIDUyOS4wOTIgMjQ0LjU5MyA1MjkuMzMyIDI1OC4wODIgNTIyLjI3NEw0MzguMzY0IDQyNy45MzRDNDUzLjIwMSA0MjAuMTcgNDYyLjUgNDA0LjgwOSA0NjIuNSAzODguMDYzVjE2OS4xMDJDNDYyLjUgMTUyLjYzMiA0NTMuNTAyIDEzNy40NzcgNDM5LjA0MSAxMjkuNTkzWiIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9saW5lYXJfMTUzXzY5MjY1KSIgc3Ryb2tlLXdpZHRoPSI1MCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE1M182OTI2NSIgeDE9Ii0xNi4yOTg5IiB5MT0iMTY1LjM0OSIgeDI9IjI3Ni40MTIiIHkyPSItODkuMzIzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDA4NUZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0MwRTJGNSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==)](https://npmjs.com/package/@shopwell/composables)
[![](https://img.shields.io/github/package-json/v/shopwell/frontends?color=blue&filename=packages%2Fcomposables%2Fpackage.json&label=frontends/composables&logo=github)](https://github.com/shopwell-shop/frontends/tree/main/packages/composables)
[![](https://img.shields.io/github/issues/shopwell/frontends/composables?label=package%20issues&logo=github)](https://github.com/shopwell-shop/frontends/issues?q=is%3Aopen+is%3Aissue+label%3Acomposables)
[![](https://img.shields.io/github/license/shopwell/frontends?color=blue)](#)

Set of Vue.js composition functions that can be used in any Vue.js project. They provide state management, UI logic and data fetching and are the base for all guides in our [building section](https://developer.shopwell.cn/frontends/guides/page-elements/navigation.html).

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

### Latest changes: 2.0.0

### Major Changes

- [#6](https://github.com/shopwell-shop/frontends/pull/6) [`30f4541`](https://github.com/shopwell-shop/frontends/commit/30f454108dd15c1639df7788fc7a590bd15e0983) Thanks [@xgll7](https://github.com/xgll7)! - Customers, users, order customers, addresses and newsletter recipients now carry a single `name` instead of `firstName` and `lastName`.

  `firstName` and `lastName` are gone from the Admin API and Store API schemas of `Customer`, `CustomerAddress`, `OrderCustomer`, `OrderAddress`, `User` and `NewsletterRecipient`. They expose `name` (the full name) instead. The same applies to the request bodies that used to send both fields — customer registration, profile update, contact form, newsletter subscription and the revocation request form — and to the `contactForm` shop settings, where `firstNameFieldRequired` and `lastNameFieldRequired` are merged into `nameFieldRequired`.

  `useOrderDetails()` returns the customer's full name as `name` in the personal details.

  The newsletter and contact form CMS elements render a single name input instead of separate first and last name inputs.

### Minor Changes

- [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95) Thanks [@gxiaosong](https://github.com/gxiaosong)! - Let the CMS tree lookups follow a changing `content`, and fix `resolveCmsComponent().isResolved`

  **`useCmsSection` and `useCmsBlock` accept a `ref` or a getter.** Both took a plain object and closed over it, so `getPositionContent()` and `getSlotContent()` kept reading the tree captured at setup: a component receiving a new `content` prop had to remount to see it, and calling the function again did not help. Both now accept `MaybeRefOrGetter` and resolve it with `toValue()` on every call.

  Passing a plain object still works exactly as before, so nothing has to change. To benefit, pass a getter and read the lookups through a `computed`:

  ```ts
  const { getSlotContent } = useCmsBlock(() => props.content);
  const leftContent = computed(() => getSlotContent("left"));
  ```

  The returned `section` and `block` are still the value read when the composable was called, so they do not follow a replacement — use the source you passed in when you need that.

  **`resolveCmsComponent().isResolved` now means resolved.** It compared the resolved value with `content.type`, while Vue's `resolveComponent` returns the _component name_ when nothing is registered — two strings that never match, so `isResolved` was `true` even when nothing resolved, and code guarding a fallback with `!isResolved` never ran. It is now derived from `resolvedComponent !== undefined`. Check `resolvedComponent` directly if you want the component itself.

  The `resolved` field, which appears only when resolving throws, is now marked `@deprecated`. It always equals `isResolved`, so read that instead.

  Note what is not fixed here: `getSlotContent()` still returns `undefined` at runtime for a slot the block does not carry, while its return type promises a value. The signature stays as it is because correcting it would be a breaking type change; the JSDoc now says so, and callers should keep guarding on the result.

### Patch Changes

- [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95) Thanks [@gxiaosong](https://github.com/gxiaosong)! - Add an optional notification action (label + link) so add-to-cart toasts can offer a "View cart" shortcut, and keep those toasts visible a little longer.

- [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95) Thanks [@gxiaosong](https://github.com/gxiaosong)! - Fall back `getStorefrontUrl()` to a sales channel domain

  `useUser().register()` injects `storefrontUrl` from `getStorefrontUrl()`. Shopwell rejects that value unless it matches a **Sales Channel → Domains** entry, so guest checkout against the public demo (`devStorefrontUrl` pointing at the starter Vercel host) never reached `POST /checkout/order`.

  `getStorefrontUrl()` now uses the preferred URL when it is one of the current sales channel domains, and otherwise the domain for the active language (or the first configured domain).

- [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95) Thanks [@gxiaosong](https://github.com/gxiaosong)! - Refresh the cart after `register()`

  `useUser().register()` changed the session context without refreshing the cart, while `login()` and `logout()` both did. Registration is the first point at which the backend learns the customer's billing country, which drives tax rates, shipping surcharges and customer-group prices, so the cart totals held in `useCart()` could stay at their pre-registration values while the order was placed at the recalculated ones.

  `register()` now awaits `refreshCart()` after `refreshSessionContext()`, so a caller that awaits `register()` cannot observe the pre-registration totals afterwards. Note this makes `register()` resolve slightly later than before, and a failing cart refresh now rejects `register()` even though the customer was created — the same property `refreshSessionContext()` on the preceding line already had.

  `login()` and `logout()` still call `refreshCart()` without awaiting it and are unchanged here.

- Updated dependencies [[`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95), [`30f4541`](https://github.com/shopwell-shop/frontends/commit/30f454108dd15c1639df7788fc7a590bd15e0983), [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95)]:
  - @shopwell/api-client@2.0.0
