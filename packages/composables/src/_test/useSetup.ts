import { shallowMount } from "@vue/test-utils";
import { defu } from "defu";
import { vi } from "vitest";
import { defineComponent, h } from "vue";

type Injections = {
  shopwell: unknown;
  apiClient: {
    invoke: ReturnType<typeof vi.fn>;
    defaultHeaders?: Record<string, string>;
  };
  swNotifications?: unknown;
};

export function useSetup<V>(setup: () => V, customMocks?: Partial<Injections>) {
  const defaultInjections: Injections = {
    shopwell: {},
    apiClient: {
      invoke: customMocks?.apiClient?.invoke ?? vi.fn(),
      defaultHeaders: {},
    },
  };

  const component = defineComponent({
    setup,
    render() {
      return h("div", []);
    },
  });

  const injections: Injections = defu(
    defaultInjections,
    customMocks || {},
  ) as Injections;

  const wrapper = shallowMount(component, {
    global: {
      provide: injections,
    },
  });

  return {
    injections,
    wrapper,
    vm: wrapper.vm,
  };
}
