import { defineNuxtConfig } from "nuxt/config";

// nuxt.config.ts
export default defineNuxtConfig({
  shopwell: {
    endpoint: "https://your-shop.shopwell.store/store-api",
    accessToken: "your-access-token",
    devStorefrontUrl: "https://your-shop.shopwell.store", // must match a Sales Channel domain
  },
});
