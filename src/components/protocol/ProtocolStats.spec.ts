import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import ProtocolStats from './ProtocolStats.vue';

describe('ProtocolStats.vue', () => {
  const baseStats = {
    number_of_steps: 43,
    number_of_votes: 123,
    number_of_views: 4567,
    number_of_exports: 89,
    number_of_bookmarks: 10,
    number_of_comments: 3,
  };

  it('renders all stats when they are present', () => {
    const wrapper = mount(ProtocolStats, {
      props: {
        stats: baseStats,
      },
    });

    expect(wrapper.get('[data-testid="stats-steps"]').text()).toContain('43');
    expect(wrapper.get('[data-testid="stats-votes"]').text()).toContain('123');
    expect(wrapper.get('[data-testid="stats-views"]').text()).toContain('4.6k');
    expect(wrapper.get('[data-testid="stats-exports"]').text()).toContain('89');
    expect(wrapper.get('[data-testid="stats-bookmarks"]').text()).toContain(
      '10',
    );
    expect(wrapper.get('[data-testid="stats-comments"]').text()).toContain('3');
  });

  it('renders only stats that have non-zero values', () => {
    const partialStats = {
      number_of_steps: 0,
      number_of_views: 1000,
      number_of_comments: 0,
      number_of_votes: 0,
    };

    const wrapper = mount(ProtocolStats, {
      props: {
        stats: partialStats,
      },
    });

    expect(wrapper.find('[data-testid="stats-steps"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="stats-views"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="stats-comments"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="stats-votes"]').exists()).toBe(false);
  });

  it('renders nothing when all stats are zero', () => {
    const wrapper = mount(ProtocolStats, {
      props: {
        stats: {
          number_of_steps: 0,
          number_of_votes: 0,
          number_of_views: 0,
          number_of_exports: 0,
          number_of_bookmarks: 0,
          number_of_comments: 0,
        },
      },
    });

    const statsList = wrapper.get('[data-testid="stats"]');
    expect(statsList.findAll('li').length).toBe(0);
  });

  it('renders nothing when stats are empty', () => {
    const wrapper = mount(ProtocolStats, {
      props: {
        stats: {},
      },
    });

    const statsList = wrapper.get('[data-testid="stats"]');
    expect(statsList.findAll('li').length).toBe(0);
  });
});
