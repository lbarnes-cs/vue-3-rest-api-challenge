import { nextTick } from 'vue';
import { useGoTo } from 'vuetify';

import type { InternalGoToOptions } from 'vuetify/lib/composables/goto.mjs';

type GoToTarget = string | number | HTMLElement;
type GoToOptions = Partial<InternalGoToOptions>;

export function useGoToWrapper() {
  const goTo = useGoTo();

  const defaultOptions: GoToOptions = {
    duration: 200,
    easing: 'easeInOutCubic',
    offset: 0,
  };

  /**
   * Scrolls to a target using Vuetify's goTo utility.
   * Automatically waits for next DOM tick.
   * @param target - CSS selector, pixel location or HTMLElement to scroll to
   * @param options - Optional goTo options
   */
  const goToWrapper = async (
    target: GoToTarget,
    options?: GoToOptions,
  ): Promise<void> => {
    await nextTick(); // ensures the element exists

    try {
      await goTo(target, {
        ...defaultOptions,
        ...options,
      });
    } catch (error) {
      console.warn(
        '[useGoToWrapper] Failed to scroll to target:',
        target,
        error,
      );
    }
  };

  return {
    goToWrapper,
  };
}
