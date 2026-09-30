import {
  getCategoryFilterAggregations,
  getCategoryFilterPostFilter,
} from "@shopwell/helpers";

const { search } = useListing({ listingType: "productSearchListing" });
const selectedCategoryId = "category-id";

search({
  search: "running",
  aggregations: getCategoryFilterAggregations(),
  "post-filter": [getCategoryFilterPostFilter([selectedCategoryId])],
});
