<template>
  <v-card class="protocolCard d-flex flex-column" variant="tonal">
    <v-img
      :lazy-src="protocol.image.source || ''"
      :src="protocol.image.placeholder || ''"
      height="200"
      class="flex-0-1"
      cover
    >
      <template v-slot:error>
        <v-img :src="require('/assets/img/placeholder/image-placeholder.jpg')">
          <template #sources>
            <source
              :srcset="
                require('/assets/img/placeholder/image-placeholder.webp')
              "
            />
          </template>
        </v-img>
      </template>
    </v-img>

    <v-card-subtitle class="mt-4">
      {{ datePublished }}
    </v-card-subtitle>

    <v-card-title v-html="sanitizedTitleHtml" class="pt-0"></v-card-title>

    <v-card-subtitle class="d-flex">
      {{ protocol?.creator.name }}
    </v-card-subtitle>

    <v-card-text v-if="protocol.creator?.badges">
      <div class="d-flex gc-2">
        <template v-for="badge in protocol.creator?.badges" :key="badge.id">
          <v-img
            v-if="badge.image.source"
            :src="badge.image.source"
            lazy-src=""
            :alt="badge.name"
          />
        </template>
      </div>
    </v-card-text>

    <v-spacer />

    <v-card-text>
      Summary: <ProtocolStats :stats="protocol.stats"
    /></v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn
        :href="protocol.url"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
      >
        <v-icon class="mr-1">mdi-eye</v-icon>
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSanitizeHtml } from '@/composables/useSanitizeHtml';

import ProtocolStats from '@/components/ProtocolStats.vue';

import type { Protocol } from '@/types/protocol';

const props = defineProps<{
  protocol: Protocol;
}>();

const { sanitize } = useSanitizeHtml();

const sanitizedTitleHtml = computed(() => sanitize(props.protocol?.title_html));

const datePublished = computed(() => {
  if (!props.protocol.published_on) return false;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const date = new Date(props.protocol.published_on * 1000); // Convert seconds to milliseconds
  return date.toLocaleDateString('en-US', options);
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
</style>
