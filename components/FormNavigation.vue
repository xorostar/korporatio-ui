<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";
import SaveAndExitButton from "./SaveAndExitButton.vue";

const formStore = useFormStore();
const primaryColor = "#8b5cf6";
const primaryHoverColor = "#7c3aed";

const handleMouseEnter = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target) {
    target.style.backgroundColor = primaryHoverColor;
  }
};

const handleMouseLeave = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target) {
    target.style.backgroundColor = primaryColor;
  }
};
</script>

<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
  >
    <!-- Mobile: Stack buttons vertically -->
    <div
      class="flex flex-col sm:flex-row justify-between items-center w-full gap-4"
    >
      <!-- BACK Button -->
      <button
        @click="formStore.previousStep()"
        :disabled="!formStore.canGoBack"
        class="flex items-center justify-center gap-2 bg-transparent border-2 border-slate-600 text-white hover:bg-slate-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-3 sm:order-1"
      >
        <svg
          class="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        BACK
      </button>

      <!-- SAVE & EXIT Button -->
      <SaveAndExitButton class="order-2" />

      <!-- NEXT/SUBMIT Button -->
      <button
        @click="
          formStore.currentStep === 4
            ? formStore.submitForm()
            : formStore.nextStep()
        "
        :disabled="formStore.isSubmitting || !formStore.isCurrentStepValid"
        class="flex items-center justify-center gap-2 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto order-1 sm:order-3"
        :style="{ backgroundColor: primaryColor }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div
          v-if="formStore.isSubmitting"
          class="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
        ></div>
        <span v-if="formStore.isSubmitting">SUBMITTING...</span>
        <span v-else-if="formStore.currentStep === 4">SUBMIT</span>
        <template v-else>
          NEXT
          <svg
            class="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </template>
      </button>
    </div>
  </div>
</template>
