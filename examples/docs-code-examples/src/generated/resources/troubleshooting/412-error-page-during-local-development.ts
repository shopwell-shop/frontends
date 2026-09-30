import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  shopwell: {
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW", // access token for corresponding sales channel
    endpoint: "https://demo-frontends.shopwell.store/store-api/", // endpoint where store-api is available
    devStorefrontUrl: "https://demo-frontends.shopwell.store", // see section below
  },
});
