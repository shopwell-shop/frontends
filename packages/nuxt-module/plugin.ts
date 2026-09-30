import { createAPIClient } from "@shopwell/api-client";
import { isMaintenanceMode } from "@shopwell/helpers";
import type {
  ApiClientRuntimeConfig,
  ShopwellNuxtOptions,
} from "@shopwell/nuxt-module";
import { getCookie } from "h3";
import type { H3Event } from "h3";
import Cookies from "js-cookie";
import { ref } from "vue";

import type { Plugin } from "#app";
import {
  createShopwellContext,
  defineNuxtPlugin,
  showError,
  useRequestHeaders,
  useRuntimeConfig,
  useState,
} from "#imports";
import type { ApiClient } from "#shopwell";

type ShopwellPluginInjections = {
  shopwellApiClient: ApiClient;
};

type ShopwellPluginNuxtApp = {
  ssrContext?: {
    event: H3Event;
  };
  vueApp: {
    provide: (name: string, value: unknown) => void;
  };
};

type ApiError = {
  code?: string;
};

function isApiError(error: unknown): error is ApiError {
  if (!error || typeof error !== "object") {
    return false;
  }

  const { code } = error as { code?: unknown };

  return code === undefined || typeof code === "string";
}

function getApiErrors(data: unknown): ApiError[] {
  if (!data || typeof data !== "object" || !("errors" in data)) {
    return [];
  }

  const { errors } = data as { errors?: unknown };

  return Array.isArray(errors) ? errors.filter(isApiError) : [];
}

const warnedTimeouts = new Set<string>();

function toTimeout(value: unknown, source: string): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const timeout = typeof value === "string" ? Number(value) : value;

  if (typeof timeout === "number" && Number.isFinite(timeout) && timeout > 0) {
    return timeout;
  }

  const message = `[shopwell] Ignoring ${source}.timeout: expected a positive number of milliseconds, got ${
    typeof value === "number" ? String(value) : JSON.stringify(value)
  }.`;

  if (!warnedTimeouts.has(message)) {
    warnedTimeouts.add(message);
    console.warn(message);
  }

  return undefined;
}

function setupShopwellPlugin(NuxtApp: ShopwellPluginNuxtApp): {
  provide: ShopwellPluginInjections;
} {
  const runtimeConfig = useRuntimeConfig();

  const shopwellRuntimeConfigPublic = runtimeConfig.public
    .shopwell as ShopwellNuxtOptions;
  const shopwellRuntimeConfig = import.meta.server
    ? (runtimeConfig.shopwell as ShopwellNuxtOptions)
    : undefined;

  const shopwellEndpointCSR =
    shopwellRuntimeConfigPublic?.endpoint ??
    shopwellRuntimeConfigPublic?.shopwellEndpoint;

  const shopwellEndpointSSR =
    (NuxtApp.ssrContext &&
      (shopwellRuntimeConfig?.endpoint ??
        shopwellRuntimeConfig?.shopwellEndpoint)) ||
    shopwellEndpointCSR;

  const shopwellEndpoint = import.meta.server
    ? shopwellEndpointSSR
    : shopwellEndpointCSR;

  const shopwellAccessToken =
    shopwellRuntimeConfigPublic?.accessToken ??
    shopwellRuntimeConfigPublic?.shopwellAccessToken;

  if (!shopwellEndpoint || !shopwellAccessToken) {
    throw new Error(
      "Make sure that endpoint and accessToken are settled in the configuration",
    );
  }

  const shouldUseSessionContextInServerRender =
    !NuxtApp.ssrContext ||
    !!shopwellRuntimeConfigPublic?.useUserContextInSSR ||
    !!shopwellRuntimeConfig?.useUserContextInSSR;

  const contextTokenFromCookie = NuxtApp.ssrContext
    ? getCookie(NuxtApp.ssrContext.event, "sw-context-token")
    : Cookies.get("sw-context-token");

  const privateApiClientConfig = import.meta.server
    ? (runtimeConfig.apiClientConfig as ApiClientRuntimeConfig | undefined)
    : undefined;
  const publicApiClientConfig = runtimeConfig.public?.apiClientConfig as
    | ApiClientRuntimeConfig
    | undefined;

  // Both deprecated tiers report as shopwell.apiClientConfig, the name nuxt.config uses.
  const timeout =
    toTimeout(
      privateApiClientConfig?.timeout,
      "runtimeConfig.apiClientConfig",
    ) ??
    toTimeout(
      publicApiClientConfig?.timeout,
      "runtimeConfig.public.apiClientConfig",
    ) ??
    toTimeout(
      shopwellRuntimeConfig?.apiClientConfig?.timeout,
      "shopwell.apiClientConfig",
    ) ??
    toTimeout(
      shopwellRuntimeConfigPublic?.apiClientConfig?.timeout,
      "shopwell.apiClientConfig",
    );

  const apiClient = createAPIClient({
    baseURL: shopwellEndpoint,
    accessToken: shopwellAccessToken,
    contextToken: shouldUseSessionContextInServerRender
      ? contextTokenFromCookie
      : "",
    defaultHeaders:
      (NuxtApp.ssrContext && privateApiClientConfig?.headers) ||
      publicApiClientConfig?.headers,
    ...(timeout === undefined ? {} : { fetchOptions: { timeout } }),
  });

  apiClient.hook("onContextChanged", (newContextToken) => {
    Cookies.set("sw-context-token", newContextToken, {
      expires: 365, // days
      path: "/",
      sameSite: "lax",
      secure: shopwellEndpoint.startsWith("https://"),
    });
  });

  apiClient.hook("onResponseError", (response) => {
    const error = isMaintenanceMode(getApiErrors(response._data));
    if (error) {
      throw showError({
        statusCode: 503,
        statusMessage: "MAINTENANCE_MODE",
      });
    }
  });

  // Get browser locale in CSR and SSR
  let browserLocale = "en-US";
  if (import.meta.client) {
    browserLocale = navigator.language;
  } else {
    browserLocale =
      useRequestHeaders()["accept-language"]?.split(",")[0]?.split(";")[0] ??
      "en-US";
  }

  NuxtApp.vueApp.provide("apiClient", apiClient);
  // Shopwell context
  // TODO fix type App<Element>
  // TODO: Improve this typing.
  const shopwellContext = createShopwellContext(NuxtApp.vueApp as any, {
    enableDevtools: true,
    devStorefrontUrl: shopwellRuntimeConfigPublic?.devStorefrontUrl || null,
    browserLocale,
    cacheableReads: shopwellRuntimeConfigPublic?.cacheableReads ?? false,
  });
  NuxtApp.vueApp.provide("shopwell", shopwellContext);

  // Session Context
  const sessionContextData = ref();
  NuxtApp.vueApp.provide("swSessionContext", sessionContextData);
  // in case someone tries to use it in nuxt specific code like middleware
  useState("swSessionContext", () => sessionContextData);

  return {
    provide: {
      shopwellApiClient: apiClient as ApiClient,
    },
  };
}

const shopwellPlugin: Plugin<ShopwellPluginInjections> =
  defineNuxtPlugin<ShopwellPluginInjections>(setupShopwellPlugin);

export default shopwellPlugin;
