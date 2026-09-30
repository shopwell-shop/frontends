import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  extends: [
    "@shopwell/composables/nuxt-layer",
    "@shopwell/cms-base-layer",
    "@shopwell/unocss-design-tokens-layer",
  ],
  modules: ["@shopwell/nuxt-module", "@unocss/nuxt"],
  css: ["@unocss/reset/tailwind-compat.css"],
  unocss: {
    nuxtLayers: true,
  },
});
