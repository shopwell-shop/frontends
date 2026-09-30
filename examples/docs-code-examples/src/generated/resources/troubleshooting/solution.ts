import { defineNuxtConfig } from "nuxt/config";

// nuxt.config.ts
export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer"],
  modules: ["@shopwell/nuxt-module"],
  // ... rest of your configuration
});
