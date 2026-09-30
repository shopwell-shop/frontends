// TODO fix types in this plugin
import { setupDevtoolsPlugin } from "@vue/devtools-api";
import { unref } from "vue";
import type { App, InjectionKey } from "vue";

const TIMELINE_EVENT_LAYER_ID = "shopwell:events";
const INSPECTOR_ID = "shopwell";
export const shopwellSymbol = Symbol("shopwell") as InjectionKey<string>;

/* istanbul ignore next */
export function registerShopwellDevtools(
  app: App,
  // TODO: Improve devtools typing.
  shopwellPluginInstance: any,
) {
  // TODO: Improve devtools typing.
  let devtoolsApi: any;
  let trackId = 0;
  // TODO: Improve devtools typing.
  let currentSharedState: any = null;

  setupDevtoolsPlugin(
    {
      id: "shopwell-frontends",
      label: "Shopwell Frontends",
      logo: "https://shopwell.com/media/unknown/2d/80/8c/shopwell_signet_blue.svg",
      packageName: "shopwell-frontends",
      homepage: "shopwell.com",
      // TODO: Improve devtools typing.
      app: app as any,
      enableEarlyProxy: true,
    },
    (api) => {
      devtoolsApi = api;

      api.addTimelineLayer({
        id: TIMELINE_EVENT_LAYER_ID,
        label: "Shopwell Frontends",
        color: 1613567,
      });

      api.addInspector({
        id: INSPECTOR_ID,
        label: "Shopwell Frontends",
        icon: "shopping_cart",
      });

      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          payload.rootNodes = [
            // {
            //   id: "shared-state",
            //   label: "Shared state",
            // },
            // {
            //   id: "interceptors",
            //   label: "Interceptors",
            // },
            {
              id: "api-client",
              label: "API client",
            },
            // {
            //   id: "api-defaults",
            //   label: "API defaults",
            // },
          ];
        }
      });

      // TODO: Improve devtools typing.
      function displayState(state: any) {
        if (!state) return null;
        // TODO: Improve devtools typing.
        const res: any = {};
        // TODO: Keep iteration behavior while devtools typing is improved.
        Object.keys(state).forEach((refKey) => {
          res[refKey] = unref(currentSharedState[refKey]);
        });
        return res;
      }

      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          switch (payload.nodeId) {
            case "api-client":
              payload.state = {
                config: shopwellPluginInstance.apiInstance.config,
              };
              break;
            case "shared-state":
              payload.state = {
                store:
                  displayState(currentSharedState) ||
                  shopwellPluginInstance.state.sharedStore ||
                  payload.app.$sharedStore,
              };
              break;
            case "interceptors":
              payload.state = {
                registered: shopwellPluginInstance.state.interceptors,
              };
              break;

            case "api-defaults":
              payload.state = shopwellPluginInstance.state.shopwellDefaults;
              break;

            default:
              payload.state = {};
              break;
          }
        }
      });
    },
  );

  const devtools = {
    // TODO: Improve devtools typing.
    trackEvent: (label: string, params: any) => {
      const groupId = `track${trackId++}`;

      // Start
      // TODO: Improve devtools typing.
      const log = (label: string, params: any) => {
        devtoolsApi.addTimelineEvent({
          layerId: TIMELINE_EVENT_LAYER_ID,
          event: {
            time: Date.now(),
            data: {
              label,
              params,
            },
            title: label,
            groupId,
          },
        });
      };

      log(label, params);

      return {
        log,
      };
    },
    // TODO: Improve devtools typing.
    log: (label: string, params: any) => {
      devtoolsApi.addTimelineEvent({
        layerId: TIMELINE_EVENT_LAYER_ID,
        event: {
          time: Date.now(),
          data: {
            label,
            params,
          },
          title: label,
        },
      });
    },
    // TODO: Improve devtools typing.
    warning: (label: string, params: any) => {
      devtoolsApi.addTimelineEvent({
        layerId: TIMELINE_EVENT_LAYER_ID,
        event: {
          time: Date.now(),
          data: {
            label,
            params,
          },
          title: label,
          logType: "warning",
        },
      });
    },
    // TODO: Improve devtools typing.
    error: (label: string, params: any) => {
      devtoolsApi.addTimelineEvent({
        layerId: TIMELINE_EVENT_LAYER_ID,
        event: {
          time: Date.now(),
          data: {
            label,
            params,
          },
          title: label,
          logType: "error",
        },
      });
    },
    _internal: {
      // TODO: Improve devtools typing.
      updateSharedState: (state: any) => {
        currentSharedState = state;
        devtoolsApi.sendInspectorState(INSPECTOR_ID);
      },
    },
  };

  return devtools;
}
