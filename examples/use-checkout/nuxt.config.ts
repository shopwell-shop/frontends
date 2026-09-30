// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer"],
  modules: ["@shopwell/nuxt-module", "@unocss/nuxt"],
  shopwell: {
    endpoint: "https://demo-frontends.shopwell.store/store-api/",
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  },
  css: [
    "@unocss/reset/tailwind-compat.css", // needed to reset styles see https://unocss.dev/guide/style-reset (@unocss/reset)
  ],
  devtools: { enabled: true },
});
