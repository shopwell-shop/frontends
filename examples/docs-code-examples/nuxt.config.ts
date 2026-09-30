export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer", "@shopwell/cms-base-layer"],
  compatibilityDate: "2024-11-01",
  modules: ["@shopwell/nuxt-module", "@unocss/nuxt"],
  shopwell: {
    endpoint: "https://demo-frontends.shopwell.store/store-api/",
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  },
  experimental: { appManifest: false },
  telemetry: false,
});
