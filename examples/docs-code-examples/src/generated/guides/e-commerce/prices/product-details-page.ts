import { ref } from "vue";

import { usePrice, useProductPrice } from "#imports";
import type { Schemas } from "#shopwell";

const product = ref({} as Schemas["Product"]);
const { totalPrice, price, tierPrices, hasListPrice } =
  useProductPrice(product);
const { getFormattedPrice } = usePrice();
