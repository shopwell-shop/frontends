import type { ApiClientRuntimeConfig, ShopwellNuxtOptions } from "../src";

declare module "nuxt/schema" {
  interface NuxtConfig {
    shopwell?: ShopwellNuxtOptions;
  }
  interface NuxtOptions {
    shopwell?: ShopwellNuxtOptions;
  }
  interface ApiClientConfig extends ApiClientRuntimeConfig {}

  interface RuntimeConfig {
    shopwell: ShopwellNuxtOptions;
    apiClientConfig?: ApiClientConfig;
    public: PublicRuntimeConfig;
  }
  interface PublicRuntimeConfig {
    shopwell: ShopwellNuxtOptions;
    apiClientConfig?: ApiClientConfig;
  }
}
