import { vuetify } from '@/plugins/vuetify';
import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils';
import type { Component } from 'vue';

export function mountWithVuetify(
  component: Component,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: MountingOptions<any>,
): VueWrapper {
  return mount(component, {
    global: {
      plugins: [vuetify],
      ...options?.global,
    },
    ...options,
  });
}
