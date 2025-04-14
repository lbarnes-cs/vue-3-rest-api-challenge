<template>
  <v-text-field
    v-model="localSearch"
    :loading="isLoading"
    label="Search Protocols"
    append-inner-icon="mdi-magnify"
    density="compact"
    variant="outlined"
    hide-details
    @click:append-inner="handleAppendClick"
  />
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { useDebounceFn } from '@vueuse/core';

  import { useSearchKey } from '@/composables/useSearchKey';

  const props = defineProps<{
    isLoading: boolean;
  }>();

  const { searchKey, updateSearchKey } = useSearchKey();

  const localSearch = ref('');

  onMounted(() => {
    if (searchKey.value) {
      localSearch.value = searchKey.value;
    }
  });

  // Debounced setter for composable
  const debouncedUpdate = useDebounceFn((value: string) => {
    if (!props.isLoading && value && value.trim()) {
      updateSearchKey(value.trim());
    }
  }, 600);

  // Watch local input and apply debounced update
  watch(localSearch, (newVal) => {
    debouncedUpdate(newVal);
  });

  // Immediate update on click (search icon)
  const handleAppendClick = () => {
    if (!props.isLoading && localSearch.value.trim()) {
      updateSearchKey(localSearch.value.trim());
    }
  };
</script>

<style lang="scss" scoped>
  // Overrides Chrome autofill styles,
  // which was adding a white background when we select a suggested word,
  // destorying the UI in the process
  :deep(input) {
    background-color: transparent !important; // fallback for normal state
    color: inherit !important;
  }

  :deep(input:-webkit-autofill),
  :deep(input:-webkit-autofill:focus),
  :deep(input:-internal-autofill-selected) {
    box-shadow: 0 0 0px 1000px transparent inset !important; // force transparent bg
    -webkit-text-fill-color: inherit !important; // ensure text color matches theme
    transition:
      background-color 9999s ease-out,
      color 9999s ease-out !important; // delay Chrome override
  }
</style>
