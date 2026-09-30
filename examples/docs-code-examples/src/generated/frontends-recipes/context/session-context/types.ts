import type { Schemas, operations } from "#shopwell";

type SessionContext = operations["readContext get /context"]["response"];
type UpdateContextBody = operations["updateContext patch /context"]["body"];
type SalesChannelContext = Schemas["SalesChannelContext"];
type Currency = Schemas["Currency"];
type CustomerAddress = Schemas["CustomerAddress"];
