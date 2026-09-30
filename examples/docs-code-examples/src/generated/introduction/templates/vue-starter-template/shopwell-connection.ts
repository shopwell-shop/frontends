import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      shopwell: {
        endpoint: "https://your-shop.shopwell.store/store-api",
        accessToken: "your-access-token",
        // Optional: Required for local development when using customer registration
        // devStorefrontUrl: "https://your-shop.shopwell.store",
      },
    },
  },
});
