import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@shopwell/nuxt-module", "@storyblok/nuxt"],
  storyblok: {
    accessToken: "super-secret-token",
  },
});
