export type ShopwellFrontendsOptions = {
  endpoint: string;
  accessToken: string;
  shopwellApiClient?: {
    timeout: number;
  };
  enableDevtools?: boolean;
};
