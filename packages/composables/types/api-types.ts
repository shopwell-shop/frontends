import type { createAPIClient } from "@shopwell/api-client";
import type {
  components as defaultComponents,
  operations as defaultOperations,
} from "@shopwell/api-client/store-api-types";

export type operations = defaultOperations;

export type Schemas = defaultComponents["schemas"];

export type ApiClient = ReturnType<typeof createAPIClient<operations>>;
