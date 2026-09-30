import { resolve } from "pathe";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  declaration: true,
  rollup: {
    inlineDependencies: true,
  },
  externals: [
    "axios",
    "vue",
    "scule",
    "@shopwell/api-client",
    "@shopwell/helpers",
    "@vueuse/core",
  ],
  alias: {
    "#imports": resolve("./src/index.ts"),
    "#shopwell": resolve("./types/api-types.ts"),
  },
});
