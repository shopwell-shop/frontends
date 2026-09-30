import { useProductSearch } from "@shopwell/composables";

import type { Schemas } from "#shopwell";

const { search } = useProductSearch();

const productResponse = await search("some-product-id", {
  /** parameters omitted */
});

// object that keeps a Product entity
const product: Schemas["Product"] = productResponse.product;
// object with variants configuration
const propertyGroups: Schemas["PropertyGroup"][] =
  productResponse.configurator ?? [];
