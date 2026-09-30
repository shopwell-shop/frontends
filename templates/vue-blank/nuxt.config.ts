// https://v3.nuxtjs.org/api/configuration/nuxt.config
const isStackBlitz = process.env.SHOPWELL_STACKBLITZ === "true";

export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer", "@shopwell/cms-base-layer"],
  ...(isStackBlitz ? { devtools: { enabled: false } } : {}),
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
});
