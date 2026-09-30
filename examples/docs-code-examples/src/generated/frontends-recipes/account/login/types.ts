import type { Schemas, operations } from "#shopwell";

type LoginBody = operations["loginCustomer post /account/login"]["body"];
type LoginResponse =
  operations["loginCustomer post /account/login"]["response"];
type SessionContext = operations["readContext get /context"]["response"];
type Customer = Schemas["Customer"];
