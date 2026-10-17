---
"@shopwell/helpers": minor
"@shopwell/composables": minor
---

Support SEO URLs of headless (API type) sales channels. Since shopwell-shop/shopwell#17991 headless sales channels persist their SEO URLs against the `store-api.*` route family (`store-api.product.detail`, `store-api.category.detail`, `store-api.landing-page.detail`). `useNavigationSearch().resolvePath()` now maps those route names to their `frontend.*` equivalents, so page resolution works unchanged on a headless sales channel. The new `getFrontendRouteName` helper in `@shopwell/helpers` exposes the same mapping for custom resolvers.
