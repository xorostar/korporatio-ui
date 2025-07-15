import type { FormSection } from "~/types/form";

export const useFormNavigation = () => {
  const formStore = useFormStore();

  /**
   * Navigate to a specific step
   */
  const goToStep = (step: number) => {
    formStore.setCurrentStep(step);
  };

  /**
   * Go to next step
   */
  const nextStep = async () => {
    await formStore.nextStep();
  };

  /**
   * Go to previous step
   */
  const previousStep = () => {
    formStore.previousStep();
  };

  /**
   * Check if can proceed to next step
   */
  const canProceedToNext = computed(() => formStore.canProceedToNext);

  /**
   * Check if can go back
   */
  const canGoBack = computed(() => formStore.canGoBack);

  /**
   * Get current step
   */
  const currentStep = computed(() => formStore.currentStep);

  /**
   * Get completion percentage
   */
  const completionPercentage = computed(() => formStore.completionPercentage);

  /**
   * Check if current step is valid
   */
  const isCurrentStepValid = computed(() => formStore.isCurrentStepValid);

  /**
   * Get step title
   */
  const getStepTitle = (step: number): string => {
    switch (step) {
      case 1:
        return "Company Details";
      case 2:
        return "Shareholders";
      case 3:
        return "Beneficial Owner";
      case 4:
        return "Director";
      default:
        return "";
    }
  };

  /**
   * Get step description
   */
  const getStepDescription = (step: number): string => {
    switch (step) {
      case 1:
        return "Enter company and contact information";
      case 2:
        return "Add shareholders information";
      case 3:
        return "Add beneficial owner details";
      case 4:
        return "Add director information";
      default:
        return "";
    }
  };

  /**
   * Check if step is completed
   */
  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formStore.data.pointOfContact.fullName &&
          formStore.data.companyInfo.companyName &&
          formStore.data.countriesOfInterest.jurisdictionOfOperation
        );
      case 2:
        return formStore.data.shareholders.length > 0;
      case 3:
        return formStore.data.beneficialOwners.length > 0;
      case 4:
        return formStore.data.directors.length > 0;
      default:
        return false;
    }
  };

  /**
   * Check if step is active
   */
  const isStepActive = (step: number): boolean => {
    return step === formStore.currentStep;
  };

  /**
   * Check if step is accessible (can be navigated to)
   */
  const isStepAccessible = (step: number): boolean => {
    // Can always go to step 1
    if (step === 1) return true;

    // For other steps, check if previous steps are completed
    for (let i = 1; i < step; i++) {
      if (!isStepCompleted(i)) return false;
    }
    return true;
  };

  return {
    goToStep,
    nextStep,
    previousStep,
    canProceedToNext,
    canGoBack,
    currentStep,
    completionPercentage,
    isCurrentStepValid,
    getStepTitle,
    getStepDescription,
    isStepCompleted,
    isStepActive,
    isStepAccessible,
  };
};
