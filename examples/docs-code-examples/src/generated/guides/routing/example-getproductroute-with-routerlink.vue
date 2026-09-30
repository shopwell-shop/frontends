<script setup lang="ts">
import { getProductRoute, getTranslatedProperty } from "@shopwell/helpers";

const product = {
  id: "example-product-id",
  name: "Example product",
  translated: {
    name: "Example product",
  },
  seoUrls: [{ seoPathInfo: "example-product" }],
};
</script>

<template>
  <RouterLink :to="getProductRoute(product)">
    {{ getTranslatedProperty(product, "name") }}
  </RouterLink>
</template>
