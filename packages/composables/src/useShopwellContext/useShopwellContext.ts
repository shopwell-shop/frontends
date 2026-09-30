import { inject } from "vue";

import type { ApiClient } from "#shopwell";

import ContextError from "../helpers/ContextError";

export type ShopwellContext = {
  devStorefrontUrl: string | null;
  /**
   * Shopwell API client
   */
  apiClient: ApiClient;
  /**
   * Browser locale, working in SSR
   * If not provided, it will be "en-US"
   */
  browserLocale: string;
  /**
   * When `true`, composables read data through the cacheable GET variants of
   * the Store API (criteria compressed into the `_criteria` query param)
   * instead of POST, so the responses can be cached by HTTP infrastructure
   * (CDN, reverse proxy, browser). Requires a backend that supports the GET
   * read routes.
   *
   * @default false
   */
  cacheableReads: boolean;
};

/**
 * @public
 * @category Context & Language
 */
export function useShopwellContext(): ShopwellContext {
  const shopwellContext = inject<ShopwellContext | null>("shopwell", null);

  const apiClient = inject<ApiClient>("apiClient");

  if (!shopwellContext || !apiClient) {
    console.error("[Error][Shopwell] API Client is not provided.");
    throw new ContextError("Shopwell or apiClient");
  }

  return {
    apiClient,
    devStorefrontUrl: shopwellContext.devStorefrontUrl,
    browserLocale: shopwellContext.browserLocale || "en-US",
    cacheableReads: shopwellContext.cacheableReads ?? false,
  };
}
