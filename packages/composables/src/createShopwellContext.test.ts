import { describe, expect, it } from "vitest";
import { createApp } from "vue";

import { createShopwellContext } from "./createShopwellContext";

describe("createShopwellContext", () => {
  it("should create a Shopwell context with default options", () => {
    const app = createApp({});
    const context = createShopwellContext(app, {});
    context.install(app);
    expect(context).toBeDefined();
    expect(context.ssrWithoutUserContext).toBe(false);
  });

  it("should create a Shopwell context with custom options", () => {
    const app = createApp({});
    const options = {
      devStorefrontUrl: "https://devstorefront.com",
      enableDevtools: true,
      ssrWithoutUserContext: true,
    };
    const context = createShopwellContext(app, options);

    expect(context).toBeDefined();
    expect(context.ssrWithoutUserContext).toBe(true);
  });
});
