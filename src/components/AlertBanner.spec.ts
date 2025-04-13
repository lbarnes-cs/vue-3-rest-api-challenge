import { describe, it, expect } from 'vitest';
import AlertBanner from './AlertBanner.vue';

import { mountWithVuetify } from '@tests/utils/mountWithVuetify';

describe('AlertBanner', () => {
  it('renders default text when slot is not provided', () => {
    const wrapper = mountWithVuetify(AlertBanner, {
      props: {
        title: 'Test Title',
        type: 'info',
        text: 'This is default fallback text.',
      },
    });

    expect(wrapper.get('[data-testid="alert-banner"]').exists()).toBe(true);
    expect(wrapper.get('.v-alert-title').text()).toBe('Test Title');
    expect(wrapper.get('[data-testid="alert-banner-text"]').text()).toContain(
      'This is default fallback text.',
    );
  });

  it('renders custom text slot content', () => {
    const wrapper = mountWithVuetify(AlertBanner, {
      props: {
        title: 'Custom Text Title',
        type: 'warning',
      },
      slots: {
        text: '<p>Custom slot content here.</p>',
      },
    });

    expect(wrapper.get('.v-alert-title').text()).toBe('Custom Text Title');
    expect(wrapper.get('[data-testid="alert-banner-text"]').text()).toContain(
      'Custom slot content here.',
    );
  });

  it('renders append slot content', () => {
    const wrapper = mountWithVuetify(AlertBanner, {
      props: {
        title: 'Error Title',
        type: 'error',
      },
      slots: {
        text: '<p>Main alert text.</p>',
        append: '<code>Some error details.</code>',
      },
    });

    expect(wrapper.get('.v-alert-title').text()).toBe('Error Title');
    expect(wrapper.get('[data-testid="alert-banner-text"]').text()).toContain(
      'Main alert text.',
    );
    expect(wrapper.get('[data-testid="alert-banner-append"]').html()).toContain(
      '<code>Some error details.</code>',
    );
  });
});
