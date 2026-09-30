type CmsElementRegistration = {
  name: string;
};

declare const Shopwell: {
  Service(service: "cmsService"): {
    registerCmsElement(config: CmsElementRegistration): void;
  };
};

Shopwell.Service("cmsService").registerCmsElement({
  name: "dailymotion",
});
