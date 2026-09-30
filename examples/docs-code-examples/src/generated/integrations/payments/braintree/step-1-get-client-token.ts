import { useSessionContext, useShopwellContext } from "#imports";

const { apiClient } = useShopwellContext();
const { sessionContext } = useSessionContext();

// Get app token from Shopwell Store-API
const tokenResponse = await apiClient.invoke(
  "generateJWTAppSystemAppServer post /app-system/{name}/generate-token",
  { pathParams: { name: "SwagBraintreeApp" } },
);
const token = tokenResponse.data?.token ?? "";
const shopId = tokenResponse.data?.shopId ?? "";

// Get Braintree client config from the app server
const currencyId = sessionContext.value?.currency?.id;
const salesChannelId = sessionContext.value?.salesChannel?.id;

const configResponse = await fetch(
  `https://braintree.shopwell.cn/api/client/config?shop-id=${shopId}&currency-id=${currencyId}&sales-channel-id=${salesChannelId}`,
  {
    method: "POST",
    headers: {
      "shopwell-app-token": token,
      "shopwell-app-shop-id": shopId,
    },
  },
);
const { clientToken } = await configResponse.json();
