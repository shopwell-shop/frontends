<!-- ProductPrice.vue -->
<script setup lang="ts">
import { getFormattedPrice } from "@shopwell/helpers";

import type { Schemas } from "#shopwell";

type Product = Schemas["Product"];

const props = defineProps<{
  product: Product;
}>();
</script>
<template>
  <div>
    {{ getFormattedPrice(product.calculatedPrice.unitPrice, "$") }}
  </div>
</template>
