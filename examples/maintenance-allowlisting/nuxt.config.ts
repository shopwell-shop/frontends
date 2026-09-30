// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@shopwell/nuxt-module", "@unocss/nuxt"],
  shopwell: {
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
    endpoint: "https://demo-frontends.shopwell.store/store-api/",
    devStorefrontUrl: "",
  },
  experimental: { appManifest: false },
});
