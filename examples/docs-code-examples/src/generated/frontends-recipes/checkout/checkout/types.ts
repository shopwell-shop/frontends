import type { Schemas, operations } from "#shopwell";

type SalesChannelContext = operations["readContext get /context"]["response"];
type CreateOrderBody = operations["createOrder post /checkout/order"]["body"];
type OrderResponse = operations["createOrder post /checkout/order"]["response"];
type ShippingMethod = Schemas["ShippingMethod"];
type PaymentMethod = Schemas["PaymentMethod"];
type Order = Schemas["Order"];
type CustomerAddress = Schemas["CustomerAddress"];
