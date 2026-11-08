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

## Cacheable Store API reads

`cacheableReads` (default `false`) only decides whether a fresh default guest
session may read through the cacheable GET Store API routes. Every read goes
through `useCacheableRead().invokeRead` with its POST operation; do not branch
on `cacheableReads` and do not call a GET twin directly, because that would send
GET for every session, including ones with a cart or a customer.

Register a new GET twin in `packages/composables/src/useCacheableRead/routes.ts`;
the coverage test there classifies every POST read that has a GET twin. Run
`pnpm check:cacheable-reads` before pushing: it fails on any direct call to a
registered read or a GET twin, and the Lint CI job runs it on every PR.
