<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";

const formStore = useFormStore();
</script>

<template>
  <div
    v-if="formStore.isAutoSaving"
    class="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
  >
    <div
      class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
    ></div>
    <span class="text-sm">Saving...</span>
  </div>

  <div
    v-else-if="formStore.lastSaved"
    class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
  >
    <svg
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
    <span class="text-sm"
      >Saved {{ formStore.lastSaved.toLocaleTimeString() }}</span
    >
  </div>
</template>
