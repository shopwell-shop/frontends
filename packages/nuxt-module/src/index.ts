import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { addCustomTab } from "@nuxt/devtools-kit";
/**
 * @module @shopwell/nuxt3
 */
import {
  addPlugin,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
  useLogger,
} from "@nuxt/kit";
import { defu } from "defu";

import { isConfigDeprecated } from "./utils";
const MODULE_ID = "@shopwell/nuxt3";

export default defineNuxtModule<ShopwellNuxtOptions>({
  meta: {
    name: MODULE_ID,
    configKey: "shopwell",
  },
  async setup(options: ShopwellNuxtOptions, nuxt) {
    const logger = useLogger(MODULE_ID);
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.shopwell = defu(
      nuxt.options.runtimeConfig.shopwell || {},
      options || {},
    );
    nuxt.options.runtimeConfig.public.shopwell = defu(
      nuxt.options.runtimeConfig.public.shopwell || {},
      options || {},
    );
    const resolvedPublicShopwellConfig = nuxt.options.runtimeConfig.public
      .shopwell as ShopwellNuxtOptions;
    const resolvedPrivateShopwellConfig = nuxt.options.runtimeConfig
      .shopwell as ShopwellNuxtOptions;

    if (
      isConfigDeprecated(resolvedPublicShopwellConfig) ||
      isConfigDeprecated(resolvedPrivateShopwellConfig)
    ) {
      logger.warn(
        "You are using deprecated configuration (shopwellEndpoint or shopwellAccessToken). 'shopwell' prefix is not needed anymore. Please update your _nuxt.config.ts_ ",
      );
    }
    if (
      resolvedPublicShopwellConfig?.apiClientConfig?.timeout !== undefined ||
      resolvedPrivateShopwellConfig?.apiClientConfig?.timeout !== undefined
    ) {
      logger.warn(
        "shopwell.apiClientConfig is deprecated and will be removed in the next major. Move timeout to runtimeConfig.apiClientConfig or runtimeConfig.public.apiClientConfig.",
      );
    }
    const envPublicEndpoint =
      process.env.NUXT_PUBLIC_SHOPWELL_ENDPOINT ||
      process.env.NUXT_PUBLIC_SHOPWELL_SHOPWELL_ENDPOINT;
    const envPrivateEndpoint =
      process.env.NUXT_SHOPWELL_ENDPOINT ||
      process.env.NUXT_SHOPWELL_SHOPWELL_ENDPOINT;

    const csrEndpoint =
      envPublicEndpoint ||
      resolvedPublicShopwellConfig?.endpoint ||
      resolvedPublicShopwellConfig?.shopwellEndpoint;

    const ssrEndpoint =
      envPrivateEndpoint ||
      resolvedPrivateShopwellConfig?.endpoint ||
      resolvedPrivateShopwellConfig?.shopwellEndpoint ||
      csrEndpoint;

    if (ssrEndpoint) {
      nuxt.options.runtimeConfig.shopwell = defu(
        nuxt.options.runtimeConfig.shopwell || {},
        {
          endpoint: ssrEndpoint,
        },
      );
    }

    if (ssrEndpoint) {
      logger.info(`You are using SSR Shopwell API endpoint: ${ssrEndpoint}`);
    }
    logger.info(`CSR Shopwell API endpoint: ${csrEndpoint}`);
    addPlugin({
      src: resolver.resolve("../plugin.ts"),
    });

    const projectShopwellTypes = resolve(nuxt.options.rootDir, "shopwell.d.ts");
    // Register `#shopwell` in every type-check context, not just the app one.
    const shopwellTypeContexts = {
      nuxt: true,
      nitro: true,
      node: true,
      shared: true,
    };
    if (existsSync(projectShopwellTypes)) {
      // Reference the project's file in place so its relative imports keep resolving.
      const referencePath = projectShopwellTypes.replace(/\\/g, "/");
      addTypeTemplate(
        {
          filename: "shopwell.d.ts",
          getContents: () => `/// <reference path="${referencePath}" />\n`,
        },
        shopwellTypeContexts,
      );
    } else {
      addTypeTemplate(
        {
          filename: "shopwell.d.ts",
          src: resolver.resolve("../shopwell.d.ts"),
        },
        shopwellTypeContexts,
      );
    }

    addCustomTab({
      name: "shopwell-frontends",
      title: "Shopwell Frontends",
      icon: "fa6-brands:shopwell",
      view: {
        type: "iframe",
        src: "https://developer.shopwell.com/frontends/",
      },
    });

    addCustomTab({
      name: "shopwell-cms",
      title: "CMS Elements",
      icon: "carbon:assembly-cluster",
      view: {
        type: "iframe",
        src: "https://developer.shopwell.com/frontends/guides/cms/",
      },
    });
  },
});

// Shared with plugin.ts, which templates compile without the nuxt/schema augmentation.
export type ApiClientRuntimeConfig = {
  headers?: Record<string, string>;
  /** Milliseconds to wait for response headers. A numeric string is coerced. */
  timeout?: number | string;
};

export type ShopwellNuxtOptions = {
  /**
   * Endpoint for your shopwell backend.
   *
   * Default demo store: "https://demo-frontends.swstage.store/"
   */
  endpoint?: string;
  shopwellEndpoint?: string;
  accessToken?: string;
  shopwellAccessToken?: string;
  devStorefrontUrl?: string;
  /**
   * Read last. Positive milliseconds, or a numeric string.
   *
   * @deprecated Use `runtimeConfig.apiClientConfig` or
   * `runtimeConfig.public.apiClientConfig`. Removed in the next major.
   */
  apiClientConfig?: {
    timeout?: number | string;
  };
  /**
   * Use user context in SSR mode. Warning: with wrong edge caching it can cause serving another user's data.
   * Use when edge caching is configured properly.
   *
   * @default false
   */
  useUserContextInSSR?: boolean;
  /**
   * Read anonymous Store API data through cacheable GET routes instead of POST.
   * Criteria is compressed into the `_criteria` query param, which lets CDNs /
   * reverse proxies / the browser cache the responses.
   *
   * Requires a Shopwell backend that supports the GET read routes and the
   * `_criteria` query param. Leave disabled unless your caching layer is set up.
   *
   * @default false
   */
  cacheableReads?: boolean;
};
