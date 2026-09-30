// nuxt.config.ts
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  extends: ["@shopwell/composables/nuxt-layer"],
  modules: ["@shopwell/nuxt-module", "@nuxtjs/sanity"],
  shopwell: {
    endpoint: "https://demo-frontends.shopwell.store/store-api/",
    accessToken: "<your-sales-channel-access-token>",
  },
  sanity: {
    projectId: "<your-project-id>",
    dataset: "production",
    apiVersion: "2026-05-15",
    useCdn: true, // public, cacheable reads
  },
});
