<template>
  <v-card
    class="pa-4 pa-sm-10 text-center text-white"
    :style="bannerGradient"
    rounded="xl"
  >
    <v-container class="d-flex flex-column align-center justify-center">
      <v-icon size="84" class="mb-4">mdi-microscope</v-icon>

      <h1 class="text-h4 text-h3 font-weight-bold mb-2">
        Welcome to Protocol Finder
      </h1>

      <p class="text-subtitle-1 text-sm-h6 opacity-75 mb-8">
        Search thousands of scientific protocols
      </p>

      <v-form
        ref="formRef"
        validate-on="lazy"
        class="w-100 submit-form"
        :class="{ 'submit-form--hasError': !isValid && hasSubmitted }"
        @submit.prevent="handleSearch"
      >
        <v-row
          class="mx-auto"
          align="center"
          justify="center"
          no-gutters
          style="max-width: 600px"
        >
          <v-col cols="12" md="8" class="text-left d-flex">
            <v-text-field
              v-model="localSearch"
              label="Search for protocols..."
              :rules="[requiredField]"
              density="comfortable"
              variant="outlined"
              :hide-details="true"
              color="white"
              class="rounded-te-0 font-weight-bold"
              prepend-inner-icon="mdi-magnify"
              autofocus
            />
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

          <v-col cols="12" md="8">
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
  import { ref, computed, onMounted, watch } from 'vue';
  import { useSearchTerm } from '@/composables/useSearchKey';

  const { setSearchKey } = useSearchTerm();

  const localSearch = ref('');
  const isValid = ref(true);
  const hasSubmitted = ref(false);
  const formError = ref<string | null>(null);
  const formRef = ref();

  onMounted(() => {
    requestAnimationFrame(() => {
      const input = document.querySelector(
        '.v-text-field input',
      ) as HTMLInputElement;
      input?.focus();
    });
  });

  const requiredFiedMessage = 'Please enter a search value';
  const requiredField = (v: string) => !!v.trim() || requiredFiedMessage;

  const handleSearch = async () => {
    hasSubmitted.value = true;
    formError.value = '';

    if (!formRef.value) return;

    const result = await formRef.value.validate();
    isValid.value = result.valid;

    if (!result.valid) {
      formError.value = requiredFiedMessage;
      return;
    }

    setSearchKey(localSearch.value.trim());
  };

  watch(localSearch, (val: string) => {
    if (val.trim()) {
      formError.value = '';
    }
  });

  const bannerGradient = computed(() => ({
    background: `linear-gradient(
      135deg,
      rgb(var(--v-theme-primary)) 20%,
      rgb(var(--v-theme-accent)) 110%
    )`,
  }));
</script>

<style lang="scss" scoped>
  .submit-form {
    &--hasError,
    .v-input--error {
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

  .v-input {
    ::v-deep(input) {
      background-color: transparent !important;
      color: inherit !important;
    }

    ::v-deep(input:-webkit-autofill),
    ::v-deep(input:-webkit-autofill:focus),
    ::v-deep(input:-internal-autofill-selected) {
      box-shadow: 0 0 0px 1000px transparent inset !important;
      -webkit-text-fill-color: inherit !important;
      transition:
        background-color 9999s ease-out,
        color 9999s ease-out !important;
    }
  }
</style>
