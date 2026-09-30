const config = {
  public: {
    shopwell: {
      devStorefrontUrl: "",
    },
  },
};

export const requestBody = {
  // reads runtimeConfig, where the value really is "" - `??` does not catch an empty string
  storefrontUrl: config.public.shopwell.devStorefrontUrl ?? "",
};
