<template>
  <v-img
    :lazy-src="image.source || placeholderImageWebp"
    :src="image.placeholder || placeholderImageWebp"
    :alt="alt"
    :height="height"
    cover
  >
    <template #error>
      <v-img :src="placeholderImageJpg">
        <template #sources>
          <source :srcset="placeholderImageWebp" />
        </template>
      </v-img>
    </template>
  </v-img>
</template>

<script setup lang="ts">
  import type { Image } from '@/types/protocol';

  withDefaults(
    defineProps<{
      height?: number | string;
      alt: string;
      image: Image;
    }>(),
    {
      height: 80,
    },
  );

  const placeholderImageJpg = new URL(
    '/assets/img/placeholder/image-placeholder.jpg',
    import.meta.url,
  ).href;

  const placeholderImageWebp = new URL(
    '/assets/img/placeholder/image-placeholder.webp',
    import.meta.url,
  ).href;
</script>
