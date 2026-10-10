# shopwell/frontends - nuxt-module

[![](https://img.shields.io/npm/v/@shopwell/nuxt-module?color=blue&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCA0ODggNTUzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDM5LjA0MSAxMjkuNTkzTDI1OC43NjkgMzEuMzA3NkMyNDQuOTE1IDIzLjc1NDEgMjI4LjExNiAyNC4wMDkzIDIxNC40OTcgMzEuOTgwMkw0Ny4yNjkgMTI5Ljg1OEMzMy40NzYzIDEzNy45MzEgMjUgMTUyLjcxMyAyNSAxNjguNjk1VjM4OC40NjZDMjUgNDA0LjczMiAzMy43Nzg1IDQxOS43MzIgNDcuOTYwMiA0MjcuNjk5TDIxNS4xNzggNTIxLjYzNkMyMjguNDUxIDUyOS4wOTIgMjQ0LjU5MyA1MjkuMzMyIDI1OC4wODIgNTIyLjI3NEw0MzguMzY0IDQyNy45MzRDNDUzLjIwMSA0MjAuMTcgNDYyLjUgNDA0LjgwOSA0NjIuNSAzODguMDYzVjE2OS4xMDJDNDYyLjUgMTUyLjYzMiA0NTMuNTAyIDEzNy40NzcgNDM5LjA0MSAxMjkuNTkzWiIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9saW5lYXJfMTUzXzY5MjY1KSIgc3Ryb2tlLXdpZHRoPSI1MCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE1M182OTI2NSIgeDE9Ii0xNi4yOTg5IiB5MT0iMTY1LjM0OSIgeDI9IjI3Ni40MTIiIHkyPSItODkuMzIzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDA4NUZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0MwRTJGNSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==)](https://npmjs.com/package/@shopwell/nuxt-module)
[![](https://img.shields.io/github/package-json/v/shopwell/frontends?color=blue&filename=packages%2Fnuxt-module%2Fpackage.json&label=nuxt-module%40monorepo&logo=github)](https://github.com/shopwell-shop/frontends/tree/main/packages/nuxt-module)
[![](https://img.shields.io/github/issues/shopwell/frontends/nuxt-module?label=nuxt-module%20issues&logo=github)](https://github.com/shopwell-shop/frontends/issues?q=is%3Aopen+is%3Aissue+label%3Anuxt-module)
[![](https://img.shields.io/github/license/shopwell/frontends?color=blue)](#)

Nuxt [module](https://nuxt.com/docs/guide/going-further/modules) that allows you to set up a Nuxt project with Shopwell Frontends. It provides the composables and api-client packages.

If you want to use these packages with a different Vue.js framework, see [the guide](https://developer.shopwell.cn/frontends/introduction/templates/custom-vue-project.html) for using Shopwell Frontends in a custom project.

## Features

- Business logic covered by [Composables](https://npmjs.com/package/@shopwell/composables) package. Registering all composable functions globally. [See the reference](https://developer.shopwell.cn/frontends/packages/composables.html).
- Shopwell context shared in Nuxt application.
- Configured [API Client](https://npmjs.com/package/@shopwell/api-client) package.

## Setup

Install npm package:

```bash
# Using pnpm
pnpm add -D @shopwell/nuxt-module

# Using yarn
yarn add --dev @shopwell/nuxt-module

# Using npm
npm i @shopwell/nuxt-module --save-dev
```

Then, register the module by editing `nuxt.config.js` or (`.ts`) file (by extending `modules` array):

```js
/* nuxt.config.ts */

export default defineNuxtConfig({
  /* ... */
  modules: [, /* ... */ "@shopwell/nuxt-module"],
  // set the module config
  shopwell: {
    // connect to your Shopwell 6 API instance
    endpoint: "https://demo-frontends.shopwell.store/store-api/",
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  },
  // or directly in the runtime config
  // this config will override the base one
  runtimeConfig: {
    public: {
      shopwell: {
        endpoint: "https://demo-frontends.shopwell.store/store-api/",
        accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
      },
    },
  },
});
```

Set up your own API instance under `shopwell` key or by extending public `runtimeConfiguration` in the same file. The nuxt module (and vue plugin) will use those values (runtimeConfig will always override the base ones).

## Basic usage

Now you can use any composable function you need without extra import:

```html
<script setup>
  const { login } = useUser();
  const { refreshSessionContext } = useSessionContext();
  await refreshSessionContext();
</script>
```

The information about the session is kept in a cookie (`sw-context-token`) and used in every request made by any composable or directly, invoked by `api instance`:

```html
<script setup>
  const { apiClient } = useShopwellContext();
  const apiResponse = await apiClient.invoke(/** params omitted */);
</script>
```

## TypeScript support

All composable functions are fully typed with TypeScript and they are registed globally in Nuxt.js application, so the type hinting will help you to work with all of them.

## 📦 Advanced packaging

Internally, the module uses [API Client](https://npmjs.com/package/@shopwell/api-client) and [Composables](https://npmjs.com/package/@shopwell/composables) packages, configured together to make everything working well. If you need to check how it's working on a different version of one of them, install a package locally in your project (to be installed and available in project's `package.json` file), then the Nuxt module will use yours. Keep in mind that the different configuration may lead to unexpected behavior.

## API Default Headers

You can use Nuxt config to set the default API call headers.
More about Nuxt configuration can be found [HERE](https://nuxt.com/docs/getting-started/configuration).

> **_NOTE:_** By default, the values in `runtimeConfig` are only available on the server-side. However, keys within `runtimeConfig.public` are also accessible on the client-side. [MORE](https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens)

```json
{
  "runtimeConfig": {
    "public": {
      "apiClientConfig": {
        "headers": {
          "global-heder-example": "global-header-example-value"
        }
      }
    },
    "apiClientConfig": {
      "headers": {
        "ssr-heder-example": "ssr-header-example-value"
      }
    }
  }
}
```

## API Client timeout

`apiClientConfig.timeout` aborts a Store API request when its response headers do not arrive within the given number of milliseconds. Unset by default.

It guards against a request that hangs before the server answers. The timer starts before the connection is opened, so a DNS lookup, TCP connect or TLS handshake that hangs is aborted too. A response that stalls after its headers arrived is not aborted, because the timer is cleared once the headers land. A call that passes its own `signal` is the exception: the combined timer keeps running, so a stalled body is aborted too.

```json
{
  "runtimeConfig": {
    "public": {
      "apiClientConfig": {
        "timeout": 10000
      }
    }
  }
}
```

Only a positive number of milliseconds arms it, and a numeric string is coerced, so `"5000"` works. Leaving it out is silent. Setting it to anything else is ignored and logged once as a warning naming the config path the value came from.

`shopwell: { apiClientConfig: { timeout } }` still works as a deprecated fallback, read only when neither `runtimeConfig` path holds a valid value. Nuxt warns at build time when a timeout is set there. Move it to `runtimeConfig.apiClientConfig`; it goes away in the next major.

Once set:

- The error carries no HTTP status and is not an `ApiClientError`. Detect it with `isTimeoutError()` from `@shopwell/api-client`.
- A timed-out `GET` uses up its one automatic retry without reaching the server again.
- Your own `signal` on a single call is combined with the timeout, so whichever fires first aborts the request.
- `NUXT_API_CLIENT_CONFIG_TIMEOUT` and `NUXT_PUBLIC_API_CLIENT_CONFIG_TIMEOUT` only apply if the key is already in `nuxt.config`.

## Register custom API types (tailored for your Shopwell instance)

To use custom API types generated by the `api-gen` package, create a `shopwell.d.ts` file in your project and register the types for the `#shopwell` module. This enables type-safe usage of your custom API types throughout your Nuxt application.

**Example of using a local type definitions:**

```ts
// shopwell.d.ts
declare module "#shopwell" {
  import type { createAPIClient } from "@shopwell/api-client";

  // Use default Shopwell types:
  // export type operations =
  //  import("@shopwell/api-client/store-api-types").operations;
  // export type Schemas =
  // import("@shopwell/api-client/store-api-types").components["schemas"];

  // Or use your locally generated types (placed in ./api-types folder):
  export type operations = import("./api-types/storeApiTypes").operations;
  export type Schemas =
    import("./api-types/storeApiTypes").components["schemas"];

  // Export your own Api Client definition:
  export type ApiClient = ReturnType<typeof createAPIClient<operations>>;
}
```

Import your custom types from local files and export them as shown above. This approach keeps your types local, allows merging or overriding defaults, and ensures full type safety for API operations and schemas.

### Apply custom types for `@shopwell/api-client`

The API Client instance is aware of your custom API types thanks to declaring `#shopwell` module from the step above. So now, whenever `apiClient` instance is used, the proper types are registered.

## Links

- [📘 Documentation](https://developer.shopwell.cn/frontends)

- [📦 API Gen - Types Generator for Shopwell 6 OpenAPI Schema](https://npmjs.com/@shopwell/api-gen)

- [📦 API Client - REST API Client for Shopwell 6](https://npmjs.com/@shopwell/api-client)

- [👥 Community](https://discord.com/channels/1308047705309708348/1405501315160739951) (`#composable-frontend`)

<!-- AUTO GENERATED CHANGELOG -->

## Changelog

Full changelog for stable version is available [here](https://github.com/shopwell-shop/frontends/blob/main/packages/nuxt-module/CHANGELOG.md)

### Latest changes: 1.6.0

### Minor Changes

- [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95) Thanks [@gxiaosong](https://github.com/gxiaosong)! - `apiClientConfig.timeout` now works. Set it in milliseconds under `runtimeConfig.apiClientConfig` or `runtimeConfig.public.apiClientConfig`, next to `headers`, and the plugin forwards it to the API client. Unset by default. Only a positive number arms it, and a numeric string is coerced. Any other value is ignored and logged once as a warning naming the config path the value came from, instead of being dropped silently. It aborts a request whose response headers do not arrive in time, including one still opening its connection. It does not abort a response that stalls after its headers arrived, unless the call passes its own `signal`.

  `apiClientConfig` under the `shopwell` module options is deprecated, and now works as a fallback. It had never been read before, so a value set there in the past becomes active with this release. It is read last, only when neither `runtimeConfig` path holds a valid value, and Nuxt warns at build time when a timeout is set there. Move to `runtimeConfig.apiClientConfig`; the fallback goes away in the next major.

### Patch Changes

- [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95) Thanks [@gxiaosong](https://github.com/gxiaosong)! - Resolve plugin configuration types from the published package entrypoint.
- Updated dependencies [[`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95), [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95), [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95), [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95), [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95), [`30f4541`](https://github.com/shopwell-shop/frontends/commit/30f454108dd15c1639df7788fc7a590bd15e0983), [`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95)]:
  - @shopwell/api-client@2.0.0
  - @shopwell/composables@2.0.0
