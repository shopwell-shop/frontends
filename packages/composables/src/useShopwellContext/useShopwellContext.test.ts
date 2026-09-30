import { describe, expect, it } from "vitest";

import { useShopwellContext } from "./useShopwellContext";

describe("useShopwellContext", () => {
  it("no context error", () => {
    expect(() => useShopwellContext()).toThrow();
  });
});
