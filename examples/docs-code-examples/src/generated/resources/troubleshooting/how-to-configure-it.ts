// nuxt.config.ts
import { defineNuxtConfig } from "nuxt/config";

const config = {
  runtimeConfig: {
    public: {
      shopwell: {
        endpoint: "https://your-shop.shopwell.store/store-api",
        accessToken: "your-access-token",
        devStorefrontUrl: "https://your-shop.shopwell.store", // must match a domain in Sales Channel settings
      },
    },
  },
};

export default defineNuxtConfig(config);
