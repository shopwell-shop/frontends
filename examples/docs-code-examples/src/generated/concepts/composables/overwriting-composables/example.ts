import { useAddToCart as coreUseAddToCart } from "@shopwell/composables";

// composables/useAddToCart.ts
import type { Ref } from "#imports";
import type { Schemas } from "#shopwell";

type Product = Schemas["Product"];

export function useAddToCart(product: Ref<Product | undefined>) {
  const coreFunctionality = coreUseAddToCart(product);
  return {
    ...coreFunctionality,
  };
}
