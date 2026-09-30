import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  extends: [
    "@shopwell/composables/nuxt-layer",
    "@shopwell/cms-base-layer",
    "@shopwell/unocss-design-tokens-layer",
  ],
});
