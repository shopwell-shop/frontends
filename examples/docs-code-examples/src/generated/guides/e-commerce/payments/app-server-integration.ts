import { useShopwellContext } from "#imports";

const { apiClient } = useShopwellContext(); // or use an instance of @shopwell/api-client library

const tokenResponse = await apiClient.invoke(
  "generateJWTAppSystemAppServer post /app-system/{name}/generate-token",
  {
    pathParams: {
      name: "MyPaymentApp",
    },
  },
);
