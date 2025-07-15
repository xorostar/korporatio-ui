<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";

const formStore = useFormStore();
</script>

<template>
  <button
    @click="formStore.saveAndExit()"
    :disabled="formStore.isAutoSaving"
    class="bg-slate-700 border-2 border-slate-600 text-white hover:bg-slate-600 px-4 sm:px-6 py-3 sm:py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
  >
    <div class="text-center">
      <div class="text-xs text-slate-300 mb-1">
        I know the form autosaved but, I wish to
      </div>
      <div class="font-semibold">
        <span class="text-white">SAVE & EXIT</span>
        <span class="text-slate-300 ml-1">anyway. ;)</span>
      </div>
    </div>
  </button>
</template>
