import type { Schemas, operations } from "#shopwell";

type OrderListCriteria = operations["readOrder post /order"]["body"];
type OrderListResponse = operations["readOrder post /order"]["response"];
type Order = Schemas["Order"];
type OrderLineItem = Schemas["OrderLineItem"];
type OrderState = Schemas["StateMachineState"];
