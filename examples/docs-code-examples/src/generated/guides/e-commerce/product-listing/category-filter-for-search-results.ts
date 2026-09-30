import { getCategoryFilterAggregations } from "@shopwell/helpers";

const { search } = useListing({ listingType: "productSearchListing" });

search({
  search: "running",
  aggregations: getCategoryFilterAggregations(),
});
