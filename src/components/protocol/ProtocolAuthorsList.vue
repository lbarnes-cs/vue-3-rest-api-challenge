<template>
  <ul class="list-none">
    <li v-for="author in authors" :key="author.username">
      <v-avatar
        v-if="author.image?.source"
        :image="author.image.source"
        :alt="author.name"
        size="32"
        class="mr-2"
        data-testid="author-avatar"
      />

      <div data-testid="author-summary">
        <a
          v-if="author.link"
          :href="author.link"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="text-link"
          data-testid="author-link"
        >
          {{ author.name }}
        </a>

        <span v-else data-testid="author-name"> {{ author.name }} </span>,

        <span
          v-if="author.affiliation"
          class="text-grey-darken-2"
          data-testid="author-affiliation"
          >{{ author.affiliation }}</span
        >
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { Author } from '@/types/protocol';

  defineProps<{
    authors: Author[];
  }>();
</script>
