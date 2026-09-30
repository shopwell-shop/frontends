import { defineNuxtConfig } from "nuxt/config";

/* ... */
export default defineNuxtConfig({
  runtimeConfig: {
    // shopwell: {
    /**
     * SSR Shopwell Endpoint
     * More here: https://developer.shopwell.com/frontends/introduction/templates/custom-vue-project.html#shopwell-endpoint-on-the-ssr-mode
     */
    //   endpoint: ""
    // },
    public: {
      shopwell: {
        endpoint: "https://your-business.shopwell.store",
        accessToken: "access-token-from-settings",
      },
    },
  },
});
