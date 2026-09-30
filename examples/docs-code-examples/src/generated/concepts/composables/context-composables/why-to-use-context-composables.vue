<!-- Product.vue -->
<script setup lang="ts">
import type { Schemas } from "#shopwell";

const product = searchProduct();

function searchProduct(): Schemas["Product"] {
  return {} as Schemas["Product"];
}
</script>
<template>
  <div>
    <ProductConfigurator :product="product" />
  </div>
</template>
