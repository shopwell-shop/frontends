// props.navigationId is a page id

import { useBreadcrumbs } from "#imports";
import type { Schemas } from "#shopwell";

const props = {
  breadcrumbs: [
    {
      apiAlias: "breadcrumb",
      categoryId: "example-navigation-id",
      name: "Example category",
      path: "example-category",
      translated: {
        categoryId: "example-navigation-id",
        name: "Example category",
        path: "example-category",
      },
      type: "page",
    },
  ] satisfies Schemas["Breadcrumb"][],
};

const { buildDynamicBreadcrumbs } = useBreadcrumbs();
buildDynamicBreadcrumbs(props.breadcrumbs);
