// composables/useAddToCart.ts

import type { Ref } from "#imports";
import type { Schemas } from "#shopwell";

type Product = Schemas["Product"];

export function useAddToCart(product: Ref<Product | undefined>) {
  void product;
  // your own implementation
}
