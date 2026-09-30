declare module "#shopwell" {
  import type { createAPIClient } from "@shopwell/api-client";

  // for default types
  // export type operations =
  //   import("@shopwell/api-client/store-api-types").operations;
  // or for local TypeScript overlays
  export type operations = import("@shopwell/api-client").WithApiOverrides<
    import("@shopwell/api-client/store-api-types").operations,
    import("./api-types/storeApiTypes.overrides").operations
  >;
  // or for locally generated types
  // export type operations = import("./api-types/storeApiTypes").operations;

  // for default types
  export type Schemas =
    import("@shopwell/api-client/store-api-types").components["schemas"];
  // or for locally generated types
  // export type Schemas =
  //   import("./api-types/storeApiTypes").components["schemas"];

  // we're exporting our own Api Client definition as it depends on our own instance
  export type ApiClient = ReturnType<typeof createAPIClient<operations>>;
}
