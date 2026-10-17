# lumora-demo-store

## 0.0.7

### Patch Changes

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`c7cee4b`](https://github.com/shopwell-shop/frontends/commit/c7cee4b58ef0d108c0189334e1a509b529ccdc7b) Thanks [@xgll7](https://github.com/xgll7)! - Support Nuxt 4.6. `@shopwell/nuxt-module` and `@shopwell/cms-base-layer` now depend on `@nuxt/kit` 4.6.1, and the Nuxt plugin types `ssrContext.event` from `NuxtSSRContext`, so it type-checks on both Nuxt 4.5 and 4.6. The Nuxt templates require Node `^22.22.3 || ^24.15.0 || >=26.0.0`, the range Nuxt 4.6 supports. `@shopwell/unocss-design-tokens-layer` no longer re-exports its generated `.nuxt/imports` from `index.d.ts`, which pulled server routes into the shared type context of apps extending the layer.
- Updated dependencies [[`7e9dbd9`](https://github.com/shopwell-shop/frontends/commit/7e9dbd9986c27d3ed1ace4c6e4c6156260f2e63d), [`c7cee4b`](https://github.com/shopwell-shop/frontends/commit/c7cee4b58ef0d108c0189334e1a509b529ccdc7b), [`499bd67`](https://github.com/shopwell-shop/frontends/commit/499bd67d8de3c2ee79fc057d9beeb6a7c21a1287)]:
  - vue-starter-template@0.1.5

## 0.0.6

### Patch Changes

- Updated dependencies [[`934734e`](https://github.com/shopwell-shop/frontends/commit/934734e9d18aaa8bc62ecd4d899eaced69fbba95)]:
  - vue-starter-template@0.1.4

## 0.0.5

### Patch Changes

- Updated dependencies [[`c64ae1c`](https://github.com/shopwell-shop/frontends/commit/c64ae1c6e2d11e33bd52df4b55177cc26b646433), [`b4c409c`](https://github.com/shopwell-shop/frontends/commit/b4c409c35f103656f1972d67133380ef04f92f1d), [`6315350`](https://github.com/shopwell-shop/frontends/commit/6315350add0464abef153343897d42f5808f2003)]:
  - vue-starter-template@0.1.3

## 0.0.4

### Patch Changes

- [#2510](https://github.com/shopwell-shop/frontends/pull/2510) [`6f063bc`](https://github.com/shopwell-shop/frontends/commit/6f063bcf3dac1e9582a952b86eb588735f80d1e0) Thanks [@patzick](https://github.com/patzick)! - Migrate template linting and formatting from Biome to Oxlint and Oxfmt.

- Updated dependencies [[`bc8a57a`](https://github.com/shopwell-shop/frontends/commit/bc8a57ac7cada68234267e9b17e00b71569a0cb2), [`6f063bc`](https://github.com/shopwell-shop/frontends/commit/6f063bcf3dac1e9582a952b86eb588735f80d1e0)]:
  - vue-starter-template@0.1.2

## 0.0.3

### Patch Changes

- Updated dependencies [[`33e0c69`](https://github.com/shopwell-shop/frontends/commit/33e0c69afc3de854733ab61f866ba65cce1489f6), [`b8c0091`](https://github.com/shopwell-shop/frontends/commit/b8c00913c3afb5e1e63de9565105f8f8e3bf299f), [`df93461`](https://github.com/shopwell-shop/frontends/commit/df93461434cb79ec9d722cdbd42a37a9af07fb03), [`8fb3fb0`](https://github.com/shopwell-shop/frontends/commit/8fb3fb05d925408be825f209f871026636b95d50)]:
  - vue-starter-template@0.1.1

## 0.0.2

### Patch Changes

- Updated dependencies [[`c77daa6`](https://github.com/shopwell-shop/frontends/commit/c77daa6a11e96c7f3688b16f7da010b54c7f5e8b)]:
  - vue-starter-template@0.1.0
