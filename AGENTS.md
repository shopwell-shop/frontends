# Shopwell Frontends fork guardrails

This is the Shopwell-derived frontends monorepo. Product code, documentation,
tests, manifests, paths, and metadata must not contain the upstream brand. The
only legal-text exception is the verbatim upstream license in `NOTICE`.
Project-owned manifests use Apache License 2.0.

Before publishing or reporting a successful sync, run from `/Users/goxs/Workspaces/shopwell/sync-upstream`:

```bash
./bin/syncctl audit-license frontends
./bin/syncctl audit-upstream-dependencies frontends
```

Published split packages must use normal npm registry versions. Do not use Git
URLs, branches, commits, local paths, or workspace dependencies for consumers.
