declare module "#shopwell" {
  import type { createAPIClient } from "@shopwell/api-client";

  export type operations =
    import("@shopwell/api-client/store-api-types").operations;

  export type Schemas =
    import("@shopwell/api-client/store-api-types").components["schemas"];

  export type ApiClient = ReturnType<typeof createAPIClient<operations>>;
}
