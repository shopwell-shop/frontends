# shopwell-shop/frontends - cms-base

[![](https://img.shields.io/npm/v/@shopwell/cms-base-layer?color=blue&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCA0ODggNTUzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDM5LjA0MSAxMjkuNTkzTDI1OC43NjkgMzEuMzA3NkMyNDQuOTE1IDIzLjc1NDEgMjI4LjExNiAyNC4wMDkzIDIxNC40OTcgMzEuOTgwMkw0Ny4yNjkgMTI5Ljg1OEMzMy40NzYzIDEzNy45MzEgMjUgMTUyLjcxMyAyNSAxNjguNjk1VjM4OC40NjZDMjUgNDA0LjczMiAzMy43Nzg1IDQxOS43MzIgNDcuOTYwMiA0MjcuNjk5TDIxNS4xNzggNTIxLjYzNkMyMjguNDUxIDUyOS4wOTIgMjQ0LjU5MyA1MjkuMzMyIDI1OC4wODIgNTIyLjI3NEw0MzguMzY0IDQyNy45MzRDNDUzLjIwMSA0MjAuMTcgNDYyLjUgNDA0LjgwOSA0NjIuNSAzODguMDYzVjE2OS4xMDJDNDYyLjUgMTUyLjYzMiA0NTMuNTAyIDEzNy40NzcgNDM5LjA0MSAxMjkuNTkzWiIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9saW5lYXJfMTUzXzY5MjY1KSIgc3Ryb2tlLXdpZHRoPSI1MCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE1M182OTI2NSIgeDE9Ii0xNi4yOTg5IiB5MT0iMTY1LjM0OSIgeDI9IjI3Ni40MTIiIHkyPSItODkuMzIzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDA4NUZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0MwRTJGNSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==)](https://npmjs.com/package/@shopwell/cms-base-layer)
[![](https://img.shields.io/github/package-json/v/shopwell-shop/frontends?color=blue&filename=packages%2Fcms-base-layer%2Fpackage.json&label=cms-base%40monorepo&logo=github)](https://github.com/shopwell-shop/frontends/tree/main/packages/cms-base-layer)
[![](https://img.shields.io/github/issues/shopwell-shop/frontends/cms-base?label=cms-base%20issues&logo=github)](https://github.com/shopwell-shop/frontends/issues?q=is%3Aopen+is%3Aissue+label%3Acms-base)
[![](https://img.shields.io/github/license/shopwell-shop/frontends?color=blue)](#)

Nuxt [layer](https://nuxt.com/docs/getting-started/layers) that provides an implementation of all CMS components in Shopwell [based on utility-classes](https://developer.shopwell.cn/frontends/concepts/styling.html).

It is useful for projects that want to use the CMS components while keeping CMS functionality separate from the styling system and design tokens.

## Features

- Vue components for [Shopping Experiences](https://www.shopwell.cn/en/products/shopping-experiences/) CMS
- CMS sections, blocks and elements implemented with utility-class-based markup
- 🚀 Empowered by [@shopwell/composables](https://www.npmjs.com/package/@shopwell/composables)

## Setup

Install npm package:

<!-- automd:pm-install name="@shopwell/cms-base-layer" dev -->

```sh
# ✨ Auto-detect
npx nypm install -D @shopwell/cms-base-layer

# npm
npm install -D @shopwell/cms-base-layer

# yarn
yarn add -D @shopwell/cms-base-layer

# pnpm
pnpm add -D @shopwell/cms-base-layer

# bun
bun install -D @shopwell/cms-base-layer

# deno
deno install --dev npm:@shopwell/cms-base-layer
```

<!-- /automd -->

If you also want the shared Shopwell Frontends UnoCSS setup, install `@shopwell/unocss-design-tokens-layer` in your app and extend it alongside `@shopwell/cms-base-layer`.

Then, register the Nuxt layer in `nuxt.config.ts` file:

<!-- automd:file src="templates/vue-blank/nuxt.config.ts" code -->

```ts [nuxt.config.ts]
// https://v3.nuxtjs.org/api/configuration/nuxt.config
const isStackBlitz = process.env.SHOPWELL_STACKBLITZ === "true";

export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer", "@shopwell/cms-base-layer"],
  ...(isStackBlitz ? { devtools: { enabled: false } } : {}),
  shopwell: {
    endpoint: "https://demo-frontends.shopwell.store/store-api/",
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  },
  modules: ["@shopwell/nuxt-module"],
  /**
   * Commented because of the StackBlitz error
   * Issue: https://github.com/shopwell-shop/frontends/issues/88
   */
  typescript: {
    // typeCheck: true,
    strict: true,
  },
  telemetry: false,
});
```

<!-- /automd -->

## Basic usage

Since all CMS components are registered in your Nuxt application, you can now start using them in your template (no imports needed):

```js
/* Vue component */

// response object can be a Product|Category|Landing Page response from Shopwell 6 store-api containing a layout (cmsPage object) built using  Shopping Experiences
<template>
    <CmsPage v-if="response.cmsPage" :content="response.cmsPage"/>
</template>
```

> `@shopwell/cms-base-layer` no longer owns the default UnoCSS theme. If you want the shared Shopwell Frontends design tokens and UnoCSS defaults, extend `@shopwell/unocss-design-tokens-layer` as shown above.

See a [short guide](https://developer.shopwell.cn/frontends/frontends-recipes/cms/rendering.html) on how to use `cms-base-layer` in your Nuxt project.

## Styling and Design Tokens

The components use utility classes, but the shared UnoCSS configuration, design tokens, and runtime handling for dynamic CMS classes are now provided by `@shopwell/unocss-design-tokens-layer`.

This means you have two options:

- extend `@shopwell/unocss-design-tokens-layer` to use the shared Shopwell Frontends token palette and UnoCSS defaults
- keep only `@shopwell/cms-base-layer` and provide your own UnoCSS or Tailwind setup

When you use the design-tokens layer, you can customize the generated config in your project's `uno.config.ts`:

```ts [nuxt.config.ts]
// nuxt.config.ts
export default defineNuxtConfig({
  // ...
  unocss: {
    nuxtLayers: true, // enable Nuxt layers for UnoCSS
  },
});
```

```ts [uno.config.ts]
import { mergeConfigs } from "@unocss/core";
import baseConfig from "./.nuxt/uno.config.mjs";

export default mergeConfigs([
  baseConfig,
  {
    theme: {
      colors: {
        "brand-primary": "#ff3e00",
        "brand-secondary": "#1c1c1c",
      },
    },
  },
]);
```

See the [UnoCSS reference](https://unocss.dev/integrations/nuxt#configuration) for more information on how to configure UnoCSS in Nuxt when work with layers.

## 🖼️ Image Optimization

This layer includes [Nuxt Image](https://image.nuxt.com/) configuration optimized for Shopwell 6 instances, with a custom provider that maps Nuxt Image modifiers to Shopwell's query parameters (`width`, `height`, `quality`, `format`, `fit`).

> **Note for Cloud (SaaS) Users:** Image optimization and all modifiers used in the Nuxt Image module are handled automatically by Shopwell Cloud infrastructure powered by [Fastly CDN](https://developer.shopwell.cn/docs/products/paas/shopwell/cdn/). No additional configuration or plugins are required - simply use `<NuxtImg>` and all transformations (format conversion, quality adjustment, responsive sizing) work out of the box through Fastly's Image Optimizer.

### Features

- ✅ Automatic WebP/AVIF format conversion
- ✅ Responsive image sizing based on viewport
- ✅ Lazy loading support
- ✅ Quality optimization
- ✅ Multiple image presets for common use cases
- ✅ Works with Shopwell Cloud (SaaS) and self-hosted instances

### Configuration

The layer comes pre-configured with optimized settings. No additional setup is required! The configuration includes:

**Available Presets:**

- `productCard` - Product listing images (WebP, quality 90, cover fit)
- `productDetail` - Product detail page images (WebP, quality 90, contain fit)
- `thumbnail` - Small thumbnails (150x150, WebP, quality 90)
- `hero` - Hero banners (WebP, quality 95, cover fit)

**Responsive Breakpoints:**

- `xs: 320px`, `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `xxl: 1536px`

### Usage in Components

Replace standard `<img>` tags with `<NuxtImg>` to enable automatic optimization:

```vue
<!-- Using presets -->
<NuxtImg
  src="https://cdn.shopwell.store/media/path/to/image.jpg"
  preset="productCard"
  :width="400"
  alt="Product"
  loading="lazy"
/>

<!-- Custom modifiers -->
<NuxtImg
  src="https://cdn.shopwell.store/media/path/to/image.jpg"
  :width="800"
  :height="600"
  format="webp"
  :quality="85"
  fit="cover"
  alt="Custom image"
/>

<!-- Using with dynamic Shopwell media URLs -->
<NuxtImg
  :src="product.cover.media.url"
  preset="productDetail"
  :width="800"
  :alt="getTranslatedProperty(product.cover.media, 'alt')"
/>
```

The media `alt` text is a translatable field, so read it through `getTranslatedProperty` rather than
`media.alt` — the latter always holds the system language value, no matter which language the current
request asks for. The helper is not auto-imported, so add it to the component's script block:

```ts
import { getTranslatedProperty } from "@shopwell/helpers";
```

### Supported Modifiers

Shopwell supports the following URL parameters for image transformation:

| Modifier  | Description            | Example                      | Support                    |
| --------- | ---------------------- | ---------------------------- | -------------------------- |
| `width`   | Image width in pixels  | `400`                        | ✅ Always supported        |
| `height`  | Image height in pixels | `600`                        | ✅ Always supported        |
| `quality` | Image quality (0-100)  | `85`                         | ⚠️ Cloud/Plugin required\* |
| `format`  | Output format          | `webp`, `avif`, `jpg`, `png` | ⚠️ Cloud/Plugin required\* |
| `fit`     | Resize behavior        | `cover`, `contain`, `fill`   | ⚠️ Cloud/Plugin required\* |

\*Advanced transformations (quality, format, fit) are available in:

- **Shopwell Cloud (SaaS)**: Built-in support via managed infrastructure. For a complete list of supported image transformation parameters, see [Fastly Image Optimizer Query Parameters](https://www.fastly.com/documentation/reference/io/#query-parameters).
- **Self-hosted instances**: Require thumbnail processor plugins like [FroshPlatformThumbnailProcessor](https://github.com/FriendsOfShopwell/FroshPlatformThumbnailProcessor) or third-party CDN integration

### How It Works

This layer includes a custom Shopwell provider for Nuxt Image that maps modifiers to Shopwell's query parameters:

- `width` modifier → `?width=400`
- `height` modifier → `?height=300`
- `quality` modifier → `?quality=85`
- `format` modifier → `?format=webp`
- `fit` modifier → `?fit=cover`

When you use `<NuxtImg>`, the custom provider automatically converts your component props into the correct URL format for Shopwell. The images are then processed on-the-fly by Shopwell Cloud (SaaS) infrastructure or your configured thumbnail processor.

#### 🔍 Understanding Image Processing in Shopwell

**Built-in Thumbnail Generation:**
Shopwell has native thumbnail generation (using GD2 or ImageMagick) that creates predefined sizes (400x400, 800x800, 1920x1920) during image upload. These thumbnails are generated once and stored on your server.

**Dynamic On-the-Fly Transformations:**
For dynamic image transformations via query parameters (like `?width=800&format=webp`), you need **remote thumbnail generation** configured:

- **Shopwell Cloud (SaaS)**: ✅ Fully supported out-of-the-box via Fastly CDN - all query parameters work automatically
- **Self-hosted**: ⚠️ Requires additional setup:
  - Install a plugin like [FroshPlatformThumbnailProcessor](https://github.com/FriendsOfShopwell/FroshPlatformThumbnailProcessor) for on-the-fly processing, OR
  - Configure external middleware (Thumbor, Sharp, imgproxy) via [remote thumbnail generation](https://developer.shopwell.cn/docs/guides/plugins/plugins/content/media/remote-thumbnail-generation.html)

**Without remote thumbnail generation configured**, query parameters will be ignored and only the predefined static thumbnails will be served.

> **💡 Recommendation**: If you're self-hosting Shopwell and want to use dynamic image transformations with Nuxt Image modifiers, install the FroshPlatformThumbnailProcessor plugin first to enable on-the-fly processing.

### Customizing Configuration

You can extend or override the default settings in your project's `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ["@shopwell/cms-base-layer"],

  image: {
    // Change default quality
    quality: 85,

    // Add/change formats
    formats: ["avif", "webp", "jpg"],

    // Override or add presets
    presets: {
      // Override existing preset
      productCard: {
        modifiers: {
          format: "avif",
          quality: 80,
          fit: "cover",
        },
      },
      // Add custom preset
      categoryBanner: {
        modifiers: {
          format: "webp",
          quality: 90,
          width: 1200,
          height: 400,
          fit: "cover",
        },
      },
    },
  },
});
```

## 🖼️ Image Placeholder

This layer provides a `useImagePlaceholder` composable that generates an SVG placeholder for images during loading. The placeholder features a centered icon with a subtle background.

### Customizing Placeholder Color

You can customize the placeholder color globally in your project's `app.config.ts`:

```ts
export default defineAppConfig({
  imagePlaceholder: {
    color: "#your-color-here", // Default: #543B95
  },
});
```

Or use a custom color for specific instances:

```vue
<script setup>
const customPlaceholder = useImagePlaceholder("#FF0000");
</script>

<template>
  <NuxtImg :placeholder="customPlaceholder" src="..." />
</template>
```

## 🖼️ Background Image Optimization

CMS sections and blocks can have background images set via the Shopwell admin. This layer automatically optimizes those background image URLs by appending `format` and `quality` query parameters — bringing the same optimization applied to `<NuxtImg>` components to CSS background images.

Both `CmsPage` (for section backgrounds) and `CmsGenericBlock` (for block backgrounds) read the configuration from `app.config.ts` and pass it to the `getBackgroundImageUrl` helper from `@shopwell/helpers`.

### Configuration

Default values are set in `app.config.ts` and can be overridden in your project:

```ts
export default defineAppConfig({
  backgroundImage: {
    format: "webp", // Default: "webp" — output format ("webp" | "avif" | "jpg" | "png")
    quality: 90, // Default: 90 — image quality (0-100)
  },
});
```

Setting `format` or `quality` to `undefined` (or omitting the key) will skip that parameter in the generated URL.

### How It Works

When a CMS section or block has a `backgroundMedia` set, the components call `getBackgroundImageUrl()` which:

1. Extracts the raw image URL from the CSS `url()` value
2. Appends `width` or `height` based on the image's original dimensions (capped at 1920px)
3. Adds `fit=crop,smart` for intelligent cropping
4. Appends `format` and `quality` from `app.config.ts` if provided

**Example generated URL:**

```
url("https://cdn.shopwell.store/.../image.jpg?width=1000&fit=crop,smart&format=webp&quality=85")
```

> **Note:** Like other dynamic image transformations, background image optimization requires remote thumbnail generation support. See the [Image Optimization](#%EF%B8%8F-image-optimization) section above for Shopwell Cloud vs. self-hosted requirements.

## LCP Image Preload

This layer includes a `useLcpImagePreload` composable that preloads the first image found in CMS page content when enabled via `lcpImagePreload: true` in your `app.config.ts` (disabled by default). This targets the [Largest Contentful Paint (LCP)](https://web.dev/lcp/) element, which is often a hero background image or the first visible image element.

### How it works

The composable scans CMS sections in document order, checking:

1. Section background images (`section.backgroundMedia`)
2. Block background images (`block.backgroundMedia`)
3. Image element media (`slot.data.media`)

The first image found is injected as a `<link rel="preload" as="image" fetchpriority="high">` in the `<head>` during SSR. This allows the browser to start fetching the LCP image immediately, before parsing CSS or executing JavaScript. The `fetchpriority="high"` attribute ensures the preload is prioritized — this is especially useful for background images which don't natively support `fetchpriority`.

### Usage

The composable is already called in `CmsPage.vue`. If you override `CmsPage`, you can use it in your custom component. It is auto-imported once your app extends this layer, so it needs no import statement:

```vue
<script setup>
const props = defineProps<{ content: Schemas["CmsPage"] }>();

useLcpImagePreload(props.content?.sections || []);
</script>
```

The preload URL includes the optimized `format` and `quality` parameters from `app.config.ts` for both background images and element images.

## Responsive CMS Images

Images are optimized to prevent the browser from downloading images larger than their displayed dimensions — a common Lighthouse performance issue.

### Product Card Images (`SwProductCardImage`)

The `productCard` preset only defines URL modifiers (format/quality/fit). `width`/`height` and `loading` stay on the component: in `@nuxt/image` 2.1.0 a preset carries `width`/`height` only as `modifiers`, which shape the URL rather than the rendered attributes, and `loading` is not a preset field at all. `densities` is kept alongside them for consistency, though a preset would propagate it:

```ts
// nuxt.config.ts
productCard: {
  modifiers: { format: "webp", quality: 90, fit: "cover" },
}
```

```vue
<NuxtImg
  preset="productCard"
  :src="coverSrcPath"
  width="400"
  height="400"
  densities="1x"
  loading="lazy"
/>
```

- **Fixed `width`/`height`** (400px) — avoid hydration mismatches caused by dynamic DOM measurement
- **`densities="1x"`** — prevents duplicate retina requests
- **`loading="lazy"`** — defers off-viewport images

> **⚠️ Avoid** adding `decoding` or `sizes` props on the component — they trigger Vue hydration attribute mismatches with NuxtImg, which cause duplicate image requests.

### CMS Images (`CmsElementImage`)

CMS image elements use `useElementSize()` to measure the rendered container and pass the size to `<NuxtImg>` via `width`/`height` props:

- During SSR, no image is fetched (size is `undefined`)
- After hydration, the container is measured and a single correctly-sized image is requested
- The size is multiplied by 2 (for retina) and rounded up to the nearest 100px

### Slider Components

**Slider components** (`CmsElementProductSlider`, `CmsElementCrossSelling`) `inject` the slot count via `cms-block-slot-count` to scale their SSR breakpoints — ensuring media queries account for the container being a fraction of the viewport.

### LCP Image Preloading

**`useLcpImagePreload`** scans CMS sections for the first image and injects `<link rel="preload" as="image" fetchpriority="high">` during SSR.

## 🔄 UnoCSS Runtime

When you extend `@shopwell/unocss-design-tokens-layer`, you also get a client-side [UnoCSS runtime](https://unocss.dev/integrations/runtime) plugin that resolves utility classes dynamically at runtime using a DOM MutationObserver. This is useful when CMS content from Shopwell contains utility classes that aren't known at build time (for example inline utility classes configured in the admin panel).

The runtime is **enabled by default**. To disable it, set `unocssRuntime` to `false` in your project's `app.config.ts`:

```ts
export default defineAppConfig({
  unocssRuntime: false,
});
```

> **When to disable**: If you don't use dynamic CMS utility classes, or if you experience performance issues caused by the MutationObserver in pages with frequent DOM mutations.

## 📘 Available components

The list of available blocks and elements is [here](https://developer.shopwell.cn/frontends/packages/cms-base-layer.html#available-components).

## 🔄 Overwriting components

The procedure is:

- find a component in component's [list](https://developer.shopwell.cn/frontends/packages/cms-base-layer.html#available-components), using a [Vue devtools](https://devtools.vuejs.org/) or browsing the github [repository](https://github.com/shopwell-shop/frontends/tree/main/packages/cms-base-layer/app/components)
- take its name
- create a file with the same name and place it under a `components` directory that your `nuxt.config.ts` registers with `global: true` — CMS components are looked up with `resolveComponent`, so an override outside a global path is never found and this layer's version keeps rendering with no error. In the starter template that directory is `app/components/cms/`; because it is registered with `pathPrefix: false`, the name comes from the filename alone and subdirectory depth under it does not matter.

✅ Thanks to this, nuxt will take the component registered in your app instead of the one registered by this nuxt layer.

### App blocks (`app-renderer`)

Every block an app registers through the Meteor Admin SDK (`cms.registerCmsBlock`) reaches the Store API with the type `app-renderer`, so they all render through `CmsBlockAppRenderer`. By default it places the block's slots in the CSS grid the app declared, like the Storefront's fallback, in the order the app declared them.

To give one app block its own markup, add a global component named after the block, `CmsBlockAppRenderer` followed by the PascalCase `appBlockName` — for a block registered as `swag-two-columns`, that is `CmsBlockAppRendererSwagTwoColumns.vue`. It receives the block as its `content` prop, and every other app block keeps the fallback:

```vue
<script setup lang="ts">
import type { CmsBlockAppRenderer } from "@shopwell/composables";

const props = defineProps<{ content: CmsBlockAppRenderer }>();

const { getSlotContent } = useCmsBlock(() => props.content);

const text = computed(() => getSlotContent("text-0"));
const image = computed(() => getSlotContent("image-1"));
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <CmsGenericElement :content="text" />
    <CmsGenericElement :content="image" />
  </div>
</template>
```

The slots are named `{element}-{index}` in the order the app declared them, so look them up by name rather than by position: the Store API sorts them by name, so `image-1` comes before `text-0` and `text-10` before `text-2`. The fallback restores the declared order from the index, as the Administration preview shows it. The Storefront's fallback keeps the Store API order, so a block that mixes element types can place its slots differently there.

The lookup of these components lives in `CmsBlockAppRenderer` itself. If you override `CmsBlockAppRenderer`, for example to change the fallback markup, your override replaces that lookup too, and your `CmsBlockAppRenderer{AppBlockName}` components are no longer used unless it renders them. A component whose name does not match the `appBlockName` renders the fallback without a warning, as a misnamed override of any other CMS component does.

### Internal components

❗**Internal components are not a part of public API. Once overwritten you need to track the changes on your own.**

There is also a possibility to override the internal components, shared between public blocks and elements, the ones starting with `Sw` prefix, like [SwSlider.vue](https://github.com/shopwell-shop/frontends/blob/main/packages/cms-base-layer/app/components/SwSlider.vue) or [SwProductCard.vue](https://github.com/shopwell-shop/frontends/blob/main/packages/cms-base-layer/app/components/SwProductCard.vue).

An example: some components use `SwSharedPrice.vue` to show prices with corresponding currency for products in many places like product card, product details page and so on. In order to change the way how the price is displayed consistently - create a one component with a name `SwSharedPrice.vue` and that's it. The new component will be used everywhere where is "imported" (autoimported actually).

### ⚠️ `<RouterLink/>` components used

Some components use `RouterLink` component internally, available in [Vue Router](https://github.com/vuejs/router).
In order to parse CMS components correctly and avoid missing component warning, it's **highly recommended** to have **Vue Router installed** or **Nuxt router enabled** in your application.

## TypeScript support

All components are fully typed with TypeScript.

No additional packages needed to be installed.

## Links

- [📘 Documentation](https://developer.shopwell.cn/frontends)

- [👥 Community](https://discord.com/channels/1308047705309708348/1405501315160739951) (`#composable-frontend`)

<!-- AUTO GENERATED CHANGELOG -->

## Changelog

Full changelog for stable version is available [here](https://github.com/shopwell-shop/frontends/blob/main/packages/cms-base-layer/CHANGELOG.md)

### Latest changes: 5.0.1

### Patch Changes

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`499bd67`](https://github.com/shopwell-shop/frontends/commit/499bd67d8de3c2ee79fc057d9beeb6a7c21a1287) Thanks [@xgll7](https://github.com/xgll7)! - Give the `CmsSectionSidebar` `<aside>` an accessible name so pages with more than one complementary landmark pass the axe `landmark-unique` rule. New translation key: `layout.ariaLabels.contentSidebar` (default "Content sidebar"). Add it to your locale files.

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`de57de5`](https://github.com/shopwell-shop/frontends/commit/de57de5a1624d14521467c48429151d4c9fa736d) Thanks [@xgll7](https://github.com/xgll7)! - Point the README and JSDoc documentation links at the Frontends Recipes that replaced the redirected guides

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`7e9dbd9`](https://github.com/shopwell-shop/frontends/commit/7e9dbd9986c27d3ed1ace4c6e4c6156260f2e63d) Thanks [@xgll7](https://github.com/xgll7)! - Add `data-testid` and `data-*` state attributes to the wishlist toggle, variant options, sort dropdown, pagination and top navigation, so e2e tests no longer depend on translated text or CSS classes. Sort options are now `menuitemradio` items with `aria-checked`, so screen readers announce the active sort.

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`c7cee4b`](https://github.com/shopwell-shop/frontends/commit/c7cee4b58ef0d108c0189334e1a509b529ccdc7b) Thanks [@xgll7](https://github.com/xgll7)! - Support Nuxt 4.6. `@shopwell/nuxt-module` and `@shopwell/cms-base-layer` now depend on `@nuxt/kit` 4.6.1, and the Nuxt plugin types `ssrContext.event` from `NuxtSSRContext`, so it type-checks on both Nuxt 4.5 and 4.6. The Nuxt templates require Node `^22.22.3 || ^24.15.0 || >=26.0.0`, the range Nuxt 4.6 supports. `@shopwell/unocss-design-tokens-layer` no longer re-exports its generated `.nuxt/imports` from `index.d.ts`, which pulled server routes into the shared type context of apps extending the layer.

- [#11](https://github.com/shopwell-shop/frontends/pull/11) [`48cdb45`](https://github.com/shopwell-shop/frontends/commit/48cdb451b378fcea1230f5cbc1cf3f9551009582) Thanks [@xgll7](https://github.com/xgll7)! - Add `data-testid` attributes to the reviews section header (`product-reviews-tab`) and the review success message (`review-success-message`) in `CmsElementProductDescriptionReviews`.
- Updated dependencies [[`de57de5`](https://github.com/shopwell-shop/frontends/commit/de57de5a1624d14521467c48429151d4c9fa736d), [`9a48fa4`](https://github.com/shopwell-shop/frontends/commit/9a48fa4b4686da5d3269557963911bbedc189c42)]:
  - @shopwell/composables@2.1.0
  - @shopwell/helpers@1.9.0
