import { defineNuxtConfig } from "nuxt/config";

// nuxt.config.ts
export default defineNuxtConfig({
  shopwell: {
    endpoint: "https://your-shop.shopwell.store/store-api",
    accessToken: "your-access-token",
    // must match a domain in Sales Channel -> Domains
    devStorefrontUrl: "https://your-shop.shopwell.store",
  },
});
