<template>
  <v-card class="protocolCard d-flex flex-column" variant="tonal">
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
    </div>

    <v-spacer />

    <v-card-text class="flex-0-0">
      <span class="font-weight-bold">Stats:</span>
      <ProtocolStats :stats="protocol.stats"
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

  import ProtocolImage from '@/components/protocol/ProtocolImage.vue';
  import ProtocolStats from '@/components/protocol/ProtocolStats.vue';

  import type { Protocol } from '@/types/protocol';

  const props = defineProps<{
    protocol: Protocol;
  }>();

  const { sanitize } = useSanitizeHtml();

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
