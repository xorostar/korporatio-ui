<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";
import StepIndicator from "./StepIndicator.vue";
import Step1CompanyDetails from "./Step1CompanyDetails.vue";
import Step2Shareholders from "./Step2Shareholders.vue";
import Step3BeneficialOwner from "./Step3BeneficialOwner.vue";
import Step4Director from "./Step4Director.vue";
import FormNavigation from "./FormNavigation.vue";

const formStore = useFormStore();

const steps = [
  { number: 1, title: "Company Details" },
  { number: 2, title: "Shareholders" },
  { number: 3, title: "Beneficial Owner" },
  { number: 4, title: "Director" },
];
</script>

<template>
  <div class="bg-slate-900">
    <StepIndicator
      :steps="steps"
      :current-step="formStore.currentStep"
    />

    <div class="mb-8">
      <Step1CompanyDetails v-if="formStore.currentStep === 1" />
      <Step2Shareholders v-else-if="formStore.currentStep === 2" />
      <Step3BeneficialOwner v-else-if="formStore.currentStep === 3" />
      <Step4Director v-else-if="formStore.currentStep === 4" />
    </div>

    <FormNavigation />
  </div>
</template>
