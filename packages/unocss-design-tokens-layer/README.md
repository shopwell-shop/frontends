# @shopwell/unocss-design-tokens-layer

Nuxt layer that provides the shared Shopwell Frontends UnoCSS setup, design tokens, reset stylesheet, and runtime support for resolving dynamic utility classes.

It is intended to be composed with layers such as `@shopwell/cms-base-layer`, while allowing projects to keep design tokens separate from CMS functionality.

## Usage

```ts
export default defineNuxtConfig({
  extends: [
    "@shopwell/composables/nuxt-layer",
    "@shopwell/cms-base-layer",
    "@shopwell/unocss-design-tokens-layer",
  ],
  modules: ["@shopwell/nuxt-module", "@unocss/nuxt"],
  css: ["@unocss/reset/tailwind-compat.css"],
  unocss: {
    nuxtLayers: true,
  },
});
```

## Customization

Extend the generated base Uno config in your project:

```ts
import { mergeConfigs } from "@unocss/core";
import baseConfig from "./.nuxt/uno.config.mjs";

export default mergeConfigs([
  baseConfig,
  {
    theme: {
      colors: {
        "brand-primary": "#123456",
      },
    },
  },
]);
```

<!-- AUTO GENERATED CHANGELOG -->

## Changelog

Full changelog for stable version is available [here](https://github.com/shopwell-shop/frontends/blob/main/packages/unocss-design-tokens-layer/CHANGELOG.md)

### Latest changes: 1.0.3

### Patch Changes

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`c7cee4b`](https://github.com/shopwell-shop/frontends/commit/c7cee4b58ef0d108c0189334e1a509b529ccdc7b) Thanks [@xgll7](https://github.com/xgll7)! - Support Nuxt 4.6. `@shopwell/nuxt-module` and `@shopwell/cms-base-layer` now depend on `@nuxt/kit` 4.6.1, and the Nuxt plugin types `ssrContext.event` from `NuxtSSRContext`, so it type-checks on both Nuxt 4.5 and 4.6. The Nuxt templates require Node `^22.22.3 || ^24.15.0 || >=26.0.0`, the range Nuxt 4.6 supports. `@shopwell/unocss-design-tokens-layer` no longer re-exports its generated `.nuxt/imports` from `index.d.ts`, which pulled server routes into the shared type context of apps extending the layer.
