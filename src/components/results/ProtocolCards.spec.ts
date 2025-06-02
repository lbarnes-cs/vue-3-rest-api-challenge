import { describe, vi, expect } from 'vitest';
import { mountWithVuetify } from '@tests/utils/mountWithVuetify';

import ProtocolCards from '@/components/results/ProtocolCards.vue';

import { protocolsFixture } from '@tests/fixtures/protocolsFixture';

// Mock composables
vi.mock('@/composables/usePagination', () => ({
  usePagination: () => ({
    pagination: {
      ...protocolsFixture.pagination,
    },
    currentPage: 1,
    handlePaginationChange: vi.fn(),
  }),
}));

vi.mock('@/composables/useSortFilters', () => ({
  useSortFilters: () => ({
    sortFilters: {
      orderField: 'title',
      orderDir: 'asc',
      pageSize: 10,
    },
    toggleDialog: vi.fn(),
  }),
}));

vi.mock('@/composables/useGoToWrapper', () => ({
  useGoToWrapper: () => ({
    goToWrapper: vi.fn(),
  }),
}));

describe('ProtocolCards.vue', () => {
  test('should displays pagination ans sort filter info correctly', async () => {
    const wrapper = mountWithVuetify(ProtocolCards, {
      props: {
        protocolsList: protocolsFixture.items,
        isFetching: false,
      },
    });

    expect(
      wrapper.find('[data-testid="cards-summary-total-results"]').text(),
    ).toBe('237');
    expect(
      wrapper.find('[data-testid="cards-summary-current-page"]').text(),
    ).toBe('1');
    expect(
      wrapper.find('[data-testid="cards-summary-total-pages"]').text(),
    ).toBe('24');
    expect(
      wrapper.find('[data-testid="cards-summary-sort-by"]').text(),
    ).toContain('title');
    expect(
      wrapper.find('[data-testid="cards-summary-sort-dir"]').text(),
    ).toContain('asc');
    expect(
      wrapper.find('[data-testid="cards-summary-page-size"]').text(),
    ).toContain('10');
  });

  test('should display the skeleton loader when isFetching is enabled', async () => {
    const wrapper = mountWithVuetify(ProtocolCards, {
      props: {
        protocolsList: [],
        isFetching: true,
      },
    });

    const skeleton = wrapper.find('[data-testid="cards-loading-skeleton"]');
    expect(skeleton.exists()).toBe(true);
    expect(skeleton.isVisible()).toBe(true);

    const cardsResult = wrapper.find('[data-testid="cards-list"]');
    expect(cardsResult.exists()).toBe(true); // changing the tests to cause an error
  });

  test('should not display any cards when list is empty', async () => {
    const wrapper = mountWithVuetify(ProtocolCards, {
      props: {
        protocolsList: [],
        isFetching: false,
      },
    });

    const skeleton = wrapper.find('[data-testid="cards-loading-skeleton"]');
    expect(skeleton.exists()).toBe(false);

    const cardsResult = wrapper.find('[data-testid="cards-list"]');
    expect(cardsResult.exists()).toBe(true);

    const cards = wrapper.findAll('[data-testid="protocol-card-col"]');
    expect(cards.length).toBe(0);
  });

  test('should display 10 cards in protocol list', async () => {
    const wrapper = mountWithVuetify(ProtocolCards, {
      props: {
        protocolsList: protocolsFixture.items,
        isFetching: false,
      },
    });

    const cardsResult = wrapper.find('[data-testid="cards-list"]');
    expect(cardsResult.exists()).toBe(true);

    const cards = wrapper.findAll('[data-testid="protocol-card-col"]');
    expect(cards.length).toBe(10);
  });
});
