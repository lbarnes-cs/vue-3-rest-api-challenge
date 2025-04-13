import { vuetify } from '@/plugins/vuetify';

import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';

export function mountWithVuetify<T extends ComponentPublicInstance>(
  component: any,
  options?: MountingOptions<any>,
): VueWrapper<T> {
  return mount(component, {
    global: {
      plugins: [vuetify],
      ...options?.global,
    },
    ...options,
  });
}
