<template>
  <ul class="list-none">
    <li v-for="author in authors" :key="author.username">
      <v-avatar
        v-if="author.image?.source"
        :image="author.image.source"
        :alt="author.name"
        size="32"
        class="mr-2"
      />

      <div>
        <a v-if="author.link" :href="author.link" target="_blank">
          {{ author.name }}
        </a>

        <span v-else> {{ author.name }} </span>,

        <span class="text-grey-darken-2">{{ author.affiliation }}</span>
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
