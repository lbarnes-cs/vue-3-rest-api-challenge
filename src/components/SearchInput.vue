<template>
  <v-text-field
    v-model="localSearchKey"
    :loading="isFetching"
    label="Search Protocols"
    append-inner-icon="mdi-magnify"
    density="compact"
    variant="outlined"
    hide-details
    @click:append-inner="handleAppendClick"
    @blur="emit('update:modelValue', localSearchKey)"
  />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useDebounceFn } from '@vueuse/core';

  const props = defineProps<{
    isFetching: boolean;
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
  }>();

  // Local state initialized from the modelValue prop
  const localSearchKey = ref(props.modelValue);

  // Keep local in sync with external changes (if needed)
  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal !== localSearchKey.value) {
        localSearchKey.value = newVal;
      }
    },
  );

  // Debounced emit to parent
  const debouncedEmit = useDebounceFn((value: string) => {
    if (!props.isFetching) {
      emit('update:modelValue', value);
    }
  }, 600);

  // Watch input value and debounce the update
  watch(localSearchKey, (newVal) => {
    debouncedEmit(newVal);
  });

  // Immediate emit when clicking search
  const handleAppendClick = () => {
    emit('update:modelValue', localSearchKey.value);
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
