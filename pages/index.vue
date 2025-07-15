<script setup lang="ts">
import { definePageMeta, useSeoMeta } from "#imports";
import AutoSaveIndicator from "~/components/AutoSaveIndicator.vue";
import MultiStepForm from "~/components/MultiStepForm.vue";

// SEO
useSeoMeta({
  title: "BVI Company Formation - Start Your Company",
  ogTitle: "BVI Company Formation - Start Your Company",
  description:
    "Complete multi-step form to start your BVI company formation process",
  ogDescription:
    "Complete multi-step form to start your BVI company formation process",
});

// Page meta
definePageMeta({
  title: "BVI Company Formation",
  description: "Complete BVI company formation form",
});
</script>

<template>
  <div class="min-h-screen bg-slate-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div class="max-w-7xl mx-auto">
        <header class="text-center mb-8 md:mb-12">
          <h1
            class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6"
          >
            Time to start your BVI company!
          </h1>
          <p
            class="text-slate-300 max-w-3xl mx-auto leading-relaxed text-base md:text-lg px-4"
          >
            All questions below must be answered. Take your time, and if you
            need to take a break, the form will save automatically and you can
            continue later. Good luck!
          </p>
        </header>

        <AutoSaveIndicator />
        <MultiStepForm />
      </div>
    </div>
  </div>
</template>
