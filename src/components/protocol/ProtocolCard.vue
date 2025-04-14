<template>
  <v-card
    :href="protocol.url"
    target="_blank"
    rel="noopener noreferrer"
    class="protocolCard d-flex flex-column"
    variant="tonal"
  >
    <ProtocolImage
      :image="protocol.image"
      :alt="protocol.title"
      :height="200"
      class="flex-0-0"
    />

    <div class="">
      <v-card-subtitle class="mt-4">
        {{ datePublished }}
      </v-card-subtitle>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <v-card-title class="pt-0" v-html="sanitizedTitleHtml" />

      <v-card-subtitle class="d-flex">
        <a
          v-if="protocol.creator.link"
          :href="protocol.creator.link"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="text-link"
          data-testid="creator-link"
        >
          {{ protocol.creator.name }}
        </a>

        <span v-else data-testid="creator-name">
          {{ protocol.creator.name }}
        </span>
      </v-card-subtitle>
    </div>

    <v-spacer />

    <v-card-text class="flex-0-0">
      <span class="font-weight-bold">Stats:</span>
      <ProtocolStats :stats="protocol.stats"
    /></v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn variant="outlined" color="secondary">
        <v-icon class="mr-1">mdi-eye</v-icon>
        Open
      </v-btn>

      <v-spacer />
      <v-btn
        v-if="hasMoreToSee"
        variant="outlined"
        color="primary"
        class="viewMore"
        :class="{ 'viewMore--is-active': isCardExpanded }"
        @click.prevent="isCardExpanded = !isCardExpanded"
      >
        <v-icon class="mr-1">mdi-chevron-down</v-icon>
        {{ isCardExpanded ? 'View' : 'Hide' }} More
      </v-btn>
    </v-card-actions>

    <v-slide-y-transition>
      <div v-if="isCardExpanded">
        <v-divider />

        <v-card-text>
          <div class="mb-2">
            <span class="font-weight-bold"> Affiliation </span>
            <p>{{ protocol.creator.affiliation }}</p>
          </div>

          <div v-if="protocol.creator?.badges" class="d-flex gc-2">
            <template v-for="badge in protocol.creator?.badges" :key="badge.id">
              <v-img
                v-if="badge.image.source"
                :src="badge.image.source"
                lazy-src=""
                :alt="badge.name"
              />
            </template>
          </div>

          <div v-if="protocol.description">
            <span class="font-weight-bold"> Description: </span>
            <ProtocolDescription :description="protocol.description" />
          </div>
        </v-card-text>
      </div>
    </v-slide-y-transition>
  </v-card>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useSanitizeHtml } from '@/composables/useSanitizeHtml';

  import ProtocolImage from '@/components/protocol/ProtocolImage.vue';
  import ProtocolStats from '@/components/protocol/ProtocolStats.vue';

  import type { Protocol } from '@/types/protocol';
  import ProtocolDescription from './ProtocolDescription.vue';

  const props = defineProps<{
    protocol: Protocol;
  }>();

  const { sanitize } = useSanitizeHtml();

  const isCardExpanded = ref(false);

  const sanitizedTitleHtml = computed(() =>
    sanitize(props.protocol?.title_html),
  );

  // Note: we are using this twice, this might be a helper or composable
  const datePublished = computed(() => {
    if (!props.protocol.published_on) return null;

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const date = new Date(props.protocol.published_on * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString('en-US', options);
  });

  const hasMoreToSee = computed(() => {
    return !!props.protocol.description;
  });
</script>

<style lang="scss" scoped>
  .protocolCard {
    ::v-deep(.v-card-title) {
      white-space: normal;
      display: -webkit-box;
      line-clamp: 3;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  .viewMore {
    ::v-deep(.v-icon) {
      transition: transform 300ms ease-in-out;
    }

    &--is-active {
      ::v-deep(.v-icon) {
        transform: rotate(-180deg);
      }
    }
  }
</style>
