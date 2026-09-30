import type { Schemas, operations } from "#shopwell";

type AddressListResponse =
  operations["listAddress post /account/list-address"]["response"];
type CustomerAddressBody = Schemas["CustomerAddressBody"];
type CustomerAddress = Schemas["CustomerAddress"];
type Country = Schemas["Country"];
type CountryState = Schemas["CountryState"];
