import type { Schemas, operations } from "#shopwell";

type CalculatedPrice = Schemas["CalculatedPrice"];
type ListPrice = Schemas["CartListPrice"];
type CartPrice = Schemas["CartPrice"];
type ReferencePrice = Schemas["CartPriceReference"];
type Currency = Schemas["Currency"];
type SessionContext = operations["readContext get /context"]["response"];
