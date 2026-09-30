# shopwell/frontends - api-gen

Welcome to `@shopwell/api-gen` CLI.
Generate TypeScript schemas from Shopwell OpenAPI specification.

After generating schemas, you can use them in fully typed [API Client](https://www.npmjs.com/package/@shopwell/api-client).

## Usage

<!-- automd:pm-install name="@shopwell/api-gen" dev -->

```sh
# ✨ Auto-detect
npx nypm install -D @shopwell/api-gen

# npm
npm install -D @shopwell/api-gen

# yarn
yarn add -D @shopwell/api-gen

# pnpm
pnpm add -D @shopwell/api-gen

# bun
bun install -D @shopwell/api-gen

# deno
deno install --dev npm:@shopwell/api-gen
```

<!-- /automd -->

## Features

Generator will create a new directory `api-types` with TypeScript schemas inside. Depending on the `apiType` parameter it will create `storeApiTypes.d.ts` or `adminApiTypes.d.ts` file.

### Overriding

If your instance contains inacurate or outdated OpenAPI specification, you can override it by creating a new file inside `api-types` directory::

- `storeApiTypes.overrides.ts` for store API
- `adminApiTypes.overrides.ts` for admin API

Example of overrides file:

<!-- automd:file src="packages/api-gen/tests/snapshots-override/simpleOverride.example.ts" code -->

```ts [simpleOverride.example.ts]
import type { components as mainComponents } from "./storeApiTypes";

export type components = mainComponents & {
  schemas: Schemas;
};

export type Schemas = {
  CustomerAddress: {
    qwe: string;
  };
};

export type operations = {
  "myNewEndpointWithDifferentBodys post /aaaaa/bbbbb":
    | {
        contentType?: "application/json";
        accept?: "application/json";
        body: components["schemas"]["CustomerAddress"];
        response: components["schemas"]["Country"];
        responseCode: 201;
      }
    | {
        contentType: "application/xml";
        accept?: "application/json";
        body: {
          someting: boolean;
        };
        response: {
          thisIs200Response: string;
        };
        responseCode: 200;
      };
  "updateCustomerAddress patch /account/address/{addressId}": {
    contentType?: "application/json";
    accept?: "application/json";
    /**
     * We're testing overrides, assuming update address can only update the city
     */
    body: {
      city: string;
    };
    response: components["schemas"]["CustomerAddress"];
    responseCode: 200;
  };
};
```

<!-- /automd -->

> [!IMPORTANT]  
> Overriding components or operations in the TS files requires you to have a full object definitions!

Override-only projects (extra plugin endpoints, no local OpenAPI JSON) should
import components from `@shopwell/api-client/store-api-types` and merge the
overlay in `shopwell.d.ts` with `WithApiOverrides` from `@shopwell/api-client`.
That keeps StackBlitz working without committing a generated `storeApiTypes.d.ts`.
See the [api-client TypeScript overrides](https://www.npmjs.com/package/@shopwell/api-client) docs.
When you do run `generate`, it still applies the same overlay onto whatever base
schema it resolved (local JSON, or the types shipped with the api-client).

### Partial overrides

There is a possiblity to add patches (partial overrides) to the schema. Partial overrides are applied directly to the JSON schema, so the syntax needs to be correct. It can then be used by the backend CI tool to validate and apply these patches directly to the schema to fix inconsistencies.

By default CLI is fetching the patches from the api-client repository, but you can provide your own patches file by adding a path to the `api-gen.config.json` file.

### API-specific configuration (Recommended)

You can configure patches and rules separately for Store API and Admin API:

```json
{
  "$schema": "./node_modules/@shopwell/api-gen/api-gen.schema.json",
  "store-api": {
    "patches": [
      "storeApiSchema.overrides.json",
      "./api-types/myStoreApiPatches.json"
    ],
    "rules": ["COMPONENTS_API_ALIAS"]
  },
  "admin-api": {
    "patches": ["adminApiSchema.overrides.json"],
    "rules": ["COMPONENTS_API_ALIAS"]
  }
}
```

This allows you to maintain different configurations for each API type.

### Legacy configuration (Deprecated)

The root-level `patches` and `rules` properties are deprecated but still supported for backwards compatibility:

```json
{
  "$schema": "./node_modules/@shopwell/api-gen/api-gen.schema.json",
  "patches": ["storeApiTypes.overrides.json"]
}
```

> [!WARNING]
> Root-level `patches` and `rules` are deprecated. Please migrate to the API-specific configuration (`store-api` or `admin-api`).

You could also use multiple patches and add your own overrides on top:

```json
{
  "$schema": "./node_modules/@shopwell/api-gen/api-gen.schema.json",
  "store-api": {
    "patches": [
      "./node_modules/@shopwell/api-client/api-types/storeApiSchema.overrides.json",
      "./api-types/myOwnPatches.overrides.json"
    ]
  }
}
```

and then inside the `./api-types/myOwnPatches.overrides.json` file you can add your patches:

```json
{
  "components": {
    "Cart": [
      {
        "required": ["price"]
      },
      {
        "required": ["errors"]
      }
    ]
  }
}
```

you apply this as 2 independent patches, or combine it as a single patch without array:

```json
{
  "components": {
    "Cart": {
      "required": ["price", "errors"]
    }
  }
}
```

Creating multiple patches is useful when you want to apply different changes to the same object, which can also be corrected on the backend side independently. This way specific patches are becoming outdated and you get the notification that you can remove them safely.

> [!NOTE]  
> Check our current default patches to see more examples: [source](https://raw.githubusercontent.com/shopwell/frontends/main/packages/api-client/api-types/storeApiSchema.overrides.json).

## Commands

### add shortcut to your `package.json` scripts

```json
{
  "scripts": {
    "generate-types": "shopwell-api-gen generate --apiType=store"
  }
}
```

then running `pnpm generate-types` will generate types in `api-types` directory.

### `generate`

Transform OpenAPI specification from JSON file to Typescript schemas. Use `loadSchema` command first.

options:

```bash
pnpx @shopwell/api-gen generate --help

# generate schemas from store API
pnpx @shopwell/api-gen generate --apiType=store

# generate schemas from admin API
pnpx @shopwell/api-gen generate --apiType=admin
```

flags:

- `--debug` - display debug logs and additional information which can be helpful in case of issues
- `--logPatches` - display patched logs, useful when you want to fix schema in original file

### `loadSchema`

Load OpenAPI specification from Shopwell instance and save it to JSON file.

options:

```bash
pnpx @shopwell/api-gen loadSchema --help

# load schema from store API
pnpx @shopwell/api-gen loadSchema --apiType=store

# load schema from admin API
pnpx @shopwell/api-gen loadSchema --apiType=admin
```

flags:

- `--debug` - display debug logs and additional information which can be helpful in case of issues
- `--logPatches` - display patched logs, useful when you want to fix schema in original file

Remember to add `.env` file in order to authenticate with Shopwell instance.

```bash
OPENAPI_JSON_URL="https://your-shop-instance.shopwell.store"
## This one needed to fetch store API schema
OPENAPI_ACCESS_KEY="YOUR_STORE_API_ACCESS_KEY"

## Admin API authentication (choose one method):

## Option 1: Password grant (username/password)
SHOPWELL_ADMIN_USERNAME="my@username.com"
SHOPWELL_ADMIN_PASSWORD="my-password"

## Option 2: Client credentials grant (integration)
## Create an integration in Shopwell Admin > Settings > System > Integrations
# SHOPWELL_ADMIN_CLIENT_ID="your-integration-client-id"
# SHOPWELL_ADMIN_CLIENT_SECRET="your-integration-secret"
```

> [!NOTE]
> When `SHOPWELL_ADMIN_CLIENT_SECRET` is set, the client credentials grant will be used automatically. Otherwise, the password grant with username/password is used.

### `validateJson`

This command allow to validate the output JSON file of your instance. You can configure which rules should be applied, we provide you with the schema configuration file, so you can easily modify it.

options:

```bash
pnpx @shopwell/api-gen validateJson --help

# validate JSON file
pnpx @shopwell/api-gen validateJson --apiType=store
```

this searches for `api-types/storeApiSchema.json` file and validates it. Use [loadSchema](#loadSchema) command first to fetch your JSON file.

Prepare your config file named **api-gen.config.json**:

```json
{
  "$schema": "./node_modules/@shopwell/api-gen/api-gen.schema.json",
  "store-api": {
    "rules": ["COMPONENTS_API_ALIAS"],
    "patches": ["storeApiSchema.overrides.json"]
  },
  "admin-api": {
    "rules": ["COMPONENTS_API_ALIAS"],
    "patches": ["adminApiSchema.overrides.json"]
  }
}
```

> [!NOTE]
> The `rules` configuration is API-type specific. When running `validateJson --apiType=store`, only the rules defined in `store-api.rules` will be applied.

### `split` - Experimental

Split an OpenAPI schema into multiple files, organized by tags or paths. This is useful for breaking down a large schema into smaller, more manageable parts.

The main reason for this is that the complete JSON schema can be too large and complex for API clients like Postman or Insomnia to handle, sometimes
causing performance issues or import failures due to the file size or circular references. This command helps developers to extract only the parts of
the schema they need and then import it to the API client of their choice.

Example usage:

```bash
# Display all available tags
pnpx @shopwell/api-gen split <path-to-schema-file> --list tags

# Display all available paths
pnpx @shopwell/api-gen split <path-to-schema-file> --list paths

# Split schema by tags and show detailed linting errors
pnpx @shopwell/api-gen split <path-to-schema-file> --splitBy=tags --outputDir <output-directory> --verbose-linting

# Split schema by a single tag
pnpx @shopwell/api-gen split <path-to-schema-file> --splitBy=tags --outputDir <output-directory> --filterBy "media"

# Split schema by a single path
pnpx @shopwell/api-gen split <path-to-schema-file> --splitBy=paths --outputDir <output-directory> --filterBy "/api/_action/media/{mediaId}/upload"
```

### Programmatic usage

Each command can also be used programmatically within your own scripts:

#### `generate`

```ts
import { generate } from "@shopwell/api-gen";

await generate({
  cwd: process.cwd(),
  filename: "storeApiSchema.json",
  apiType: "store",
  debug: true,
  logPatches: true,
});
```

#### `loadSchema`

```ts
import { loadSchema } from "@shopwell/api-gen";

await loadSchema({
  cwd: process.cwd(),
  filename: "storeApiSchema.json",
  apiType: "store",
});
```

#### `validateJson`

```ts
import { validateJson } from "@shopwell/api-gen";

await validateJson({
  cwd: process.cwd(),
  filename: "storeApiSchema.json",
  apiType: "store",
  logPatches: true,
  debug: true,
});
```

#### `split`

```ts
import { split } from "@shopwell/api-gen";

await split({
  schemaFile: "path/to/your/schema.json",
  outputDir: "path/to/output/directory",
  splitBy: "tags", // or "paths"
  // filterBy: "TagName" // optional filter
});
```

> [!NOTE]  
> Make sure that the required environment variables are set for the node process when executing commands programmatically.

## Links

- [📘 Documentation](https://developer.shopwell.cn/frontends)

- [👥 Community Discord](https://discord.com/channels/1308047705309708348/1405501315160739951) (`#composable-frontend` channel)

<!-- AUTO GENERATED CHANGELOG -->

## Changelog

Full changelog for stable version is available [here](https://github.com/shopwell-shop/frontends/blob/main/packages/api-gen/CHANGELOG.md)

### Latest changes: 1.5.2

### Patch Changes

- Updated dependencies [[`183c183`](https://github.com/shopwell-shop/frontends/commit/183c183f905486c27fa770fd0f4cd9993e86c20e), [`458494e`](https://github.com/shopwell-shop/frontends/commit/458494e8bd2be88d4fbf161636a109c8f4efc443)]:
  - @shopwell/api-client@1.6.0
