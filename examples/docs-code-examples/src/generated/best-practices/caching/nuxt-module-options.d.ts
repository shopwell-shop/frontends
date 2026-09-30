import type { NuxtModule } from "@nuxt/schema";

type ShopwellModuleOptions =
  typeof import("@shopwell/nuxt-module").default extends NuxtModule<
    infer Options,
    unknown,
    boolean
  >
    ? Partial<Options> | false
    : Record<string, any> | false;

declare module "@nuxt/schema" {
  interface NuxtConfig {
    shopwell?: ShopwellModuleOptions;
  }
}

declare module "nuxt/schema" {
  interface NuxtConfig {
    shopwell?: ShopwellModuleOptions;
  }
}
