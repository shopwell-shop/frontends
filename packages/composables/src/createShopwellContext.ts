/**
 * Currently devtools are not working in Nuxt 3
 * source: https://github.com/nuxt/framework/issues/4325
 * - we don't need them for now as we do not show any significant info for now
 */

import { effectScope, markRaw, reactive } from "vue";
import type { App, EffectScope } from "vue";
// import { registerShopwellDevtools } from "./devtools/plugin";

export function createShopwellContext(
  app: App,
  options: {
    devStorefrontUrl?: string | null;
    enableDevtools?: boolean;
    browserLocale?: string;
    /**
     * Opt in to reading data via cacheable GET Store API routes instead of
     * POST. Surfaced on the Shopwell context as `cacheableReads`.
     *
     * @default false
     */
    cacheableReads?: boolean;
  },
) {
  const scope: EffectScope = effectScope(true);
  const state = scope.run(() => {
    return reactive({
      interceptors: {},
      // sharedStore: options.initialStore || reactive({}),
      // shopwellDefaults: options.shopwellDefaults || {},
    });
  });

  const shopwellPlugin = markRaw({
    install(app: App) {
      shopwellPlugin._a = app;
      app.config.globalProperties.$shopwell = shopwellPlugin;
      app.provide("shopwell", shopwellPlugin);
    },
    _a: app,
    _e: scope,
    devStorefrontUrl: options.devStorefrontUrl,
    state,
    browserLocale: options.browserLocale || "en-US",
    cacheableReads: options.cacheableReads ?? false,
  });

  if (options?.enableDevtools && typeof window !== "undefined") {
    // registerShopwellDevtools(app, shopwellPlugin);
  }
  return shopwellPlugin;
}
