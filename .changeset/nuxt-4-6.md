---
"@shopwell/nuxt-module": patch
"@shopwell/cms-base-layer": patch
"@shopwell/unocss-design-tokens-layer": patch
"vue-starter-template": patch
"lumora-demo-store": patch
"vue-blank": patch
"vue-demo-store": patch
---

Support Nuxt 4.6. `@shopwell/nuxt-module` and `@shopwell/cms-base-layer` now depend on `@nuxt/kit` 4.6.1, and the Nuxt plugin types `ssrContext.event` from `NuxtSSRContext`, so it type-checks on both Nuxt 4.5 and 4.6. The Nuxt templates require Node `^22.22.3 || ^24.15.0 || >=26.0.0`, the range Nuxt 4.6 supports. `@shopwell/unocss-design-tokens-layer` no longer re-exports its generated `.nuxt/imports` from `index.d.ts`, which pulled server routes into the shared type context of apps extending the layer.
