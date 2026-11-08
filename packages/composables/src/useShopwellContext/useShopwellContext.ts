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
   * When `true`, reads may use the cacheable GET variants of the Store API.
   * `useCacheableRead().invokeRead` decides per request.
   *
   * @deprecated Do not branch on this flag. For a registered read, use
   * `useCacheableRead().invokeRead`. It also checks the session. Keep other
   * reads on POST. A branch on this flag sends GET with the context token,
   * also for a logged-in customer.
   * @default false
   */
  cacheableReads: boolean;
  /**
   * `true` when the server render runs without the visitor's session.
   *
   * @default false
   */
  ssrWithoutUserContext?: boolean;
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
    ssrWithoutUserContext: shopwellContext.ssrWithoutUserContext ?? false,
  };
}
