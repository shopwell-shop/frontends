// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@shopwell/nuxt-module", "@unocss/nuxt", "nuxt-toast"],
  shopwell: {
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
    endpoint: "https://demo-frontends.shopwell.store/store-api/",
    devStorefrontUrl: "",
  },
  ssr: false,
  experimental: { appManifest: false },
});
