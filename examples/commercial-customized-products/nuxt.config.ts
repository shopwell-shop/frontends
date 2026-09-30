// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer"],

  shopwell: {
    endpoint: "http://localhost:8000/store-api/",
    accessToken: "SWSCZJLOU1JXSWX2A3RSR3EWYG",
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

  compatibilityDate: "2024-09-27",
});
