<template>
  <v-card
    class="pa-10 text-center text-white"
    :style="bannerGradient"
    rounded="xl"
  >
    <v-container class="d-flex flex-column align-center justify-center">
      <v-icon size="84" class="mb-4">mdi-microscope</v-icon>

      <h1 class="text-h3 font-weight-bold mb-2">Welcome to Protocol Finder</h1>
      <p class="text-h6 opacity-75 mb-8">
        Search thousands of scientific protocols
      </p>

      <v-form
        v-model="isValid"
        class="w-100 submit-form"
        :class="{ 'submit-form--hasError': formError }"
        @submit.prevent="handleSearch"
      >
        <v-row
          class="mx-auto"
          align="center"
          justify="center"
          no-gutters
          style="max-width: 600px"
        >
          <v-col cols="12" md="10" class="text-left">
            <v-text-field
              v-model="localSearch"
              label="Search for protocols..."
              :rules="rules"
              density="comfortable"
              variant="outlined"
              :hide-details="true"
              color="white"
              class="rounded-te-0 font-weight-bold"
              prepend-inner-icon="mdi-magnify"
            />
          </v-col>

          <v-col
            cols="12"
            md="auto"
            class="d-flex justify-center justify-md-start mt-2 mt-md-0"
          >
            <v-btn
              color="white"
              variant="flat"
              type="submit"
              class="font-weight-bold"
              height="48"
            >
              Search
            </v-btn>
          </v-col>

          <v-col cols="12">
            <!-- Display the error here -->
            <v-slide-y-transition>
              <v-alert
                v-if="formError"
                variant="tonal"
                type="error"
                class="form-error mt-4 text-left"
              >
                <span class="text-white font-weight-bold">{{ formError }}</span>
              </v-alert>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useSearchTerm } from '@/composables/useSearchKey';

  const { setSearchKey } = useSearchTerm();

  const localSearch = ref('');

  // Form Validation
  const isValid = ref(false);
  const formError = ref('');

  const requiredFiedMessage = 'Please enter a search value';
  const rules = [(v: string) => !!v.trim() || requiredFiedMessage];

  const handleSearch = async () => {
    // Reset message
    formError.value = '';

    // Check form is valid
    if (!isValid.value) {
      formError.value = requiredFiedMessage;
      return;
    }

    setSearchKey(localSearch.value.trim());
  };

  const bannerGradient = computed(() => ({
    background: `linear-gradient(
      135deg,
      rgb(var(--v-theme-primary), 1) 20%,
      rgb(var(--v-theme-accent), 1) 110%
    )`,
    backgroundColor: `rgb(var(--v-theme-secondary))`,
  }));
</script>

<style lang="scss" scoped>
  .submit-form {
    &--hasError {
      // Target only Vuetify fields inside this block
      ::v-deep(.v-field),
      ::v-deep(.v-label),
      ::v-deep(.v-messages__message),
      ::v-deep(.v-icon) {
        color: white !important;
      }

      ::v-deep(.v-text-field) {
        .v-field__outline {
          background: rgb(var(--v-theme-error), 0.6);
        }
      }
    }

    ::v-deep(.v-field) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    ::v-deep(.v-btn) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>
