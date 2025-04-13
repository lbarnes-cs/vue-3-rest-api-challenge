<template>
  <v-text-field
    v-model="localSearchKey"
    :loading="isFetching"
    label="Search Protocols"
    append-inner-icon="mdi-magnify"
    density="compact"
    variant="outlined"
    hide-details
    @click:append-inner="onClick"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps<{
  isFetching: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const localSearchKey = ref('');
const isClickTriggered = ref(false); // Track if click was triggered

// Debounced function to emit the search term
const debouncedEmit = useDebounceFn((value: string) => {
  // Ensure we don't emit twice if the user already press the search icon
  if (!props.isFetching && !isClickTriggered.value) {
    emit('update:modelValue', value);
  }
}, 500);

// Watch for changes in the search field and trigger debounced emit
const watchLocalSearchKey = (newVal: string) => {
  debouncedEmit(newVal);
};

watch(localSearchKey, watchLocalSearchKey);

function onClick() {
  // Emit the latest value when the append-inner area is clicked
  // Stop a user from calling the API mulitple times
  if (!props.isFetching && !isClickTriggered.value) {
    debouncedEmit(localSearchKey.value);
  }

  // Set flag to prevent debounced emit from being triggered
  isClickTriggered.value = true;

  // Reset flag after a small delay (after debounce timeout)
  setTimeout(() => {
    isClickTriggered.value = false;
  }, 600); // Slightly longer than the debounce delay to avoid conflict
}
</script>
