<script setup lang="ts">
interface Step {
  number: number;
  title: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

const props = defineProps<Props>();

const primaryColor = "#8b5cf6";
</script>

<template>
  <div class="mb-8 md:mb-12">
    <!-- Mobile: Vertical layout -->
    <div class="flex flex-col sm:hidden space-y-4">
      <div
        v-for="step in steps"
        :key="step.number"
        class="flex items-center gap-3"
      >
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
          :class="{
            'text-white': step.number === currentStep,
            'bg-green-500 text-white': step.number < currentStep,
            'bg-slate-600 text-slate-300': step.number > currentStep,
          }"
          :style="
            step.number === currentStep ? { backgroundColor: primaryColor } : {}
          "
        >
          {{ step.number }}
        </div>
        <span
          class="text-base font-medium"
          :class="{
            'text-slate-300': step.number === currentStep,
            'text-green-400': step.number < currentStep,
            'text-slate-400': step.number > currentStep,
          }"
          :style="step.number === currentStep ? { color: '#a78bfa' } : {}"
        >
          {{ step.title }}
        </span>
      </div>
    </div>

    <!-- Desktop: Horizontal layout -->
    <div class="hidden sm:flex items-center justify-center gap-4 md:gap-8">
      <div
        v-for="step in steps"
        :key="step.number"
        class="flex items-center gap-3"
      >
        <div
          class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold"
          :class="{
            'text-white': step.number === currentStep,
            'bg-green-500 text-white': step.number < currentStep,
            'bg-slate-600 text-slate-300': step.number > currentStep,
          }"
          :style="
            step.number === currentStep ? { backgroundColor: primaryColor } : {}
          "
        >
          {{ step.number }}
        </div>
        <span
          class="text-base md:text-lg font-medium"
          :class="{
            'text-slate-300': step.number === currentStep,
            'text-green-400': step.number < currentStep,
            'text-slate-400': step.number > currentStep,
          }"
          :style="step.number === currentStep ? { color: '#a78bfa' } : {}"
        >
          {{ step.title }}
        </span>
      </div>
    </div>
  </div>
</template>
