<template>
  <div v-if="firstBlockText">
    {{ firstBlockText }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    description: string;
  }>();

  const firstBlockText = computed(() => {
    try {
      const parsed = JSON.parse(props.description);
      return parsed?.blocks?.[0]?.text || '';
    } catch (error) {
      console.error('Failed to parse description JSON:', error);
      return '';
    }
  });
</script>
