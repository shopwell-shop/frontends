type CmsElementRegistration = {
  name: string;
  defaultConfig: {
    dailyUrl: {
      source: "static";
      value: string;
    };
  };
};

declare const Shopwell: {
  Service(service: "cmsService"): {
    registerCmsElement(config: CmsElementRegistration): void;
  };
};

Shopwell.Service("cmsService").registerCmsElement({
  name: "dailymotion",
  defaultConfig: {
    dailyUrl: {
      source: "static",
      value: "",
    },
  },
});
