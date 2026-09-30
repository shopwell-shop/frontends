// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer"],
  shopwell: {
    endpoint: "https://demo-frontends.shopwell.store/store-api/",
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  },
  modules: ["@shopwell/nuxt-module"],
  /**
   * Commented because of the StackBlitz error
   * Issue: https://github.com/shopwell-shop/frontends/issues/88
   */
  typescript: {
    // typeCheck: true,
    strict: true,
  },
  telemetry: false,
  app: {
    head: {
      script: [{ src: "https://cdn.tailwindcss.com" }],
    },
  },
});
