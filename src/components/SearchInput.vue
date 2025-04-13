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
    @update:modelValue="debouncedEmit"
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

/**
 * TODO:
 * The user experience here is messy and needs to be improved.
 * In an effort to use debounced, ensuring we don't send API requests for every
 * key-change on the input; we have an issue where the value doesn't get saved correctly.
 *
 * Might look into using a computed function with getter and setter to better manage this
 * For the challenge, this is low on the priority list.
 */
// Debounced function to emit the search term
const debouncedEmit = useDebounceFn((value: string) => {
  // Ensure we don't emit twice if the user already press the search icon
  if (!props.isFetching && !isClickTriggered.value) {
    emit('update:modelValue', value);
  }
}, 500);

// Watch for changes in the search field and trigger debounced emit
// const watchLocalSearchKey = (newVal: string) => {
//   debouncedEmit(newVal);
// };

// watch(localSearchKey, watchLocalSearchKey);

const handleAppendClick = () => {
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
